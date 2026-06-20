-- =====================================================================
-- Corkscout — database schema (Postgres / Supabase)
-- Idempotent: safe to run on every deploy. Creates objects if missing,
-- never drops your data. The GitHub Action runs this before seeding.
--
--   restaurants : a venue (name, area, Michelin, neighborhood, MENU SOURCE)
--   wines       : a bottle on a real by-the-glass menu
--   pours       : a wine on a restaurant's list, at its glass price
-- =====================================================================

create table if not exists restaurants (
  id            bigint generated always as identity primary key,
  name          text not null unique,
  area          text not null,
  neighborhood  text,
  michelin      int  not null default 0,
  has_sommelier boolean not null default false,
  menu_url      text,                         -- the published menu this came from
  menu_checked  date,                         -- when we last verified it
  notes         text,
  created_at    timestamptz not null default now()
);

create table if not exists wines (
  id            bigint generated always as identity primary key,
  producer_cuvee text not null,
  vintage       text not null default 'NV',
  type          text not null check (type in ('sparkling','white','rosé','orange','red','dessert')),
  grape         text,
  region        text,
  body          text,
  style_tags    text[] not null default '{}',
  pairing_tags  text[] not null default '{}',
  created_at    timestamptz not null default now(),
  unique (producer_cuvee, vintage)
);

create table if not exists pours (
  id            bigint generated always as identity primary key,
  wine_id       bigint not null references wines(id) on delete cascade,
  restaurant_id bigint not null references restaurants(id) on delete cascade,
  glass_price   numeric(6,2),
  created_at    timestamptz not null default now(),
  unique (wine_id, restaurant_id)
);

-- Bring existing databases up to date (no-ops if already applied) -------
alter table restaurants add column if not exists menu_url     text;
alter table restaurants add column if not exists menu_checked date;
-- Allow LA / NYC / BOS (plus legacy CAM) as area codes.
alter table restaurants drop constraint if exists restaurants_area_check;
alter table restaurants add  constraint restaurants_area_check
  check (area in ('LA','NYC','BOS','CAM'));
-- Allow 'sake' as a type.
alter table wines drop constraint if exists wines_type_check;
alter table wines add  constraint wines_type_check
  check (type in ('sparkling','white','rosé','orange','red','dessert','sake'));

create index if not exists idx_wines_type        on wines (type);
create index if not exists idx_pours_restaurant  on pours (restaurant_id);
create index if not exists idx_restaurants_area  on restaurants (area);

-- View the app reads. drop+create so we can change its columns freely.
drop view if exists pour_cards;
create view pour_cards
with (security_invoker = on) as
select
  w.id             as wine_id,
  w.producer_cuvee as n,
  w.vintage        as v,
  w.type           as t,
  w.grape          as g,
  w.region         as r,
  r.name           as rest,
  r.area           as area,
  r.michelin       as michelin,
  r.menu_url       as menu_url,
  r.menu_checked   as menu_checked,
  p.glass_price    as gp,
  (select count(*) from pours p2 where p2.wine_id = w.id) as list_count
from pours p
join wines w        on w.id = p.wine_id
join restaurants r  on r.id = p.restaurant_id;

-- Public, read-only access (the anon/publishable key can read, not write) --
alter table restaurants enable row level security;
alter table wines       enable row level security;
alter table pours       enable row level security;

drop policy if exists "public read" on restaurants;
create policy "public read" on restaurants for select using (true);
drop policy if exists "public read" on wines;
create policy "public read" on wines       for select using (true);
drop policy if exists "public read" on pours;
create policy "public read" on pours       for select using (true);

grant usage on schema public to anon, authenticated;
grant select on restaurants, wines, pours to anon, authenticated;
grant select on pour_cards to anon, authenticated;

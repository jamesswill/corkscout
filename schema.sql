-- =====================================================================
-- Pour Decisions — database schema (Postgres / Supabase)
-- =====================================================================
-- IDEMPOTENT: safe to run on every deploy. It creates objects only if
-- they're missing and never drops your data. The GitHub Action applies
-- this on every push; you can also paste it into the Supabase SQL Editor
-- to set things up by hand.
--
-- Data model:
--   restaurants : a venue (name, area, Michelin, sommelier, neighborhood)
--   wines       : a canonical bottle (producer + cuvée + vintage + tags)
--   pours       : a wine on a restaurant's by-the-glass list, at a price
--
-- Why split wines from pours? The same wine can appear on MANY lists — the
-- "endorsement signal." pours is the many-to-many link that makes
-- "appears on N lists" a simple COUNT (see the view at the bottom).
-- =====================================================================

-- ---------- restaurants ----------
create table if not exists restaurants (
  id            bigint generated always as identity primary key,
  name          text not null unique,
  area          text not null check (area in ('LA','NYC','CAM')),
  neighborhood  text,
  michelin      int  not null default 0,
  has_sommelier boolean not null default false,
  notes         text,
  created_at    timestamptz not null default now()
);

-- ---------- wines (one row per distinct bottle) ----------
create table if not exists wines (
  id            bigint generated always as identity primary key,
  producer_cuvee text not null,
  vintage       text not null default 'NV',
  type          text not null check (type in ('sparkling','white','rosé','orange','red','dessert')),
  grape         text,
  region        text,
  body          text check (body in ('light','medium','full')),
  style_tags    text[] not null default '{}',
  pairing_tags  text[] not null default '{}',
  created_at    timestamptz not null default now(),
  unique (producer_cuvee, vintage)
);

-- ---------- pours (wine × restaurant × price) ----------
create table if not exists pours (
  id            bigint generated always as identity primary key,
  wine_id       bigint not null references wines(id) on delete cascade,
  restaurant_id bigint not null references restaurants(id) on delete cascade,
  glass_price   numeric(6,2),
  created_at    timestamptz not null default now(),
  unique (wine_id, restaurant_id)
);

-- ---------- indexes ----------
create index if not exists idx_wines_type        on wines (type);
create index if not exists idx_wines_body        on wines (body);
create index if not exists idx_pours_restaurant  on pours (restaurant_id);
create index if not exists idx_restaurants_area  on restaurants (area);

-- ---------- view: flatten back into the app's card shape ----------
create or replace view pour_cards
with (security_invoker = on) as
select
  w.id           as wine_id,
  w.producer_cuvee as n,
  w.vintage      as v,
  w.type         as t,
  w.grape        as g,
  w.region       as r,
  w.body         as b,
  w.style_tags   as s,
  w.pairing_tags as p,
  r.name         as rest,
  r.area         as area,
  r.michelin     as michelin,
  p.glass_price  as gp,
  (select count(*) from pours p2 where p2.wine_id = w.id) as list_count
from pours p
join wines w        on w.id = p.wine_id
join restaurants r  on r.id = p.restaurant_id;

-- =====================================================================
-- Row Level Security: public can READ the catalog, nobody can write with
-- the anon key. Only the seed script (service_role key) writes.
-- drop+create keeps the policies idempotent without touching data.
-- =====================================================================
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

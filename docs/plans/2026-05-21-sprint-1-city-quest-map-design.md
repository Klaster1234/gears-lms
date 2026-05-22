---
tags: [design, sprint-1, city-quests, map, leaflet, supabase]
title: "Sprint 1 Design — Mapa City Quest + Zapisy"
date: 2026-05-21
status: Decisions resolved 2026-05-21 — ready for implementation planning
project: G.E.A.R.S. — Erasmus+ KA210-ADU
---

# Sprint 1 Design — Mapa City Quest + Zapisy

**Cel sprintu:** dodać do strony [gears.zieloneslaskie.pl](https://gears.zieloneslaskie.pl) sekcję z interaktywną mapą miejsc eco-friendly w Gliwicach + woj. śląskim, listą proponowanych questów, i formularzem zapisu na quest. Bez logowania (Sprint 2).

**Termin docelowy:** PR przeciw brancha `claude/automated-task-system-3VS5n` (Vercel production source) w ciągu 3-4 dni roboczych. Po merge → auto-deploy na `gears.zieloneslaskie.pl`.

**Dlaczego teraz:** Aktywność wniosku „One day city quest" rusza 01/03/2026. Strona musi być gotowa do publicznej promocji i zapisów najpóźniej do 01/02/2026 (4 tyg. buforu). Mapa = brakujący kluczowy deliverable wniosku (10 PL circular maps).

---

## 1. Architektura (zaktualizowane 2026-05-21 po cloningu repo)

### Stack (REALNY — z `package.json`)
- **Next.js 16.1.6** (App Router, Turbopack) ✅
- **React 19.2.3** ✅
- **react-leaflet 5.0.0** + **leaflet 1.9.4** + **@types/leaflet** — nowo zainstalowane
- **Prisma 6.19.2** + **Postgres na db.prisma.io** ✅ (NIE Supabase — baza już skonfigurowana)
- **next-auth v5 beta** + **@auth/prisma-adapter** + **bcryptjs** ✅ — LOGIN JUŻ ISTNIEJE
- **next-intl 4.8.3** — i18n EN/PL/SK ✅
- **Tailwind CSS 4** + **shadcn/ui 3.8.5** + **radix-ui** ✅
- **zustand 5** — state management ✅
- **lucide-react** — ikony ✅
- **Walidacja:** lekka własna w `src/lib/quests/validation.ts` (bez Zod — minimalizujemy zależności)
- **Server Actions** — natywnie w Next 16 dla formularza zapisu + propozycji miejsca
- **PostGIS:** NIE używany. Trzymamy `lat`, `lng` jako `Float`. Dla 100-200 punktów to wystarczy bez geo-queries.

### Bonus po klonowaniu (vs pierwotne założenia)
- Strona MA już login + rejestrację + tracking progressu w bazie (`UserProgress`) + certyfikat PDF + admin panel.
- Sprint 2 będzie więc znacznie krótszy — większość już jest.

### Decyzje techniczne (z trade-offami)

| Decyzja | Wybrane | Alternatywa | Dlaczego |
|---------|---------|-------------|----------|
| Mapa | Leaflet + OSM | Google Maps, Mapbox | Free, no API key, EU-friendly, zgodne z duchem projektu eco/open |
| Backend | Prisma + istniejący Postgres | Supabase | Już jest w projekcie, nie duplikujemy infrastruktury |
| Renderowanie mapy | Client component przez `dynamic({ ssr: false })` | SSR z mapą | Leaflet wymaga `window` |
| Dane miejsc | Tabela `QuestPlace` w bazie | JSON w repo | Edycja przez Prisma Studio lub admin (Sprint 3) bez deploya, łatwe dodawanie z formularza „Suggest a place" |
| Walidacja | Własna lekka (`validation.ts`) | Zod | Zod brakuje w `package.json`, nie dodajemy nowej zależności dla 2 prostych formularzy |
| Formularz zapisu | Server Action + Prisma | API route + fetch | Server Actions z Next 16 — natywne, bezpieczne, mniej kodu |

### Co NIE robimy w Sprint 1
- ❌ ~~Login użytkowników~~ → JEST JUŻ
- ❌ Edycja miejsc z UI (admin panel) → Sprint 3 (na razie Prisma Studio + formularz „Suggest a place")
- ❌ Płatne API map
- ❌ E-mail notyfikacje do uczestników → Sprint 1.5 (decyzja użytkownika)
- ❌ Zod / react-hook-form — własna lekka walidacja w `validation.ts`

---

## 2. Schema bazy danych (Supabase / Postgres)

### Tabela `quest_places`

```sql
create extension if not exists postgis;

create table quest_places (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  name_translations jsonb default '{}'::jsonb, -- {"en": "...", "sk": "..."}
  category text not null check (category in (
    'repair', 'second-hand', 'vegan', 'no-package',
    'eco', 'recycling', 'education', 'mobility', 'tourism', 'gastronomy'
  )),
  tags text[] default '{}',
  -- adres
  street text,
  house_number text,
  postal_code text,
  city text not null default 'Gliwice',
  country_code char(2) not null default 'PL',
  -- geo
  location geography(point, 4326) not null,
  -- opisy (i18n)
  description_pl text,
  description_en text,
  description_sk text,
  -- kontakt
  website text,
  facebook text,
  instagram text,
  phone text,
  email text,
  -- godziny w JSON (np. {"monday": "10:00-18:00", "sunday": "closed"})
  hours jsonb,
  -- a11y
  wheelchair_accessible boolean,
  accessibility_notes text,
  -- meta
  photo_urls text[],
  sources text[],
  verified_at date,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index quest_places_location_idx on quest_places using gist (location);
create index quest_places_category_idx on quest_places (category);
create index quest_places_city_idx on quest_places (city);
create index quest_places_is_active_idx on quest_places (is_active);
```

### Tabela `quests`

```sql
create table quests (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_pl text not null,
  title_en text,
  title_sk text,
  description_pl text,
  description_en text,
  description_sk text,
  duration_minutes int,
  distance_km numeric(5,2),
  transport_mode text check (transport_mode in ('walking', 'bike', 'public', 'mixed')),
  difficulty text check (difficulty in ('easy', 'medium', 'hard')),
  max_participants int default 10,
  greencomp_competence text,
  themes text[],
  season_recommended text[],
  indoor_outdoor text check (indoor_outdoor in ('indoor', 'outdoor', 'mixed')),
  -- dla nadchodzących questów (kalendarz)
  scheduled_at timestamptz, -- null = "wzorzec" (template), wartość = konkretna data
  meeting_point_place_id uuid references quest_places(id),
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index quests_scheduled_at_idx on quests (scheduled_at) where scheduled_at is not null;
```

### Tabela `quest_stops` (relacja many-to-many quest ↔ place + zadanie)

```sql
create table quest_stops (
  id uuid primary key default gen_random_uuid(),
  quest_id uuid not null references quests(id) on delete cascade,
  place_id uuid not null references quest_places(id),
  position smallint not null, -- kolejność w queście (1, 2, 3...)
  task_pl text,
  task_en text,
  task_sk text,
  estimated_minutes int,
  unique (quest_id, position)
);

create index quest_stops_quest_id_idx on quest_stops (quest_id);
```

### Tabela `quest_registrations`

```sql
create table quest_registrations (
  id uuid primary key default gen_random_uuid(),
  quest_id uuid not null references quests(id),
  -- uczestnik (bez konta na razie)
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  age_range text, -- "18-25", "26-40", "41-60", "60+"
  city text,
  -- dane dla raportów Erasmus
  dietary_requirements text,
  accessibility_needs text,
  hear_about_us text,
  -- consents (RODO + Erasmus)
  consent_data_processing boolean not null default false,
  consent_photos boolean default false,
  consent_newsletter boolean default false,
  status text not null default 'pending' check (status in (
    'pending', 'confirmed', 'attended', 'cancelled', 'no-show'
  )),
  -- meta
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (quest_id, email) -- jeden email na quest
);

create index quest_registrations_quest_id_idx on quest_registrations (quest_id);
create index quest_registrations_email_idx on quest_registrations (email);
create index quest_registrations_status_idx on quest_registrations (status);
```

### Tabela `place_suggestions` (community input — „co-created maps")

```sql
create table place_suggestions (
  id uuid primary key default gen_random_uuid(),
  suggested_name text not null,
  suggested_category text,
  suggested_address text,
  suggested_description text,
  suggester_email text,
  suggester_name text,
  status text not null default 'pending' check (status in (
    'pending', 'approved', 'rejected', 'duplicate'
  )),
  reviewed_at timestamptz,
  reviewer_notes text,
  created_at timestamptz default now()
);
```

### RLS (Row Level Security)

```sql
-- Anyone can read places/quests (public data)
alter table quest_places enable row level security;
create policy "Public read places" on quest_places for select using (is_active = true);

alter table quests enable row level security;
create policy "Public read quests" on quests for select using (is_published = true);

alter table quest_stops enable row level security;
create policy "Public read stops" on quest_stops for select using (true);

-- Registrations: anyone can insert (anonymous), only service_role can read
alter table quest_registrations enable row level security;
create policy "Anyone can register" on quest_registrations for insert with check (true);
-- read: tylko service_role (admin)

alter table place_suggestions enable row level security;
create policy "Anyone can suggest" on place_suggestions for insert with check (true);
```

---

## 3. Struktura plików w repo

```
src/
  app/
    [locale]/
      quests/
        page.tsx                    # Lista questów + mapa overview
        [slug]/
          page.tsx                  # Pojedynczy quest: trasa, miejsca, formularz zapisu
        places/
          page.tsx                  # (Opcjonalne) Pełen katalog miejsc z filtrami
        suggest-place/
          page.tsx                  # Formularz „Zaproponuj miejsce"
        confirmation/
          page.tsx                  # Strona po zapisie („Dziękujemy, sprawdź e-mail")
      layout.tsx                    # (modyfikacja nawigacji)
  components/
    quests/
      map-view.tsx                  # Główny komponent mapy (client, dynamic import)
      map-legend.tsx                # Legenda kategorii (pinezki kolorystyczne)
      place-card.tsx                # Karta miejsca w sidebarze
      place-marker.tsx              # Custom marker per kategoria
      quest-card.tsx                # Karta questu w gridzie
      quest-route-map.tsx           # Mapa pojedynczego questu z trasą (polyline)
      registration-form.tsx         # Formularz zapisu (react-hook-form + zod)
      filter-bar.tsx                # Filtry kategorii, miasta, dostępności
      suggest-place-form.tsx
    nav/
      main-nav.tsx                  # (modyfikacja — dodać link Quests)
  lib/
    supabase/
      client.ts                     # createBrowserClient
      server.ts                     # createServerClient
      types.ts                      # Generated types z `supabase gen types typescript`
    queries/
      places.ts                     # getPlaces, getPlaceBySlug, getPlacesByCategory
      quests.ts                     # getQuests, getQuestBySlug, getUpcomingQuests
      registrations.ts              # createRegistration (Server Action)
    map/
      categories.ts                 # Konfiguracja kategorii: ikona, kolor, label PL/EN/SK
      icons.ts                      # Custom Leaflet icons
  types/
    quest.ts                        # Type aliases dla domeny
  messages/
    en/quests.json
    pl/quests.json
    sk/quests.json
docs/
  plans/
    2026-05-21-sprint-1-city-quest-map-design.md  # ten dokument
  research/
    2026-05-21-deep-research-prompts.md
    (po Deep Research:)
    places.json
    quests.json
supabase/
  migrations/
    20260521000000_create_quest_schema.sql
  seed.sql                          # demo data dla developmentu
```

---

## 4. UX / Layout — co użytkownik zobaczy

### `/quests` — strona główna sekcji

```
┌──────────────────────────────────────────────────────────┐
│ [Navbar: Modules · Progress · About · QUESTS · 🌐 EN ▾]  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   ⛰️ City Quests — Discover sustainable spots             │
│   nearby. Real places. Real conversations.               │
│                                                          │
│   [🟢 Upcoming quests (3)]   [📋 Suggest a place]         │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │         [interactive Leaflet map]               │    │
│  │         ~ 60% szerokości na desktop             │    │
│  │         pinezki kolorystyczne wg kategorii      │    │
│  │                                                 │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  Filters: [🔧 Repair] [♻️ Second-hand] [🌱 Vegan]        │
│           [📦 No-package] [🚲 Mobility] [Wszystko]       │
│           [Miasto ▾]  [Dostępność ♿]                    │
│                                                          │
│  ─── Nadchodzące questy ───                              │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐           │
│  │ Quest 1    │ │ Quest 2    │ │ Quest 3    │           │
│  │ 12.06      │ │ 19.06      │ │ 03.07      │           │
│  │ Gliwice    │ │ Katowice   │ │ Bytom      │           │
│  │ 8/10 spots │ │ 3/10 spots │ │ open       │           │
│  │ [Zapisz →] │ │ [Zapisz →] │ │ [Zapisz →] │           │
│  └────────────┘ └────────────┘ └────────────┘           │
│                                                          │
│  ─── Wszystkie miejsca (152) ───                         │
│  [grid kart miejsc, paginacja]                           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Mobile (< 768px):**
- Mapa zwija się do toggla „Mapa / Lista" na górze
- Filtry w drawer
- Karty questów w pionie

### `/quests/[slug]` — pojedynczy quest

```
┌──────────────────────────────────────────────────────────┐
│ [breadcrumb: Quests › Naprawiamy Gliwice]                │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ 🔧 Naprawiamy Gliwice                                    │
│ 4h · 6 km · pieszo · łatwy · max 10 osób                 │
│                                                          │
│ ┌─────────────────────────────────────────────────┐    │
│ │ [Mapa z polyline trasy + pinezki 1-6]           │    │
│ └─────────────────────────────────────────────────┘    │
│                                                          │
│ 📋 Opis questu (markdown z bazy, 200-300 słów)          │
│                                                          │
│ 📍 Przystanki (6):                                       │
│   1. ⏱️ 30 min · 🔧 Naprawa Rowerów Gliwice              │
│      Zadanie: zobacz proces naprawy, zapytaj o...        │
│   2. ⏱️ 45 min · ⚙️ Repair Cafe...                       │
│   ...                                                    │
│                                                          │
│ 🎯 Co rozwiniesz (GreenComp):                           │
│   • Acting for sustainability                            │
│   • Individual initiative                                │
│                                                          │
│ ┌─────────────────────────────────────────────────┐    │
│ │ 📝 Zapisz się                                    │    │
│ │                                                  │    │
│ │ Termin: 12 czerwca 2026, 10:00 (8/10 miejsc)    │    │
│ │ [Formularz: imię, nazwisko, e-mail, telefon,    │    │
│ │  wiek, miasto, potrzeby, zgody RODO]            │    │
│ │ [ Zapisz się na quest ]                          │    │
│ └─────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

### Komponent `<MapView />` (client)

```typescript
// src/components/quests/map-view.tsx (uproszczony szkic)
'use client';

import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import { useMemo } from 'react';
import type { Place, Category } from '@/types/quest';
import { categoryConfig } from '@/lib/map/categories';
import { createCategoryIcon } from '@/lib/map/icons';

const GLIWICE_CENTER: [number, number] = [50.2945, 18.6714];

export function MapView({
  places,
  selectedCategories,
  selectedPlaceId,
  onPlaceClick
}: {
  places: Place[];
  selectedCategories: Category[];
  selectedPlaceId?: string;
  onPlaceClick: (id: string) => void;
}) {
  const visible = useMemo(
    () => places.filter(p => selectedCategories.includes(p.category)),
    [places, selectedCategories]
  );

  return (
    <MapContainer
      center={GLIWICE_CENTER}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '600px', width: '100%' }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {visible.map(place => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={createCategoryIcon(place.category)}
          eventHandlers={{
            click: () => onPlaceClick(place.id),
          }}
        >
          <Popup>
            <PlacePopup place={place} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
```

### Pinezki — wizualnie

Pinezki kolorystyczne, ikonki Lucide (już używane w projekcie):

| Kategoria | Kolor | Ikonka | Label PL | Label EN | Label SK |
|-----------|-------|--------|----------|----------|----------|
| repair | `#F59E0B` amber | `Wrench` | Naprawa | Repair | Oprava |
| second-hand | `#A78BFA` violet | `Recycle` | Used | Second-hand | Sekáč |
| vegan | `#10B981` emerald | `Salad` | Wegańskie | Vegan | Vegánske |
| no-package | `#0EA5E9` sky | `Package` | Bez opakowań | No-packaging | Bez obalov |
| eco | `#22C55E` green | `Leaf` | Eko/Bio | Eco | Eko |
| recycling | `#84CC16` lime | `RotateCcw` | Recykling | Recycling | Recyklácia |
| education | `#3B82F6` blue | `GraduationCap` | Edukacja | Education | Vzdelávanie |
| mobility | `#06B6D4` cyan | `Bike` | Mobilność | Mobility | Mobilita |
| tourism | `#F472B6` pink | `TreePine` | Turystyka | Tourism | Turistika |
| gastronomy | `#FB923C` orange | `UtensilsCrossed` | Gastronomia | Gastronomy | Gastronómia |

---

## 5. Formularz zapisu — walidacja + flow

### Schema Zod

```typescript
// src/lib/validation/registration.ts
import { z } from 'zod';

export const registrationSchema = z.object({
  questId: z.string().uuid(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().optional(),
  ageRange: z.enum(['18-25', '26-40', '41-60', '60+']),
  city: z.string().min(2).max(80).optional(),
  dietaryRequirements: z.string().max(200).optional(),
  accessibilityNeeds: z.string().max(200).optional(),
  hearAboutUs: z.string().max(100).optional(),
  consentDataProcessing: z.literal(true, {
    errorMap: () => ({ message: 'Wymagana zgoda na przetwarzanie danych' }),
  }),
  consentPhotos: z.boolean().default(false),
  consentNewsletter: z.boolean().default(false),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
```

### Server Action

```typescript
// src/lib/queries/registrations.ts
'use server';

import { createServerClient } from '@/lib/supabase/server';
import { registrationSchema, type RegistrationInput } from '@/lib/validation/registration';

export async function createRegistration(input: RegistrationInput) {
  const parsed = registrationSchema.parse(input);
  const supabase = createServerClient();

  // sprawdź czy nie ma duplikatu (unique constraint też to złapie, ale lepszy UX)
  const { data: existing } = await supabase
    .from('quest_registrations')
    .select('id')
    .eq('quest_id', parsed.questId)
    .eq('email', parsed.email)
    .maybeSingle();

  if (existing) {
    return { error: 'Już jesteś zapisany na ten quest' };
  }

  // sprawdź czy quest ma jeszcze miejsca
  const { count } = await supabase
    .from('quest_registrations')
    .select('id', { count: 'exact', head: true })
    .eq('quest_id', parsed.questId)
    .neq('status', 'cancelled');

  const { data: quest } = await supabase
    .from('quests')
    .select('max_participants')
    .eq('id', parsed.questId)
    .single();

  if (count != null && quest && count >= quest.max_participants) {
    return { error: 'Brak miejsc na ten quest' };
  }

  const { error } = await supabase.from('quest_registrations').insert({
    quest_id: parsed.questId,
    first_name: parsed.firstName,
    last_name: parsed.lastName,
    email: parsed.email,
    phone: parsed.phone,
    age_range: parsed.ageRange,
    city: parsed.city,
    dietary_requirements: parsed.dietaryRequirements,
    accessibility_needs: parsed.accessibilityNeeds,
    hear_about_us: parsed.hearAboutUs,
    consent_data_processing: parsed.consentDataProcessing,
    consent_photos: parsed.consentPhotos,
    consent_newsletter: parsed.consentNewsletter,
  });

  if (error) return { error: 'Coś poszło nie tak. Spróbuj ponownie.' };

  // TODO Sprint 1.5: wyślij e-mail potwierdzający (Resend/Postmark)

  return { success: true };
}
```

### UX flow zapisu

1. Klik „Zapisz się" na karcie questu → modal/strona z formularzem
2. Wypełnienie pól + zaznaczenie zgody RODO (wymagane)
3. Submit → walidacja Zod → Server Action → insert do Supabase
4. Redirect na `/quests/confirmation?email=...` z podsumowaniem
5. (Sprint 1.5) E-mail potwierdzający z detalami questu, miejscem spotkania, kontaktem do organizatora

### RODO / zgody

Trzy zgody:
1. **Przetwarzanie danych** (WYMAGANE) — „Wyrażam zgodę na przetwarzanie moich danych osobowych przez Spółdzielnię Socjalną Zielone Śląskie na potrzeby organizacji questu w ramach projektu G.E.A.R.S. (Erasmus+ KA210-ADU). Dane będą przetwarzane zgodnie z [Polityką Prywatności]."
2. **Zdjęcia/dokumentacja** (opcjonalne) — „Zgadzam się na wykorzystanie mojego wizerunku w materiałach dokumentujących quest (raport Erasmus, social media, komiks projektowy)"
3. **Newsletter** (opcjonalne) — „Chcę otrzymywać informacje o kolejnych questach"

Plus link do polityki prywatności (osobna strona — Sprint 3) z klauzulą informacyjną RODO art. 13.

---

## 6. i18n — klucze do tłumaczenia

`messages/{en,pl,sk}/quests.json`:

```json
{
  "nav": "Quests",
  "title": "City Quests",
  "tagline": "Discover sustainable spots nearby",
  "filters": {
    "all": "All",
    "repair": "Repair",
    "secondHand": "Second-hand",
    "vegan": "Vegan",
    "noPackage": "No-packaging",
    "eco": "Eco",
    "recycling": "Recycling",
    "education": "Education",
    "mobility": "Mobility",
    "tourism": "Tourism",
    "gastronomy": "Gastronomy"
  },
  "actions": {
    "register": "Register",
    "viewQuest": "View quest",
    "suggestPlace": "Suggest a place",
    "showMap": "Show map",
    "showList": "Show list"
  },
  "registration": {
    "title": "Register for quest",
    "firstName": "First name",
    "lastName": "Last name",
    "email": "Email",
    "phone": "Phone (optional)",
    "ageRange": "Age range",
    "city": "City",
    "dietary": "Dietary requirements (optional)",
    "accessibility": "Accessibility needs (optional)",
    "hearAboutUs": "Where did you hear about us?",
    "consentDataRequired": "I agree to data processing (required)",
    "consentPhotos": "I agree to photos/documentation",
    "consentNewsletter": "Send me updates about quests",
    "submit": "Register for quest",
    "success": "Thanks! Check your email for confirmation.",
    "errorDuplicate": "You are already registered for this quest",
    "errorFull": "This quest is full"
  }
}
```

---

## 7. Konfiguracja środowiska

`.env.local` (nie commitowane):
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...  # do migracji i admin queries
```

Vercel env vars (production + preview):
- Te same trzy klucze wprowadzone w Vercel dashboard
- Region: Frankfurt (Europa, dla CDN)

---

## 8. Plan wdrożenia (kolejność commitów)

1. **Setup Supabase** — założenie projektu, region Frankfurt, włączenie PostGIS
2. **Migration** — `20260521000000_create_quest_schema.sql` + seed danych demo (10 miejsc i 2 questy)
3. **Types** — `supabase gen types typescript` → `src/lib/supabase/types.ts`
4. **Komponenty bazowe** — `MapView`, `PlaceMarker`, `categories.ts`, `icons.ts`
5. **Strona `/quests`** — lista + mapa + filtry, dane z `getPlaces()`
6. **Strona `/quests/[slug]`** — pojedynczy quest + trasa
7. **Formularz zapisu** — Zod + react-hook-form + Server Action
8. **Strona potwierdzenia** + e-mail (Resend → opcjonalne na Sprint 1.5)
9. **Nawigacja** — dodanie linku „Quests" w main-nav (+ tłumaczenia)
10. **i18n** — `messages/{en,pl,sk}/quests.json`
11. **SEO** — metadane OG, sitemap update
12. **Testy** — Playwright dla flow zapisu (happy path + walidacja)
13. **Deploy** — push do `claude/automated-task-system-3VS5n` → preview deploy → smoke test → prod

---

## 9. Decyzje (ustalone z użytkownikiem 2026-05-21)

| # | Pytanie | Decyzja |
|---|---------|---------|
| 1 | E-mail potwierdzający zapis | **Sprint 1.5** — najpierw mechanika, potem e-mail (Resend free). W Sprincie 1 tylko strona „dziękujemy" po wysłaniu. |
| 2 | Slug map URL | **Jednolite `/quests`** w EN/PL/SK. Prostsze, mniej rewrites. |
| 3 | Domyślne centrum mapy | **Gliwice** (50.2945, 18.6714), zoom 12. Bounding box wszystkich aktywnych miejsc jako fallback gdy są poza Gliwicami (wykorzystamy `leaflet`'s `flyToBounds`). |
| 4 | Capacity questu | **Miękki overflow do +2** (max_participants=10 → twardy limit 12). UX: po 10. zapisanym pokazujemy banner „Quest jest pełny, ale możesz dołączyć do listy rezerwowej (max 2 dodatkowe miejsca)". Status zapisu = `waitlist` jeśli pozycja 11-12. ZSS finalnie decyduje przed eventem. |
| 5 | „Zaproponuj miejsce" | **W Sprincie 1.** Zgodne z „co-created maps" z wniosku. Formularz na `/quests/suggest-place`, zapis do `place_suggestions`, akceptacja w Supabase Studio. |
| 6 | Pre-rendering vs ISR | **ISR z `revalidate=3600`** (1h) dla `/quests` i `/quests/[slug]`. Formularze i confirmation = dynamic. |

### Zmiana w schemacie wynikająca z decyzji #4

```sql
-- quest_registrations.status dodaje 'waitlist'
alter table quest_registrations
  drop constraint quest_registrations_status_check;

alter table quest_registrations
  add constraint quest_registrations_status_check
  check (status in ('pending', 'waitlist', 'confirmed', 'attended', 'cancelled', 'no-show'));

-- pomocnicza funkcja: ile osób ma quest (bez cancelled)
create or replace function quest_participant_count(qid uuid)
returns int language sql stable as $$
  select count(*)::int from quest_registrations
  where quest_id = qid and status not in ('cancelled', 'no-show');
$$;
```

### Zmiana w Server Action (#4):

```typescript
// w createRegistration():
const count = await getParticipantCount(parsed.questId);
const HARD_LIMIT = quest.max_participants + 2; // overflow +2

if (count >= HARD_LIMIT) {
  return { error: 'Quest jest pełny (z listą rezerwową)' };
}

const status = count >= quest.max_participants ? 'waitlist' : 'pending';
// ... insert with status
```

---

## 10. Sukces sprintu — co musi działać

✅ Strona `/quests` ładuje się < 2.5s LCP  
✅ Mapa z minimum 30 miejscami w Gliwicach + Śląskim (po Deep Research)  
✅ Filtry działają (kategoria, miasto)  
✅ Każda pinezka ma popup z nazwą, kategorią, opisem, linkiem do strony miejsca  
✅ Lista questów (min. 3 nadchodzące questy zaplanowane)  
✅ Formularz zapisu zapisuje do Supabase, walidacja Zod działa  
✅ E-mail potwierdzający (jeśli zdecydujemy się na Sprint 1)  
✅ i18n PL/EN/SK — wszystkie etykiety przetłumaczone  
✅ Lighthouse: Performance > 80, Accessibility > 95, SEO > 90  
✅ Mobile responsive (test na 375x812)  
✅ Deploy do prod = mergowany branch `claude/automated-task-system-3VS5n`

---

## 11. Co po Sprincie 1

**Sprint 2 — Login + konta:**
- Supabase Auth (magic link + Google OAuth opcjonalnie)
- Konto użytkownika z profilem
- Migracja localStorage progressu → tabela `user_progress`
- Certyfikat PDF z prawdziwym imieniem (generowanie po stronie serwera, pdf-lib lub @react-pdf/renderer)
- Admin panel: lista uczestników questów → eksport CSV dla Erasmusa

**Sprint 3 — Brakujące sekcje:**
- Gabinety Zrównoważonego Rozwoju (2 sztuki — strony statyczne z opisami)
- Komiks (preview + download, gdy powstanie 02/2027)
- Aktualności/Feed (czytamy z folderu `G.E.A.R.S - feed/` lub MDX w repo)
- Kontakt + social media w footerze
- Polityka Prywatności + Regulamin

**Sprint 4 — Polish:**
- Dokończenie tłumaczeń (EU disclaimer PL/SK, GreenComp labels)
- SEO: Open Graph images, structured data (Schema.org Event dla questów, LocalBusiness dla miejsc)
- Accessibility audit + fixes (WCAG 2.1 AA)
- Botanical papercut art (zgodnie z planem `2026-02-25-botanical-papercut-art.md`)
- Newsletter signup

---

## Status

**Status dokumentu:** ✅ ZAIMPLEMENTOWANY 2026-05-21 na branchu `feature/city-quest-map`. Build przechodzi.

## Co zostało zrobione
- ✅ Schema Prisma: `QuestPlace`, `Quest`, `QuestStop`, `QuestRegistration`, `PlaceSuggestion` + enumy
- ✅ Migration SQL: `prisma/migrations/1_add_quest_models/migration.sql`
- ✅ Lib: `src/lib/quests/{categories,validation,queries,actions}.ts`
- ✅ Komponenty: `MapView` (Leaflet + OSM), `MapViewLoader` (dynamic SSR off), `CategoryFilter`, `QuestsExplorer`, `PlaceList`, `QuestCard`, `RegistrationForm`, `SuggestPlaceForm`
- ✅ Strony: `/quests`, `/quests/[slug]`, `/quests/confirmation`, `/quests/suggest-place`
- ✅ Translations: PL/EN/SK — kategorie, filtry, formularze, RODO, błędy
- ✅ Navbar + mobile menu — link „Quests"
- ✅ Sitemap.xml zaktualizowane
- ✅ Seed file `prisma/seed-quests.ts` z 6 demo miejsc i 2 questami
- ✅ `next build` przechodzi, TypeScript clean, ESLint clean

**Następne kroki (twoja kolej):**
1. **Push brancha i otwórz PR:** `git push origin feature/city-quest-map` → PR przeciw `master`
2. **Vercel przygotuje preview deploy** automatycznie z PR
3. **Migracja produkcyjnej bazy:** Vercel build robi `prisma migrate deploy` automatycznie (jest w `package.json scripts.build`)
4. **Seed demo data:** lokalnie (z DATABASE_URL) lub przez Prisma Studio: `npx tsx prisma/seed-quests.ts`
5. **Uruchom Prompty Deep Research** w Gemini → otrzymasz `places.json` + `quests.json`
6. **Import:** napisać 2-3 linijkę skrypt importera z `places.json` i `quests.json` → Prisma (analogicznie do `seed-quests.ts`)
7. **Merge PR + deploy na prod**


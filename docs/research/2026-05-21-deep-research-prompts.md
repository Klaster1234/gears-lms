---
tags: [research, city-quests, gliwice, slaskie]
title: "Prompty do Gemini Deep Research — Mapa City Quest G.E.A.R.S."
date: 2026-05-21
project: G.E.A.R.S. — Erasmus+ KA210-ADU-000279352
deliverable: 10 PL circular maps (Activity: One day city quest)
---

# Prompty do Gemini Deep Research — Mapa City Quest G.E.A.R.S.

Trzy prompty do uruchomienia w Gemini Deep Research (lub innym narzędziu deep research). Po kolejności — każdy buduje na poprzednim.

**Kontekst projektu:** Erasmus+ KA210-ADU, partner: Spółdzielnia Socjalna Zielone Śląskie (Gliwice). Aktywność „One day city quest" — 10 jednodniowych questów w PL, do 10 osób każdy, w okresie 01/03/2026 – 31/10/2026. Mapy mają prowadzić uczestników (dorośli, edukatorzy, osoby zainteresowane zrównoważonym stylem życia) przez miejsca eco-friendly w mieście.

**Typy miejsc z wniosku:**
- repair stores (warsztaty naprawcze / repair cafes)
- second-hand shops
- vegan / wegetariańskie bistra
- no-packaging grocery stores (sklepy bez opakowań / na wagę)
- inne eco-friendly: kawiarnie eco, ekosklepy, punkty zbiórki/recyklingu, RTV/AGD repair, biblioteka rzeczy, foodsharing

---

## PROMPT 1 — Gliwice (głęboki research lokalny)

```
Jesteś analitykiem badającym lokalną gospodarkę zrównoważonego rozwoju w miastach Polski. Twoim zadaniem jest stworzenie KOMPLETNEJ, ZWERYFIKOWANEJ bazy miejsc eco-friendly w Gliwicach (woj. śląskie, Polska) na potrzeby projektu edukacyjnego Erasmus+ G.E.A.R.S.

KONTEKST PROJEKTU:
- Numer projektu: 2024-2-PL01-KA210-ADU-000279352
- Lider: Spółdzielnia Socjalna Zielone Śląskie (Gliwice)
- Aktywność: jednodniowe „city questy" — grupy do 10 dorosłych odwiedzających miejsca eco-friendly w Gliwicach
- Cel: nauka praktycznych umiejętności zrównoważonego życia (5R: Refuse, Reduce, Reuse, Recycle, Rot)

ZAKRES WYSZUKIWANIA (Gliwice + bezpośrednie sąsiedztwo: Zabrze, Knurów, Pyskowice — w promieniu 15 km):

KATEGORIE MIEJSC (znajdź MIN. 5 w każdej kategorii, jeśli istnieją):

1. **REPAIR (naprawa)** — warsztaty naprawcze AGD, RTV, rowerów, butów, odzieży, biżuterii, mebli, elektroniki, repair cafe (jeśli istnieje)
2. **SECOND-HAND** — sklepy z używaną odzieżą, vintage, lumpeksy z kuratorską selekcją, second-hand z meblami, sklepy charytatywne (np. PCK, Caritas), platformy lokalne
3. **VEGAN / WEGETARIAŃSKIE** — restauracje, bistra, kawiarnie, food trucki, piekarnie z opcjami plant-based, lodziarnie wegańskie
4. **NO-PACKAGING / NA WAGĘ** — sklepy bez opakowań (zero waste shops), sklepy sprzedające produkty luzem (kasze, ziarna, oleje, kosmetyki), drogerie z refillami
5. **ECO / ORGANIC / BIO** — sklepy z żywnością ekologiczną, sklepy z certyfikatami EU Organic / Demeter, gospodarstwa z dostawą RWS (rolnictwo wspierane społecznie), targi rolne
6. **RECYKLING I ZBIÓRKA** — PSZOK Gliwice (lokalizacje), punkty zbiórki elektroniki, baterii, leków, ubrań (Wear-Fair, EKO TEKSTYL), foodsharing pointy, share-shelves
7. **EDUKACJA EKOLOGICZNA** — biblioteki rzeczy (jeśli istnieją), ogrody społeczne, edukacyjne ścieżki przyrodnicze, eko-NGO, Stowarzyszenia (z adresami biur/lokali)
8. **MOBILNOŚĆ ZIELONA** — wypożyczalnie rowerów, serwisy rowerowe, punkty self-service do naprawy roweru, ładowarki EV publiczne, carsharingi

DLA KAŻDEGO MIEJSCA znajdź i zwróć:
- **Nazwa** (oficjalna, jak widnieje na szyldzie/stronie)
- **Adres** (ulica, numer, kod pocztowy, miasto)
- **Koordynaty GPS** (lat, lng — z dokładnością do 5 miejsc po przecinku; pobierz z Google Maps / OSM)
- **Kategoria** (z listy 1-8 powyżej; jedna główna)
- **Opis** (2-3 zdania po polsku: co oferują, dlaczego eco-friendly, co odróżnia od konkurencji)
- **Godziny otwarcia** (typowe — jeśli dostępne)
- **Strona internetowa** (URL)
- **Facebook / Instagram** (URL profilu)
- **Telefon** (jeśli publiczny)
- **E-mail kontaktowy** (jeśli publiczny)
- **Źródło informacji** (link do Google Maps, FB, oficjalnej strony, artykułu, OSM — najlepiej 2-3 źródła per miejsce dla weryfikacji)
- **Data ostatniego sprawdzenia** (czy nadal działa? Sprawdź ostatnie recenzje, zdjęcia, posty FB — odrzuć miejsca które wyglądają na zamknięte)
- **Dostępność dla osób z niepełnosprawnościami** (jeśli informacja dostępna)
- **Czy ma program lojalnościowy / własne pojemniki / zniżki za przyniesienie** (jeśli istotne)

OUTPUT FORMAT: tabela markdown + na końcu JSON z polami: id, name, category, address, lat, lng, description, hours, website, facebook, instagram, phone, email, sources[], lastVerified, accessibility, notes.

WYMAGANIA JAKOŚCIOWE:
- Tylko ZWERYFIKOWANE miejsca (działające w 2025/2026)
- Preferuj lokalnych, niezależnych przedsiębiorców (nie globalne sieci, chyba że robią coś naprawdę eco)
- Jeśli nie ma 5 miejsc w danej kategorii — zaznacz „BRAK" i wyjaśnij dlaczego (np. „nie istnieje typowe repair cafe w Gliwicach")
- Włącz miejsca w sąsiednich miastach (Zabrze, Knurów, Pyskowice) jeśli są w promieniu 15 km od centrum Gliwic — oznacz miasto w polu „city"
- Sprawdź lokalne źródła: Facebook „Gliwice Zero Waste", „Gliwice ekologicznie", grupy FB „Co warto w Gliwicach", „Zaolzie ekologiczne", lokalna prasa (24gliwice.pl, gliwice.eu, infogliwice.pl), portal mapadotacji.pl, mapa.lokalnyrolnik.pl
- Sprawdź OpenStreetMap tagi: shop=second_hand, shop=bulk, shop=organic, amenity=bicycle_repair_station, shop=bicycle, diet:vegan=yes, diet:vegetarian=yes
- Dla repair cafes sprawdź repaircafe.org/visit-a-repair-cafe (jeśli jest jakieś polskie)
- Sprawdź foodsharing.pl — lokalne pointy

WYKLUCZ:
- Duże sieci handlowe (Lidl, Biedronka, Carrefour) — chyba że mają coś unikalnego (np. Lidl miał kiedyś korner BIO)
- Miejsca z negatywnymi recenzjami za jakość/etykę
- Miejsca zamknięte / nieaktualne
- Restauracje, które oferują „1 danie wegańskie" w karcie — tylko te z istotnym udziałem oferty plant-based

DODATKOWO:
- Krótki rozdział „Insight regionalne": jaka jest siła i słabość Gliwic w zakresie eco? Czego brakuje? Co jest unikalne? (3-5 zdań)
- Lista linków do lokalnych grup/inicjatyw FB związanych z eco w Gliwicach (z numerem członków, opisem)
```

---

## PROMPT 2 — Śląskie (rozszerzenie regionalne)

```
Jesteś analitykiem mapującym zrównoważoną gospodarkę woj. śląskiego. Twoim zadaniem jest rozszerzenie bazy miejsc eco-friendly z Gliwic na CAŁE WOJEWÓDZTWO ŚLĄSKIE — z naciskiem na metropolię GZM (Górnośląsko-Zagłębiowska Metropolia) i miasta sąsiednie, na potrzeby projektu edukacyjnego Erasmus+ G.E.A.R.S.

KONTEKST: Projekt G.E.A.R.S. organizuje 10 jednodniowych „city questów" w Polsce w okresie 01/03/2026 – 31/10/2026. Bazujemy w Gliwicach, ale uczestnicy mogą podróżować po regionie. Mapy mają pokazać szersze możliwości na Śląsku.

MIASTA W ZAKRESIE (priorytetowo):
1. Katowice — stolica województwa, największa baza eco
2. Bytom — historyczne dziedzictwo, transformacja
3. Chorzów — Park Śląski, Planetarium, edukacja
4. Zabrze
5. Ruda Śląska
6. Tychy
7. Mysłowice
8. Sosnowiec
9. Dąbrowa Górnicza
10. Cieszyn (ważna lokalna scena eco)
11. Bielsko-Biała
12. Tarnowskie Góry
13. Mikołów
14. Pszczyna
15. Częstochowa (jeśli czas pozwoli — daleko, ale duże miasto)

KATEGORIE (te same co Prompt 1):
1. REPAIR
2. SECOND-HAND
3. VEGAN / WEGETARIAŃSKIE
4. NO-PACKAGING / NA WAGĘ
5. ECO / ORGANIC / BIO
6. RECYKLING I ZBIÓRKA
7. EDUKACJA EKOLOGICZNA
8. MOBILNOŚĆ ZIELONA

Plus rozszerzenie:
9. **TURYSTYKA ZRÓWNOWAŻONA** — szlaki rowerowe regionalne, agroturystyki ekologiczne, eco-pensjonaty z certyfikatami (np. EU Ecolabel), oferty ekoturystyki w jurze krakowsko-częstochowskiej i Beskidach
10. **GASTRONOMIA TRADYCYJNA + LOKALNA** — restauracje serwujące kuchnię śląską z lokalnych składników, niezależne piekarnie z naturalnym zakwasem, manufaktury (sery, miody, herbaty)

DLA KAŻDEGO MIEJSCA zwróć te same pola co w Prompt 1 + dodatkowo:
- **city** (nazwa miasta)
- **distance_from_gliwice_km** (dystans w km od centrum Gliwic, jezdny)
- **public_transport_from_gliwice** (jak dojechać KPMK/PKP — czy dostępne na quest jednodniowy bez auta)
- **suitable_for_one_day_quest** (true/false — czy realnie można odwiedzić w ramach 1-dniowego questu z Gliwic + powrót)

OUTPUT: tabela markdown POSEGREGOWANA PO MIASTACH (sekcja per miasto), plus JSON.

DODATKOWO znajdź:
- **3-5 sztandarowych miejsc na Śląsku** które warto pokazać uczestnikom (np. Park Śląski w Chorzowie, Sztolnia Królowa Luiza w Zabrzu, Browary Tyskie z eco-aspektami, Kopalnia Guido — jakie mają programy edukacyjne nt. transformacji)
- **5-10 lokalnych eco-NGO** w regionie (Polski Klub Ekologiczny Koło w Gliwicach, Greenpeace Katowice, lokalne grupy)
- **Eventy cykliczne** związane z eco/sustainability w regionie (np. EkoFestiwal, Targi Czysta Energia, Beskidzkie Targi Ekologiczne) — z datami w 2026
- **Mapy istniejące** — czy ktoś już zrobił mapę miejsc eco na Śląsku? (Google Map listy, Mapy Google z labelem „zero waste Śląsk", facebookowe mapy, miejsca.fm itp.)

WYMAGANIA JAKOŚCIOWE (jak w Prompt 1):
- Zweryfikowane (działa w 2025/2026)
- Lokalne, niezależne
- Z koordynatami GPS i kontaktem

KOŃCOWA SEKCJA: „Rekomendacje 10 questów" — zaproponuj 10 jednodniowych questów (cluster 4-6 miejsc + trasa), każdy z innym tematem:
- np. Quest 1 „Naprawiamy Gliwice" (repair tour: rowery → AGD → odzież → buty)
- np. Quest 2 „Drugie życie Katowic" (second-hand tour: vintage stores + foodsharing point + bookcrossing)
- np. Quest 3 „Wegański weekend w Bytomiu" (bistra + sklep no-package + piekarnia plant-based)
- itp.

Dla każdego questu: lokalizacje (4-6), trasa (km, czas), kategoria GreenComp którą rozwija (zgodnie z frameworkiem EU GreenComp), planowane „interaktywne ćwiczenia" (np. „policz opakowania w paragonie ze sklepu konwencjonalnego vs no-package").
```

---

## PROMPT 3 — Weryfikacja, koordynaty i ready-to-import JSON

```
Jesteś asystentem ds. jakości danych geoprzestrzennych. Otrzymujesz listę miejsc eco-friendly w Gliwicach i woj. śląskim (z poprzednich Deep Research) i Twoim zadaniem jest:

1. ZWERYFIKOWAĆ każde miejsce
2. UZUPEŁNIĆ brakujące pola
3. PRZEKONWERTOWAĆ do strukturalnego JSON gotowego do importu do bazy danych (PostgreSQL + PostGIS) projektu G.E.A.R.S.

WERYFIKACJA — dla każdego miejsca sprawdź:
- Czy strona internetowa odpowiada (HTTP 200)?
- Czy profil FB / IG istnieje i był aktywny w ostatnich 3 miesiącach?
- Czy w Google Maps są recenzje z 2025 lub 2026?
- Czy koordynaty GPS pasują do podanego adresu (sprawdź w OpenStreetMap Nominatim API: https://nominatim.openstreetmap.org/search?q=ADDRESS&format=json)
- Czy zdjęcia z Google Maps potwierdzają, że miejsce nadal działa i pasuje do kategorii?

UZUPEŁNIENIE — jeśli brakuje:
- Koordynaty → użyj geokodowania (Nominatim, lub manualnie z Google Maps)
- Godziny otwarcia → pobierz z Google Maps Place / Facebook
- Slug URL → zrób z nazwy: małe litery, polskie znaki na ASCII, spacje na myślniki (np. „Sklep Bez Opakowań Zielony" → „sklep-bez-opakowan-zielony")
- Kategoria główna → wybierz JEDNĄ z listy (repair, second-hand, vegan, no-package, eco, recycling, education, mobility, tourism, gastronomy)
- Tagi dodatkowe → array stringów (np. ["bio", "lokalne", "rowery", "kawa"])

OUTPUT FORMAT — pojedynczy plik JSON ze schematem:

{
  "metadata": {
    "generated_at": "2026-05-21",
    "project": "G.E.A.R.S.",
    "scope": "Gliwice + woj. śląskie",
    "total_places": <int>,
    "categories": {
      "repair": <int>,
      "second-hand": <int>,
      "vegan": <int>,
      "no-package": <int>,
      "eco": <int>,
      "recycling": <int>,
      "education": <int>,
      "mobility": <int>,
      "tourism": <int>,
      "gastronomy": <int>
    }
  },
  "places": [
    {
      "id": "uuid-v4",
      "slug": "string",
      "name": "string",
      "name_translations": {
        "en": "string (opcjonalnie)",
        "sk": "string (opcjonalnie)"
      },
      "category": "repair|second-hand|vegan|no-package|eco|recycling|education|mobility|tourism|gastronomy",
      "tags": ["string"],
      "address": {
        "street": "string",
        "number": "string",
        "postal_code": "string",
        "city": "string",
        "country_code": "PL"
      },
      "geo": {
        "lat": float,
        "lng": float,
        "geohash": "string (opcjonalnie)"
      },
      "description": {
        "pl": "string (2-3 zdania)",
        "en": "string (2-3 zdania, jeśli możesz przetłumaczyć)",
        "sk": "string (jeśli możesz)"
      },
      "hours": {
        "monday": "HH:MM-HH:MM lub closed",
        "tuesday": "...",
        ...
      },
      "contact": {
        "website": "url",
        "facebook": "url",
        "instagram": "url",
        "phone": "+48...",
        "email": "..."
      },
      "accessibility": {
        "wheelchair": true|false|null,
        "notes": "string"
      },
      "quest_suitable": true|false,
      "quest_themes": ["string"],
      "verified_at": "2026-05-21",
      "sources": ["url1", "url2", "url3"],
      "photo_urls": ["url"]
    }
  ]
}

DODATKOWO:
- Wygeneruj OSOBNY plik `quests.json` z 10 propozycjami questów (z Prompt 2), każdy ze schematem:
{
  "id": "uuid-v4",
  "slug": "string",
  "title": {"pl": "...", "en": "...", "sk": "..."},
  "description": {"pl": "...", "en": "...", "sk": "..."},
  "duration_minutes": <int>,
  "distance_km": <float>,
  "transport_mode": "walking|bike|public",
  "difficulty": "easy|medium|hard",
  "max_participants": 10,
  "greencomp_competence": "string (z GreenComp framework)",
  "place_ids": ["uuid-v4"],
  "route_polyline": "string (opcjonalnie, encoded polyline)",
  "interactive_tasks": [
    {
      "place_id": "uuid-v4",
      "task": "string (instrukcja co zrobić w tym miejscu)",
      "estimated_minutes": <int>
    }
  ],
  "themes": ["string"],
  "season_recommended": ["spring", "summer", "autumn"],
  "indoor_outdoor": "indoor|outdoor|mixed"
}

WALIDACJA KOŃCOWA — przeprowadź self-check:
- Czy każde place ma poprawny lat/lng (w bounding box Polski: lat 49-55, lng 14-25)?
- Czy każdy quest ma min. 3 place_ids?
- Czy slug jest unikalny w całym pliku?
- Czy wszystkie URL-e są HTTPS (lub poprawnie HTTP)?
- Czy nie ma null/undefined w wymaganych polach?

ZWRÓĆ:
1. Pełny JSON `places.json`
2. Pełny JSON `quests.json`  
3. Krótki raport z weryfikacji: ile miejsc zweryfikowanych, ile odrzuconych i dlaczego, ile uzupełnionych
```

---

## Wskazówki użytkowania

1. **Uruchom Prompt 1 najpierw** — daje fundament (Gliwice) + uczy AI kontekstu projektu
2. **Prompt 2 puść na podstawie wyniku Prompt 1** — może wzbogacić wynik o dodatkowe lokalizacje regionalne
3. **Prompt 3 puść na końcu z OBYDWOMA poprzednimi wynikami w kontekście** — wygeneruje gotowy JSON do importu

**Manualna weryfikacja:** Po Deep Research zalecam:
- Otworzyć każde miejsce w Google Maps i potwierdzić działanie
- Zadzwonić / napisać do 5-10 kluczowych miejsc i zapytać o gotowość uczestniczenia w queście G.E.A.R.S.
- Sprawdzić czy są na OSM — jeśli nie, dodać (dobry uczynek dla społeczności)

**Następne kroki w projekcie strony:**
1. Import `places.json` do tabeli `quest_places` w Supabase
2. Import `quests.json` do tabeli `quests`
3. Renderowanie mapy Leaflet + filtry kategorii + lista questów
4. Formularz zapisu na quest → tabela `quest_registrations`

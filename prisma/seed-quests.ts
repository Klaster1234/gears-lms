/**
 * Seed file for City Quest demo data.
 * Run: npx tsx prisma/seed-quests.ts
 *
 * Idempotent — uses upsert by slug. Safe to re-run.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PLACES = [
  {
    slug: 'repair-cafe-gliwice-demo',
    name: 'Repair Cafe Gliwice (demo)',
    category: 'REPAIR' as const,
    street: 'Zwycięstwa',
    houseNumber: '1',
    city: 'Gliwice',
    lat: 50.2939,
    lng: 18.6647,
    descriptionPl:
      'Społeczny warsztat naprawczy — przynieś zepsuty toster, rower albo lampkę i napraw go z mentorem. Spotkania w soboty.',
    descriptionEn:
      'Community repair workshop — bring your broken toaster, bike or lamp and fix it with a mentor. Meetings on Saturdays.',
    descriptionSk:
      'Komunitná opravárenská dielňa — prineste pokazený toaster, bicykel alebo lampu a opravte ju s mentorom. Stretnutia v soboty.',
    tags: ['warsztat', 'wolontariat'],
  },
  {
    slug: 'no-package-shop-demo',
    name: 'Sklep Bez Opakowań (demo)',
    category: 'NO_PACKAGE' as const,
    street: 'Wieczorka',
    houseNumber: '4',
    city: 'Gliwice',
    lat: 50.2967,
    lng: 18.667,
    descriptionPl:
      'Kasze, ziarna, oliwy, kosmetyki — wszystko na wagę do własnych pojemników. Lokalni producenci, certyfikaty BIO.',
    descriptionEn:
      'Grains, oils, cosmetics — everything by weight into your own containers. Local producers, organic certified.',
    descriptionSk:
      'Krúpy, oleje, kozmetika — všetko na váhu do vlastných nádob. Lokálni producenti, BIO certifikované.',
    tags: ['zero-waste', 'lokalne'],
  },
  {
    slug: 'vegan-bistro-demo',
    name: 'Vegan Bistro (demo)',
    category: 'VEGAN' as const,
    street: 'Rynek',
    houseNumber: '10',
    city: 'Gliwice',
    lat: 50.2926,
    lng: 18.6655,
    descriptionPl:
      'Roślinne dania kuchni śląskiej i światowej. Sezonowe menu z lokalnych warzyw, opcje bezglutenowe.',
    descriptionEn:
      'Plant-based Silesian and global cuisine. Seasonal menu from local vegetables, gluten-free options.',
    descriptionSk:
      'Rastlinné jedlá sliezskej a svetovej kuchyne. Sezónne menu z lokálnej zeleniny, bezlepkové možnosti.',
    tags: ['lokalne', 'sezonowe'],
  },
  {
    slug: 'second-hand-vintage-demo',
    name: 'Vintage Store (demo)',
    category: 'SECOND_HAND' as const,
    street: 'Dworcowa',
    houseNumber: '15',
    city: 'Gliwice',
    lat: 50.2978,
    lng: 18.6764,
    descriptionPl:
      'Kuratorska selekcja vintage ubrań z lat 70., 80., 90. — głównie marki europejskie, bawełna i len.',
    descriptionEn:
      'Curated selection of 70s, 80s, 90s vintage clothing — mostly European brands, cotton and linen.',
    descriptionSk:
      'Kurátorský výber vintage oblečenia 70., 80., 90. rokov — najmä európske značky, bavlna a ľan.',
    tags: ['vintage', 'moda'],
  },
  {
    slug: 'bike-share-demo',
    name: 'Wypożyczalnia rowerów (demo)',
    category: 'MOBILITY' as const,
    street: 'Park Chopina',
    houseNumber: '1',
    city: 'Gliwice',
    lat: 50.2871,
    lng: 18.6716,
    descriptionPl:
      'Wypożyczalnia rowerów miejskich i serwis. Mapy tras po zielonych Gliwicach, opcja roweru cargo.',
    descriptionEn:
      'City bike rental and service. Maps of green routes around Gliwice, cargo bike option available.',
    descriptionSk:
      'Požičovňa mestských bicyklov a servis. Mapy ciest po zelených Gliwiciach, možnosť cargo bicykla.',
    tags: ['rowery', 'mobilność'],
  },
  {
    slug: 'foodsharing-point-demo',
    name: 'Foodsharing Point (demo)',
    category: 'RECYCLING' as const,
    street: 'Kościuszki',
    houseNumber: '38',
    city: 'Gliwice',
    lat: 50.2904,
    lng: 18.6635,
    descriptionPl:
      'Lodówka społeczna — przynieś nadwyżkę jedzenia, weź to czego potrzebujesz. Walka z marnowaniem.',
    descriptionEn:
      'Community fridge — bring your food surplus, take what you need. Fighting food waste.',
    descriptionSk:
      'Komunitná chladnička — prineste prebytky jedla, vezmite čo potrebujete. Boj proti plytvaniu.',
    tags: ['foodsharing', 'community'],
  },
];

const QUESTS = [
  {
    slug: 'naprawiamy-gliwice',
    titlePl: 'Naprawiamy Gliwice',
    titleEn: 'Repair Gliwice',
    titleSk: 'Opravujeme Gliwice',
    descriptionPl:
      'Pieszy quest po warsztatach naprawczych i miejscach drugiego życia rzeczy w centrum Gliwic. Naucz się jak nie wyrzucać.',
    descriptionEn:
      'A walking quest through repair workshops and second-life places in central Gliwice. Learn how not to throw things away.',
    descriptionSk:
      'Peší quest po opravárenských dielňach a miestach druhého života vecí v centre Gliwíc. Naučte sa neodhadzovať.',
    durationMinutes: 240,
    distanceKm: 4.5,
    transportMode: 'WALKING' as const,
    difficulty: 'EASY' as const,
    maxParticipants: 10,
    greencompCompetence: 'Acting for sustainability',
    themes: ['repair', 'circular'],
    seasonRecommended: ['spring', 'summer', 'autumn'],
    indoorOutdoor: 'MIXED' as const,
    meetingPointSlug: 'repair-cafe-gliwice-demo',
    stops: [
      {
        placeSlug: 'repair-cafe-gliwice-demo',
        position: 1,
        estimatedMinutes: 60,
        taskPl: 'Naprawcie wspólnie jedną rzecz z domu (przyniesioną).',
        taskEn: 'Repair together one item brought from home.',
        taskSk: 'Spoločne opravte jednu vec prinesenú z domu.',
      },
      {
        placeSlug: 'second-hand-vintage-demo',
        position: 2,
        estimatedMinutes: 45,
        taskPl: 'Znajdź jedną rzecz, którą można zrobić "drugie życie".',
        taskEn: 'Find one item that can have a "second life".',
        taskSk: 'Nájdite jednu vec, ktorá môže mať „druhý život".',
      },
      {
        placeSlug: 'foodsharing-point-demo',
        position: 3,
        estimatedMinutes: 30,
        taskPl: 'Sprawdź jakie produkty są dostępne i porozmawiaj z wolontariuszami.',
        taskEn: 'Check what products are available and talk with volunteers.',
        taskSk: 'Pozrite, aké produkty sú dostupné, porozprávajte sa s dobrovoľníkmi.',
      },
    ],
  },
  {
    slug: 'gliwice-bez-opakowan',
    titlePl: 'Gliwice bez opakowań',
    titleEn: 'Zero-package Gliwice',
    titleSk: 'Gliwice bez obalov',
    descriptionPl:
      'Spróbuj zrobić zakupy bez wytworzenia ani jednego plastikowego opakowania. Wycieczka po zero-waste miejscach miasta.',
    descriptionEn:
      'Try doing your shopping without producing a single plastic package. A trip through the zero-waste places of the city.',
    descriptionSk:
      'Skúste nakupovať bez vytvorenia jediného plastového obalu. Výlet po zero-waste miestach mesta.',
    durationMinutes: 180,
    distanceKm: 3.2,
    transportMode: 'WALKING' as const,
    difficulty: 'EASY' as const,
    maxParticipants: 10,
    greencompCompetence: 'Embodying sustainability values',
    themes: ['zero-waste', 'food'],
    seasonRecommended: ['spring', 'summer', 'autumn', 'winter'],
    indoorOutdoor: 'MIXED' as const,
    meetingPointSlug: 'no-package-shop-demo',
    stops: [
      {
        placeSlug: 'no-package-shop-demo',
        position: 1,
        estimatedMinutes: 50,
        taskPl: 'Zrób zakupy do własnych pojemników (przyniesionych).',
        taskEn: 'Shop with your own brought containers.',
        taskSk: 'Nakupujte do vlastných prinesených nádob.',
      },
      {
        placeSlug: 'vegan-bistro-demo',
        position: 2,
        estimatedMinutes: 70,
        taskPl: 'Lunch zero-waste — bez opakowań, sezonowo, lokalnie.',
        taskEn: 'Zero-waste lunch — no packaging, seasonal, local.',
        taskSk: 'Zero-waste obed — bez obalov, sezónne, lokálne.',
      },
      {
        placeSlug: 'foodsharing-point-demo',
        position: 3,
        estimatedMinutes: 30,
        taskPl: 'Zobacz mechanikę foodsharingu w mieście, ewentualnie zostaw nadwyżkę.',
        taskEn: 'See how foodsharing works in the city, leave a surplus if you have any.',
        taskSk: 'Pozrite, ako funguje foodsharing v meste, prípadne nechajte prebytky.',
      },
    ],
  },
];

async function main() {
  console.log('🌱 Seeding quest data...');

  const placeIdMap = new Map<string, string>();
  for (const place of PLACES) {
    const upserted = await prisma.questPlace.upsert({
      where: { slug: place.slug },
      update: {
        name: place.name,
        category: place.category,
        street: place.street,
        houseNumber: place.houseNumber,
        city: place.city,
        lat: place.lat,
        lng: place.lng,
        descriptionPl: place.descriptionPl,
        descriptionEn: place.descriptionEn,
        descriptionSk: place.descriptionSk,
        tags: place.tags,
        isActive: true,
      },
      create: {
        slug: place.slug,
        name: place.name,
        category: place.category,
        street: place.street,
        houseNumber: place.houseNumber,
        city: place.city,
        lat: place.lat,
        lng: place.lng,
        descriptionPl: place.descriptionPl,
        descriptionEn: place.descriptionEn,
        descriptionSk: place.descriptionSk,
        tags: place.tags,
      },
    });
    placeIdMap.set(place.slug, upserted.id);
  }

  for (const quest of QUESTS) {
    const meetingPointId = placeIdMap.get(quest.meetingPointSlug);
    const upserted = await prisma.quest.upsert({
      where: { slug: quest.slug },
      update: {
        titlePl: quest.titlePl,
        titleEn: quest.titleEn,
        titleSk: quest.titleSk,
        descriptionPl: quest.descriptionPl,
        descriptionEn: quest.descriptionEn,
        descriptionSk: quest.descriptionSk,
        durationMinutes: quest.durationMinutes,
        distanceKm: quest.distanceKm,
        transportMode: quest.transportMode,
        difficulty: quest.difficulty,
        maxParticipants: quest.maxParticipants,
        greencompCompetence: quest.greencompCompetence,
        themes: quest.themes,
        seasonRecommended: quest.seasonRecommended,
        indoorOutdoor: quest.indoorOutdoor,
        meetingPointId,
        isPublished: true,
      },
      create: {
        slug: quest.slug,
        titlePl: quest.titlePl,
        titleEn: quest.titleEn,
        titleSk: quest.titleSk,
        descriptionPl: quest.descriptionPl,
        descriptionEn: quest.descriptionEn,
        descriptionSk: quest.descriptionSk,
        durationMinutes: quest.durationMinutes,
        distanceKm: quest.distanceKm,
        transportMode: quest.transportMode,
        difficulty: quest.difficulty,
        maxParticipants: quest.maxParticipants,
        greencompCompetence: quest.greencompCompetence,
        themes: quest.themes,
        seasonRecommended: quest.seasonRecommended,
        indoorOutdoor: quest.indoorOutdoor,
        meetingPointId,
        isPublished: true,
      },
    });

    // Replace stops
    await prisma.questStop.deleteMany({ where: { questId: upserted.id } });
    for (const stop of quest.stops) {
      const placeId = placeIdMap.get(stop.placeSlug);
      if (!placeId) continue;
      await prisma.questStop.create({
        data: {
          questId: upserted.id,
          placeId,
          position: stop.position,
          estimatedMinutes: stop.estimatedMinutes,
          taskPl: stop.taskPl,
          taskEn: stop.taskEn,
          taskSk: stop.taskSk,
        },
      });
    }
  }

  console.log(`✅ Seeded ${PLACES.length} places and ${QUESTS.length} quests.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

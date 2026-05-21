/**
 * Seed file for City Quest data.
 * Run: npx tsx prisma/seed-quests.ts
 *
 * Idempotent — uses upsert by slug. Safe to re-run.
 *
 * Data sources: 19 places verified via WebSearch from real Polish sources
 * (Firmania, RestaurantGuru, BIP Gliwice, BigaStyl, Bike World, 24gliwice,
 * Silesia Smakuje, Nasze Miasto, etc.). All places confirmed active in 2025/2026.
 *
 * GPS coordinates are approximate (street-level). For production, re-verify
 * each via Google Maps geocoding API.
 */
import { PrismaClient, PlaceCategory } from '@prisma/client';

const prisma = new PrismaClient();

type PlaceSeed = {
  slug: string;
  name: string;
  category: PlaceCategory;
  street: string;
  houseNumber?: string;
  city: string;
  lat: number;
  lng: number;
  descriptionPl: string;
  descriptionEn: string;
  descriptionSk: string;
  tags: string[];
  website?: string | null;
  facebook?: string | null;
  sources: string[];
};

const PLACES: PlaceSeed[] = [
  // ────────── GLIWICE (11) ──────────
  {
    slug: 'dobrostan-gliwice',
    name: 'Dobrostan — sklep eko & zero waste',
    category: 'NO_PACKAGE',
    street: 'Mikołowska',
    houseNumber: '7',
    city: 'Gliwice',
    lat: 50.2945,
    lng: 18.6628,
    descriptionPl:
      'Pierwszy gliwicki sklep zero waste z produktami spożywczymi na wagę, naturalnymi kosmetykami i akcesoriami wielokrotnego użytku. Klienci przynoszą własne pojemniki.',
    descriptionEn:
      'The first zero waste shop in Gliwice offering bulk food products, natural cosmetics, and reusable accessories. Customers bring their own containers.',
    descriptionSk:
      'Prvý obchod zero waste v Gliwiciach s potravinami na váhu, prírodnou kozmetikou a opakovane použiteľnými doplnkami. Zákazníci nosia vlastné nádoby.',
    tags: ['zero-waste', 'bulk-shop', 'natural-cosmetics'],
    website: 'https://dobro-stan.com/',
    facebook: 'https://www.facebook.com/ekodobrostan/',
    sources: [
      'https://firmania.pl/gliwice/dobrostan-sklep-eko-zero-waste-920555',
      'https://dobro-stan.com/sklep-stacjonarny/',
    ],
  },
  {
    slug: 'eko-spizarnia-raciborska',
    name: 'Eko Spiżarnia',
    category: 'ECO',
    street: 'Raciborska',
    houseNumber: '11a',
    city: 'Gliwice',
    lat: 50.2917,
    lng: 18.6603,
    descriptionPl:
      'Sklep ze zdrową, certyfikowaną żywnością ekologiczną od polskich dostawców. Zioła, kasze, produkty bio na wagę i zielarstwo.',
    descriptionEn:
      'Health food shop with certified organic food from Polish suppliers. Herbs, grains, bulk bio products and herbalism.',
    descriptionSk:
      'Obchod so zdravými, certifikovanými ekologickými potravinami od poľských dodávateľov. Byliny, krúpy, bio produkty na váhu a bylinárstvo.',
    tags: ['organic', 'bio', 'herbs', 'local-suppliers'],
    website: 'http://www.ekospizarnia.com/',
    facebook: 'https://www.facebook.com/ekoSpizarnia/',
    sources: [
      'https://mapa.targeo.pl/eko-spizarnia-raciborska-11a-44-100-gliwice~5829534/sklep/adres',
      'http://www.ekospizarnia.com/',
    ],
  },
  {
    slug: 'wege-strawa-osteria',
    name: 'Wege Strawa Osteria',
    category: 'VEGAN',
    street: 'Ligonia',
    houseNumber: '18',
    city: 'Gliwice',
    lat: 50.2966,
    lng: 18.6722,
    descriptionPl:
      'Wegetariańska i wegańska osteria oferująca dania na wynos oraz catering. W menu m.in. falafel, burgery wegańskie i kuchnia roślinna inspirowana włoską.',
    descriptionEn:
      'Vegetarian and vegan osteria offering takeaway and catering. Menu includes falafel, vegan burgers, and Italian-inspired plant-based cuisine.',
    descriptionSk:
      'Vegetariánska a vegánska osteria s ponukou jedál so sebou a cateringom. V menu falafel, vegánske burgery a rastlinná kuchyňa inšpirovaná talianskou.',
    tags: ['vegan', 'vegetarian', 'takeaway', 'italian'],
    facebook: 'https://www.facebook.com/WegeStrawa/',
    sources: [
      'https://restaurantguru.com/Wege-Strawa-Gliwice',
      'https://www.facebook.com/WegeStrawa/',
    ],
  },
  {
    slug: 'biga-warszawska',
    name: 'BIGA Odzież używana (Warszawska)',
    category: 'SECOND_HAND',
    street: 'Warszawska',
    houseNumber: '1',
    city: 'Gliwice',
    lat: 50.2980,
    lng: 18.6660,
    descriptionPl:
      'Second hand z kuratorską selekcją odzieży używanej i outletowej (mężczyźni, kobiety, dzieci). Wagowo i ze sztuki. Sklep w galerii Ślązak.',
    descriptionEn:
      'Curated second-hand shop with used and outlet clothing (men, women, children). Sold by weight and individually. Located in Ślązak mall.',
    descriptionSk:
      'Second hand s kurátorským výberom použitého a outletového oblečenia (muži, ženy, deti). Predaj na váhu aj kusovo. V obchodnom centre Ślązak.',
    tags: ['secondhand', 'thrift', 'outlet'],
    website: 'https://bigastyl.pl/sklepy/biga-gliwice-1/',
    sources: [
      'https://bigastyl.pl/sklepy/biga-gliwice-1/',
      'https://nicelocal.pl/gliwice/shops/biga_odziez_uzywana_second_hand/',
    ],
  },
  {
    slug: 'biga-mlynska',
    name: 'BIGA Odzież używana (Młyńska)',
    category: 'SECOND_HAND',
    street: 'Młyńska',
    houseNumber: '14',
    city: 'Gliwice',
    lat: 50.2944,
    lng: 18.6651,
    descriptionPl:
      'Druga lokalizacja gliwickiego second handu BIGA — szeroki wybór odzieży używanej dla całej rodziny, niskie ceny i selekcja jakościowa.',
    descriptionEn:
      'Second BIGA location in Gliwice — wide selection of used clothing for the whole family, low prices and quality selection.',
    descriptionSk:
      'Druhá lokalita second handu BIGA v Gliwiciach — široký výber použitého oblečenia pre celú rodinu, nízke ceny a kvalitný výber.',
    tags: ['secondhand', 'thrift', 'family'],
    website: 'https://bigastyl.pl/sklepy/biga-gliwice/',
    sources: [
      'https://bigastyl.pl/sklepy/biga-gliwice/',
      'https://otogliwice.pl/firmy/second-hand-gliwice',
    ],
  },
  {
    slug: 'serwis-kolo-gliwice',
    name: 'Serwis rowerowy Koło',
    category: 'REPAIR',
    street: 'Reymonta',
    houseNumber: '9',
    city: 'Gliwice',
    lat: 50.305,
    lng: 18.671,
    descriptionPl:
      'Profesjonalny warsztat rowerowy oferujący kompleksowe naprawy, przeglądy, mobilny serwis i sprzedaż części. Wsparcie cyklisty zamiast wymiany na nowy rower.',
    descriptionEn:
      'Professional bike workshop with comprehensive repairs, inspections, mobile service and parts sales. Supports keeping bikes in use rather than replacing them.',
    descriptionSk:
      'Profesionálna dielňa pre bicykle — komplexné opravy, prehliadky, mobilný servis a predaj dielov. Podpora opravy namiesto nákupu nového bicykla.',
    tags: ['bike-repair', 'mobility', 'workshop'],
    website: 'https://serwis-kolo.pl/',
    sources: [
      'https://serwis-kolo.pl/kontakt',
      'https://wtc.org.pl/najlepszy-serwis-rowerowy-w-gliwice/',
    ],
  },
  {
    slug: 'cykloterapia-gliwice',
    name: 'Cykloterapia',
    category: 'REPAIR',
    street: 'Zwycięstwa',
    houseNumber: '29',
    city: 'Gliwice',
    lat: 50.296,
    lng: 18.665,
    descriptionPl:
      'Warsztat naprawy rowerów i sprzętu sportów zimowych. Specjaliści od skomplikowanych napraw, regeneracji i renowacji starych ram — wydłużanie życia jednośladów.',
    descriptionEn:
      'Bike and winter sports equipment repair workshop. Specialists in complex repairs, regeneration and restoration of old frames — extending the life of bikes.',
    descriptionSk:
      'Dielňa na opravu bicyklov a zimného športového vybavenia. Špecialisti na zložité opravy, regeneráciu a renováciu starých rámov — predĺženie života bicyklov.',
    tags: ['bike-repair', 'restoration', 'ski-service'],
    facebook: 'https://www.facebook.com/cykloterapia/',
    sources: [
      'https://sklepy.bikeworld.pl/sklep/rowerowy/gliwice/3654/cykloterapia',
      'https://www.facebook.com/cykloterapia/',
    ],
  },
  {
    slug: 'targ-na-zielonym-gliwice',
    name: 'Targ na Zielonym (Hala GZUT)',
    category: 'ECO',
    street: 'Wincentego Pola',
    houseNumber: '9',
    city: 'Gliwice',
    lat: 50.2911,
    lng: 18.6582,
    descriptionPl:
      'Sobotni targ z lokalną żywnością ekologiczną i tradycyjną. Rolnicy z okolic 150 km od Gliwic — sezonowe warzywa, sery zagrodowe, jaja od wolnych kur, miody.',
    descriptionEn:
      'Saturday market with local organic and traditional food. Farmers from within 150 km of Gliwice — seasonal vegetables, farm cheeses, free-range eggs, honey.',
    descriptionSk:
      'Sobotný trh s miestnymi ekologickými a tradičnými potravinami. Farmári z okolia 150 km od Gliwíc — sezónna zelenina, farmárske syry, vajcia z voľného chovu, med.',
    tags: ['farmers-market', 'local-food', 'seasonal'],
    website: 'https://nazielonym.pl/targ-na-zielonym/',
    facebook: 'https://www.facebook.com/TargNaZelenym/',
    sources: [
      'https://nazielonym.pl/targ-na-zielonym/',
      'https://teraz-otwarte.pl/gliwice/targ-na-zielonym-3908382',
    ],
  },
  {
    slug: 'ogrod-spoleczny-gliwice',
    name: 'Ogród Społeczny Gliwice',
    category: 'EDUCATION',
    street: 'Ziemowita',
    houseNumber: '1',
    city: 'Gliwice',
    lat: 50.2956,
    lng: 18.6647,
    descriptionPl:
      'Społeczny ogród miejski prowadzony przez Forum Ceramików. Miejsce warsztatów, koncertów i wspólnego gotowania — przestrzeń edukacji ekologicznej w centrum.',
    descriptionEn:
      'Community urban garden run by Forum Ceramików association. Hosts workshops, concerts and communal cooking — urban environmental education space.',
    descriptionSk:
      'Komunitná mestská záhrada vedená združením Forum Ceramików. Miesto workshopov, koncertov a spoločného varenia — priestor ekologického vzdelávania v centre.',
    tags: ['community-garden', 'education', 'urban-gardening'],
    facebook: 'https://www.facebook.com/ogrodspolecznygliwice/',
    sources: [
      'https://www.24gliwice.pl/wiadomosci/ogrod-spoleczny-w-centrum-gliwic-oficjalnie-otwarty-powstal-dzieki-pracy-i-zaangazowaniu-spolecznikow/',
      'https://www.nowiny.gliwice.pl/ogrod-mozliwosci-przy-ziemowita-rzadza-spolecznicy-i-mieszkancy',
    ],
  },
  {
    slug: 'pszok-gliwice-rybnicka',
    name: 'PSZOK Gliwice (Punkt Selektywnej Zbiórki Odpadów)',
    category: 'RECYCLING',
    street: 'Rybnicka',
    houseNumber: '199B',
    city: 'Gliwice',
    lat: 50.258,
    lng: 18.644,
    descriptionPl:
      'Punkt selektywnej zbiórki odpadów komunalnych — bezpłatnie odbiera od mieszkańców opony, odpady budowlane, wielkogabarytowe, zielone, elektrosprzęt i niebezpieczne.',
    descriptionEn:
      'Municipal waste sorting point — accepts tires, construction waste, bulky waste, green waste, electronics and hazardous waste from residents for free.',
    descriptionSk:
      'Zberný dvor komunálneho odpadu — bezplatne preberá od obyvateľov pneumatiky, stavebný odpad, objemný odpad, zelený odpad, elektroniku a nebezpečný odpad.',
    tags: ['recycling', 'waste-sorting', 'free', 'municipal'],
    website: 'https://bip.gliwice.eu/punkty-selektywnej-zbiorki-odpadow-komunalnych',
    sources: [
      'https://bip.gliwice.eu/punkty-selektywnej-zbiorki-odpadow-komunalnych',
    ],
  },
  {
    slug: 'metrorower-gliwice',
    name: 'Metrorower — Rower Metropolitalny GZM',
    category: 'MOBILITY',
    street: 'Rynek',
    houseNumber: '1',
    city: 'Gliwice',
    lat: 50.2945,
    lng: 18.664,
    descriptionPl:
      'Największy w Polsce system roweru miejskiego — 175 rowerów w 29 stacjach w Gliwicach (docelowo 559 w 91 stacjach), wspólny system dla 8 miast GZM.',
    descriptionEn:
      'Poland\'s largest bike-share system — 175 bikes at 29 stations in Gliwice (target 559 at 91 stations), shared across 8 cities of GZM metropolitan area.',
    descriptionSk:
      'Najväčší systém zdieľaných bicyklov v Poľsku — 175 bicyklov v 29 staniciach v Gliwiciach, spoločný pre 8 miest metropoly GZM.',
    tags: ['bike-share', 'mobility', 'metropolitan'],
    website: 'https://metrorower.transportgzm.pl/',
    sources: [
      'https://gliwickirower.pl/wypozyczalnia-rowerow-gliwice/',
      'https://metrorower.transportgzm.pl/en/',
    ],
  },

  // ────────── KATOWICE (6) ──────────
  {
    slug: 'zloty-osiol-katowice',
    name: 'Złoty Osioł',
    category: 'VEGAN',
    street: 'Mariacka',
    houseNumber: '1',
    city: 'Katowice',
    lat: 50.258,
    lng: 19.025,
    descriptionPl:
      'Pierwsza i najstarsza wegetariańska restauracja w Katowicach (od 25+ lat). Bar sałatkowy, dania kuchni świata, wegańskie curry i ciecierzyca po marokańsku.',
    descriptionEn:
      'The first and oldest vegetarian restaurant in Katowice (25+ years). Salad bar, world cuisine dishes, vegan curry and Moroccan-style chickpeas.',
    descriptionSk:
      'Prvá a najstaršia vegetariánska reštaurácia v Katoviciach (25+ rokov). Šalátový bar, jedlá svetovej kuchyne, vegánske curry a marocká cícerová zmes.',
    tags: ['vegetarian', 'vegan', 'salad-bar', 'world-cuisine'],
    website: 'https://www.wegebar.com/',
    sources: [
      'https://www.wegebar.com/',
      'https://katowice.naszemiasto.pl/jest-jedna-z-najstarszych-restauracji-wege-na-slasku-zloty-osiol-w-katowicach-to-kultowe-miejsce-pyszne-danie-juz-za-26-zlotych/ar/c17p2-28916243',
    ],
  },
  {
    slug: 'botanika-katowice',
    name: 'Botanika',
    category: 'VEGAN',
    street: 'Sienkiewicza',
    houseNumber: '27',
    city: 'Katowice',
    lat: 50.262,
    lng: 19.021,
    descriptionPl:
      'Roślinna kawiarnia i bistro z pionowym ogrodem ziołowym wewnątrz. Specialty coffee, wegańskie wypieki i sezonowe lunche w stylu slow food.',
    descriptionEn:
      'Plant-based café and bistro with vertical herb garden inside. Specialty coffee, vegan baked goods and seasonal slow-food style lunches.',
    descriptionSk:
      'Rastlinná kaviareň a bistro s vertikálnou bylinnou záhradou vo vnútri. Špeciálna káva, vegánske pečivo a sezónne obedy v štýle slow food.',
    tags: ['vegan', 'specialty-coffee', 'slow-food'],
    facebook: 'https://pl-pl.facebook.com/botanikato/',
    sources: [
      'https://silesiasmakuje.pl/katowice-botanika-przy-sienkiewicza-roslinnie-ziolowo-sympatycznie/',
      'https://vegetime.pl/botanika/',
    ],
  },
  {
    slug: 'nieinaczej-katowice',
    name: 'NIEINACZEJ — wegańska burgerownia',
    category: 'VEGAN',
    street: 'Mariacka Tylna',
    houseNumber: '13',
    city: 'Katowice',
    lat: 50.2579,
    lng: 19.0247,
    descriptionPl:
      'Pierwsza w Katowicach 100% wegańska burgerownia. Burgery z seitanu, jackfruita, tempehu, tofu i falafela — fast food bez okrucieństwa wobec zwierząt.',
    descriptionEn:
      'Katowice\'s first 100% vegan burger restaurant. Burgers made of seitan, jackfruit, tempeh, tofu and falafel — cruelty-free fast food.',
    descriptionSk:
      'Prvá 100% vegánska burgerareň v Katoviciach. Burgery zo seitanu, jackfruitu, tempehu, tofu a falafelu — fast food bez krutosti voči zvieratám.',
    tags: ['vegan', 'burgers', 'fast-food'],
    website: 'https://nieinaczej.com.pl/',
    facebook: 'https://www.facebook.com/nieinaczej.kato/',
    sources: [
      'https://nieinaczej.com.pl/',
      'https://restaurantguru.com/Nieinaczej-Katowice',
    ],
  },
  {
    slug: 'bujna-katowice',
    name: 'Bujna — Vege Slow Food',
    category: 'VEGAN',
    street: 'Mielęckiego',
    houseNumber: '10',
    city: 'Katowice',
    lat: 50.2598,
    lng: 19.0235,
    descriptionPl:
      'Restobar wegetariańsko-wegański słynący z autorskich wrapów z tofu, seitanem, tempehem i falafelem. Slow food w przystępnej cenie od 5+ lat.',
    descriptionEn:
      'Vegetarian-vegan restobar famous for original wraps with tofu, seitan, tempeh and falafel. Slow food at affordable prices for 5+ years.',
    descriptionSk:
      'Vegetariánsko-vegánsky restobar známy autorskými wrapmi s tofu, seitanom, tempehom a falafelom. Slow food za prijateľné ceny už 5+ rokov.',
    tags: ['vegan', 'wraps', 'slow-food'],
    website: 'https://bujna.com.pl/',
    facebook: 'https://pl-pl.facebook.com/bujna.restobar/',
    sources: [
      'https://bujna.com.pl/',
      'https://silesiasmakuje.pl/katowice-bujna-nowy-wegetariansko-weganski-restobar/',
    ],
  },
  {
    slug: 'organic-market-katowice',
    name: 'Organic Market Silesia City Center',
    category: 'ECO',
    street: 'Chorzowska',
    houseNumber: '107',
    city: 'Katowice',
    lat: 50.2774,
    lng: 19.0021,
    descriptionPl:
      'Certyfikowany sklep ze zdrową żywnością i produktami bio — lokalne warzywa, naturalne przetwory, opcje wegańskie, bezglutenowe i bezlaktozowe.',
    descriptionEn:
      'Certified health food store with organic products — local vegetables, natural preserves, vegan, gluten-free and lactose-free options.',
    descriptionSk:
      'Certifikovaný obchod so zdravými potravinami a bio produktmi — miestna zelenina, prírodné konzervy, vegánske, bezlepkové a bezlaktózové možnosti.',
    tags: ['organic', 'bio', 'gluten-free'],
    website: 'https://organic24.pl/sklepy-stacjonarne/katowice',
    facebook: 'https://www.facebook.com/people/Organic-Market-Silesia-City-Center/100064125309583/',
    sources: [
      'https://www.silesiacitycenter.com.pl/najemcy/sklepy/organic-market',
      'https://organic24.pl/sklepy-stacjonarne/katowice',
    ],
  },
  {
    slug: 'jadlodzielnia-katowice-jagiellonska',
    name: 'Jadłodzielnia GTCH Katowice',
    category: 'RECYCLING',
    street: 'Jagiellońska',
    houseNumber: '19',
    city: 'Katowice',
    lat: 50.263,
    lng: 19.024,
    descriptionPl:
      'Punkt foodsharingu czynny 24/7 przy Górnośląskim Towarzystwie Charytatywnym. Dziel się nadwyżką jedzenia — walka z marnowaniem żywności w sercu Katowic.',
    descriptionEn:
      '24/7 foodsharing point at the Upper Silesian Charity Society. Share excess food — fighting food waste in the heart of Katowice.',
    descriptionSk:
      'Bod foodsharingu otvorený 24/7 pri Hornosliezskej charitatívnej spoločnosti. Zdieľajte prebytočné jedlo — boj proti plytvaniu potravinami v srdci Katovíc.',
    tags: ['foodsharing', 'anti-food-waste', 'community'],
    facebook: 'https://www.facebook.com/p/Foodsharing-%C5%9Al%C4%85sk-100066303381639/',
    sources: [
      'http://mojekatowice.pl/i,podziel-sie-swiatecznym-jedzeniem-w-katowicach-sprawdz-lokalizacje-jadlodzielni,200274,918932.html',
    ],
  },

  // ────────── CHORZÓW (1) ──────────
  {
    slug: 'luuuzem-chorzow',
    name: 'Luuuzem — sklep zero waste',
    category: 'NO_PACKAGE',
    street: 'Chrobrego',
    houseNumber: '17',
    city: 'Chorzów',
    lat: 50.296,
    lng: 18.954,
    descriptionPl:
      'Pierwszy sklep zero waste w Chorzowie — produkty spożywcze, chemia i kosmetyki wyłącznie na wagę. 5% rabatu dla klientów z własnymi opakowaniami.',
    descriptionEn:
      'Chorzów\'s first zero waste shop — food, cleaning products and cosmetics sold exclusively by weight. 5% discount for customers with their own packaging.',
    descriptionSk:
      'Prvý obchod zero waste v Chorzove — potraviny, drogéria a kozmetika výhradne na váhu. 5% zľava pre zákazníkov s vlastnými obalmi.',
    tags: ['zero-waste', 'bulk-shop', 'bring-your-own-container'],
    website: 'https://luzem.eu/',
    facebook: 'https://www.facebook.com/luuuzem/',
    sources: [
      'https://luzem.eu/',
      'https://dziennikzachodni.pl/walcza-z-zasmiecaniem-srodowiska-marnowaniem-zywnosci-i-wspieraja-lokalnych-dostawcow-to-pierwszy-sklep-zero-waste-w-chorzowie/ar/c3-16089163',
    ],
  },

  // ────────── TYCHY (1) ──────────
  {
    slug: 'eko-pasaz-tychy',
    name: 'Eko Pasaż Tychy (Gemini Park)',
    category: 'ECO',
    street: 'Towarowa',
    houseNumber: '2C',
    city: 'Tychy',
    lat: 50.1284,
    lng: 18.9883,
    descriptionPl:
      'Cotygodniowy ekologiczny pasaż handlowy w Gemini Park (środa, sobota). Około 1000 produktów od 20 lokalnych producentów i rolników z Śląska.',
    descriptionEn:
      'Weekly eco market arcade at Gemini Park (Wednesdays and Saturdays). About 1000 products from 20 local producers and farmers from Silesia.',
    descriptionSk:
      'Týždenný eko bazár v Gemini Park (streda a sobota). Asi 1000 produktov od 20 miestnych výrobcov a farmárov zo Sliezska.',
    tags: ['farmers-market', 'local-producers', 'weekly'],
    website: 'https://tychy.geminipark.pl/sklepy/eko-pasaz-tychy/',
    facebook: 'https://www.facebook.com/EkoPasazTychy/',
    sources: [
      'https://tychy.geminipark.pl/sklepy/eko-pasaz-tychy/',
      'https://www.dlahandlu.pl/detal-hurt/gemini-park-tychy-rusza-z-nowym-projektem-eko-pasaz-bedzie-dzialac-dwa-razy-w-tygodniu,74488.html',
    ],
  },
];

type QuestSeed = {
  slug: string;
  titlePl: string;
  titleEn: string;
  titleSk: string;
  descriptionPl: string;
  descriptionEn: string;
  descriptionSk: string;
  durationMinutes: number;
  distanceKm: number;
  transportMode: 'WALKING' | 'BIKE' | 'PUBLIC' | 'MIXED';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  greencompCompetence: string;
  themes: string[];
  seasonRecommended: string[];
  indoorOutdoor: 'INDOOR' | 'OUTDOOR' | 'MIXED';
  meetingPointSlug: string;
  stops: Array<{
    placeSlug: string;
    position: number;
    estimatedMinutes: number;
    taskPl: string;
    taskEn: string;
    taskSk: string;
  }>;
};

const QUESTS: QuestSeed[] = [
  {
    slug: 'zero-waste-gliwice',
    titlePl: 'Zero Waste Gliwice',
    titleEn: 'Zero Waste Gliwice',
    titleSk: 'Zero Waste Gliwice',
    descriptionPl:
      'Półdniowy spacer szlakiem najważniejszych miejsc zero waste w centrum Gliwic. Zobacz, jak zrobić zakupy bez plastiku, zjedz roślinny lunch i odwiedź sobotni targ rolny.',
    descriptionEn:
      'Half-day walk through the key zero-waste places in central Gliwice. See how to shop without plastic, eat a plant-based lunch and visit the Saturday farmers\' market.',
    descriptionSk:
      'Polodňová prechádzka po kľúčových zero-waste miestach v centre Gliwic. Pozrite si, ako nakupovať bez plastov, ochutnajte rastlinný obed a navštívte sobotný farmársky trh.',
    durationMinutes: 240,
    distanceKm: 3.2,
    transportMode: 'WALKING',
    difficulty: 'EASY',
    greencompCompetence: 'Embodying sustainability values',
    themes: ['zero-waste', 'food', 'shopping'],
    seasonRecommended: ['spring', 'summer', 'autumn'],
    indoorOutdoor: 'MIXED',
    meetingPointSlug: 'dobrostan-gliwice',
    stops: [
      {
        placeSlug: 'dobrostan-gliwice',
        position: 1,
        estimatedMinutes: 45,
        taskPl: 'Zrób zakupy do własnych pojemników — porównaj ilość opakowań z typowym zakupem w supermarkecie.',
        taskEn: 'Shop into your own containers — compare the amount of packaging with a typical supermarket purchase.',
        taskSk: 'Nakúpte do vlastných nádob — porovnajte množstvo obalov s typickým nákupom v supermarkete.',
      },
      {
        placeSlug: 'eko-spizarnia-raciborska',
        position: 2,
        estimatedMinutes: 30,
        taskPl: 'Wybierz 3 produkty BIO i sprawdź ich certyfikat — co oznaczają unijne logo Eurolistka i Demeter?',
        taskEn: 'Choose 3 organic products and check their certification — what do the EU Euroleaf and Demeter logos mean?',
        taskSk: 'Vyberte 3 BIO produkty a skontrolujte ich certifikát — čo znamenajú EÚ logá Euroleaf a Demeter?',
      },
      {
        placeSlug: 'wege-strawa-osteria',
        position: 3,
        estimatedMinutes: 75,
        taskPl: 'Roślinny lunch razem — porozmawiajcie o tym, co Wam smakuje i co Was zaskoczyło.',
        taskEn: 'Plant-based lunch together — discuss what you liked and what surprised you.',
        taskSk: 'Spoločný rastlinný obed — porozprávajte sa o tom, čo Vám chutilo a čo Vás prekvapilo.',
      },
      {
        placeSlug: 'targ-na-zielonym-gliwice',
        position: 4,
        estimatedMinutes: 60,
        taskPl: 'Targ rolny: poznaj 2 producentów osobiście, zapytaj skąd jadą i jakie mają wyzwania ekologiczne.',
        taskEn: 'Farmers\' market: meet 2 producers in person, ask where they come from and what ecological challenges they face.',
        taskSk: 'Farmársky trh: spoznajte 2 výrobcov osobne, opýtajte sa, odkiaľ prichádzajú a aké majú ekologické výzvy.',
      },
    ],
  },
  {
    slug: 'naprawiamy-gliwice',
    titlePl: 'Naprawiamy Gliwice',
    titleEn: 'Repair Gliwice',
    titleSk: 'Opravujeme Gliwice',
    descriptionPl:
      'Quest dla wszystkich, którzy chcą się nauczyć, jak nie wyrzucać. Odwiedzimy warsztaty naprawcze i sklepy z drugim życiem rzeczy — fashion, rowery, akcesoria.',
    descriptionEn:
      'A quest for everyone who wants to learn how not to throw things away. We\'ll visit repair workshops and second-life stores — fashion, bikes, accessories.',
    descriptionSk:
      'Quest pre všetkých, ktorí sa chcú naučiť, ako nevyhadzovať veci. Navštívime opravárenské dielne a obchody druhého života — móda, bicykle, doplnky.',
    durationMinutes: 210,
    distanceKm: 4.0,
    transportMode: 'WALKING',
    difficulty: 'EASY',
    greencompCompetence: 'Acting for sustainability',
    themes: ['repair', 'circular', 'fashion'],
    seasonRecommended: ['spring', 'summer', 'autumn', 'winter'],
    indoorOutdoor: 'MIXED',
    meetingPointSlug: 'serwis-kolo-gliwice',
    stops: [
      {
        placeSlug: 'serwis-kolo-gliwice',
        position: 1,
        estimatedMinutes: 50,
        taskPl: 'Zobacz, jak działa serwis rowerowy — zapytaj o najczęstsze usterki, których można uniknąć codzienną dbałością.',
        taskEn: 'See how a bike workshop works — ask about the most common faults that can be avoided with daily care.',
        taskSk: 'Pozrite si, ako funguje cyklistický servis — opýtajte sa na najčastejšie poruchy, ktorým sa dá vyhnúť každodennou starostlivosťou.',
      },
      {
        placeSlug: 'cykloterapia-gliwice',
        position: 2,
        estimatedMinutes: 40,
        taskPl: 'Cykloterapia specjalizuje się w renowacji starych ram — sprawdź, jakie unikalne projekty właśnie mają na stanie.',
        taskEn: 'Cykloterapia specializes in restoring old frames — check what unique projects they currently have.',
        taskSk: 'Cykloterapia sa špecializuje na obnovu starých rámov — pozrite, aké jedinečné projekty práve majú.',
      },
      {
        placeSlug: 'biga-warszawska',
        position: 3,
        estimatedMinutes: 60,
        taskPl: 'Wyzwanie second-hand: znajdź ubranie, które wygląda jak nowe, ale ma już swoje życie za sobą. Porozmawiajcie o "fast fashion".',
        taskEn: 'Second-hand challenge: find an item that looks like new but has had a life of its own. Discuss "fast fashion".',
        taskSk: 'Second-hand výzva: nájdite kus oblečenia, ktorý vyzerá nový, ale už má život za sebou. Hovorte o „fast fashion".',
      },
      {
        placeSlug: 'biga-mlynska',
        position: 4,
        estimatedMinutes: 30,
        taskPl: 'Druga lokalizacja BIGA — porównaj asortyment i ceny. Co kupilibyście stąd na codzień?',
        taskEn: 'Second BIGA location — compare the range and prices. What would you buy here for everyday wear?',
        taskSk: 'Druhá lokalita BIGA — porovnajte sortiment a ceny. Čo by ste si tu kúpili na bežné nosenie?',
      },
    ],
  },
  {
    slug: 'roslinne-katowice',
    titlePl: 'Roślinne Katowice',
    titleEn: 'Plant-based Katowice',
    titleSk: 'Rastlinné Katovice',
    descriptionPl:
      'Wegańska wycieczka po Katowicach. Od legendarnego Złotego Osła, przez Botanikę i NIEINACZEJ, do slow-food Bujnej — przekrój roślinnej sceny stolicy regionu.',
    descriptionEn:
      'Vegan tour around Katowice. From legendary Złoty Osioł, through Botanika and NIEINACZEJ, to slow-food Bujna — a cross-section of the region\'s plant-based scene.',
    descriptionSk:
      'Vegánsky výlet po Katoviciach. Od legendárneho Złoty Osioł, cez Botaniku a NIEINACZEJ, k slow-food Bujnej — prierez rastlinnou scénou regionálnej metropoly.',
    durationMinutes: 240,
    distanceKm: 2.8,
    transportMode: 'WALKING',
    difficulty: 'EASY',
    greencompCompetence: 'Embracing complexity',
    themes: ['vegan', 'food', 'urban'],
    seasonRecommended: ['spring', 'summer', 'autumn', 'winter'],
    indoorOutdoor: 'INDOOR',
    meetingPointSlug: 'zloty-osiol-katowice',
    stops: [
      {
        placeSlug: 'zloty-osiol-katowice',
        position: 1,
        estimatedMinutes: 60,
        taskPl: 'Lunch w najstarszej wegetariańskiej restauracji na Śląsku. Spróbujcie dania, którego nie znacie.',
        taskEn: 'Lunch at the oldest vegetarian restaurant in Silesia. Try a dish you don\'t know.',
        taskSk: 'Obed v najstaršej vegetariánskej reštaurácii v Sliezsku. Vyskúšajte jedlo, ktoré nepoznáte.',
      },
      {
        placeSlug: 'botanika-katowice',
        position: 2,
        estimatedMinutes: 45,
        taskPl: 'Kawa w Botanice — porozmawiajcie o specialty coffee i jego śladzie węglowym vs. zwykła kawa.',
        taskEn: 'Coffee at Botanika — discuss specialty coffee and its carbon footprint vs. regular coffee.',
        taskSk: 'Káva v Botanike — diskutujte o specialty káve a jej uhlíkovej stope vs. bežná káva.',
      },
      {
        placeSlug: 'nieinaczej-katowice',
        position: 3,
        estimatedMinutes: 45,
        taskPl: 'NIEINACZEJ: spróbujcie wegańskiego burgera. Skąd biorą się "mięsne" składniki — co to za rośliny?',
        taskEn: 'NIEINACZEJ: try a vegan burger. Where do the "meaty" ingredients come from — what plants are these?',
        taskSk: 'NIEINACZEJ: vyskúšajte vegánsky burger. Odkiaľ sa berú „mäsité" ingrediencie — aké rastliny to sú?',
      },
      {
        placeSlug: 'bujna-katowice',
        position: 4,
        estimatedMinutes: 45,
        taskPl: 'Bujna: zamówcie wrap od slow food. Pogadajcie, co odróżnia slow food od fast foodu — czy warto?',
        taskEn: 'Bujna: order a slow food wrap. Discuss what distinguishes slow food from fast food — is it worth it?',
        taskSk: 'Bujna: objednajte si slow food wrap. Hovorte o tom, čím sa líši slow food od fast foodu — oplatí sa?',
      },
    ],
  },
];

async function main() {
  console.log('🌱 Seeding quest data...');

  const placeIdMap = new Map<string, string>();
  for (const place of PLACES) {
    const data = {
      slug: place.slug,
      name: place.name,
      category: place.category,
      street: place.street,
      houseNumber: place.houseNumber ?? null,
      city: place.city,
      lat: place.lat,
      lng: place.lng,
      descriptionPl: place.descriptionPl,
      descriptionEn: place.descriptionEn,
      descriptionSk: place.descriptionSk,
      tags: place.tags,
      website: place.website ?? null,
      facebook: place.facebook ?? null,
      sources: place.sources,
      verifiedAt: new Date(),
      isActive: true,
    };
    const upserted = await prisma.questPlace.upsert({
      where: { slug: place.slug },
      update: data,
      create: data,
    });
    placeIdMap.set(place.slug, upserted.id);
  }

  for (const quest of QUESTS) {
    const meetingPointId = placeIdMap.get(quest.meetingPointSlug);
    const data = {
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
      maxParticipants: 10,
      greencompCompetence: quest.greencompCompetence,
      themes: quest.themes,
      seasonRecommended: quest.seasonRecommended,
      indoorOutdoor: quest.indoorOutdoor,
      meetingPointId,
      isPublished: true,
    };
    const upserted = await prisma.quest.upsert({
      where: { slug: quest.slug },
      update: data,
      create: data,
    });

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

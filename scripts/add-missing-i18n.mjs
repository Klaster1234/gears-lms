/**
 * add-missing-i18n.mjs
 *
 * Reads messages/en.json, messages/pl.json, messages/sk.json,
 * deep-merges all missing translation keys (never overwrites existing),
 * writes them back, and reports how many keys were added per file.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = resolve(__dirname, "..", "messages");

// ── helpers ──────────────────────────────────────────────────────────

/** Count every leaf (non-object) in an object tree. */
function countLeaves(obj) {
  let n = 0;
  for (const v of Object.values(obj)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      n += countLeaves(v);
    } else {
      n += 1;
    }
  }
  return n;
}

/**
 * Deep-merge `source` into `target` (mutates `target`).
 * Only adds keys that do NOT already exist in `target`.
 * Returns the number of leaf values added.
 */
function deepMerge(target, source) {
  let added = 0;
  for (const [key, value] of Object.entries(source)) {
    if (!(key in target)) {
      // entirely new key – add the whole subtree
      target[key] = value;
      added += typeof value === "object" && value !== null && !Array.isArray(value)
        ? countLeaves(value)
        : 1;
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      typeof target[key] === "object" &&
      target[key] !== null &&
      !Array.isArray(target[key])
    ) {
      // both sides are objects – recurse
      added += deepMerge(target[key], value);
    }
    // else: key already exists as a leaf – skip (never overwrite)
  }
  return added;
}

// ── new keys per language ────────────────────────────────────────────

const newEN = {
  landing: {
    features: {
      sectionLabel: "What you'll learn",
      sectionTitle: "Everything you need to go green",
      modulesNumber: "10",
      modulesDescription:
        "A full sustainability curriculum - from waste reduction and circular economy to energy efficiency and community action.",
      quizzesNumber: "50+",
      quizzesDescription:
        "Engage with multiple-choice quizzes, drag-and-drop sorting, real-world scenarios, and interactive games built for adults.",
      certificateNumber: "1",
      certificateDescription:
        "Complete all modules to earn your Green Explorers certificate, recognised under the Erasmus+ programme.",
    },
    modulesPreview: {
      sectionLabel: "Curriculum",
      sectionTitle: "10 Modules to Transform Your Habits",
      viewAll: "View all modules",
      startModule: "Start module",
    },
    greencomp: {
      sectionLabel: "EU Framework",
      sectionTitle: "Built on GreenComp",
      sectionDescription:
        "Our curriculum aligns with GreenComp, the European sustainability competence framework - 4 areas, 12 competences.",
    },
    partners: {
      sectionLabel: "Partnership",
      visitWebsite: "Visit website",
    },
  },
  modules: {
    moduleLabel: "Module {number}",
    stepsCompleted: "{count} of 4 steps completed",
    done: "Done",
    inProgress: "In Progress",
    startModule: "Start module",
    allModules: "All Modules",
    stepsLabel: "Step {current} of {total}",
    stepsCompletedCount: "{count} completed",
    catalog: {
      description:
        "Ten carefully crafted modules covering sustainability, zero waste, circular economy, and green competences. Progress at your own rhythm through learn, practice, reflect, and quiz stages.",
    },
  },
  progress: {
    dashboardLabel: "Dashboard",
    pageTitle: "Your Learning Progress",
    trackJourney: "Track your journey through the G.E.A.R.S. programme",
    modulesLabel: "Modules",
    competencesLabel: "Competences",
    congratulations: "Congratulations!",
    allModulesComplete:
      "You have completed all 10 modules. Generate your certificate now!",
    generateCertificate: "Generate Your Certificate",
    certificateTitle: "Certificate of Completion",
    remainingModules:
      "Complete {count} more module(s) to earn your certificate",
    resetTitle: "Reset All Progress?",
    resetDescription:
      "This will permanently erase all your learning progress, quiz results, reflections, and certificate data. This action cannot be undone.",
  },
  certificate: {
    notAvailable: "Certificate Not Yet Available",
    completeAll:
      "Complete all 10 modules to earn your certificate of completion.",
    achievementLabel: "Achievement",
    yourCertificate: "Your Certificate",
    generateDescription:
      "Generate and download your certificate of completion",
  },
  about: {
    erasmusLabel: "Erasmus+ KA210-ADU",
    description:
      "G.E.A.R.S. is an Erasmus+ KA210-ADU project developing innovative tools for adult education in sustainable development. Our goal is to empower adults with practical knowledge and competences to live more sustainably.",
    overviewLabel: "Overview",
    aboutProject: "About the Project",
    programmeLabel: "Programme",
    projectNumberLabel: "Project Number",
    durationLabel: "Duration",
    smallScale:
      "Small-scale Partnership in Adult Education",
    aboutParagraph1:
      "The G.E.A.R.S. project addresses the urgent need for sustainability education among adults. Through 10 interactive learning modules, we guide participants through the journey from understanding basic environmental principles to taking meaningful community action.",
    aboutParagraph2:
      "Our programme is built around the European GreenComp framework, ensuring that learners develop key sustainability competences recognised across the European Union.",
    whatWeOffer: "What We Offer",
    whatWeOfferDescription:
      "A comprehensive programme of tools and resources for sustainability education.",
    features: {
      modules: {
        title: "10 Interactive Modules",
        description: "...",
      },
      quests: {
        title: "City Quests",
        description: "...",
      },
      comic: {
        title: "Educational Comic Book",
        description: "...",
      },
      cabinets: {
        title: "Sustainability Cabinets",
        description: "...",
      },
    },
    greencompLabel: "EU Framework",
    greencompTitle: "GreenComp Framework",
    greencompDescription:
      "Our curriculum is aligned with the European Sustainability Competence Framework (GreenComp), which defines the sustainability competences that learners need.",
    collaborationLabel: "Collaboration",
    ourPartners: "Our Partners",
    partnersDescription:
      "Two organisations united by a shared commitment to sustainability education for adults.",
    leadPartner: "Lead Partner - Poland",
    partner: "Partner - Slovakia",
    zsName: "Stowarzyszenie Zielone Slaskie",
    zsDescription:
      "Zielone Slaskie is a Polish environmental association based in Silesia, dedicated to promoting sustainable development, environmental education, and community engagement. As the lead partner, they coordinate the project and bring expertise in green education and community mobilisation.",
    seqName: "SEQ / YouthFullyYours",
    seqDescription:
      "SEQ (Slovak Education Quest) / YouthFullyYours is a Slovak non-profit organisation specialising in non-formal education, youth work, and adult learning. They contribute expertise in educational methodology, accreditation systems, and international project management.",
    websiteComingSoon: "Website coming soon",
    teamLabel: "Team",
    keyPeople: "Key People",
    teamDescription: "The team behind the G.E.A.R.S. project.",
    roles: {
      projectManager: "Project Manager",
      educationSpecialist: "Education Specialist",
      sustainabilityExpert: "Sustainability Expert",
    },
  },
};

const newPL = {
  landing: {
    features: {
      sectionLabel: "Czego się nauczysz",
      sectionTitle: "Wszystko, czego potrzebujesz, aby żyć ekologicznie",
      modulesNumber: "10",
      modulesDescription:
        "Pełny program zrównoważonego rozwoju - od redukcji odpadów i gospodarki cyrkularnej po efektywność energetyczną i działania społeczne.",
      quizzesNumber: "50+",
      quizzesDescription:
        "Angażuj się w quizy wielokrotnego wyboru, sortowanie typu przeciągnij i upuść, scenariusze z życia wzięte i interaktywne gry stworzone dla dorosłych.",
      certificateNumber: "1",
      certificateDescription:
        "Ukończ wszystkie moduły, aby zdobyć certyfikat Green Explorers, uznawany w ramach programu Erasmus+.",
    },
    modulesPreview: {
      sectionLabel: "Program",
      sectionTitle: "10 modułów, które zmienią Twoje nawyki",
      viewAll: "Zobacz wszystkie moduły",
      startModule: "Rozpocznij moduł",
    },
    greencomp: {
      sectionLabel: "Ramy UE",
      sectionTitle: "Oparte na GreenComp",
      sectionDescription:
        "Nasz program jest zgodny z GreenComp, europejskimi ramami kompetencji w zakresie zrównoważonego rozwoju - 4 obszary, 12 kompetencji.",
    },
    partners: {
      sectionLabel: "Partnerstwo",
      visitWebsite: "Odwiedź stronę",
    },
  },
  modules: {
    moduleLabel: "Moduł {number}",
    stepsCompleted: "{count} z 4 kroków ukończonych",
    done: "Ukończony",
    inProgress: "W trakcie",
    startModule: "Rozpocznij moduł",
    allModules: "Wszystkie moduły",
    stepsLabel: "Krok {current} z {total}",
    stepsCompletedCount: "{count} ukończonych",
    catalog: {
      description:
        "Dziesięć starannie opracowanych modułów obejmujących zrównoważony rozwój, zero waste, gospodarkę cyrkularną i zielone kompetencje. Postępuj we własnym rytmie przez etapy: ucz się, ćwicz, reflektuj i rozwiązuj quizy.",
    },
  },
  progress: {
    dashboardLabel: "Panel",
    pageTitle: "Twoje postępy w nauce",
    trackJourney: "Śledź swoją podróż przez program G.E.A.R.S.",
    modulesLabel: "Moduły",
    competencesLabel: "Kompetencje",
    congratulations: "Gratulacje!",
    allModulesComplete:
      "Ukończyłeś wszystkie 10 modułów. Wygeneruj teraz swój certyfikat!",
    generateCertificate: "Wygeneruj certyfikat",
    certificateTitle: "Certyfikat ukończenia",
    remainingModules:
      "Ukończ jeszcze {count} moduł(ów), aby zdobyć certyfikat",
    resetTitle: "Zresetować wszystkie postępy?",
    resetDescription:
      "To trwale usunie wszystkie Twoje postępy w nauce, wyniki quizów, refleksje i dane certyfikatu. Tej akcji nie można cofnąć.",
  },
  certificate: {
    notAvailable: "Certyfikat jeszcze niedostępny",
    completeAll:
      "Ukończ wszystkie 10 modułów, aby zdobyć certyfikat ukończenia.",
    achievementLabel: "Osiągnięcie",
    yourCertificate: "Twój certyfikat",
    generateDescription:
      "Wygeneruj i pobierz swój certyfikat ukończenia",
  },
  about: {
    erasmusLabel: "Erasmus+ KA210-ADU",
    description:
      "G.E.A.R.S. to projekt Erasmus+ KA210-ADU rozwijający innowacyjne narzędzia do edukacji dorosłych w zakresie zrównoważonego rozwoju. Naszym celem jest wyposażenie dorosłych w praktyczną wiedzę i kompetencje do bardziej zrównoważonego życia.",
    overviewLabel: "Przegląd",
    aboutProject: "O projekcie",
    programmeLabel: "Program",
    projectNumberLabel: "Numer projektu",
    durationLabel: "Czas trwania",
    smallScale:
      "Partnerstwo na małą skalę w edukacji dorosłych",
    aboutParagraph1:
      "Projekt G.E.A.R.S. odpowiada na pilną potrzebę edukacji o zrównoważonym rozwoju wśród dorosłych. Przez 10 interaktywnych modułów edukacyjnych prowadzimy uczestników od zrozumienia podstawowych zasad środowiskowych do podejmowania znaczących działań społecznych.",
    aboutParagraph2:
      "Nasz program opiera się na europejskich ramach GreenComp, zapewniając, że uczący się rozwijają kluczowe kompetencje w zakresie zrównoważonego rozwoju, uznawane w Unii Europejskiej.",
    whatWeOffer: "Co oferujemy",
    whatWeOfferDescription:
      "Kompleksowy program narzędzi i zasobów do edukacji o zrównoważonym rozwoju.",
    features: {
      modules: {
        title: "10 interaktywnych modułów",
        description: "...",
      },
      quests: {
        title: "Miejskie wyprawy",
        description: "...",
      },
      comic: {
        title: "Komiks edukacyjny",
        description: "...",
      },
      cabinets: {
        title: "Szafki zrównoważonego rozwoju",
        description: "...",
      },
    },
    greencompLabel: "Ramy UE",
    greencompTitle: "Ramy GreenComp",
    greencompDescription:
      "Nasz program jest zgodny z Europejskimi Ramami Kompetencji w zakresie Zrównoważonego Rozwoju (GreenComp), które definiują kompetencje potrzebne uczącym się.",
    collaborationLabel: "Współpraca",
    ourPartners: "Nasi partnerzy",
    partnersDescription:
      "Dwie organizacje połączone wspólnym zaangażowaniem w edukację o zrównoważonym rozwoju dla dorosłych.",
    leadPartner: "Partner wiodący - Polska",
    partner: "Partner - Słowacja",
    zsName: "Stowarzyszenie Zielone Slaskie",
    zsDescription:
      "Zielone Śląskie to polskie stowarzyszenie ekologiczne z siedzibą na Śląsku, poświęcone promowaniu zrównoważonego rozwoju, edukacji ekologicznej i zaangażowania społecznego. Jako partner wiodący koordynuje projekt i wnosi doświadczenie w edukacji ekologicznej i mobilizacji społecznej.",
    seqName: "SEQ / YouthFullyYours",
    seqDescription:
      "SEQ (Slovak Education Quest) / YouthFullyYours to słowacka organizacja non-profit specjalizująca się w edukacji pozaformalnej, pracy z młodzieżą i edukacji dorosłych. Wnoszą doświadczenie w metodologii edukacyjnej, systemach akredytacji i zarządzaniu projektami międzynarodowymi.",
    websiteComingSoon: "Strona wkrótce",
    teamLabel: "Zespół",
    keyPeople: "Kluczowe osoby",
    teamDescription: "Zespół stojący za projektem G.E.A.R.S.",
    roles: {
      projectManager: "Kierownik projektu",
      educationSpecialist: "Specjalista ds. edukacji",
      sustainabilityExpert: "Ekspert ds. zrównoważonego rozwoju",
    },
  },
};

const newSK = {
  landing: {
    features: {
      sectionLabel: "Čo sa naučíte",
      sectionTitle: "Všetko, čo potrebujete na ekologický život",
      modulesNumber: "10",
      modulesDescription:
        "Kompletné kurikulum udržateľnosti - od znižovania odpadu a cirkulárnej ekonomiky po energetickú efektívnosť a komunitné aktivity.",
      quizzesNumber: "50+",
      quizzesDescription:
        "Zapojte sa do kvízov s výberom odpovedí, triedenia potiahni a pusti, scenárov zo skutočného života a interaktívnych hier vytvorených pre dospelých.",
      certificateNumber: "1",
      certificateDescription:
        "Dokončite všetky moduly a získajte certifikát Green Explorers, uznaný v rámci programu Erasmus+.",
    },
    modulesPreview: {
      sectionLabel: "Kurikulum",
      sectionTitle: "10 modulov, ktoré zmenia vaše návyky",
      viewAll: "Zobraziť všetky moduly",
      startModule: "Začať modul",
    },
    greencomp: {
      sectionLabel: "Rámec EÚ",
      sectionTitle: "Postavené na GreenComp",
      sectionDescription:
        "Naše kurikulum je v súlade s GreenComp, európskym rámcom kompetencií pre udržateľnosť - 4 oblasti, 12 kompetencií.",
    },
    partners: {
      sectionLabel: "Partnerstvo",
      visitWebsite: "Navštíviť stránku",
    },
  },
  modules: {
    moduleLabel: "Modul {number}",
    stepsCompleted: "{count} zo 4 krokov dokončených",
    done: "Dokončený",
    inProgress: "Prebieha",
    startModule: "Začať modul",
    allModules: "Všetky moduly",
    stepsLabel: "Krok {current} zo {total}",
    stepsCompletedCount: "{count} dokončených",
    catalog: {
      description:
        "Desať starostlivo pripravených modulov pokrývajúcich udržateľnosť, zero waste, cirkulárnu ekonomiku a zelené kompetencie. Postupujte vlastným tempom cez fázy: učenie, prax, reflexia a kvízy.",
    },
  },
  progress: {
    dashboardLabel: "Prehľad",
    pageTitle: "Váš pokrok v učení",
    trackJourney: "Sledujte svoju cestu programom G.E.A.R.S.",
    modulesLabel: "Moduly",
    competencesLabel: "Kompetencie",
    congratulations: "Gratulujeme!",
    allModulesComplete:
      "Dokončili ste všetkých 10 modulov. Vygenerujte si certifikát!",
    generateCertificate: "Vygenerovať certifikát",
    certificateTitle: "Certifikát o absolvovaní",
    remainingModules:
      "Dokončite ešte {count} modul(ov) na získanie certifikátu",
    resetTitle: "Resetovať všetok pokrok?",
    resetDescription:
      "Toto natrvalo vymaže všetok váš pokrok v učení, výsledky kvízov, reflexie a údaje certifikátu. Túto akciu nie je možné vrátiť späť.",
  },
  certificate: {
    notAvailable: "Certifikát zatiaľ nie je k dispozícii",
    completeAll:
      "Dokončite všetkých 10 modulov, aby ste získali certifikát o absolvovaní.",
    achievementLabel: "Úspech",
    yourCertificate: "Váš certifikát",
    generateDescription:
      "Vygenerujte a stiahnite si certifikát o absolvovaní",
  },
  about: {
    erasmusLabel: "Erasmus+ KA210-ADU",
    description:
      "G.E.A.R.S. je projekt Erasmus+ KA210-ADU vyvíjajúci inovatívne nástroje pre vzdelávanie dospelých v oblasti udržateľného rozvoja. Naším cieľom je posilniť dospelých praktickými znalosťami a kompetenciami pre udržateľnejší život.",
    overviewLabel: "Prehľad",
    aboutProject: "O projekte",
    programmeLabel: "Program",
    projectNumberLabel: "Číslo projektu",
    durationLabel: "Trvanie",
    smallScale:
      "Malé partnerstvo vo vzdelávaní dospelých",
    aboutParagraph1:
      "Projekt G.E.A.R.S. reaguje na naliehavú potrebu vzdelávania o udržateľnosti medzi dospelými. Prostredníctvom 10 interaktívnych vzdelávacích modulov vedieme účastníkov od pochopenia základných environmentálnych princípov po zmysluplné komunitné aktivity.",
    aboutParagraph2:
      "Náš program je postavený na európskom rámci GreenComp, čo zaručuje, že účastníci rozvíjajú kľúčové kompetencie udržateľnosti uznávané v Európskej únii.",
    whatWeOffer: "Čo ponúkame",
    whatWeOfferDescription:
      "Komplexný program nástrojov a zdrojov pre vzdelávanie o udržateľnosti.",
    features: {
      modules: {
        title: "10 interaktívnych modulov",
        description: "...",
      },
      quests: {
        title: "Mestské výpravy",
        description: "...",
      },
      comic: {
        title: "Vzdelávací komiks",
        description: "...",
      },
      cabinets: {
        title: "Skrine udržateľnosti",
        description: "...",
      },
    },
    greencompLabel: "Rámec EÚ",
    greencompTitle: "Rámec GreenComp",
    greencompDescription:
      "Naše kurikulum je v súlade s Európskym rámcom kompetencií pre udržateľnosť (GreenComp), ktorý definuje kompetencie udržateľnosti, ktoré študujúci potrebujú.",
    collaborationLabel: "Spolupráca",
    ourPartners: "Naši partneri",
    partnersDescription:
      "Dve organizácie spojené spoločným záväzkom k vzdelávaniu o udržateľnosti pre dospelých.",
    leadPartner: "Vedúci partner - Poľsko",
    partner: "Partner - Slovensko",
    zsName: "Stowarzyszenie Zielone Slaskie",
    zsDescription:
      "Zielone Śląskie je poľské environmentálne združenie so sídlom v Sliezsku, venujúce sa podpore udržateľného rozvoja, environmentálnemu vzdelávaniu a zapájaniu komunít. Ako vedúci partner koordinuje projekt a prináša odborné znalosti v oblasti zeleného vzdelávania a mobilizácie komunít.",
    seqName: "SEQ / YouthFullyYours",
    seqDescription:
      "SEQ (Slovak Education Quest) / YouthFullyYours je slovenská nezisková organizácia špecializujúca sa na neformálne vzdelávanie, prácu s mládežou a vzdelávanie dospelých. Prispievajú odbornosťou v oblasti vzdelávacej metodológie, akreditačných systémov a medzinárodného projektového manažmentu.",
    websiteComingSoon: "Stránka čoskoro",
    teamLabel: "Tím",
    keyPeople: "Kľúčové osoby",
    teamDescription: "Tím stojaci za projektom G.E.A.R.S.",
    roles: {
      projectManager: "Projektový manažér",
      educationSpecialist: "Špecialista na vzdelávanie",
      sustainabilityExpert: "Expert na udržateľnosť",
    },
  },
};

// ── main ─────────────────────────────────────────────────────────────

const files = [
  { lang: "en", path: resolve(messagesDir, "en.json"), newKeys: newEN },
  { lang: "pl", path: resolve(messagesDir, "pl.json"), newKeys: newPL },
  { lang: "sk", path: resolve(messagesDir, "sk.json"), newKeys: newSK },
];

for (const { lang, path, newKeys } of files) {
  const existing = JSON.parse(readFileSync(path, "utf-8"));
  const added = deepMerge(existing, newKeys);
  writeFileSync(path, JSON.stringify(existing, null, 2) + "\n", "utf-8");
  console.log(`[${lang}] ${added} key(s) added  ->  ${path}`);
}

console.log("\nDone.");

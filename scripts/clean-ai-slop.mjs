/**
 * AI Signs Eraser — bulk find-and-replace for AI slop in translation JSON files.
 * Run: node scripts/clean-ai-slop.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');

// ─── EN replacements (word-boundary-safe) ──────────────────────────
const EN_REPLACEMENTS = [
  // Category 1: Cursed Vocabulary
  [/\bdelving\b/gi, 'exploring'],
  [/\bdelve into\b/gi, 'explore'],
  [/\bdelve\b/gi, 'explore'],
  [/\btapestry of\b/gi, 'mix of'],
  [/\btapestry\b/gi, 'variety'],
  [/\bpivotal\b/gi, 'key'],
  [/\bfostering\b/gi, 'supporting'],
  [/\bfoster\b/gi, 'support'],
  [/\bfosters\b/gi, 'supports'],
  [/\bfostered\b/gi, 'supported'],
  [/\btestament to\b/gi, 'proof of'],
  [/\btestament\b/gi, 'proof'],
  [/\benhancing\b/gi, 'improving'],
  [/\benhanced\b/gi, 'improved'],
  [/\benhances\b/gi, 'improves'],
  [/\benhance\b/gi, 'improve'],
  [/\bcrucially\b/gi, 'importantly'],
  [/\bcrucial\b/gi, 'important'],
  [/\bintricate\b/gi, 'complex'],
  [/\bmultifaceted\b/gi, 'complex'],
  [/\bnuanced\b/gi, 'subtle'],
  [/\brobust\b/gi, 'strong'],
  [/\bleveraging\b/gi, 'using'],
  [/\bleverage\b/gi, 'use'],
  [/\bstreamlining\b/gi, 'simplifying'],
  [/\bstreamline\b/gi, 'simplify'],
  [/\bcomprehensive\b/gi, 'full'],
  [/\bholistic approach\b/gi, 'complete approach'],
  [/\bholistic\b/gi, 'complete'],
  [/\bsynergy\b/gi, 'cooperation'],
  [/\bsynergies\b/gi, 'combined effects'],
  [/\bnavigate the\b/gi, 'handle the'],
  [/\bnavigating\b/gi, 'handling'],
  [/\bunderscores\b/gi, 'highlights'],
  [/\bunderscore\b/gi, 'highlight'],
  [/\bembark on\b/gi, 'start'],
  [/\bembarking on\b/gi, 'starting'],
  [/\bembark\b/gi, 'start'],
  [/\brealm of\b/gi, 'area of'],
  [/\brealm\b/gi, 'area'],
  [/\bspearheading\b/gi, 'leading'],
  [/\bspearhead\b/gi, 'lead'],
  [/\bgroundbreaking\b/gi, 'new'],
  [/\btransformative\b/gi, 'major'],
  [/\bcornerstone of\b/gi, 'foundation of'],
  [/\bcornerstone\b/gi, 'foundation'],
  [/\bendeavors\b/gi, 'efforts'],
  [/\bendeavor\b/gi, 'effort'],
  [/\bcommendable\b/gi, 'praiseworthy'],
  [/\bparamount\b/gi, 'most important'],
  [/\bmeticulous\b/gi, 'careful'],
  [/\bmeticulously\b/gi, 'carefully'],
  [/\bbustling\b/gi, 'busy'],
  [/\bindelible\b/gi, 'lasting'],
  [/\baligns with\b/gi, 'matches'],
  [/\bunderpins\b/gi, 'supports'],
  [/\bunderpin\b/gi, 'support'],
  [/\bfacilitates\b/gi, 'enables'],
  [/\bfacilitate\b/gi, 'enable'],
  [/\bfacilitating\b/gi, 'enabling'],
  [/\bencompasses\b/gi, 'includes'],
  [/\bencompass\b/gi, 'include'],
  [/\bencompassing\b/gi, 'including'],
  [/\bMoreover, /g, 'Also, '],
  [/\bmoreover, /g, 'also, '],
  [/\bmoreover\b/gi, 'also'],
  [/\bFurthermore, /g, 'Also, '],
  [/\bfurthermore, /g, 'also, '],
  [/\bfurthermore\b/gi, 'also'],
  [/\bIn addition, /gi, 'Also, '],
  [/\bIt is worth noting that /gi, ''],
  [/\bIt's important to note that /gi, ''],
  [/\bIt is important to note that /gi, ''],

  // Category 6: Inflated Symbolism
  [/\bstands as a testament to\b/gi, 'shows'],
  [/\bserves as a beacon of\b/gi, 'is a sign of'],
  [/\bplays a vital role in\b/gi, 'is important for'],
  [/\bplays a crucial role in\b/gi, 'is important for'],
  [/\bplays a significant role in\b/gi, 'matters for'],
  [/\bplays a key role in\b/gi, 'is important for'],
  [/\bleaves a lasting impact\b/gi, 'has real effects'],
  [/\benduring legacy\b/gi, 'lasting effect'],
  [/\blasting legacy\b/gi, 'lasting effect'],
  [/\brich tapestry\b/gi, 'wide variety'],
  [/\bprofound impact\b/gi, 'real impact'],
  [/\bprofound\b/gi, 'deep'],

  // Category 7: Promotional Language
  [/\bcutting-edge\b/gi, 'advanced'],
  [/\bstate-of-the-art\b/gi, 'modern'],
  [/\binnovative approach\b/gi, 'fresh approach'],
  [/\binnovative\b/gi, 'new'],
  [/\brevolutionary\b/gi, 'radical'],
  [/\bworld-class\b/gi, 'top-level'],
  [/\bgame-changing\b/gi, 'radical'],
  [/\bpioneering\b/gi, 'early'],

  // Category 15: Superficial Analysis
  [/\bIn today's rapidly changing world, /gi, ''],
  [/\bIn today's world, /gi, ''],
  [/\bIn an era of /gi, 'With '],
  [/\bAs technology continues to evolve, /gi, ''],
];

// ─── PL replacements ───────────────────────────────────────────────
const PL_REPLACEMENTS = [
  // Cursed vocab equivalents
  [/\bkompleksowy\b/gi, 'pełny'],
  [/\bkompleksowa\b/gi, 'pełna'],
  [/\bkompleksowe\b/gi, 'pełne'],
  [/\bkompleksowym\b/gi, 'pełnym'],
  [/\bkompleksowego\b/gi, 'pełnego'],
  [/\bkompleksowej\b/gi, 'pełnej'],
  [/\bKompleksowy\b/g, 'Pełny'],
  [/\bKompleksowa\b/g, 'Pełna'],
  [/\bKompleksowe\b/g, 'Pełne'],
  [/\bholistyczne\b/gi, 'całościowe'],
  [/\bholistyczny\b/gi, 'całościowy'],
  [/\bholistyczna\b/gi, 'całościowa'],
  [/\bholistycznie\b/gi, 'całościowo'],
  [/\binnowacyjne\b/gi, 'nowatorskie'],
  [/\binnowacyjny\b/gi, 'nowatorski'],
  [/\binnowacyjna\b/gi, 'nowatorska'],
  [/\binnowacyjnych\b/gi, 'nowatorskich'],
  [/\btransformacyjn\w+/gi, (m) => m.replace(/transformacyjn/i, 'przełomow')],
  [/\bwieloaspektow\w+/gi, (m) => m.replace(/wieloaspektow/i, 'złożon')],
  [/\bfundamentaln\w+/gi, (m) => m.replace(/fundamentaln/i, 'podstawow')],
  [/\bsynergi\w+/gi, 'współpracy'],

  // Connectors overuse
  [/\bPonadto, /g, 'Też '],
  [/\bponadto, /g, 'też '],
  [/\bponadto\b/gi, 'też'],
  [/\bCo więcej, /g, 'Też '],
  [/\bco więcej, /g, 'też '],
  [/\bco więcej\b/gi, 'też'],
  [/\bWarto zauważyć, że /gi, ''],
  [/\bNależy podkreślić, że /gi, ''],

  // kluczowy - only when clearly AI-sloppy (followed by typical AI patterns)
  [/\bkluczowy element\b/gi, 'ważny element'],
  [/\bkluczowa rola\b/gi, 'ważna rola'],
  [/\bkluczowe znaczenie\b/gi, 'duże znaczenie'],
  [/\bkluczową rolę\b/gi, 'ważną rolę'],
  [/\bkluczowy aspekt\b/gi, 'ważny aspekt'],
  [/\bkluczowa strategia\b/gi, 'ważna strategia'],
  [/\bkluczowa praktyka\b/gi, 'ważna praktyka'],
  [/\bkluczową praktykę\b/gi, 'ważną praktykę'],
  [/\bkluczową strategię\b/gi, 'ważną strategię'],
  [/\bkluczowym elementem\b/gi, 'ważnym elementem'],
  [/\bodgrywa kluczową\b/gi, 'odgrywa ważną'],
];

// ─── SK replacements ───────────────────────────────────────────────
const SK_REPLACEMENTS = [
  [/\bkomplexný\b/gi, 'úplný'],
  [/\bkomplexná\b/gi, 'úplná'],
  [/\bkomplexné\b/gi, 'úplné'],
  [/\bkomplexnom\b/gi, 'úplnom'],
  [/\bkomplexného\b/gi, 'úplného'],
  [/\bkomplexnej\b/gi, 'úplnej'],
  [/\bKomplexný\b/g, 'Úplný'],
  [/\bKomplexná\b/g, 'Úplná'],
  [/\bKomplexné\b/g, 'Úplné'],
  [/\bholistick\w+/gi, (m) => m.replace(/holistick/i, 'celostn')],
  [/\binovatívn\w+/gi, (m) => m.replace(/inovatívn/i, 'novátorsk')],
  [/\btransformačn\w+/gi, (m) => m.replace(/transformačn/i, 'prelomov')],
  [/\bsynergi\w+/gi, 'spolupráce'],

  // kľúčový overuse
  [/\bkľúčová prax\b/gi, 'dôležitá prax'],
  [/\bkľúčová stratégia\b/gi, 'dôležitá stratégia'],
  [/\bkľúčovú úlohu\b/gi, 'dôležitú úlohu'],
  [/\bkľúčový prvok\b/gi, 'dôležitý prvok'],
  [/\bkľúčový aspekt\b/gi, 'dôležitý aspekt'],
  [/\bkľúčová cirkulárna\b/gi, 'dôležitá cirkulárna'],

  // Connectors
  [/\bNavyše, /g, 'Tiež '],
  [/\bnavyše, /g, 'tiež '],
  [/\bnavyše\b/gi, 'tiež'],
  [/\bOkrem toho, /g, 'Tiež '],
  [/\bokrem toho, /g, 'tiež '],
  [/\bokrem toho\b/gi, 'tiež'],
  [/\bStojí za zmienku, že /gi, ''],
  [/\bDôležité poznamenať, že /gi, ''],
];

// ─── Em/En dash replacement (all languages) ────────────────────────
const DASH_REPLACEMENTS = [
  // " — " or " – " → " - "
  [/ — /g, ' - '],
  [/ – /g, ' - '],
  // "—" or "–" without spaces → " - "
  [/—/g, ' - '],
  [/–/g, ' - '],
];

function processFile(filePath, langReplacements) {
  const raw = readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  let totalChanges = 0;
  const changeLog = [];

  function walkAndReplace(obj, path = '') {
    if (typeof obj === 'string') {
      let result = obj;

      // Apply language-specific replacements
      for (const [pattern, replacement] of langReplacements) {
        const before = result;
        result = result.replace(pattern, replacement);
        if (before !== result) {
          totalChanges++;
          changeLog.push({ path, pattern: pattern.toString(), before: before.substring(0, 80), after: result.substring(0, 80) });
        }
      }

      // Apply dash replacements
      for (const [pattern, replacement] of DASH_REPLACEMENTS) {
        const before = result;
        result = result.replace(pattern, replacement);
        if (before !== result) {
          totalChanges++;
          changeLog.push({ path, pattern: 'DASH', before: before.substring(0, 80), after: result.substring(0, 80) });
        }
      }

      // Fix double spaces that may result from replacements
      result = result.replace(/  +/g, ' ').trim();

      return result;
    }

    if (Array.isArray(obj)) {
      return obj.map((item, i) => walkAndReplace(item, `${path}[${i}]`));
    }

    if (obj && typeof obj === 'object') {
      const out = {};
      for (const [key, val] of Object.entries(obj)) {
        out[key] = walkAndReplace(val, `${path}.${key}`);
      }
      return out;
    }

    return obj;
  }

  const cleaned = walkAndReplace(data);
  const output = JSON.stringify(cleaned, null, 2) + '\n';
  writeFileSync(filePath, output, 'utf-8');

  return { totalChanges, changeLog };
}

// ─── Run ────────────────────────────────────────────────────────────
console.log('=== AI SIGNS ERASER ===\n');

const files = [
  { path: resolve(ROOT, 'messages/en.json'), replacements: EN_REPLACEMENTS, lang: 'EN' },
  { path: resolve(ROOT, 'messages/pl.json'), replacements: PL_REPLACEMENTS, lang: 'PL' },
  { path: resolve(ROOT, 'messages/sk.json'), replacements: SK_REPLACEMENTS, lang: 'SK' },
];

let grandTotal = 0;

for (const { path, replacements, lang } of files) {
  console.log(`Processing ${lang}: ${path}`);
  const { totalChanges, changeLog } = processFile(path, replacements);
  grandTotal += totalChanges;

  console.log(`  ${totalChanges} changes made`);
  for (const c of changeLog.slice(0, 15)) {
    console.log(`    [${c.pattern.substring(0, 30)}] ${c.path}`);
  }
  if (changeLog.length > 15) {
    console.log(`    ... and ${changeLog.length - 15} more`);
  }
  console.log('');
}

console.log(`=== TOTAL: ${grandTotal} changes across ${files.length} files ===`);

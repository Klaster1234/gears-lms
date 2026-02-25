/**
 * AI Signs Eraser — Pass 2: cleanup remaining Unicode-boundary issues
 * Run: node scripts/clean-ai-slop-pass2.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');

function replaceInFile(filePath, replacements, lang) {
  let data = readFileSync(filePath, 'utf-8');
  let count = 0;

  for (const [search, replace] of replacements) {
    const before = data;
    data = data.replaceAll(search, replace);
    if (before !== data) {
      const occurrences = (before.split(search).length - 1);
      count += occurrences;
      console.log(`  [${lang}] "${search}" → "${replace}" (${occurrences}x)`);
    }
  }

  writeFileSync(filePath, data, 'utf-8');
  return count;
}

console.log('=== AI SIGNS ERASER — Pass 2 ===\n');

// ─── PL pass 2 ─────────────────────────────────────────────────────
const PL_FIXES = [
  // Remaining kluczow* overuse (non-natural uses)
  ['kilku kluczowych zasad', 'kilku podstawowych zasad'],
  ['Kluczowe inicjatywy obejmują', 'Główne inicjatywy obejmują'],
  ['kluczowe umiejętności', 'ważne umiejętności'],
  ['dwa kluczowe pojęcia', 'dwa ważne pojęcia'],
  ['Kluczowym mechanizmem', 'Głównym mechanizmem'],
  ['kluczowy problem', 'poważny problem'],
  ['kluczowych materiałów', 'niezbędnych materiałów'],
  ['Kluczową rolę odegrały', 'Ważną rolę odegrały'],

  // Remaining kompleksow* with Unicode chars
  ['kompleksową', 'pełną'],
  ['kompleksowych', 'pełnych'],
  ['Kompleksowe', 'Pełne'],
  ['Kompleksowy', 'Pełny'],
  ['kompleksowy', 'pełny'],
  ['kompleksowe', 'pełne'],
  ['kompleksowa', 'pełna'],

  // Other AI patterns in PL
  ['Co ważne, ', ''],  // leftover from "Co kluczowe" -> if needed
  ['również ', 'też '], // overuse - leave for now, skip
];

// ─── SK pass 2 ─────────────────────────────────────────────────────
const SK_FIXES = [
  // Komplexn* with diacritics
  ['Komplexné lekcie', 'Podrobné lekcie'],
  ['Komplexný program', 'Ucelený program'],
  ['komplexnú alternatívu', 'úplnú alternatívu'],
  ['komplexný súbor', 'rozsiahly súbor'],
  ['komplexné', 'úplné'],
  ['komplexný', 'úplný'],
  ['komplexná', 'úplná'],
  ['Komplexné', 'Podrobné'],
  ['Komplexný', 'Ucelený'],

  // kľúčov* overuse
  ['kľúčové koncepty', 'dôležité koncepty'],
  ['Kľúčovým zistením', 'Dôležitým zistením'],
  ['Kľúčovým mechanizmom', 'Hlavným mechanizmom'],  // changed to Hlavným for variety
  ['kľúčové iniciatívy', 'hlavné iniciatívy'],
  ['kľúčových materiálov', 'nevyhnutných materiálov'],

  // inovatívn* with diacritics
  ['najinovatívnejších', 'najnovátorskejších'],
  ['inovatívny', 'novátorský'],
  ['inovatívne', 'novátorské'],
  ['inovatívnych', 'novátorských'],
  ['inovatívna', 'novátorská'],

  // holistick* with diacritics
  ['holistický', 'celostný'],
  ['holistická', 'celostná'],
  ['holistické', 'celostné'],
  ['holistickým', 'celostným'],
  ['holistického', 'celostného'],

  // transformačn*
  ['transformačný', 'prelomový'],
  ['transformačná', 'prelomová'],
  ['transformačné', 'prelomové'],
];

// ─── EN pass 2 (check for any missed) ──────────────────────────────
const EN_FIXES = [
  // Double-check any Unicode-boundary misses
  ['Comprehensive', 'Full'],
  ['comprehensive', 'full'],
];

let total = 0;
total += replaceInFile(resolve(ROOT, 'messages/en.json'), EN_FIXES, 'EN');
total += replaceInFile(resolve(ROOT, 'messages/pl.json'), PL_FIXES, 'PL');
total += replaceInFile(resolve(ROOT, 'messages/sk.json'), SK_FIXES, 'SK');

console.log(`\n=== Pass 2 TOTAL: ${total} additional changes ===`);

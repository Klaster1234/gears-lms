/**
 * English text for all quiz content.
 * Maps i18n keys to display strings.
 * When i18n translation files are fully populated (Task 18),
 * components can switch to useTranslations() from next-intl.
 */
const quizTexts: Record<string, string> = {
  // ─── Module 1: 5R Quiz ──────────────────────────────────────────────────────
  'quizzes.module1.q1.question':
    'You decline a plastic bag at the store. Which R principle does this represent?',
  'quizzes.module1.q1.options.refuse': 'Refuse',
  'quizzes.module1.q1.options.reduce': 'Reduce',
  'quizzes.module1.q1.options.reuse': 'Reuse',
  'quizzes.module1.q1.options.repurpose': 'Repurpose',
  'quizzes.module1.q1.options.recycle': 'Recycle',
  'quizzes.module1.q1.feedback':
    'Correct! Refusing means saying no to things you don\'t need, like single-use bags.',

  'quizzes.module1.q2.question':
    'You print on both sides of paper. Which R principle does this represent?',
  'quizzes.module1.q2.options.refuse': 'Refuse',
  'quizzes.module1.q2.options.reduce': 'Reduce',
  'quizzes.module1.q2.options.reuse': 'Reuse',
  'quizzes.module1.q2.options.repurpose': 'Repurpose',
  'quizzes.module1.q2.options.recycle': 'Recycle',
  'quizzes.module1.q2.feedback':
    'Correct! Reducing means using less of a resource \u2014 double-sided printing halves your paper consumption.',

  'quizzes.module1.q3.question':
    'You turn an old t-shirt into a cleaning rag. Which R principle does this represent?',
  'quizzes.module1.q3.options.refuse': 'Refuse',
  'quizzes.module1.q3.options.reduce': 'Reduce',
  'quizzes.module1.q3.options.reuse': 'Reuse',
  'quizzes.module1.q3.options.repurpose': 'Repurpose',
  'quizzes.module1.q3.options.recycle': 'Recycle',
  'quizzes.module1.q3.feedback':
    'Correct! Repurposing means giving an item a new function instead of discarding it.',

  'quizzes.module1.q4.question':
    'You bring your own coffee cup to a caf\u00e9. Which R principle does this represent?',
  'quizzes.module1.q4.options.refuse': 'Refuse',
  'quizzes.module1.q4.options.reduce': 'Reduce',
  'quizzes.module1.q4.options.reuse': 'Reuse',
  'quizzes.module1.q4.options.repurpose': 'Repurpose',
  'quizzes.module1.q4.options.recycle': 'Recycle',
  'quizzes.module1.q4.feedback':
    'Correct! Reusing means using the same item multiple times for the same purpose.',

  'quizzes.module1.q5.question':
    'You walk to work instead of driving. Which R principle does this represent?',
  'quizzes.module1.q5.options.refuse': 'Refuse',
  'quizzes.module1.q5.options.reduce': 'Reduce',
  'quizzes.module1.q5.options.reuse': 'Reuse',
  'quizzes.module1.q5.options.repurpose': 'Repurpose',
  'quizzes.module1.q5.options.recycle': 'Recycle',
  'quizzes.module1.q5.feedback':
    'Correct! Walking reduces your carbon footprint and fossil fuel consumption.',

  'quizzes.module1.q6.question':
    'You turn old jars into plant pots. Which R principle does this represent?',
  'quizzes.module1.q6.options.refuse': 'Refuse',
  'quizzes.module1.q6.options.reduce': 'Reduce',
  'quizzes.module1.q6.options.reuse': 'Reuse',
  'quizzes.module1.q6.options.repurpose': 'Repurpose',
  'quizzes.module1.q6.options.recycle': 'Recycle',
  'quizzes.module1.q6.feedback':
    'Correct! Turning jars into plant pots gives them a completely new purpose.',

  'quizzes.module1.q7.question':
    'You sort glass bottles into the recycling bin. Which R principle does this represent?',
  'quizzes.module1.q7.options.refuse': 'Refuse',
  'quizzes.module1.q7.options.reduce': 'Reduce',
  'quizzes.module1.q7.options.reuse': 'Reuse',
  'quizzes.module1.q7.options.repurpose': 'Repurpose',
  'quizzes.module1.q7.options.recycle': 'Recycle',
  'quizzes.module1.q7.feedback':
    'Correct! Recycling processes materials into new products, like melting glass to make new bottles.',

  'quizzes.module1.q8.question':
    'You borrow a tool from a neighbour instead of buying one. Which R principle does this represent?',
  'quizzes.module1.q8.options.refuse': 'Refuse',
  'quizzes.module1.q8.options.reduce': 'Reduce',
  'quizzes.module1.q8.options.reuse': 'Reuse',
  'quizzes.module1.q8.options.repurpose': 'Repurpose',
  'quizzes.module1.q8.options.recycle': 'Recycle',
  'quizzes.module1.q8.feedback':
    'Correct! Borrowing and sharing means reusing existing items instead of buying new ones.',

  // ─── Module 2: Waste Segregation (Drag & Drop) ─────────────────────────────
  'quizzes.module2.categories.bio': 'Bio / Organic',
  'quizzes.module2.categories.plasticsMetal': 'Plastics & Metal',
  'quizzes.module2.categories.glass': 'Glass',
  'quizzes.module2.categories.paper': 'Paper',
  'quizzes.module2.categories.mixed': 'Mixed / Residual',
  'quizzes.module2.categories.special': 'Special Waste',

  'quizzes.module2.items.bananaPeel': 'Banana peel',
  'quizzes.module2.items.coffeeGroundsFilter': 'Coffee grounds with filter',
  'quizzes.module2.items.plasticPetBottle': 'Plastic PET bottle',
  'quizzes.module2.items.aluminiumCan': 'Aluminium can',
  'quizzes.module2.items.glassJar': 'Glass jar',
  'quizzes.module2.items.newspaperCardboard': 'Newspaper and cardboard',
  'quizzes.module2.items.thermalReceipt': 'Thermal receipt',
  'quizzes.module2.items.greasyPizzaBox': 'Greasy pizza box',
  'quizzes.module2.items.usedTissue': 'Used tissue',
  'quizzes.module2.items.aaBattery': 'AA Battery',
  'quizzes.module2.items.lightBulb': 'Light bulb (CFL)',
  'quizzes.module2.items.yogurtCup': 'Yogurt cup (plastic)',

  // ─── Module 3: Composting (Drag & Drop) ────────────────────────────────────
  'quizzes.module3.categories.greens': 'Greens (nitrogen-rich)',
  'quizzes.module3.categories.browns': 'Browns (carbon-rich)',
  'quizzes.module3.categories.forbidden': 'Forbidden',

  'quizzes.module3.items.fruitVegPeels': 'Fruit / vegetable peels',
  'quizzes.module3.items.coffeeGrounds': 'Coffee grounds',
  'quizzes.module3.items.teaBags': 'Tea bags (no staples)',
  'quizzes.module3.items.freshGrassClippings': 'Fresh grass clippings',
  'quizzes.module3.items.healthyPlantTrimmings': 'Healthy plant trimmings',
  'quizzes.module3.items.dryLeaves': 'Dry leaves',
  'quizzes.module3.items.shreddedCardboard': 'Shredded cardboard',
  'quizzes.module3.items.uncoatedPaper': 'Uncoated paper',
  'quizzes.module3.items.untreatedSawdust': 'Untreated sawdust',
  'quizzes.module3.items.smallDryTwigs': 'Small dry twigs',
  'quizzes.module3.items.meatFish': 'Meat & fish',
  'quizzes.module3.items.fatsOils': 'Fats & cooking oils',
  'quizzes.module3.items.dairy': 'Dairy products',
  'quizzes.module3.items.petWaste': 'Pet waste',
  'quizzes.module3.items.plasticGlassMetal': 'Plastic, glass & metal',

  // ─── Module 4: Sustainable Shopping (A/B Comparison) ───────────────────────
  'quizzes.module4.q1.optionA': 'Buy imported organic strawberries in December',
  'quizzes.module4.q1.optionB': 'Buy local seasonal apples',
  'quizzes.module4.q1.feedback':
    'Seasonal local produce has a smaller carbon footprint because it doesn\'t require long-distance transport or energy-intensive greenhouse growing.',

  'quizzes.module4.q2.optionA': 'Choose the cheapest cleaning product',
  'quizzes.module4.q2.optionB': 'Choose an EU Ecolabel certified cleaner',
  'quizzes.module4.q2.feedback':
    'The EU Ecolabel guarantees reduced environmental impact throughout the product\'s lifecycle, from production to disposal.',

  'quizzes.module4.q3.optionA': 'Buy individually wrapped snack portions',
  'quizzes.module4.q3.optionB': 'Buy a large bag and portion it yourself',
  'quizzes.module4.q3.feedback':
    'Buying in bulk and portioning yourself generates less packaging waste per serving.',

  'quizzes.module4.q4.optionA': 'Throw away clothes that don\'t fit',
  'quizzes.module4.q4.optionB': 'Donate or sell at a second-hand shop',
  'quizzes.module4.q4.feedback':
    'Donating or selling extends the product lifecycle and keeps textiles out of landfills.',

  'quizzes.module4.q5.optionA': 'Buy new plastic storage containers',
  'quizzes.module4.q5.optionB': 'Reuse glass jars for storage',
  'quizzes.module4.q5.feedback':
    'Reusing glass jars reduces demand for new plastic production and keeps existing materials in use.',

  'quizzes.module4.q6.optionA': 'Drive to a distant supermarket for discounts',
  'quizzes.module4.q6.optionB': 'Walk to a local shop',
  'quizzes.module4.q6.feedback':
    'Walking to a local shop means lower transport emissions and supports the local economy.',

  // ─── Module 5: Circular Economy (MCQ - Linear or Circular?) ────────────────
  'quizzes.module5.q1.question': 'A phone designed to be unrepairable. Is this linear or circular?',
  'quizzes.module5.q1.options.linear': 'Linear',
  'quizzes.module5.q1.options.circular': 'Circular',
  'quizzes.module5.q1.feedback':
    'Correct! Designing products that cannot be repaired is a hallmark of the take-make-dispose linear model.',

  'quizzes.module5.q2.question':
    'A clothing brand that takes back used garments for recycling. Is this linear or circular?',
  'quizzes.module5.q2.options.linear': 'Linear',
  'quizzes.module5.q2.options.circular': 'Circular',
  'quizzes.module5.q2.feedback':
    'Correct! Take-back programmes keep materials in the loop, a core circular economy principle.',

  'quizzes.module5.q3.question':
    'A tool library where neighbours share equipment. Is this linear or circular?',
  'quizzes.module5.q3.options.linear': 'Linear',
  'quizzes.module5.q3.options.circular': 'Circular',
  'quizzes.module5.q3.feedback':
    'Correct! Sharing maximises product use and reduces the need for new production.',

  'quizzes.module5.q4.question':
    'Single-use plastic cutlery at a festival. Is this linear or circular?',
  'quizzes.module5.q4.options.linear': 'Linear',
  'quizzes.module5.q4.options.circular': 'Circular',
  'quizzes.module5.q4.feedback':
    'Correct! Single-use items follow a linear path from production straight to waste.',

  'quizzes.module5.q5.question':
    'A company refurbishing and reselling electronics. Is this linear or circular?',
  'quizzes.module5.q5.options.linear': 'Linear',
  'quizzes.module5.q5.options.circular': 'Circular',
  'quizzes.module5.q5.feedback':
    'Correct! Refurbishment extends product life and recovers value that would otherwise be lost.',

  'quizzes.module5.q6.question':
    'Packaging designed from compostable materials. Is this linear or circular?',
  'quizzes.module5.q6.options.linear': 'Linear',
  'quizzes.module5.q6.options.circular': 'Circular',
  'quizzes.module5.q6.feedback':
    'Correct! Compostable packaging returns nutrients to the soil, closing the biological loop.',

  'quizzes.module5.q7.question':
    'Fast fashion items designed for one season. Is this linear or circular?',
  'quizzes.module5.q7.options.linear': 'Linear',
  'quizzes.module5.q7.options.circular': 'Circular',
  'quizzes.module5.q7.feedback':
    'Correct! Designing clothes for a single season encourages disposal and waste \u2014 a linear approach.',

  // ─── Module 6: External Activity ───────────────────────────────────────────
  'quizzes.module6.externalTitle': "Play 'Threads' \u2014 The Sustainable Fashion Game",
  'quizzes.module6.description':
    'Explore the impact of fast fashion through an interactive game. Make choices about clothing production and see how they affect people and the planet.',

  // ─── Module 7: Eco-labels (MCQ) ────────────────────────────────────────────
  'quizzes.module7.q1.question':
    'Which eco-label certifies sustainably managed forests and wood products?',
  'quizzes.module7.q1.options.fsc': 'FSC (Forest Stewardship Council)',
  'quizzes.module7.q1.options.gots': 'GOTS (Global Organic Textile Standard)',
  'quizzes.module7.q1.options.euEcolabel': 'EU Ecolabel',
  'quizzes.module7.q1.options.fairtrade': 'Fairtrade',
  'quizzes.module7.q1.options.msc': 'MSC (Marine Stewardship Council)',
  'quizzes.module7.q1.options.rainforestAlliance': 'Rainforest Alliance',
  'quizzes.module7.q1.feedback':
    'Correct! FSC certifies that wood and paper products come from responsibly managed forests.',

  'quizzes.module7.q2.question':
    'Which eco-label certifies organic textiles from harvest to finished product?',
  'quizzes.module7.q2.options.fsc': 'FSC (Forest Stewardship Council)',
  'quizzes.module7.q2.options.gots': 'GOTS (Global Organic Textile Standard)',
  'quizzes.module7.q2.options.euEcolabel': 'EU Ecolabel',
  'quizzes.module7.q2.options.fairtrade': 'Fairtrade',
  'quizzes.module7.q2.options.msc': 'MSC (Marine Stewardship Council)',
  'quizzes.module7.q2.options.rainforestAlliance': 'Rainforest Alliance',
  'quizzes.module7.q2.feedback':
    'Correct! GOTS ensures textiles meet strict organic and environmental criteria throughout the entire supply chain.',

  'quizzes.module7.q3.question':
    'Which eco-label certifies products with reduced environmental impact across their lifecycle?',
  'quizzes.module7.q3.options.fsc': 'FSC (Forest Stewardship Council)',
  'quizzes.module7.q3.options.gots': 'GOTS (Global Organic Textile Standard)',
  'quizzes.module7.q3.options.euEcolabel': 'EU Ecolabel',
  'quizzes.module7.q3.options.fairtrade': 'Fairtrade',
  'quizzes.module7.q3.options.msc': 'MSC (Marine Stewardship Council)',
  'quizzes.module7.q3.options.rainforestAlliance': 'Rainforest Alliance',
  'quizzes.module7.q3.feedback':
    'Correct! The EU Ecolabel is the official European Union label for products meeting high environmental standards.',

  'quizzes.module7.q4.question':
    'Which eco-label certifies fair wages and working conditions for producers?',
  'quizzes.module7.q4.options.fsc': 'FSC (Forest Stewardship Council)',
  'quizzes.module7.q4.options.gots': 'GOTS (Global Organic Textile Standard)',
  'quizzes.module7.q4.options.euEcolabel': 'EU Ecolabel',
  'quizzes.module7.q4.options.fairtrade': 'Fairtrade',
  'quizzes.module7.q4.options.msc': 'MSC (Marine Stewardship Council)',
  'quizzes.module7.q4.options.rainforestAlliance': 'Rainforest Alliance',
  'quizzes.module7.q4.feedback':
    'Correct! Fairtrade ensures producers in developing countries receive fair compensation and work in decent conditions.',

  'quizzes.module7.q5.question':
    'Which eco-label certifies sustainably caught wild seafood?',
  'quizzes.module7.q5.options.fsc': 'FSC (Forest Stewardship Council)',
  'quizzes.module7.q5.options.gots': 'GOTS (Global Organic Textile Standard)',
  'quizzes.module7.q5.options.euEcolabel': 'EU Ecolabel',
  'quizzes.module7.q5.options.fairtrade': 'Fairtrade',
  'quizzes.module7.q5.options.msc': 'MSC (Marine Stewardship Council)',
  'quizzes.module7.q5.options.rainforestAlliance': 'Rainforest Alliance',
  'quizzes.module7.q5.feedback':
    'Correct! MSC certifies fisheries that meet science-based standards for sustainable fishing.',

  'quizzes.module7.q6.question':
    'Which eco-label certifies farms meeting sustainability standards for biodiversity?',
  'quizzes.module7.q6.options.fsc': 'FSC (Forest Stewardship Council)',
  'quizzes.module7.q6.options.gots': 'GOTS (Global Organic Textile Standard)',
  'quizzes.module7.q6.options.euEcolabel': 'EU Ecolabel',
  'quizzes.module7.q6.options.fairtrade': 'Fairtrade',
  'quizzes.module7.q6.options.msc': 'MSC (Marine Stewardship Council)',
  'quizzes.module7.q6.options.rainforestAlliance': 'Rainforest Alliance',
  'quizzes.module7.q6.feedback':
    'Correct! Rainforest Alliance certifies farms that protect biodiversity, improve livelihoods, and promote sustainable land use.',

  // ─── Module 8: External Activity ───────────────────────────────────────────
  'quizzes.module8.externalTitle': 'Calculate Your Ecological Footprint',
  'quizzes.module8.description':
    'Use this interactive calculator to measure your personal ecological footprint and discover how many Earths we would need if everyone lived like you.',

  // ─── Module 9: Community Action (Scenarios) ────────────────────────────────
  'quizzes.module9.s1.scenario':
    'You notice illegal waste dumping in a park near your house. What do you do?',
  'quizzes.module9.s1.options.report': 'Report it to local authorities',
  'quizzes.module9.s1.options.compost': 'Start composting at home',
  'quizzes.module9.s1.options.ignore': "Ignore it \u2014 it's not your problem",
  'quizzes.module9.s1.feedback.report':
    'Best choice! Reporting illegal dumping to authorities is the most effective direct action to address this problem.',
  'quizzes.module9.s1.feedback.compost':
    'Composting is great, but it doesn\'t address the illegal dumping problem directly.',
  'quizzes.module9.s1.feedback.ignore':
    'Ignoring environmental violations allows them to continue and worsen.',

  'quizzes.module9.s2.scenario':
    "Your building doesn't have separate bins for recycling. What do you do?",
  'quizzes.module9.s2.options.checkPoints':
    "Check your municipality's collection points and schedule",
  'quizzes.module9.s2.options.store': 'Store recyclables in your flat indefinitely',
  'quizzes.module9.s2.options.throwMixed': 'Throw everything in mixed waste',
  'quizzes.module9.s2.feedback.checkPoints':
    'Best choice! Most municipalities offer collection points or scheduled pickups for recyclables.',
  'quizzes.module9.s2.feedback.store':
    'Storing waste indefinitely is impractical and unhygienic. Finding proper collection points is better.',
  'quizzes.module9.s2.feedback.throwMixed':
    'Throwing recyclables in mixed waste means valuable materials end up in landfill.',

  'quizzes.module9.s3.scenario':
    'A neighbour says recycling is pointless because it all goes to landfill anyway. What do you do?',
  'quizzes.module9.s3.options.shareGuide':
    'Share a local recycling guide showing where materials actually go',
  'quizzes.module9.s3.options.leadByExample': 'Just lead by example silently',
  'quizzes.module9.s3.options.argue': "Argue that they're wrong",
  'quizzes.module9.s3.feedback.shareGuide':
    'Best choice! Sharing factual information helps counter misinformation with evidence.',
  'quizzes.module9.s3.feedback.leadByExample':
    'Leading by example is positive but misses an opportunity to correct a harmful misconception.',
  'quizzes.module9.s3.feedback.argue':
    'Arguing without evidence is confrontational and unlikely to change their mind.',

  // ─── Module 10: Eco-Anxiety (Guided Form) ──────────────────────────────────
  'quizzes.module10.step1.title': 'What triggers your eco-anxiety?',
  'quizzes.module10.step1.options.climateNews': 'Climate news',
  'quizzes.module10.step1.options.droughtsFloods': 'Droughts & floods',
  'quizzes.module10.step1.options.doingTooLittle': 'Feeling of doing too little',
  'quizzes.module10.step1.options.familyConflicts': 'Family conflicts about sustainability',
  'quizzes.module10.step1.options.infoOverload': 'Information overload',

  'quizzes.module10.step2.title': 'What emotions do you experience?',
  'quizzes.module10.step2.options.helplessness': 'Helplessness',
  'quizzes.module10.step2.options.sadness': 'Sadness',
  'quizzes.module10.step2.options.anger': 'Anger',
  'quizzes.module10.step2.options.tension': 'Tension',
  'quizzes.module10.step2.options.fear': 'Fear',
  'quizzes.module10.step2.options.overwhelm': 'Overwhelm',
  'quizzes.module10.step2.options.guilt': 'Guilt',

  'quizzes.module10.step3.title': 'Which coping strategies resonate with you?',
  'quizzes.module10.step3.options.limitNews': 'Limit news consumption',
  'quizzes.module10.step3.options.digitalBreak': 'Take a digital break',
  'quizzes.module10.step3.options.microAction': 'Start one micro-action',
  'quizzes.module10.step3.options.localInitiative': 'Join a local initiative',
  'quizzes.module10.step3.options.controlList': 'Make a list of what you can control',

  'quizzes.module10.step4.title': 'Choose one weekly action',
  'quizzes.module10.step4.options.noDoomscrolling': 'One evening without doomscrolling',
  'quizzes.module10.step4.options.contactInitiative': 'Contact one local initiative',
  'quizzes.module10.step4.options.fiveRHabit': 'Practice one 5R habit for 7 days',
  'quizzes.module10.step4.options.controlBoundaries': 'Write a list of control boundaries',

  'quizzes.module10.step5.title': 'How ready do you feel to take action?',
  'quizzes.module10.step5.options.scale1': 'Not ready at all',
  'quizzes.module10.step5.options.scale2': 'Slightly ready',
  'quizzes.module10.step5.options.scale3': 'Moderately ready',
  'quizzes.module10.step5.options.scale4': 'Ready',
  'quizzes.module10.step5.options.scale5': 'Very ready',
};

/**
 * Get the display text for an i18n key.
 * Falls back to the key itself if no translation is found.
 */
export function t(key: string): string {
  return quizTexts[key] ?? key;
}

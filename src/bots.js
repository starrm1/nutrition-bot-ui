// Specialist bots available in the Nutrition Center
export const BOTS = {
  // ── Library Bots ────────────────────────────────────────
  calories: {
    id: 'calories',
    name: 'Calorie Bot',
    emoji: '🔥',
    color: '#f97316',
    description: 'Tracks calories & macros',
    category: 'library',
    keywords: ['calorie', 'calories', 'kcal', 'macro', 'macros', 'protein', 'carb', 'carbs', 'fat', 'fats', 'energy', 'burn', 'intake', 'how many', 'how much'],
  },
  meals: {
    id: 'meals',
    name: 'Meal Planner Bot',
    emoji: '🥗',
    color: '#22c55e',
    description: 'Plans balanced meals',
    category: 'library',
    keywords: ['meal', 'meals', 'plan', 'planning', 'breakfast', 'lunch', 'dinner', 'snack', 'recipe', 'recipes', 'eat', 'eating', 'food', 'foods', 'diet', 'week', 'daily', 'menu'],
  },
  vitamins: {
    id: 'vitamins',
    name: 'Vitamins & Minerals Bot',
    emoji: '💊',
    color: '#a855f7',
    description: 'Vitamins, minerals & supplements',
    category: 'library',
    keywords: ['vitamin', 'vitamins', 'mineral', 'minerals', 'supplement', 'supplements', 'iron', 'calcium', 'zinc', 'magnesium', 'potassium', 'omega', 'deficiency', 'nutrient', 'nutrients'],
  },
  hydration: {
    id: 'hydration',
    name: 'Hydration Bot',
    emoji: '💧',
    color: '#3b82f6',
    description: 'Water intake & hydration',
    category: 'library',
    keywords: ['water', 'hydration', 'hydrate', 'drink', 'fluid', 'fluids', 'thirsty', 'dehydrate', 'dehydration', 'electrolyte', 'electrolytes'],
  },
  allergies: {
    id: 'allergies',
    name: 'Dietary Needs Bot',
    emoji: '🚫',
    color: '#ef4444',
    description: 'Allergies, intolerances & restrictions',
    category: 'library',
    keywords: ['allergy', 'allergies', 'intolerance', 'gluten', 'dairy', 'vegan', 'vegetarian', 'lactose', 'nut', 'nuts', 'restrict', 'avoid', 'free', 'celiac', 'halal', 'kosher'],
  },

  // ── Departments ─────────────────────────────────────────
  food_specialist: {
    id: 'food_specialist',
    name: 'Food Specialist Dept',
    emoji: '🍽️',
    color: '#f59e0b',
    description: 'Food quality & preparation',
    category: 'department',
    keywords: ['cook', 'cooking', 'prepare', 'preparation', 'raw', 'processed', 'organic', 'fresh', 'frozen', 'fermented', 'probiotic', 'prebiotic', 'fiber', 'whole food', 'whole grain', 'ingredient'],
  },
  life_stage: {
    id: 'life_stage',
    name: 'Life Stage Dept',
    emoji: '👶',
    color: '#06b6d4',
    description: 'Nutrition across life stages',
    category: 'department',
    keywords: ['baby', 'infant', 'child', 'children', 'kid', 'kids', 'teen', 'teenage', 'elderly', 'senior', 'pregnant', 'pregnancy', 'breastfeeding', 'aging', 'toddler', 'menopause'],
  },
  performance: {
    id: 'performance',
    name: 'Performance Dept',
    emoji: '💪',
    color: '#10b981',
    description: 'Sports & performance nutrition',
    category: 'department',
    keywords: ['sport', 'sports', 'athlete', 'athletic', 'exercise', 'workout', 'gym', 'muscle', 'endurance', 'recovery', 'pre-workout', 'post-workout', 'strength', 'training', 'run', 'running', 'lift', 'lifting'],
  },
  wellness: {
    id: 'wellness',
    name: 'Wellness Dept',
    emoji: '🌿',
    color: '#84cc16',
    description: 'Gut health, sleep & immunity',
    category: 'department',
    keywords: ['stress', 'sleep', 'mental', 'mood', 'gut', 'gut health', 'inflammation', 'immune', 'immunity', 'antioxidant', 'detox', 'hormone', 'hormones', 'microbiome', 'anti-inflammatory', 'cortisol'],
  },
};

// Bot responses keyed by bot id and topic
const RESPONSES = {
  calories: {
    default: [
      "Based on your question, here's what I know about calories: The average adult needs 2,000–2,500 kcal/day depending on activity level, age, and goals.",
      "Calorie needs vary. A sedentary adult averages ~1,800–2,200 kcal/day. Athletes may need 3,000+ kcal. I can help you estimate your personal target if you share your goals!",
      "Tracking calories is a great way to manage your nutrition. Common high-calorie foods include oils (120 kcal/tbsp), nuts (170 kcal/oz), and avocados (~240 kcal each).",
    ],
    protein: "Protein provides 4 kcal/gram. Adults typically need 0.8–1.6g of protein per kg of body weight. High-protein foods include chicken breast (~31g/100g), Greek yogurt (~10g/100g), and lentils (~9g/100g).",
    carbs: "Carbohydrates also provide 4 kcal/gram. They're your body's primary energy source. Focus on complex carbs like oats, brown rice, and sweet potatoes for sustained energy.",
    fat: "Dietary fat provides 9 kcal/gram — the most energy-dense macronutrient. Healthy fats from avocados, olive oil, and nuts support brain function and hormone production.",
  },
  meals: {
    default: [
      "For a balanced meal, aim for: ½ plate vegetables, ¼ lean protein, ¼ whole grains, plus a small amount of healthy fat.",
      "A simple weekly meal plan tip: prep proteins on Sunday (grilled chicken, boiled eggs, legumes) and mix with different veggies each day to keep meals varied.",
      "Balanced eating doesn't have to be complicated. Focus on whole foods: fruits, vegetables, lean proteins, whole grains, and healthy fats at each meal.",
    ],
    breakfast: "A nutritious breakfast could be: oatmeal with berries and a side of Greek yogurt, or two eggs with whole-grain toast and avocado. Aim for protein + fiber to keep you full.",
    lunch: "A great lunch: a large salad with chickpeas, quinoa, roasted veggies, and a tahini dressing — packs protein, fiber, and healthy fats in one bowl.",
    dinner: "For dinner, try a simple formula: a palm-sized portion of protein (fish, chicken, tofu), a fist of whole grains (brown rice, quinoa), and two fists of vegetables.",
  },
  vitamins: {
    default: [
      "Key vitamins to focus on: Vitamin D (from sunlight & fatty fish), Vitamin B12 (from animal products or supplements for vegans), and Vitamin C (from citrus fruits, bell peppers).",
      "Most people get enough vitamins from a varied diet. However, Vitamin D and Magnesium deficiencies are common. Consider getting a blood panel to check your levels.",
      "Fat-soluble vitamins (A, D, E, K) are stored in the body, so it's possible to over-supplement. Water-soluble vitamins (B, C) are excreted if excess — but balance is still key.",
    ],
    iron: "Iron is essential for carrying oxygen in the blood. Found in red meat, spinach, lentils, and fortified cereals. Pair plant-based iron with Vitamin C for better absorption.",
    calcium: "Calcium supports bone health. Great sources include dairy, fortified plant milks, broccoli, almonds, and sardines. Adults need ~1,000 mg/day.",
    omega: "Omega-3 fatty acids (EPA/DHA) support heart and brain health. Found in fatty fish (salmon, mackerel), flaxseeds, chia seeds, and walnuts. Aim for 2 servings of fatty fish per week.",
  },
  hydration: {
    default: [
      "The general guideline is ~8 cups (2 liters) of water per day, but needs vary by body size, activity level, and climate. Your urine color is a good indicator — pale yellow is ideal.",
      "You get about 20% of your daily water from food (fruits, vegetables, soups). The remaining 80% should come from beverages, mainly water.",
      "Signs of mild dehydration: fatigue, headache, difficulty concentrating, and dark urine. Staying ahead of thirst is key — don't wait until you feel thirsty.",
    ],
    electrolytes: "Electrolytes (sodium, potassium, magnesium) help retain water and support muscle function. After intense exercise, replenish with water + a banana + a pinch of salt, or a sports drink.",
  },
  allergies: {
    default: [
      "For food allergies, always read labels carefully. The most common allergens include peanuts, tree nuts, milk, eggs, wheat, soy, fish, and shellfish.",
      "Following a vegan diet? Focus on getting complete proteins by combining foods like rice + beans, or eating soy, quinoa, and seitan — which are complete proteins on their own.",
      "Gluten-free eating means avoiding wheat, barley, and rye. Naturally gluten-free grains include rice, quinoa, oats (certified GF), millet, and buckwheat.",
    ],
    gluten: "Gluten is a protein in wheat, barley, and rye. For those with celiac disease or gluten sensitivity, safe grains include rice, quinoa, certified gluten-free oats, and millet.",
    dairy: "Dairy-free alternatives include oat milk, almond milk, soy milk, and coconut yogurt. For calcium, focus on fortified plant milks, leafy greens, and beans.",
    vegan: "A well-planned vegan diet can meet all nutritional needs. Pay special attention to Vitamin B12, Vitamin D, iron, calcium, and omega-3s — these may need supplementation.",
  },
  food_specialist: {
    default: [
      "Whole foods — minimally processed fruits, vegetables, legumes, whole grains, and lean proteins — form the foundation of a nutritious diet. The less processed, the better.",
      "Cooking method matters. Steaming, baking, and sautéing preserve more nutrients than deep-frying. Boiling can leach water-soluble vitamins — save the cooking water for soups!",
      "Fermented foods like yogurt, kefir, kimchi, sauerkraut, and miso are rich in probiotics that support a healthy gut microbiome.",
    ],
    fermented: "Fermented foods supply beneficial bacteria (probiotics) and improve nutrient absorption. Try adding yogurt, kefir, miso, tempeh, or kombucha to your routine.",
    organic: "Organic produce reduces pesticide exposure but isn't always necessary across the board. The 'Dirty Dozen' list highlights the highest-pesticide conventional produce worth buying organic.",
    fiber: "Dietary fiber feeds beneficial gut bacteria and supports digestion. Aim for 25–38g/day from whole grains, legumes, vegetables, and fruit. Both soluble and insoluble fiber are important.",
    probiotic: "Probiotics (live bacteria) and prebiotics (fiber that feeds them) work together. Probiotics: yogurt, kefir, sauerkraut. Prebiotics: garlic, onions, bananas, oats, asparagus.",
  },
  life_stage: {
    default: [
      "Nutritional needs change throughout life. Infants need DHA for brain development; teens need calcium and iron; adults focus on heart health; seniors prioritize protein and vitamin D.",
      "Children need nutrient-dense foods to support rapid growth. Focus on calcium, iron, zinc, and vitamin D. Limit ultra-processed snacks and sugary drinks.",
      "As we age, calorie needs decrease but nutrient needs stay high or increase. Seniors should prioritize protein, calcium, vitamin D, B12, and omega-3s.",
    ],
    pregnant: "During pregnancy, key nutrients include folate (prevents neural tube defects), iron, calcium, DHA, and iodine. Most OB/GYNs recommend a prenatal vitamin to cover gaps.",
    baby: "Breastmilk or formula meets all an infant's needs for the first 6 months. After that, introduce single-ingredient purées gradually. Avoid honey and whole cow's milk before age 1.",
    teen: "Teenagers have high calcium and iron needs due to growth spurts and (for girls) menstruation. Encourage dairy or fortified alternatives, lean meats, leafy greens, and legumes.",
    elderly: "Older adults often under-eat protein, leading to muscle loss (sarcopenia). Aim for 1.0–1.2g of protein per kg body weight and include resistance exercise to maintain muscle.",
    menopause: "During menopause, focus on calcium and vitamin D for bone health, phytoestrogens (soy, flaxseed) for symptom support, and heart-healthy fats to manage cardiovascular risk.",
  },
  performance: {
    default: [
      "For active individuals, carbohydrates are the primary fuel. Time them around workouts: a small carb-rich snack 30–60 min before, and a protein + carb meal within 45 min after.",
      "Protein is critical for muscle repair and growth. Athletes typically need 1.2–2.0g of protein per kg body weight daily, spread across 3–5 meals.",
      "Don't forget micronutrients: iron (oxygen transport), magnesium (muscle function), and vitamin D (bone and muscle health) are especially important for athletes.",
    ],
    muscle: "To build muscle, pair progressive resistance training with adequate protein (1.6–2.2g/kg/day) and a slight calorie surplus (~200–300 kcal above maintenance).",
    recovery: "Post-workout recovery nutrition: 20–40g of protein to stimulate muscle protein synthesis, plus carbohydrates to replenish glycogen. Chocolate milk is a surprisingly effective recovery drink.",
    endurance: "Endurance athletes need higher carbohydrate intake (6–10g/kg/day). During events over 90 minutes, consuming 30–60g of carbs per hour sustains performance.",
    strength: "For strength training, prioritize protein distribution across meals rather than one large dose. Leucine-rich proteins (whey, eggs, chicken) best stimulate muscle protein synthesis.",
  },
  wellness: {
    default: [
      "A healthy gut microbiome thrives on diversity. Eat a wide variety of plant-based foods — aim for 30+ different plants per week through fruits, vegetables, legumes, nuts, seeds, and whole grains.",
      "Chronic inflammation is linked to many diseases. An anti-inflammatory diet emphasizes colorful vegetables, fatty fish, olive oil, nuts, and berries while limiting processed foods and refined sugars.",
      "Nutrition and sleep are deeply connected. Magnesium, tryptophan (turkey, dairy), and complex carbs in the evening can support better sleep quality.",
    ],
    sleep: "Nutrition supports sleep quality. Magnesium-rich foods (pumpkin seeds, almonds, spinach) relax muscles. Tryptophan (turkey, eggs, dairy) supports melatonin production. Avoid large meals and caffeine 4–6 hours before bed.",
    stress: "Chronic stress depletes magnesium, vitamin C, and B vitamins. Combat this with leafy greens, citrus, whole grains, and nuts. Adaptogenic herbs like ashwagandha show some evidence for stress reduction.",
    immune: "Key nutrients for immune function: Vitamin C (citrus, bell peppers), Vitamin D (fatty fish, sunlight), Zinc (oysters, pumpkin seeds, legumes), and probiotics from fermented foods.",
    inflammation: "Anti-inflammatory foods: fatty fish (omega-3s), turmeric (curcumin), berries (antioxidants), extra virgin olive oil, and leafy greens. Limit red meat, trans fats, refined carbs, and sugary drinks.",
    gut: "Gut health is foundational to overall wellness. Support it with prebiotic fiber (onions, garlic, leeks, oats), fermented foods, diverse plant intake, and adequate hydration. Limit artificial sweeteners.",
    hormone: "Hormonal balance is supported by healthy fats (avocado, olive oil, fatty fish), adequate protein, cruciferous vegetables for estrogen metabolism, and managing blood sugar through whole foods.",
  },
};

// ── Diet Director ────────────────────────────────────────
export const DIET_DIRECTOR = {
  id: 'diet_director',
  name: 'Diet Director',
  emoji: '👨‍⚕️',
  color: '#6366f1',
  description: 'Oversees all departments & coordinates specialist responses',
};

// Routing messages the Diet Director uses to introduce department responses
const DIRECTOR_ROUTING = [
  (names) => `I've reviewed your question and I'm directing it to ${names}. Here's what they have for you:`,
  (names) => `Good question. I'm routing this to ${names} — they're the right specialists for this.`,
  (names) => `I'm coordinating with ${names} on this. Their expert responses are below:`,
  (names) => `I've authorised ${names} to respond. Stand by for their guidance:`,
];

/**
 * Determine which specialist bots should handle the question.
 * Returns an array of bot IDs (1–3 most relevant).
 */
export function routeQuestion(question) {
  const q = question.toLowerCase();
  const scores = Object.entries(BOTS).map(([id, bot]) => {
    const score = bot.keywords.reduce((acc, kw) => acc + (q.includes(kw) ? 1 : 0), 0);
    return { id, score };
  });

  const matched = scores.filter(s => s.score > 0).sort((a, b) => b.score - a.score);

  // If nothing matched, route to a general default set
  if (matched.length === 0) {
    return ['calories', 'meals'];
  }

  // Return top 1–3 matching bots
  return matched.slice(0, 3).map(s => s.id);
}

/**
 * Generate a response from a specific specialist bot.
 */
export function getBotResponse(botId, question) {
  const q = question.toLowerCase();
  const responses = RESPONSES[botId];
  if (!responses) return 'I can help you with that nutrition question!';

  // Check for specific sub-topic matches
  for (const [key, response] of Object.entries(responses)) {
    if (key !== 'default' && q.includes(key)) {
      return response;
    }
  }

  // Return a random default response for variety
  const defaults = responses.default;
  return defaults[Math.floor(Math.random() * defaults.length)];
}

/**
 * Return all bots belonging to a given category ('library' or 'department').
 */
export function getBotsByCategory(category) {
  return Object.values(BOTS).filter(bot => bot.category === category);
}

/**
 * Return a Director routing message listing the given bot names.
 */
export function getDirectorRoutingMessage(botIds) {
  const names = botIds.map(id => BOTS[id]?.name ?? id)
  const nameList = names.length === 1
    ? names[0]
    : names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1]
  const template = DIRECTOR_ROUTING[Math.floor(Math.random() * DIRECTOR_ROUTING.length)]
  return template(nameList)
}

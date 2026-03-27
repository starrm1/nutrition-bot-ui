// Specialist bots available in the Nutrition Center
export const BOTS = {
  calories: {
    id: 'calories',
    name: 'Calorie Bot',
    emoji: '🔥',
    color: '#f97316',
    description: 'Tracks calories & macros',
    keywords: ['calorie', 'calories', 'kcal', 'macro', 'macros', 'protein', 'carb', 'carbs', 'fat', 'fats', 'energy', 'burn', 'intake', 'how many', 'how much'],
  },
  meals: {
    id: 'meals',
    name: 'Meal Planner Bot',
    emoji: '🥗',
    color: '#22c55e',
    description: 'Plans balanced meals',
    keywords: ['meal', 'meals', 'plan', 'planning', 'breakfast', 'lunch', 'dinner', 'snack', 'recipe', 'recipes', 'eat', 'eating', 'food', 'foods', 'diet', 'week', 'daily', 'menu'],
  },
  vitamins: {
    id: 'vitamins',
    name: 'Vitamins & Minerals Bot',
    emoji: '💊',
    color: '#a855f7',
    description: 'Vitamins, minerals & supplements',
    keywords: ['vitamin', 'vitamins', 'mineral', 'minerals', 'supplement', 'supplements', 'iron', 'calcium', 'zinc', 'magnesium', 'potassium', 'omega', 'deficiency', 'nutrient', 'nutrients'],
  },
  hydration: {
    id: 'hydration',
    name: 'Hydration Bot',
    emoji: '💧',
    color: '#3b82f6',
    description: 'Water intake & hydration',
    keywords: ['water', 'hydration', 'hydrate', 'drink', 'fluid', 'fluids', 'thirsty', 'dehydrate', 'dehydration', 'electrolyte', 'electrolytes'],
  },
  allergies: {
    id: 'allergies',
    name: 'Dietary Needs Bot',
    emoji: '🚫',
    color: '#ef4444',
    description: 'Allergies, intolerances & restrictions',
    keywords: ['allergy', 'allergies', 'intolerance', 'gluten', 'dairy', 'vegan', 'vegetarian', 'lactose', 'nut', 'nuts', 'restrict', 'avoid', 'free', 'celiac', 'halal', 'kosher'],
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
};

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

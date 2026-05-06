# nutrition-bot-ui

## How to Ask Questions — Director Routing

All questions go through the **Diet Director (bot_21)** first. The Director reads your question, identifies the topic, and automatically forwards it to the right department head. The department head works with their co and sub bots to answer it, then the answer comes back to you through the Director.

### Routing Flow

```
You → Diet Director (bot_21)
           ↓  (analyses your question topic)
     Correct Department Head
           ↓  (coordinates with co & sub bots)
     Answer → Diet Director → You
```

### Which Department Handles What?

| Department Head | Bot | Topics |
|---|---|---|
| Food Specialist | bot_22 | Food types, food groups, ingredients, food quality, storage, preparation |
| Nutrient Specialist | bot_23 | Vitamins, minerals, protein, carbs, fats, deficiencies, absorption |
| Meal Planning Specialist | bot_24 | Meal prep, weekly plans, portion planning, grocery lists, batch cooking |
| Texture Specialist | bot_25 | Soft/purée/modified texture diets, chewing/swallowing difficulty |
| Dietary Restriction Specialist | bot_26 | Allergies, intolerances, vegan, gluten-free, kosher, halal, elimination diets |
| Sports Nutrition Specialist | bot_27 | Athletic performance, pre/post workout, muscle building, recovery |
| Weight Management Specialist | bot_28 | Weight loss/gain, calorie deficit/surplus, metabolism, BMI |
| Gut Health Specialist | bot_29 | Probiotics, microbiome, IBS, bloating, fermented foods, digestive health |
| Life Stage Specialist | bot_30 | Pregnancy, infant, child, teen, adult, senior, menopause nutrition |

> If a question doesn't match any single department, the Director answers directly using full library access (all 20 library bots, access number 789). If a question spans multiple departments, the Director forwards it to all relevant departments and compiles a combined answer.

---
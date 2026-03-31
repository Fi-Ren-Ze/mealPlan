export interface UrlRecipe {
  id: string;
  name: string;
  type: 'url';
  url: string;
  category: string;
}

export interface TextRecipe {
  id: string;
  name: string;
  type: 'text';
  text: string;
  category: string;
}

export type Recipe = UrlRecipe | TextRecipe;

export const mockRecipes: Recipe[] = [
  // URL recipes
  { id: '1',  name: 'Spaghetti Bolognese',   type: 'url',  url: 'https://example.com/recipes/spaghetti-bolognese',   category: 'Dinner' },
  { id: '2',  name: 'Avocado Toast',          type: 'url',  url: 'https://example.com/recipes/avocado-toast',          category: 'Breakfast' },
  { id: '3',  name: 'Chicken Caesar Salad',   type: 'url',  url: 'https://example.com/recipes/chicken-caesar-salad',   category: 'Lunch' },
  { id: '4',  name: 'Beef Tacos',             type: 'url',  url: 'https://example.com/recipes/beef-tacos',             category: 'Dinner' },
  { id: '5',  name: 'Banana Pancakes',        type: 'url',  url: 'https://example.com/recipes/banana-pancakes',        category: 'Breakfast' },
  { id: '6',  name: 'Tomato Basil Soup',      type: 'url',  url: 'https://example.com/recipes/tomato-basil-soup',      category: 'Lunch' },
  { id: '7',  name: 'Grilled Salmon',         type: 'url',  url: 'https://example.com/recipes/grilled-salmon',         category: 'Dinner' },
  { id: '8',  name: 'Greek Yogurt Parfait',   type: 'url',  url: 'https://example.com/recipes/greek-yogurt-parfait',   category: 'Breakfast' },
  { id: '9',  name: 'Turkey BLT Wrap',        type: 'url',  url: 'https://example.com/recipes/turkey-blt-wrap',        category: 'Lunch' },
  { id: '10', name: 'Mushroom Risotto',       type: 'url',  url: 'https://example.com/recipes/mushroom-risotto',       category: 'Dinner' },
  { id: '11', name: 'Overnight Oats',         type: 'url',  url: 'https://example.com/recipes/overnight-oats',         category: 'Breakfast' },
  { id: '12', name: 'Caprese Sandwich',       type: 'url',  url: 'https://example.com/recipes/caprese-sandwich',       category: 'Lunch' },

  // Manually entered recipes
  {
    id: '13',
    name: 'Scrambled Eggs & Toast',
    type: 'text',
    category: 'Breakfast',
    text: `Scrambled Eggs & Toast

Ingredients:
- 3 large eggs
- 2 tbsp butter
- 2 slices sourdough bread
- Salt and pepper to taste
- Fresh chives (optional)

Steps:
1. Crack eggs into a bowl, season with salt and pepper, whisk well.
2. Melt butter in a non-stick pan over low heat.
3. Pour in eggs and gently fold with a spatula until just set.
4. Toast bread and serve eggs on top.
5. Garnish with chives if desired.`,
  },
  {
    id: '14',
    name: 'Veggie Stir Fry',
    type: 'text',
    category: 'Lunch',
    text: `Veggie Stir Fry

Ingredients:
- 1 cup broccoli florets
- 1 red bell pepper, sliced
- 1 carrot, julienned
- 2 cloves garlic, minced
- 2 tbsp soy sauce
- 1 tbsp sesame oil
- 1 tsp ginger, grated
- Cooked rice to serve

Steps:
1. Heat sesame oil in a wok over high heat.
2. Add garlic and ginger, stir for 30 seconds.
3. Add carrots and broccoli, stir fry for 3 minutes.
4. Add bell pepper, soy sauce, stir fry another 2 minutes.
5. Serve over rice.`,
  },
  {
    id: '15',
    name: 'Lemon Herb Chicken',
    type: 'text',
    category: 'Dinner',
    text: `Lemon Herb Chicken

Ingredients:
- 2 chicken breasts
- 2 tbsp olive oil
- Juice of 1 lemon
- 2 cloves garlic, minced
- 1 tsp dried oregano
- 1 tsp dried thyme
- Salt and pepper to taste

Steps:
1. Mix olive oil, lemon juice, garlic, oregano, thyme, salt and pepper.
2. Marinate chicken in the mixture for at least 30 minutes.
3. Heat a skillet over medium-high heat.
4. Cook chicken 6-7 minutes per side until cooked through.
5. Rest for 5 minutes before slicing.`,
  },
];

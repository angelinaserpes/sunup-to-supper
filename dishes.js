/*
  YOUR DISHES LIVE HERE.
  ---------------------------------------------------------------
  These are placeholders. To make the site yours, edit this file only:
    - Each meal (breakfast, lunch, dinner) is a list of dishes.
    - Copy one { ... } block, paste it, change the text.
    - "hue" is the card accent colour (0-360 on the colour wheel).
  Nothing else on the site needs to change.
*/
window.DISHES = {
  breakfast: [
    {
      name: "Masala Omelette",
      blurb: "Eggs, onion, chilli and coriander, folded and golden in five minutes.",
      time: "10 min", serves: "1", level: "Easy", hue: 42,
      tags: ["Eggs", "One pan"],
      ingredients: [
        "2 eggs",
        "2 tbsp finely chopped onion",
        "1 small green chilli, chopped",
        "1 tbsp chopped coriander",
        "A pinch of turmeric and chilli powder",
        "Salt, to taste",
        "1 tsp butter or oil"
      ],
      steps: [
        "Beat the eggs with the onion, chilli, coriander, spices and salt.",
        "Heat the butter in a non-stick pan over medium heat.",
        "Pour in the eggs and let them set for about a minute without stirring.",
        "Fold in half, cook 30 seconds more on each side, and serve with toast."
      ]
    },
    {
      name: "Overnight Oats",
      blurb: "Stir it together at night, grab it from the fridge in the morning.",
      time: "5 min + overnight", serves: "1", level: "Easy", hue: 28,
      tags: ["No cook", "Make ahead"],
      ingredients: [
        "1/2 cup rolled oats",
        "1/2 cup milk (any kind)",
        "1/4 cup yogurt",
        "1 tsp chia seeds (optional)",
        "1 tsp honey or maple syrup",
        "Fruit and nuts, to top"
      ],
      steps: [
        "Mix the oats, milk, yogurt, chia and honey in a jar.",
        "Cover and leave in the fridge overnight, or at least 4 hours.",
        "Stir, loosen with a splash of milk if it is too thick.",
        "Top with fruit and nuts and eat cold."
      ]
    },
    {
      name: "Avocado Toast with Egg",
      blurb: "Crunchy toast, creamy avocado, a jammy egg on top.",
      time: "10 min", serves: "1", level: "Easy", hue: 95,
      tags: ["Toast", "Quick"],
      ingredients: [
        "2 slices of bread",
        "1 ripe avocado",
        "1 egg",
        "A squeeze of lemon",
        "Chilli flakes, salt and pepper"
      ],
      steps: [
        "Toast the bread until properly crisp.",
        "Mash the avocado with lemon, salt and pepper.",
        "Fry or soft-boil the egg (6 and a half minutes for jammy).",
        "Spread the avocado on the toast, add the egg and finish with chilli flakes."
      ]
    },
    {
      name: "Banana Pancakes",
      blurb: "A lazy-weekend stack that only needs one bowl.",
      time: "20 min", serves: "2", level: "Easy", hue: 48,
      tags: ["Sweet", "Weekend"],
      ingredients: [
        "1 cup all-purpose flour",
        "1 tbsp sugar",
        "2 tsp baking powder",
        "A pinch of salt",
        "1 ripe banana, mashed",
        "1 egg",
        "3/4 cup milk",
        "Butter, for the pan"
      ],
      steps: [
        "Whisk the flour, sugar, baking powder and salt in a bowl.",
        "Add the banana, egg and milk and stir until just combined (lumps are fine).",
        "Melt a little butter in a pan over medium heat and pour in small rounds of batter.",
        "Flip when bubbles appear on top, cook 1 more minute, and stack with syrup."
      ]
    }
  ],

  lunch: [
    {
      name: "Dal Tadka and Rice",
      blurb: "The comfort bowl: soft lentils with a sizzling garlic and cumin tempering.",
      time: "35 min", serves: "2", level: "Easy", hue: 38,
      tags: ["Comfort", "Vegetarian"],
      ingredients: [
        "1/2 cup toor or masoor dal, rinsed",
        "1 1/2 cups water",
        "1/4 tsp turmeric",
        "1 tomato, chopped",
        "1 tbsp ghee or oil",
        "1 tsp cumin seeds",
        "3 cloves garlic, sliced",
        "1 dried red chilli",
        "Salt and coriander",
        "Cooked rice, to serve"
      ],
      steps: [
        "Simmer the dal with water, turmeric and tomato until completely soft, 20 to 25 minutes (or pressure cook).",
        "Mash lightly, salt it, and add water until it is as loose as you like.",
        "Heat the ghee in a small pan and add the cumin, garlic and red chilli until the garlic turns golden.",
        "Pour the sizzling tempering over the dal, add coriander and serve with rice."
      ]
    },
    {
      name: "Chicken Wrap",
      blurb: "Spiced chicken, crunchy veg and yogurt sauce rolled into a tortilla.",
      time: "20 min", serves: "2", level: "Easy", hue: 18,
      tags: ["Packable", "High protein"],
      ingredients: [
        "1 chicken breast, sliced thin",
        "1 tsp paprika or chilli powder",
        "1/2 tsp cumin powder",
        "2 tortillas",
        "Lettuce, cucumber and onion, sliced",
        "3 tbsp yogurt + a squeeze of lemon",
        "Salt, pepper and oil"
      ],
      steps: [
        "Toss the chicken with the spices, salt and a little oil.",
        "Cook in a hot pan for 5 to 6 minutes until browned and cooked through.",
        "Stir the yogurt with lemon, salt and pepper for the sauce.",
        "Warm the tortillas, pile on the veg, chicken and sauce, and roll up tightly."
      ]
    },
    {
      name: "Veg Fried Rice",
      blurb: "The best use for yesterday's rice. Ready before a delivery would arrive.",
      time: "15 min", serves: "2", level: "Easy", hue: 70,
      tags: ["Leftovers", "One pan"],
      ingredients: [
        "2 cups cold cooked rice",
        "1 cup mixed chopped veg (carrot, beans, capsicum, peas)",
        "2 cloves garlic, minced",
        "2 spring onions, sliced",
        "1 1/2 tbsp soy sauce",
        "1 tsp vinegar",
        "Oil, salt and pepper"
      ],
      steps: [
        "Heat oil in a wide pan on high heat and fry the garlic for 15 seconds.",
        "Add the vegetables and stir-fry 2 to 3 minutes so they stay crunchy.",
        "Add the rice, breaking up any clumps, then the soy sauce, vinegar and pepper.",
        "Toss for 2 minutes, taste for salt and finish with spring onion."
      ]
    },
    {
      name: "Grilled Cheese and Tomato Soup",
      blurb: "Crisp, melty sandwich with a quick soup for dunking.",
      time: "25 min", serves: "2", level: "Easy", hue: 8,
      tags: ["Cozy", "Vegetarian"],
      ingredients: [
        "4 slices of bread",
        "4 slices of cheese",
        "Butter",
        "1 can (400 g) crushed tomatoes",
        "1/2 onion, chopped",
        "1 clove garlic",
        "1/2 cup water or stock",
        "A splash of cream or milk"
      ],
      steps: [
        "Soften the onion and garlic in butter, add the tomatoes and water and simmer 10 minutes.",
        "Blend until smooth, stir in the cream and season.",
        "Butter the bread on the outside, fill with cheese and cook in a pan over medium-low heat.",
        "Flip when golden, cook until the cheese melts, and serve with the soup."
      ]
    }
  ],

  dinner: [
    {
      name: "Butter Chicken",
      blurb: "The one worth staying in for. Creamy, tomatoey and gently spiced.",
      time: "45 min", serves: "3", level: "Medium", hue: 16,
      tags: ["Showstopper", "Freezes well"],
      ingredients: [
        "500 g boneless chicken, cubed",
        "1/2 cup yogurt",
        "1 tbsp ginger-garlic paste",
        "1 tsp each chilli powder and garam masala",
        "2 tbsp butter",
        "1 onion, finely chopped",
        "1 cup tomato puree",
        "1/3 cup cream",
        "1 tsp sugar, salt to taste",
        "Rice or naan, to serve"
      ],
      steps: [
        "Marinate the chicken in yogurt, ginger-garlic paste, the spices and salt for at least 20 minutes.",
        "Brown the chicken in half the butter, then set it aside.",
        "Cook the onion in the remaining butter until soft, add the tomato puree and simmer 10 minutes.",
        "Return the chicken, add the cream and sugar, and simmer 10 minutes until thick and glossy."
      ]
    },
    {
      name: "Creamy Garlic Pasta",
      blurb: "Silky, garlicky and done in the time it takes to boil the pasta.",
      time: "20 min", serves: "2", level: "Easy", hue: 52,
      tags: ["Quick", "Vegetarian"],
      ingredients: [
        "200 g pasta",
        "1 tbsp butter",
        "4 cloves garlic, minced",
        "3/4 cup milk or cream",
        "1/2 cup grated cheese",
        "Chilli flakes and mixed herbs",
        "Salt and pepper"
      ],
      steps: [
        "Boil the pasta in well-salted water and keep half a cup of the water.",
        "Melt the butter and cook the garlic gently for 1 minute.",
        "Add the milk and cheese and stir until smooth.",
        "Toss in the pasta, loosen with pasta water, and finish with chilli flakes and herbs."
      ]
    },
    {
      name: "Paneer Tikka Bowl",
      blurb: "Charred spiced paneer over rice with crunchy salad and mint yogurt.",
      time: "30 min", serves: "2", level: "Easy", hue: 30,
      tags: ["Vegetarian", "Bowl"],
      ingredients: [
        "200 g paneer, cubed",
        "1 capsicum and 1 onion, cut into chunks",
        "3 tbsp thick yogurt",
        "1 tsp each chilli powder, cumin and garam masala",
        "1 tsp ginger-garlic paste",
        "Cooked rice",
        "Cucumber, lemon and mint yogurt, to serve"
      ],
      steps: [
        "Mix the yogurt, spices, ginger-garlic paste and salt, then coat the paneer and vegetables.",
        "Rest 15 minutes while the rice cooks.",
        "Sear in a very hot pan (or under the broiler) until charred at the edges.",
        "Serve over rice with cucumber, lemon and a spoon of mint yogurt."
      ]
    },
    {
      name: "One-Pot Chicken Biryani",
      blurb: "A simplified weeknight biryani: everything cooks together in one pot.",
      time: "50 min", serves: "3", level: "Medium", hue: 36,
      tags: ["One pot", "Weekend"],
      ingredients: [
        "400 g chicken, bone-in or boneless",
        "1 1/2 cups basmati rice, soaked 20 minutes",
        "2 onions, thinly sliced",
        "1/2 cup yogurt",
        "1 tbsp ginger-garlic paste",
        "2 tbsp biryani masala",
        "Whole spices: bay leaf, cloves, cardamom",
        "Mint and coriander",
        "2 1/4 cups water, salt and oil"
      ],
      steps: [
        "Fry the onions in oil until deep golden and keep a handful aside for the top.",
        "Add the whole spices, ginger-garlic paste and chicken and brown for 5 minutes.",
        "Stir in the yogurt, biryani masala, herbs and salt and cook 5 minutes more.",
        "Add the drained rice and water, bring to a boil, then cover and cook on the lowest heat for 15 minutes.",
        "Rest 10 minutes without opening, then fluff and top with the fried onions."
      ]
    }
  ]
};

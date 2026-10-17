// Sanjus Bakeswell - Full Product & Menu Dataset

export const BUSINESS_INFO = {
  name: "Sanjus Bakeswell",
  tagline: "Made to Melt Hearts",
  descriptor: "ARTISAN BAKERY",
  phone: "+91 93841 06660",
  phoneRaw: "919384106660",
  address: "Shop No. 1 & 2, Tippu Sultan Street, Pavendar Nagar, Thiruvallur, Tamil Nadu – 600056",
  cateringNote: "Outside catering orders accepted for weddings, parties, corporate events & milestone celebrations.",
  timing: "10:00 AM – 10:00 PM (All Days)"
};

export const FLAVOUR_THEMES = {
  chocolate: {
    id: "chocolate",
    name: "Chocolate",
    tagline: "Rich & Indulgent",
    bgClass: "bg-[#170e0a]",
    accentClass: "text-[#e29352] border-[#e29352]",
    surface: "from-[#20120b] via-[#140b07] to-[#0d0705]",
    cardBg: "rgba(35, 20, 14, 0.7)",
    heroImage: "/cakes images/chocolate.webp",
    bgImage: "/background images/page 1.webp",
    thumb: "/cakes images/thumbs/chocolate.webp",
    colorHex: "#5c2c16",
    glowColor: "rgba(184, 80, 24, 0.35)",
    quote: "Decadent dark cocoa, molten silky ganache and velvety truffles crafted for pure bliss."
  },
  butterscotch: {
    id: "butterscotch",
    name: "Butterscotch",
    tagline: "Caramel & Gold",
    bgClass: "bg-[#1c1407]",
    accentClass: "text-[#f3b555] border-[#f3b555]",
    surface: "from-[#281b0a] via-[#1c1306] to-[#0f0902]",
    cardBg: "rgba(42, 28, 12, 0.7)",
    heroImage: "/cakes images/Butterscotch.webp",
    bgImage: "/background images/page 3.webp",
    thumb: "/cakes images/thumbs/butterscotch.webp",
    colorHex: "#c5872b",
    glowColor: "rgba(235, 160, 48, 0.35)",
    quote: "Toasted caramel drips, roasted praline crunch and golden buttery velvet cream."
  },
  strawberry: {
    id: "strawberry",
    name: "Strawberry",
    tagline: "Fresh & Romantic",
    bgClass: "bg-[#1a0a0f]",
    accentClass: "text-[#f47291] border-[#f47291]",
    surface: "from-[#2a1018] via-[#18090f] to-[#0c0306]",
    cardBg: "rgba(45, 18, 28, 0.7)",
    heroImage: "/cakes images/Strawberry.webp",
    bgImage: "/background images/page 4.webp",
    thumb: "/cakes images/thumbs/strawberry.webp",
    colorHex: "#d94268",
    glowColor: "rgba(225, 65, 105, 0.35)",
    quote: "Sun-ripened berry glazes, cloud-soft pink sponge and fresh fruit infusions."
  },
  blueberry: {
    id: "blueberry",
    name: "Blueberry",
    tagline: "Silky & Distinctive",
    bgClass: "bg-[#0b0c1c]",
    accentClass: "text-[#8a9cf7] border-[#8a9cf7]",
    surface: "from-[#14152e] via-[#0d0e1f] to-[#06060f]",
    cardBg: "rgba(22, 25, 52, 0.7)",
    heroImage: "/cakes images/blueberry.webp",
    bgImage: "/background images/page 1.webp",
    thumb: "/cakes images/thumbs/blueberry.webp",
    colorHex: "#4553b8",
    glowColor: "rgba(95, 115, 230, 0.35)",
    quote: "Wild blueberries, subtle lavender undertones and luscious velvety cream."
  },
  vanilla: {
    id: "vanilla",
    name: "Vanilla",
    tagline: "Calm & Refined",
    bgClass: "bg-[#16120e]",
    accentClass: "text-[#e9c79f] border-[#e9c79f]",
    surface: "from-[#241e17] via-[#17130e] to-[#0d0a07]",
    cardBg: "rgba(38, 30, 22, 0.7)",
    heroImage: "/cakes images/Vanilla.webp",
    bgImage: "/background images/page 2.webp",
    thumb: "/cakes images/thumbs/vanilla.webp",
    colorHex: "#e0be8d",
    glowColor: "rgba(225, 190, 140, 0.35)",
    quote: "Madagascar vanilla pods, delicate whipped ivory buttercream and timeless elegance."
  }
};

// All Cake Collections matching the design blueprint & collage
export const COLLECTIONS = [
  {
    id: "birthday",
    title: "Birthday Cakes",
    categoryBadge: "CELEBRATIONS",
    subtitle: "Make every birthday sweeter with our handcrafted cakes, designed to create unforgettable moments.",
    bgTheme: "from-[#230f17] via-[#1a0a11] to-[#12060a]",
    bgImage: "/background images/page 2.webp",
    featuredCake: "/cakes images/Strawberry mousse cake.webp",
    filters: ["All", "Kids", "Theme Cakes", "Classic", "Photo Cakes", "Premium"],
    items: [
      {
        id: "bday-1",
        name: "Unicorn Dream",
        category: "Kids",
        priceHalf: 720,
        priceOne: 1300,
        rating: 4.9,
        image: "/cakes images/Vanilla.webp",
        description: "Pastel swirls, gold horn accents, rainbow confetti and silky vanilla buttercream layers."
      },
      {
        id: "bday-2",
        name: "Chocolate Truffle",
        category: "Classic",
        priceHalf: 550,
        priceOne: 950,
        rating: 5.0,
        image: "/cakes images/chocolate.webp",
        description: "Pure Belgian dark chocolate ganache draped over ultra-moist sponge layers."
      },
      {
        id: "bday-3",
        name: "Rainbow Delight",
        category: "Theme Cakes",
        priceHalf: 620,
        priceOne: 1100,
        rating: 4.8,
        image: "/cakes images/Strawberry.webp",
        description: "Seven vibrant colorful layers filled with fresh whipped cream and white chocolate drip."
      },
      {
        id: "bday-4",
        name: "Princess Cake",
        category: "Kids",
        isBestSeller: true,
        priceHalf: 720,
        priceOne: 1300,
        rating: 5.0,
        image: "/cakes images/Strawberry mousse cake.webp",
        description: "Royally crowned strawberry rose cake with edible pearls, fresh berries and floral rosettes."
      },
      {
        id: "bday-5",
        name: "Minimal Rose",
        category: "Classic",
        priceHalf: 540,
        priceOne: 950,
        rating: 4.9,
        image: "/cakes images/Vanilla.webp",
        description: "Subtle vintage textured cream frosting adorned with delicate blush rose petals."
      }
    ]
  },
  {
    id: "chocolate",
    title: "Chocolate Cakes",
    categoryBadge: "RICH & INDULGENT",
    subtitle: "Decadent layers, premium cocoa and irresistible textures for true chocolate lovers.",
    bgTheme: "from-[#22120a] via-[#160c07] to-[#0c0603]",
    bgImage: "/background images/page 3.webp",
    featuredCake: "/cakes images/chocolate.webp",
    filters: ["All", "Truffle", "Dark Chocolate", "Chocolate Fudge", "Nutella", "Premium"],
    items: [
      {
        id: "choco-1",
        name: "Dark Chocolate Truffle",
        category: "Truffle",
        priceHalf: 550,
        priceOne: 950,
        rating: 5.0,
        image: "/cakes images/chocolate.webp",
        description: "Silky 70% dark chocolate ganache layered with rich cocoa sponge."
      },
      {
        id: "choco-2",
        name: "Belgian Chocolate",
        category: "Dark Chocolate",
        priceHalf: 680,
        priceOne: 1200,
        rating: 4.9,
        image: "/cakes images/Chocolate mousse cake.webp",
        description: "Authentic Belgian couverture chocolate mousse with delicate crispy praline crunch."
      },
      {
        id: "choco-3",
        name: "Hazelnut Crunch",
        category: "Nutella",
        priceHalf: 620,
        priceOne: 1100,
        rating: 5.0,
        image: "/cakes images/Chocolate Hazelnut Mousse Cake.webp",
        description: "Roasted Piedmont hazelnuts swirled in Nutella ganache with crisp wafer pearls."
      },
      {
        id: "choco-4",
        name: "Chocolate Lava",
        category: "Chocolate Fudge",
        priceHalf: 560,
        priceOne: 980,
        rating: 4.9,
        image: "/cakes images/chocolateoreocake.webp",
        description: "Molten chocolate heart encased inside warm chocolate fudge and dark curls."
      },
      {
        id: "choco-5",
        name: "Choco Almond",
        category: "Premium",
        priceHalf: 600,
        priceOne: 1050,
        rating: 4.8,
        image: "/cakes images/Chocolate cheesecake.webp",
        description: "Caramelized toasted almond slivers enrobed in dark silky truffle glaze."
      }
    ]
  },
  {
    id: "butterscotch",
    title: "Butterscotch Cakes",
    categoryBadge: "CLASSIC FAVOURITE",
    subtitle: "A timeless delight with rich butterscotch flavour, crunchy praline and creamy layers.",
    bgTheme: "from-[#281b0a] via-[#1d1306] to-[#0f0902]",
    bgImage: "/background images/page 1.webp",
    featuredCake: "/cakes images/Butterscotch.webp",
    filters: ["All", "Classic", "Praline Crunch", "Premium", "Designer"],
    items: [
      {
        id: "bs-1",
        name: "Classic Butterscotch",
        category: "Classic",
        priceHalf: 480,
        priceOne: 850,
        rating: 4.9,
        image: "/cakes images/Butterscotch.webp",
        description: "Golden sponge infused with brown sugar caramel syrup and crunchy cashew praline."
      },
      {
        id: "bs-2",
        name: "Praline Delight",
        category: "Praline Crunch",
        priceHalf: 540,
        priceOne: 950,
        rating: 4.8,
        image: "/cakes images/Caramel Crunch Cake.webp",
        description: "Double caramel drizzle, caramelized butter sauce and crunch in every bite."
      },
      {
        id: "bs-3",
        name: "Caramel Crunch",
        category: "Praline Crunch",
        priceHalf: 580,
        priceOne: 1000,
        rating: 5.0,
        image: "/cakes images/Caramel Crunch Cake.webp",
        description: "Salted butter caramel cream with homemade almond praline brittle."
      },
      {
        id: "bs-4",
        name: "Butterscotch Nut",
        category: "Premium",
        priceHalf: 620,
        priceOne: 1100,
        rating: 4.9,
        image: "/cakes images/Butterscotch.webp",
        description: "Generously loaded with toasted walnut, almond and cashew praline clusters."
      },
      {
        id: "bs-5",
        name: "Premium Caramel",
        category: "Designer",
        priceHalf: 750,
        priceOne: 1350,
        rating: 5.0,
        image: "/cakes images/Caramel Crunch Cake.webp",
        description: "Masterpiece multi-tier caramel mirror glaze with handcrafted spun sugar crowns."
      }
    ]
  },
  {
    id: "fruit-berry",
    title: "Fruit & Berry Cakes",
    categoryBadge: "FRESH & VIBRANT",
    subtitle: "Bursting with real fruits, berries and refreshing flavours for a naturally delightful experience.",
    bgTheme: "from-[#2b0f19] via-[#1a080f] to-[#0e0308]",
    bgImage: "/background images/page 4.webp",
    featuredCake: "/cakes images/Strawberry.webp",
    filters: ["All", "Strawberry", "Blueberry", "Mixed Fruit", "Raspberry", "Exotic"],
    items: [
      {
        id: "fb-1",
        name: "Strawberry Fresh",
        category: "Strawberry",
        priceHalf: 520,
        priceOne: 900,
        rating: 4.9,
        image: "/cakes images/Strawberry.webp",
        description: "Juicy hand-picked strawberries, pink vanilla cream and fresh berry coulis."
      },
      {
        id: "fb-2",
        name: "Blueberry Bliss",
        category: "Blueberry",
        priceHalf: 550,
        priceOne: 950,
        rating: 5.0,
        image: "/cakes images/blueberry.webp",
        description: "Compote made from whole forest blueberries enveloped in velvety mascarpone."
      },
      {
        id: "fb-3",
        name: "Mixed Fruit",
        category: "Mixed Fruit",
        priceHalf: 490,
        priceOne: 850,
        rating: 4.8,
        image: "/cakes images/Strawberry mousse cake.webp",
        description: "Light vanilla sponge loaded with kiwi, pomegranate, apples and sweet grapes."
      },
      {
        id: "fb-4",
        name: "Raspberry Delight",
        category: "Raspberry",
        priceHalf: 600,
        priceOne: 1050,
        rating: 4.9,
        image: "/cakes images/Strawberry.webp",
        description: "Tart and sweet red raspberry reduction paired with delicate white chocolate whip."
      },
      {
        id: "fb-5",
        name: "Exotic Fruit",
        category: "Exotic",
        priceHalf: 620,
        priceOne: 1100,
        rating: 5.0,
        image: "/cakes images/Mango mousse cake.webp",
        description: "Alphonso mango ribbons, dragon fruit cubes and passionfruit nectar."
      }
    ]
  },
  {
    id: "forest-cakes",
    title: "Black Forest & White Forest",
    categoryBadge: "TIMELESS CLASSICS",
    subtitle: "Light, creamy and layered with irresistible flavours that never go out of style.",
    bgTheme: "from-[#111e17] via-[#0d1611] to-[#070c09]",
    bgImage: "/background images/page 3.webp",
    featuredCake: "/cakes images/Blackforest.webp",
    filters: ["All", "Black Forest", "White Forest", "Cherry", "Premium"],
    items: [
      {
        id: "fc-1",
        name: "Classic Black Forest",
        category: "Black Forest",
        priceHalf: 480,
        priceOne: 850,
        rating: 5.0,
        image: "/cakes images/Blackforest.webp",
        description: "Rich dark chocolate sponge, cherry compote, whipped cream and Belgian chocolate curls."
      },
      {
        id: "fc-2",
        name: "Cherry Delight",
        category: "Cherry",
        priceHalf: 540,
        priceOne: 950,
        rating: 4.8,
        image: "/cakes images/Blackforest.webp",
        description: "Double cherry filling with maraschino glazes and chocolate flakes."
      },
      {
        id: "fc-3",
        name: "White Forest",
        category: "White Forest",
        priceHalf: 500,
        priceOne: 900,
        rating: 4.9,
        image: "/cakes images/White forest.webp",
        description: "Vanilla sponge layered with sweet red cherries, vanilla bean cream and white chocolate shavings."
      },
      {
        id: "fc-4",
        name: "Premium Forest",
        category: "Premium",
        priceHalf: 620,
        priceOne: 1100,
        rating: 5.0,
        image: "/cakes images/Blackforest.webp",
        description: "Dark chocolate shards, spiced dark cherry glaze and extra-rich cream layers."
      },
      {
        id: "fc-5",
        name: "Mini Forest",
        category: "Classic",
        priceHalf: 420,
        priceOne: 750,
        rating: 4.7,
        image: "/cakes images/White forest.webp",
        description: "The classic German black forest recipe in a delightful compact creation."
      }
    ]
  },
  {
    id: "mousse-cheesecake",
    title: "Mousse Cakes & Cheesecakes",
    categoryBadge: "SILKY & SMOOTH",
    subtitle: "Luxurious textures, rich flavours and a melt-in-your-mouth experience for dessert lovers.",
    bgTheme: "from-[#16122d] via-[#0f0c20] to-[#080612]",
    bgImage: "/background images/page 1.webp",
    featuredCake: "/cakes images/Blueberry Cheesecake.webp",
    filters: ["All", "Mousse Cakes", "Cheesecakes", "No-Bake", "Premium"],
    items: [
      {
        id: "mc-1",
        name: "Blueberry Cheesecake",
        category: "Cheesecakes",
        priceHalf: 680,
        priceOne: 1200,
        rating: 5.0,
        image: "/cakes images/Blueberry Cheesecake.webp",
        description: "New York style baked cream cheese on buttery graham crust with wild blueberry compote."
      },
      {
        id: "mc-2",
        name: "Chocolate Mousse",
        category: "Mousse Cakes",
        priceHalf: 620,
        priceOne: 1100,
        rating: 4.9,
        image: "/cakes images/Chocolate mousse cake.webp",
        description: "Airy 55% cocoa chocolate mousse sitting on a soft flourless chocolate base."
      },
      {
        id: "mc-3",
        name: "Mango Cheesecake",
        category: "Cheesecakes",
        priceHalf: 650,
        priceOne: 1150,
        rating: 4.9,
        image: "/cakes images/Mango mousse cake.webp",
        description: "Creamy mango swirl cheesecake with pure Alphonso mango gelée."
      },
      {
        id: "mc-4",
        name: "Strawberry Mousse",
        category: "Mousse Cakes",
        priceHalf: 620,
        priceOne: 1100,
        rating: 4.8,
        image: "/cakes images/Strawberry mousse cake.webp",
        description: "Feather-light berry cream mousse with strawberry mirror glaze."
      },
      {
        id: "mc-5",
        name: "Tiramisu Mousse",
        category: "No-Bake",
        priceHalf: 680,
        priceOne: 1200,
        rating: 5.0,
        image: "/cakes images/Tiramisu Cake.webp",
        description: "Espresso-soaked savoiardi biscuits layered with Italian mascarpone mousse & cocoa."
      }
    ]
  },
  {
    id: "chef-specials",
    title: "Chef Specials",
    categoryBadge: "SIGNATURE CREATIONS",
    subtitle: "Exclusive creations crafted by our chefs, combining unique flavours and artistic designs.",
    bgTheme: "from-[#1a1710] via-[#12100b] to-[#0a0805]",
    bgImage: "/background images/page 3.webp",
    featuredCake: "/cakes images/Pistachio Mousse Cake.webp",
    filters: ["All", "Signature", "Premium", "Limited Edition", "Festival Special"],
    items: [
      {
        id: "cs-1",
        name: "Pistachio Royale",
        category: "Signature",
        priceHalf: 720,
        priceOne: 1300,
        rating: 5.0,
        image: "/cakes images/Pistachio Mousse Cake.webp",
        description: "Pure Iranian pistachio paste, white chocolate mousse, and roasted pistachio slivers."
      },
      {
        id: "cs-2",
        name: "Lotus Biscoff",
        category: "Premium",
        priceHalf: 700,
        priceOne: 1250,
        rating: 4.9,
        image: "/cakes images/Caramel Crunch Cake.webp",
        description: "Caramelized speculoos cookie butter mousse topped with molten Biscoff spread and biscuit."
      },
      {
        id: "cs-3",
        name: "Red Velvet",
        category: "Signature",
        priceHalf: 650,
        priceOne: 1150,
        rating: 5.0,
        image: "/cakes images/Red Velvet Cake.webp",
        description: "Crimson cocoa sponge layered with tangy cream cheese frosting and red velvet crumbles."
      },
      {
        id: "cs-4",
        name: "Ferrero Dream",
        category: "Premium",
        priceHalf: 780,
        priceOne: 1400,
        rating: 5.0,
        image: "/cakes images/Chocolate Hazelnut Mousse Cake.webp",
        description: "Whole Ferrero Rocher pralines, hazelnut ganache, wafer crunch and gold leaf accents."
      },
      {
        id: "cs-5",
        name: "Coffee Caramel",
        category: "Limited Edition",
        priceHalf: 680,
        priceOne: 1200,
        rating: 4.8,
        image: "/cakes images/chocolateoreocake.webp",
        description: "Dark roasted Arabica coffee cream paired with butterscotch caramel ripple."
      }
    ]
  }
];

// Additional Bakery Products from Sanjus Bakeswell official menu
export const PINATA_CAKES = [
  { id: "pinata-1", name: "Dark Chocolate Pinata", price: 1100, image: "/cakes images/chocolate.webp", desc: "Hard chocolate shell containing assorted chocolates, hammer included." },
  { id: "pinata-2", name: "White Chocolate Pinata", price: 1200, image: "/cakes images/Vanilla.webp", desc: "White chocolate dome shell filled with surprise treats and edible sprinkles." }
];

export const BROWNIES = [
  { id: "br-1", name: "Biscoff Brownie", price: 140, desc: "Fudgy cocoa brownie topped with creamy Biscoff spread and biscuit." },
  { id: "br-2", name: "Belgian Brownie", price: 150, desc: "Intense Belgian dark chocolate brownie with molten chocolate center." },
  { id: "br-3", name: "Walnut Brownie", price: 130, desc: "Classic rich fudge brownie loaded with roasted California walnuts." },
  { id: "br-4", name: "Hazelnuts Brownie", price: 160, desc: "Decadent hazelnut ganache drizzled over slow-baked chewy brownie." }
];

export const SNACKS = [
  { id: "sn-1", name: "Korean Cheese Cream Bun", price: 110, category: "Buns", isHot: true },
  { id: "sn-2", name: "Aloo Bun", price: 45, category: "Buns" },
  { id: "sn-3", name: "Cheese Pizza Bun", price: 75, category: "Buns" },
  { id: "sn-4", name: "Paneer Bhurji Bun", price: 70, category: "Buns" },
  { id: "sn-5", name: "Gulkand Bun", price: 50, category: "Buns" },
  { id: "sn-6", name: "Bun Maska", price: 45, category: "Buns" },
  { id: "sn-7", name: "Bread Pizza", price: 65, category: "Pizza" },
  { id: "sn-8", name: "Pizza", price: 95, category: "Pizza" },
  { id: "sn-9", name: "Corn Pizza", price: 85, category: "Pizza" },
  { id: "sn-10", name: "Veg Puffs", price: 30, category: "Puffs" },
  { id: "sn-11", name: "Sweet Corn Puffs", price: 35, category: "Puffs" },
  { id: "sn-12", name: "Paneer Puffs", price: 40, category: "Puffs" },
  { id: "sn-13", name: "Mushroom Puff", price: 40, category: "Puffs" },
  { id: "sn-14", name: "Egg Puff", price: 35, category: "Puffs" },
  { id: "sn-15", name: "Veg Roll", price: 35, category: "Rolls" },
  { id: "sn-16", name: "Sweet Corn Roll", price: 40, category: "Rolls" },
  { id: "sn-17", name: "Paneer Roll", price: 45, category: "Rolls" },
  { id: "sn-18", name: "Mushroom Roll", price: 45, category: "Rolls" }
];

export const CUSTOM_CAKE_CATEGORIES = [
  {
    id: "cust-cartoon",
    title: "Cartoon Character Cakes",
    badge: "FONDANT CHARACTERS",
    image: "/custom cakes/cartoon_candies.webp",
    desc: "Cute animated characters, expressive fondant faces, colourful edible decorations, and playful 3D cake sculptures.",
    highlights: ["Hand-sculpted Fondant", "3D Characters", "Vibrant Pastels"]
  },
  {
    id: "cust-anime",
    title: "Anime Cakes",
    badge: "MANGA & ANIME ICONS",
    image: "/cakes images/Pistachio Mousse Cake.webp",
    desc: "Anime-inspired character portraits, manga-style decorations, Japanese-inspired designs, and dramatic themed cakes.",
    highlights: ["Manga Edible Art", "Japanese Aesthetic", "Gold Leaf Dust"]
  },
  {
    id: "cust-fantasy",
    title: "Movie & Fantasy Cakes",
    badge: "CINEMATIC & CASTLE",
    image: "/custom cakes/fantasy_frozen.webp",
    desc: "Wizard worlds, fantasy castles, cinematic themes, and character-inspired edible sculptures brought to life.",
    highlights: ["Castle Architecture", "Cinematic Fondant", "Crystal Sugar Glass"]
  },
  {
    id: "cust-superhero",
    title: "Superhero Cakes",
    badge: "COMIC HEROES",
    image: "/cakes images/Red Velvet Cake.webp",
    desc: "Comic-book-inspired designs, superhero emblems, dramatic colours, and sculpted power decorations.",
    highlights: ["Hero Emblems", "Dynamic Tiering", "Comic Color Palettes"]
  },
  {
    id: "cust-gaming",
    title: "Gaming Cakes",
    badge: "RETRO & CONSOLE",
    image: "/cakes images/chocolateoreocake.webp",
    desc: "Controller cakes, pixel-art decorations, gaming-inspired themes, and imaginative edible level designs.",
    highlights: ["Fondant Controllers", "Pixel Art Details", "Gamer Accents"]
  },
  {
    id: "cust-kids",
    title: "Kids' Dream Cakes",
    badge: "MAGICAL & PLAYFUL",
    image: "/cakes images/Blueberry Cheesecake.webp",
    desc: "Adorable animals, magical creatures, princess castles, dinosaurs, and colourful birthday creations.",
    highlights: ["Unicorns & Dragons", "Rainbow Sponges", "100% Kid Safe"]
  }
];

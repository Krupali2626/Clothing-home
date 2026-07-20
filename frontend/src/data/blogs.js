// Blog data with real Unsplash images
const blogImages = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=320&fit=crop&auto=format", // fashion
  "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&h=320&fit=crop&auto=format", // fridge
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=320&fit=crop&auto=format", // winter fashion
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=320&fit=crop&auto=format", // kitchen
  "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=500&h=320&fit=crop&auto=format", // smart tv
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=320&fit=crop&auto=format", // summer outfit
  "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&h=320&fit=crop&auto=format", // washing machine
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=320&fit=crop&auto=format", // accessories
  "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=500&h=320&fit=crop&auto=format", // water purifier
  "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500&h=320&fit=crop&auto=format", // kids
  "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=320&fit=crop&auto=format", // kitchen appliances
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=320&fit=crop&auto=format", // shoes
  "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&h=320&fit=crop&auto=format", // small appliances
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=320&fit=crop&auto=format", // wardrobe/capsule
  "https://images.unsplash.com/photo-1631545806609-75a1b7e9680b?w=500&h=320&fit=crop&auto=format", // AC
];

const blogTitles = [
  "10 Wardrobe Essentials Every Man Needs This Season",
  "How to Choose the Right Refrigerator for Your Kitchen",
  "Top 5 Winter Fashion Trends to Try Now",
  "Energy-Saving Tips for Your Home Appliances",
  "A Complete Guide to Buying Your First Smart TV",
  "Summer Outfit Ideas That Keep You Cool",
  "Washing Machine Maintenance: A Beginner's Guide",
  "Accessorizing 101: Elevate Any Outfit",
  "Why Air Purifiers Matter More Than Ever",
  "Kids Fashion: Comfortable Yet Stylish Picks",
  "Kitchen Appliance Trends to Watch This Year",
  "The Ultimate Shoe Care Checklist",
  "Small Space, Smart Appliances: Our Picks",
  "Building a Capsule Wardrobe on a Budget",
  "Choosing Between Split and Window ACs",
];

const excerpts = [
  "Build a versatile wardrobe with these must-have pieces that work across every occasion and season.",
  "Size, energy rating, features — here's everything to consider before making your purchase decision.",
  "From cozy knitwear to statement coats, these are the trends dominating runways and streets alike.",
  "Small changes in how you use and maintain your appliances can lead to big savings on electricity bills.",
  "Resolution, smart features, panel type — this guide covers everything a first-time TV buyer needs to know.",
  "Light fabrics, relaxed silhouettes, and the right accessories — your summer wardrobe sorted.",
  "A few simple habits can extend the life of your washing machine and keep it running like new.",
  "Sunglasses, scarves, bags and more — the right accessories can transform even the simplest outfit.",
  "From dust particles to allergens, here's why a good air purifier is now a home essential.",
  "Soft, stretchy, and built to last — our picks for kids that are as practical as they are fun.",
  "From smart ovens to compact cooktops, here are the appliances making home cooking effortless.",
  "Leather, suede, canvas — each material needs different care. Here's your complete shoe care guide.",
  "Studio apartment or compact kitchen? These space-saving appliances pack powerful performance.",
  "You don't need a huge budget to build a stylish, functional wardrobe. Here's how.",
  "Both cool your space, but the right choice depends on your room size, budget, and usage patterns.",
];

const blogs = blogTitles.map((title, i) => ({
  id: `blog-${i + 1}`,
  title,
  slug: `post-${i + 1}`,
  image: blogImages[i] || blogImages[0],
  category: i % 2 === 0 ? "Fashion" : "Appliances",
  author: "D.Store Editorial",
  authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
  date: `2026-0${(i % 6) + 1}-0${(i % 8) + 1}`,
  readTime: `${3 + (i % 5)} min read`,
  excerpt: excerpts[i] || excerpts[0],
  content: `${excerpts[i] || excerpts[0]} This comprehensive guide covers everything you need to know, from the basics to advanced tips that will help you make the most of your purchase and lifestyle choices.`,
  popular: i % 3 === 0,
  tags: i % 2 === 0 ? ["Style", "Fashion", "Tips"] : ["Home", "Appliances", "Guide"],
}));

export default blogs;

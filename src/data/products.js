// Product data with real Unsplash images
const clothingBrands = ["Urban Thread", "Nova Fit", "Luxe Knot", "Denim Co.", "Stride"];
const applianceBrands = ["HomePro", "KitchTech", "CoolBreeze", "PureLine", "Voltix"];

// Real clothing product images
const clothingImages = [
  // Slim Fit Cotton Shirt
  [
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=600&fit=crop&auto=format",
  ],
  // Oversized Hoodie
  [
    "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop&auto=format",
  ],
  // Classic Denim Jacket
  [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=600&h=600&fit=crop&auto=format",
  ],
  // Running Track Pants
  [
    "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&auto=format",
  ],
  // Floral Wrap Dress
  [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=600&h=600&fit=crop&auto=format",
  ],
  // Linen Blazer
  [
    "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1594938298603-c8148c4b4a64?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop&auto=format",
  ],
  // Kids Graphic Tee
  [
    "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=600&fit=crop&auto=format",
  ],
  // Puffer Winter Jacket
  [
    "https://images.unsplash.com/photo-1520975867021-76d17493b3f0?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=600&fit=crop&auto=format",
  ],
  // Summer Linen Shorts
  [
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop&auto=format",
  ],
  // Leather Chelsea Boots
  [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop&auto=format",
  ],
  // Quilted Tote Bag
  [
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop&auto=format",
  ],
  // Aviator Sunglasses
  [
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop&auto=format",
  ],
  // Merino Wool Sweater
  [
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=600&fit=crop&auto=format",
  ],
  // Chino Trousers
  [
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&h=600&fit=crop&auto=format",
  ],
  // Sports Sneakers
  [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop&auto=format",
  ],
  // Silk Scarf
  [
    "https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop&auto=format",
  ],
];

// Real appliance product images
const applianceImages = [
  // 4-Door Refrigerator
  [
    "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop&auto=format",
  ],
  // 55" 4K Smart TV
  [
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=600&fit=crop&auto=format",
  ],
  // Front Load Washing Machine
  [
    "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?w=600&h=600&fit=crop&auto=format",
  ],
  // Solo Microwave Oven
  [
    "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&h=600&fit=crop&auto=format",
  ],
  // Air Conditioner
  [
    "https://images.unsplash.com/photo-1631545806609-75a1b7e9680b?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=600&fit=crop&auto=format",
  ],
  // Ceiling Fan
  [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop&auto=format",
  ],
  // Mixer Grinder
  [
    "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop&auto=format",
  ],
  // Steam Iron
  [
    "https://images.unsplash.com/photo-1558171813-c40b83a34f42?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&h=600&fit=crop&auto=format",
  ],
  // Water Purifier
  [
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop&auto=format",
  ],
  // Vacuum Cleaner
  [
    "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&h=600&fit=crop&auto=format",
  ],
  // Induction Cooktop
  [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&h=600&fit=crop&auto=format",
  ],
  // Air Fryer
  [
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop&auto=format",
  ],
  // Electric Kettle
  [
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop&auto=format",
  ],
  // Hand Blender
  [
    "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop&auto=format",
  ],
];

const clothingNames = [
  "Slim Fit Cotton Shirt",
  "Oversized Hoodie",
  "Classic Denim Jacket",
  "Running Track Pants",
  "Floral Wrap Dress",
  "Linen Blazer",
  "Kids Graphic Tee",
  "Puffer Winter Jacket",
  "Summer Linen Shorts",
  "Leather Chelsea Boots",
  "Quilted Tote Bag",
  "Aviator Sunglasses",
  "Merino Wool Sweater",
  "Chino Trousers",
  "Sports Sneakers",
  "Silk Scarf",
];

const applianceNames = [
  "4-Door Refrigerator 420L",
  '55" 4K Smart TV',
  "Front Load Washing Machine 7kg",
  "Solo Microwave Oven 20L",
  "1.5 Ton Split Air Conditioner",
  "High Speed Ceiling Fan",
  "750W Mixer Grinder",
  "Steam Iron",
  "RO + UV Water Purifier",
  "Cyclonic Vacuum Cleaner",
  "Induction Cooktop",
  "Air Fryer XL",
  "Electric Kettle 1.5L",
  "Cordless Hand Blender",
];

function buildClothingProducts() {
  return clothingNames.map((name, i) => {
    const price = 799 + i * 260;
    const discount = [10, 15, 20, 25, 30][i % 5];
    const rating = (3.6 + ((i * 7) % 14) / 10).toFixed(1);
    const imgs = clothingImages[i] || clothingImages[0];
    return {
      id: `clothing-${i + 1}`,
      name,
      category: "Clothing",
      type: "clothing",
      brand: clothingBrands[i % clothingBrands.length],
      mrp: Math.round(price / (1 - discount / 100)),
      salePrice: price,
      discount,
      rating: Number(rating),
      reviewCount: 12 + ((i * 37) % 240),
      stock: i % 7 === 0 ? 0 : 25 - (i % 20),
      image: imgs[0],
      images: imgs,
      badge:
        i % 5 === 0
          ? "New"
          : i % 4 === 0
          ? "Best Seller"
          : discount >= 25
          ? "Hot Deal"
          : null,
      isFlashSale: i % 3 === 0,
      isFeatured: i % 2 === 0,
      description: `Premium quality ${name.toLowerCase()} crafted with care. Comfortable fit, durable material, and a timeless design that suits every occasion.`,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Black", "White", "Navy", "Grey"],
    };
  });
}

function buildApplianceProducts() {
  return applianceNames.map((name, i) => {
    const price = 6999 + i * 3200;
    const discount = [10, 15, 20, 25, 30][i % 5];
    const rating = (3.6 + ((i * 7) % 14) / 10).toFixed(1);
    const imgs = applianceImages[i] || applianceImages[0];
    return {
      id: `appliances-${i + 1}`,
      name,
      category: "Home Appliances",
      type: "appliances",
      brand: applianceBrands[i % applianceBrands.length],
      mrp: Math.round(price / (1 - discount / 100)),
      salePrice: price,
      discount,
      rating: Number(rating),
      reviewCount: 12 + ((i * 37) % 240),
      stock: i % 7 === 0 ? 0 : 25 - (i % 20),
      image: imgs[0],
      images: imgs,
      badge:
        i % 5 === 0
          ? "New"
          : i % 4 === 0
          ? "Best Seller"
          : discount >= 25
          ? "Hot Deal"
          : null,
      isFlashSale: i % 3 === 0,
      isFeatured: i % 2 === 0,
      description: `High-performance ${name.toLowerCase()} built for modern homes. Energy efficient, packed with smart features, and backed by a manufacturer warranty.`,
      warranty: `${1 + (i % 3)} Year Manufacturer Warranty`,
    };
  });
}

const clothingProducts = buildClothingProducts();
const applianceProducts = buildApplianceProducts();

const products = [...clothingProducts, ...applianceProducts];

export const trendingProducts = products.filter((p) => p.isFeatured).slice(0, 8);
export const flashSaleProducts = products.filter((p) => p.isFlashSale).slice(0, 8);
export const latestProducts = [...products].reverse().slice(0, 8);
export const bestSellerProducts = products
  .filter((p) => p.badge === "Best Seller")
  .concat(products.slice(0, 4))
  .slice(0, 8);

export default products;

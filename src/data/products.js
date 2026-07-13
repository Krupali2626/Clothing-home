const clothingProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    discount: 20,
    discountedPrice: 23.99,
    category: "men",
    subcategory: "summer-wear",
    brand: "Nike",
    rating: 4.5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop"
    ],
    colors: ["Black", "White", "Blue"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    badge: "Trending",
    description: "Premium quality cotton t-shirt for everyday comfort.",
    specifications: { Material: "100% Cotton", Fit: "Regular", Care: "Machine Wash" }
  },
  {
    id: 2,
    name: "Classic Denim Jeans",
    price: 79.99,
    discount: 15,
    discountedPrice: 67.99,
    category: "men",
    subcategory: "men",
    brand: "Levis",
    rating: 4.8,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop"
    ],
    colors: ["Blue", "Black"],
    sizes: ["28", "30", "32", "34"],
    inStock: true,
    badge: "Best Seller",
    description: "Timeless denim jeans with perfect fit.",
    specifications: { Material: "Denim", Fit: "Slim", Wash: "Medium" }
  },
  {
    id: 3,
    name: "Elegant Summer Dress",
    price: 89.99,
    discount: 30,
    discountedPrice: 62.99,
    category: "women",
    subcategory: "summer-wear",
    brand: "Zara",
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=600&fit=crop"
    ],
    colors: ["Red", "Blue", "Green"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    badge: "Sale",
    description: "Beautiful summer dress perfect for any occasion.",
    specifications: { Material: "Polyester", Fit: "Regular", Length: "Knee Length" }
  },
  {
    id: 4,
    name: "Kids Cartoon Hoodie",
    price: 49.99,
    discount: 10,
    discountedPrice: 44.99,
    category: "kids",
    subcategory: "kids",
    brand: "H&M",
    rating: 4.6,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=600&fit=crop"
    ],
    colors: ["Yellow", "Pink", "Blue"],
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    inStock: true,
    badge: "New",
    description: "Comfortable hoodie with fun cartoon prints.",
    specifications: { Material: "Cotton Blend", Fit: "Regular", Care: "Machine Wash" }
  },
  {
    id: 5,
    name: "Winter Woolen Jacket",
    price: 149.99,
    discount: 25,
    discountedPrice: 112.49,
    category: "men",
    subcategory: "winter-wear",
    brand: "Adidas",
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1544022613-e87ca7567861?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca7567861?w=600&h=600&fit=crop"
    ],
    colors: ["Black", "Navy", "Brown"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    badge: "Hot",
    description: "Warm and stylish woolen jacket for winter.",
    specifications: { Material: "Wool Blend", Fit: "Regular", Insulation: "Yes" }
  },
  {
    id: 6,
    name: "Running Sneakers",
    price: 99.99,
    discount: 0,
    discountedPrice: 99.99,
    category: "men",
    subcategory: "shoes",
    brand: "Nike",
    rating: 4.7,
    reviews: 420,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"
    ],
    colors: ["Black", "White", "Red"],
    sizes: ["7", "8", "9", "10"],
    inStock: true,
    badge: "",
    description: "Comfortable running sneakers with great cushioning.",
    specifications: { Material: "Mesh", Sole: "Rubber", Type: "Running" }
  },
  {
    id: 7,
    name: "Leather Handbag",
    price: 199.99,
    discount: 20,
    discountedPrice: 159.99,
    category: "women",
    subcategory: "bags",
    brand: "Zara",
    rating: 4.8,
    reviews: 175,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop"
    ],
    colors: ["Brown", "Black", "Tan"],
    sizes: ["One Size"],
    inStock: true,
    badge: "Premium",
    description: "Premium leather handbag with elegant design.",
    specifications: { Material: "Genuine Leather", Compartments: "3", Closure: "Zipper" }
  },
  {
    id: 8,
    name: "Fashion Sunglasses",
    price: 59.99,
    discount: 35,
    discountedPrice: 38.99,
    category: "accessories",
    subcategory: "accessories",
    brand: "Puma",
    rating: 4.4,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop"
    ],
    colors: ["Black", "Brown", "Blue"],
    sizes: ["One Size"],
    inStock: true,
    badge: "Flash Sale",
    description: "Stylish sunglasses with UV protection.",
    specifications: { Frame: "Plastic", Lens: "UV400", Type: "Polarized" }
  }
];

const applianceProducts = [
  {
    id: 101,
    name: "4K Smart TV 55 Inch",
    price: 599.99,
    discount: 15,
    discountedPrice: 509.99,
    category: "tv",
    subcategory: "tv",
    brand: "Samsung",
    rating: 4.8,
    reviews: 523,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=600&fit=crop"
    ],
    colors: ["Black"],
    sizes: ["55 Inch"],
    inStock: true,
    badge: "Best Seller",
    description: "Crystal clear 4K resolution smart TV with HDR.",
    specifications: { Resolution: "4K", Size: "55\"", Smart: "Yes", HDR: "Yes" }
  },
  {
    id: 102,
    name: "Double Door Refrigerator",
    price: 899.99,
    discount: 10,
    discountedPrice: 809.99,
    category: "refrigerator",
    subcategory: "refrigerator",
    brand: "LG",
    rating: 4.7,
    reviews: 389,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop"
    ],
    colors: ["Silver", "Black"],
    sizes: ["350L"],
    inStock: true,
    badge: "New",
    description: "Energy efficient double door refrigerator.",
    specifications: { Capacity: "350L", Type: "Frost Free", Energy: "5 Star" }
  },
  {
    id: 103,
    name: "Front Load Washing Machine",
    price: 649.99,
    discount: 20,
    discountedPrice: 519.99,
    category: "washing-machine",
    subcategory: "washing-machine",
    brand: "Samsung",
    rating: 4.6,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2e4e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558346490-a72e53ae2e4e?w=600&h=600&fit=crop"
    ],
    colors: ["White", "Silver"],
    sizes: ["7Kg"],
    inStock: true,
    badge: "Hot Deal",
    description: "Quiet and efficient front load washing machine.",
    specifications: { Capacity: "7Kg", Type: "Front Load", RPM: "1200" }
  },
  {
    id: 104,
    name: "Convection Microwave Oven",
    price: 199.99,
    discount: 25,
    discountedPrice: 149.99,
    category: "microwave",
    subcategory: "microwave",
    brand: "Whirlpool",
    rating: 4.5,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop"
    ],
    colors: ["Black", "Silver"],
    sizes: ["25L"],
    inStock: true,
    badge: "Sale",
    description: "Versatile convection microwave for all cooking needs.",
    specifications: { Capacity: "25L", Type: "Convection", Grill: "Yes" }
  },
  {
    id: 105,
    name: "1.5 Ton Split AC",
    price: 449.99,
    discount: 12,
    discountedPrice: 395.99,
    category: "air-conditioner",
    subcategory: "air-conditioner",
    brand: "LG",
    rating: 4.8,
    reviews: 423,
    image: "https://images.unsplash.com/photo-1631890002577-566e6e9c360c?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1631890002577-566e6e9c360c?w=600&h=600&fit=crop"
    ],
    colors: ["White"],
    sizes: ["1.5 Ton"],
    inStock: true,
    badge: "Best Seller",
    description: "Energy efficient split air conditioner.",
    specifications: { Capacity: "1.5 Ton", Type: "Split", Star: "5 Star" }
  },
  {
    id: 106,
    name: "Premium Ceiling Fan",
    price: 49.99,
    discount: 5,
    discountedPrice: 47.49,
    category: "fan",
    subcategory: "fan",
    brand: "Sony",
    rating: 4.3,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1580918742040-15d5c732856a?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1580918742040-15d5c732856a?w=600&h=600&fit=crop"
    ],
    colors: ["White", "Brown"],
    sizes: ["1200mm"],
    inStock: true,
    badge: "",
    description: "Stylish and quiet ceiling fan.",
    specifications: { Size: "1200mm", Speed: "400 RPM", Blades: "3" }
  },
  {
    id: 107,
    name: "Mixer Grinder 750W",
    price: 79.99,
    discount: 18,
    discountedPrice: 65.59,
    category: "mixer",
    subcategory: "mixer",
    brand: "Whirlpool",
    rating: 4.6,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop"
    ],
    colors: ["White", "Black"],
    sizes: ["750W"],
    inStock: true,
    badge: "Trending",
    description: "Powerful mixer grinder with multiple jars.",
    specifications: { Power: "750W", Jars: "3", Warranty: "2 Years" }
  },
  {
    id: 108,
    name: "Steam Iron",
    price: 39.99,
    discount: 10,
    discountedPrice: 35.99,
    category: "iron",
    subcategory: "iron",
    brand: "Samsung",
    rating: 4.4,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1558961666-0f6c4e574438?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558961666-0f6c4e574438?w=600&h=600&fit=crop"
    ],
    colors: ["Blue", "White"],
    sizes: ["1200W"],
    inStock: true,
    badge: "New",
    description: "Easy to use steam iron.",
    specifications: { Power: "1200W", Steam: "Yes", Warranty: "1 Year" }
  }
];

const generateMoreProducts = () => {
  const allProducts = [...clothingProducts];
  for (let i = 9; i <= 80; i++) {
    allProducts.push({
      id: i,
      name: `Clothing Product ${i}`,
      price: Math.floor(Math.random() * 150) + 30,
      discount: Math.floor(Math.random() * 40),
      discountedPrice: 0,
      category: ["men", "women", "kids", "summer-wear", "winter-wear"][Math.floor(Math.random() * 5)],
      subcategory: ["men", "women", "kids", "shoes", "bags", "accessories"][Math.floor(Math.random() * 6)],
      brand: ["Nike", "Adidas", "Levis", "Zara", "H&M", "Puma"][Math.floor(Math.random() * 6)],
      rating: 4 + Math.random(),
      reviews: Math.floor(Math.random() * 300) + 50,
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
      images: ["https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop"],
      colors: ["Black", "White", "Blue"],
      sizes: ["S", "M", "L", "XL"],
      inStock: Math.random() > 0.1,
      badge: ["Trending", "New", "Best Seller", "Sale", ""][Math.floor(Math.random() * 5)],
      description: "High quality clothing product with great comfort.",
      specifications: { Material: "Premium", Fit: "Regular" }
    });
  }
  allProducts.forEach(p => {
    p.discountedPrice = p.discount > 0 ? (p.price * (1 - p.discount / 100)) : p.price;
  });

  const allAppliances = [...applianceProducts];
  for (let i = 109; i <= 180; i++) {
    allAppliances.push({
      id: i,
      name: `Home Appliance ${i}`,
      price: Math.floor(Math.random() * 800) + 100,
      discount: Math.floor(Math.random() * 35),
      discountedPrice: 0,
      category: ["tv", "refrigerator", "washing-machine", "microwave", "air-conditioner", "fan", "mixer"][Math.floor(Math.random() * 7)],
      subcategory: ["tv", "refrigerator", "washing-machine", "microwave", "air-conditioner", "fan", "mixer"][Math.floor(Math.random() * 7)],
      brand: ["Samsung", "LG", "Sony", "Whirlpool"][Math.floor(Math.random() * 4)],
      rating: 4 + Math.random(),
      reviews: Math.floor(Math.random() * 300) + 50,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop"],
      colors: ["Black", "Silver", "White"],
      sizes: ["Standard"],
      inStock: Math.random() > 0.1,
      badge: ["New", "Best Seller", "Hot Deal", ""][Math.floor(Math.random() * 4)],
      description: "Quality home appliance with warranty.",
      specifications: { Type: "Premium", Warranty: "1 Year" }
    });
  }
  allAppliances.forEach(p => {
    p.discountedPrice = p.discount > 0 ? (p.price * (1 - p.discount / 100)) : p.price;
  });

  return [...allProducts, ...allAppliances];
};

const products = generateMoreProducts();

export default products;

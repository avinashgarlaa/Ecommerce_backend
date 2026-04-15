require("dotenv").config();
const crypto = require("crypto");
const pool = require("./config/db");

const products = [
  {
    name: "Apple iPhone 15 (Black, 128 GB)",
    brand: "Apple",
    description: "Latest iPhone with A16 Bionic chip and advanced dual camera system.",
    price: 79999,
    original_price: 89999,
    discount_percent: 11,
    category: "Electronics",
    sub_category: "Mobiles",
    stock: 20,
    stock_status: "In Stock",
    image_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
    image_urls: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505"
    ],
    rating: 4.7,
    review_count: 2450,
    badge: "Best Seller",
    delivery: "Free delivery",
    delivery_time: "2 days",
    offers: ["10% off on HDFC cards", "No cost EMI"]
  },

  {
    name: "Samsung Galaxy S24 Ultra (Titanium Gray, 256 GB)",
    brand: "Samsung",
    description: "Flagship Android smartphone with AI camera and AMOLED display.",
    price: 109999,
    original_price: 119999,
    discount_percent: 8,
    category: "Electronics",
    sub_category: "Mobiles",
    stock: 15,
    stock_status: "Only 5 left",
    image_url: "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00",
    image_urls: [
      "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e"
    ],
    rating: 4.6,
    review_count: 1980,
    badge: "Trending",
    delivery: "Free delivery",
    delivery_time: "3 days",
    offers: ["Exchange available", "₹5000 instant discount"]
  },

  {
    name: "Sony WH-1000XM5 Noise Cancelling Headphones",
    brand: "Sony",
    description: "Industry-leading noise cancellation with 30-hour battery life.",
    price: 29999,
    original_price: 34999,
    discount_percent: 14,
    category: "Electronics",
    sub_category: "Audio",
    stock: 25,
    image_url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
    image_urls: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944"
    ],
    rating: 4.8,
    review_count: 1200,
    badge: "Top Rated",
    delivery: "Free delivery",
    delivery_time: "2 days"
  },

  {
    name: "HP Pavilion 15 Ryzen 5 Laptop (16GB RAM, 512GB SSD)",
    brand: "HP",
    description: "Powerful laptop for coding, multitasking, and daily productivity.",
    price: 58999,
    original_price: 65999,
    discount_percent: 10,
    category: "Electronics",
    sub_category: "Laptops",
    stock: 12,
    image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    image_urls: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
      "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb"
    ],
    rating: 4.4,
    review_count: 850,
    badge: "Hot Deal"
  },

  {
    name: "Nike Air Zoom Pegasus Running Shoes",
    brand: "Nike",
    description: "Comfortable running shoes with responsive cushioning.",
    price: 6599,
    original_price: 7999,
    discount_percent: 18,
    category: "Fashion",
    sub_category: "Footwear",
    stock: 40,
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    image_urls: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb"
    ],
    rating: 4.5,
    review_count: 2100,
    badge: "Best Seller"
  },

  {
    name: "Levi's Slim Fit Men's Jeans",
    brand: "Levi's",
    description: "Premium slim-fit jeans with stretch comfort.",
    price: 3499,
    original_price: 4999,
    discount_percent: 30,
    category: "Fashion",
    sub_category: "Clothing",
    stock: 50,
    image_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    image_urls: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a"
    ],
    rating: 4.3,
    review_count: 1300
  },

  {
    name: "JBL Flip 6 Bluetooth Speaker",
    brand: "JBL",
    description: "Portable waterproof speaker with deep bass.",
    price: 10999,
    original_price: 12999,
    discount_percent: 15,
    category: "Electronics",
    sub_category: "Audio",
    stock: 30,
    image_url: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
    image_urls: [
      "https://images.unsplash.com/photo-1589003077984-894e133dabab",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    ],
    rating: 4.6,
    review_count: 900
  },

  {
    name: "LG 55 inch 4K Smart LED TV",
    brand: "LG",
    description: "Ultra HD smart TV with Dolby Vision and WebOS.",
    price: 45999,
    original_price: 59999,
    discount_percent: 23,
    category: "Electronics",
    sub_category: "TV",
    stock: 10,
    image_url: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
    image_urls: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79",
      "https://images.unsplash.com/photo-1577979749830-f1d742b96791"
    ],
    rating: 4.5,
    review_count: 700
  },

  {
    name: "Wooden Study Desk with Storage",
    brand: "HomeCraft",
    description: "Spacious desk perfect for home office and study.",
    price: 8499,
    original_price: 10999,
    discount_percent: 22,
    category: "Home",
    sub_category: "Furniture",
    stock: 20,
    image_url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd",
    image_urls: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9"
    ],
    rating: 4.2,
    review_count: 600
  },

  {
    name: "Premium Travel Backpack 40L",
    brand: "Skybags",
    description: "Durable backpack with laptop compartment.",
    price: 2699,
    original_price: 3999,
    discount_percent: 32,
    category: "Travel",
    sub_category: "Bags",
    stock: 60,
    image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    image_urls: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7"
    ],
    rating: 4.4,
    review_count: 1200,
    badge: "Hot Deal"
  }
];
const seededProducts = products.map((product) => {
  const gallery = [
    product.image_url,
    ...(Array.isArray(product.image_urls) ? product.image_urls : []),
  ].filter(Boolean);

  const uniqueGallery = [...new Set(gallery)];

  return {
    ...product,
    image_url: uniqueGallery[0] || product.image_url,
    image_urls: uniqueGallery,
  };
});

if (seededProducts.length < 1) {
  throw new Error(`Seed data must contain at least 1 product. Found: ${seededProducts.length}`);
}

const validateSeedData = () => {
  const seenNames = new Set();
  const seenNameCategory = new Set();
  const seenDescriptions = new Set();
  const seenPrimaryImages = new Set();

  for (const product of seededProducts) {
    const normalizedName = product.name.trim().toLowerCase();
    const normalizedCategory = product.category.trim().toLowerCase();
    const uniqueNameCategoryKey = `${normalizedCategory}::${normalizedName}`;
    const normalizedDescription = product.description.trim().toLowerCase();

    if (seenNames.has(normalizedName)) {
      throw new Error(`Duplicate product name found: "${product.name}"`);
    }
    seenNames.add(normalizedName);

    if (seenNameCategory.has(uniqueNameCategoryKey)) {
      throw new Error(`Duplicate product in same category: "${product.name}" (${product.category})`);
    }
    seenNameCategory.add(uniqueNameCategoryKey);

    if (seenDescriptions.has(normalizedDescription)) {
      throw new Error(`Duplicate product description found for "${product.name}"`);
    }
    seenDescriptions.add(normalizedDescription);

    if (!Array.isArray(product.image_urls) || product.image_urls.length < 3) {
      throw new Error(`Product "${product.name}" must have at least 3 related images`);
    }
    if (!product.image_url || !product.image_urls.includes(product.image_url)) {
      throw new Error(`Product "${product.name}" has invalid primary image`);
    }
    if (seenPrimaryImages.has(product.image_url)) {
      throw new Error(`Duplicate primary image URL found: ${product.image_url}`);
    }
    seenPrimaryImages.add(product.image_url);

    const uniqueInsideProduct = new Set(product.image_urls);
    if (uniqueInsideProduct.size !== product.image_urls.length) {
      throw new Error(`Product "${product.name}" has duplicate images in gallery`);
    }
  }
};

const seedDatabase = async () => {
  try {
    console.log("🌱 Seeding full database...");

    await pool.query(`
      DROP TABLE IF EXISTS order_items;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(120) NOT NULL,
        email VARCHAR(180) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        password_salt TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL CHECK (price > 0),
        category VARCHAR(100) NOT NULL,
        stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
        image_url TEXT NOT NULL,
        image_urls JSONB DEFAULT '[]',
        specifications JSONB DEFAULT '{}',
        rating DECIMAL(2,1) DEFAULT 4.0,
        review_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS cart (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        quantity INT NOT NULL CHECK (quantity > 0),
        UNIQUE(user_id, product_id)
      );

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        address JSONB NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount > 0),
        payment_method VARCHAR(20) NOT NULL DEFAULT 'COD',
        status VARCHAR(20) NOT NULL DEFAULT 'PLACED',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        quantity INT NOT NULL CHECK (quantity > 0),
        price_at_purchase DECIMAL(10,2) NOT NULL CHECK (price_at_purchase > 0)
      );

      CREATE INDEX idx_products_category ON products(category);
      CREATE INDEX idx_products_price ON products(price);
      CREATE INDEX idx_cart_user ON cart(user_id);
    `);

    const salt = crypto.randomBytes(16).toString("hex");
    const password = "password123";
    const passwordHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");

    await pool.query(
      `
      INSERT INTO users (full_name, email, password_hash, password_salt)
      VALUES ($1, $2, $3, $4);
      `,
      ["Default Shopper", "default@shopverse.local", passwordHash, salt]
    );

    validateSeedData();

    const insertProductQuery = `
      INSERT INTO products
      (name, description, price, category, stock, image_url, image_urls, specifications, rating, review_count)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7::jsonb, $8::jsonb, $9, $10)
    `;

    for (const product of seededProducts) {
      await pool.query(insertProductQuery, [
        product.name,
        product.description,
        product.price,
        product.category,
        product.stock,
        product.image_url,
        JSON.stringify(product.image_urls),
        JSON.stringify(product.specifications),
        product.rating,
        product.review_count,
      ]);
    }

    console.log(`✅ Database seeded successfully with ${seededProducts.length} products!`);
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding DB:", err);
    process.exit(1);
  }
};

seedDatabase();

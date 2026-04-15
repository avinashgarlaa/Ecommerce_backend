require("dotenv").config();
const crypto = require("crypto");
const pool = require("./config/db");

const seedDatabase = async () => {
  try {
    console.log("🌱 Seeding full database...");

    // Reset tables to ensure deterministic local demo data.
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

    // Sample catalog data across multiple categories.
    await pool.query(`
      INSERT INTO products (name, description, price, category, stock, image_url, image_urls, specifications, rating, review_count)
      VALUES 
      ('iPhone 13', 'Apple smartphone with great camera and performance', 69999, 'Mobiles', 14, 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80"]', '{"brand":"Apple","storage":"128 GB","display":"6.1 inch Super Retina XDR","battery":"3240 mAh","warranty":"1 year manufacturer warranty"}', 4.6, 1832),
      ('Samsung Galaxy S21', 'Premium Android smartphone with AMOLED display', 59999, 'Mobiles', 9, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80"]', '{"brand":"Samsung","storage":"128 GB","display":"6.2 inch Dynamic AMOLED","battery":"4000 mAh","warranty":"1 year manufacturer warranty"}', 4.4, 1047),
      ('Boat Airdopes 141', 'Wireless earbuds with deep bass and 40h battery', 1799, 'Electronics', 30, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80"]', '{"brand":"Boat","connectivity":"Bluetooth 5.0","playback":"40 hours","water_resistance":"IPX4","warranty":"1 year"}', 4.2, 5421),
      ('HP Laptop 15', 'Laptop for coding and productivity tasks', 55000, 'Electronics', 7, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80"]', '{"processor":"Intel Core i5","ram":"16 GB","storage":"512 GB SSD","display":"15.6 inch FHD","warranty":"1 year onsite"}', 4.3, 876),
      ('Nike Running Shoes', 'Lightweight running shoes for daily workouts', 2999, 'Fashion', 24, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"]', '{"material":"Mesh","sole":"Rubber","fit":"Regular","ideal_for":"Men"}', 4.1, 2319),
      ('Campus Sneakers', 'Comfort daily wear sneakers with breathable fabric', 2199, 'Fashion', 35, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"]', '{"material":"Synthetic","sole":"PU","fit":"Regular","ideal_for":"Unisex"}', 4.0, 980),
      ('Smart LED TV 43 inch', 'Full HD smart television with OTT apps', 22999, 'Appliances', 6, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80"]', '{"screen_size":"43 inch","resolution":"Full HD","smart_tv":"Yes","ports":"3 HDMI, 2 USB"}', 4.3, 645),
      ('Air Fryer 4L', 'Healthy oil-free cooking with digital controls', 5499, 'Appliances', 16, 'https://images.unsplash.com/photo-1585515656973-4f90f8d0fe9e?auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1585515656973-4f90f8d0fe9e?auto=format&fit=crop&w=800&q=80"]', '{"capacity":"4 liters","power":"1400W","controls":"Digital touch","warranty":"1 year"}', 4.2, 412),
      ('Wooden Study Table', 'Modern wooden table for home office setup', 6499, 'Home', 13, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"]', '{"material":"Engineered wood","width":"120 cm","assembly":"DIY","warranty":"6 months"}', 4.1, 303),
      ('Kitchen Storage Rack', 'Space-saving rack for kitchen organization', 1499, 'Home', 44, 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80"]', '{"material":"Metal","tiers":"4","assembly":"DIY","ideal_for":"Kitchen"}', 4.0, 267),
      ('Travel Cabin Bag', 'Durable cabin trolley bag for short trips', 3499, 'Travel', 12, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"]', '{"capacity":"36 L","wheel_type":"360 degree spinner","material":"Polycarbonate","warranty":"3 years"}', 4.2, 521),
      ('Organic Basmati Rice 5kg', 'Premium long grain basmati rice', 799, 'Grocery', 80, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"]', '{"weight":"5 kg","type":"Basmati","organic":"Yes","shelf_life":"12 months"}', 4.5, 1887);
    `);

    console.log("✅ Database seeded successfully!");
    process.exit();

  } catch (err) {
    console.error("❌ Error seeding DB:", err);
    process.exit(1);
  }
};

seedDatabase();
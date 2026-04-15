require("dotenv").config();
const pool = require("./config/db");

const seedDatabase = async () => {
  try {
    console.log("🌱 Seeding full database...");

    // 🧱 CREATE TABLES (your schema)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        price DECIMAL,
        category VARCHAR(100),
        stock INT,
        image_url TEXT
      );

      CREATE TABLE IF NOT EXISTS cart (
        id SERIAL PRIMARY KEY,
        product_id INT REFERENCES products(id),
        quantity INT
      );

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        address TEXT,
        total_amount DECIMAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders(id),
        product_id INT REFERENCES products(id),
        quantity INT
      );
    `);

    // 🛍️ INSERT SAMPLE PRODUCTS
    await pool.query(`
      INSERT INTO products (name, description, price, category, stock, image_url)
      VALUES 
      ('iPhone 13', 'Apple smartphone with great camera and performance', 69999, 'Mobiles', 10, 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80'),
      ('Samsung Galaxy S21', 'Premium Android smartphone with AMOLED display', 59999, 'Mobiles', 8, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'),
      ('Nike Running Shoes', 'Lightweight running shoes for daily workouts', 2999, 'Fashion', 20, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'),
      ('HP Laptop 15', 'Laptop for coding and productivity tasks', 55000, 'Electronics', 5, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'),
      ('Boat Airdopes', 'Wireless earbuds with deep bass', 1799, 'Electronics', 30, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'),
      ('Smart LED TV 43"', 'Full HD smart television with streaming apps', 22999, 'Appliances', 7, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'),
      ('Wooden Study Table', 'Modern wooden table for home office setup', 6499, 'Home', 14, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'),
      ('Travel Cabin Bag', 'Durable cabin trolley bag for short trips', 3499, 'Travel', 12, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80')
      ON CONFLICT DO NOTHING;
    `);

    console.log("✅ Database seeded successfully!");
    process.exit();

  } catch (err) {
    console.error("❌ Error seeding DB:", err);
    process.exit(1);
  }
};

seedDatabase();
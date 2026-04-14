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
      ('iPhone 13', 'Apple smartphone', 69999, 'Mobiles', 10, 'https://via.placeholder.com/150'),
      ('Samsung Galaxy S21', 'Android smartphone', 59999, 'Mobiles', 8, 'https://via.placeholder.com/150'),
      ('Nike Shoes', 'Running shoes', 2999, 'Fashion', 20, 'https://via.placeholder.com/150'),
      ('HP Laptop', 'Laptop for coding', 55000, 'Electronics', 5, 'https://via.placeholder.com/150')
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
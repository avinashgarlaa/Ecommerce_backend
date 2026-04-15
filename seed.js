require("dotenv").config();
const crypto = require("crypto");
const pool = require("./config/db");

const products = [
  {
    name: "iPhone 15",
    description: "Flagship smartphone with A16 chip, premium camera system, and all-day battery life.",
    price: 79999,
    category: "Mobiles",
    stock: 18,
    image_url:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      brand: "Apple",
      storage: "128 GB",
      display: "6.1 inch Super Retina",
      battery: "All day battery",
      warranty: "1 year manufacturer warranty",
    },
    rating: 4.7,
    review_count: 2341,
  },
  {
    name: "Samsung Galaxy S24",
    description: "Premium Android phone with bright AMOLED panel, AI features, and smooth performance.",
    price: 72999,
    category: "Mobiles",
    stock: 16,
    image_url:
      "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      brand: "Samsung",
      storage: "256 GB",
      display: "6.2 inch Dynamic AMOLED",
      battery: "4000 mAh",
      warranty: "1 year manufacturer warranty",
    },
    rating: 4.6,
    review_count: 1890,
  },
  {
    name: "OnePlus 12R",
    description: "Performance-first smartphone with fluid AMOLED display and blazing fast charging.",
    price: 41999,
    category: "Mobiles",
    stock: 22,
    image_url:
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      brand: "OnePlus",
      storage: "256 GB",
      display: "6.78 inch AMOLED",
      battery: "5500 mAh",
      warranty: "1 year manufacturer warranty",
    },
    rating: 4.5,
    review_count: 1423,
  },
  {
    name: "Google Pixel 8",
    description: "AI-powered camera phone with clean software experience and day-long battery.",
    price: 68999,
    category: "Mobiles",
    stock: 11,
    image_url:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1603899122724-3cf3fdb8925e?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      brand: "Google",
      storage: "128 GB",
      display: "6.2 inch OLED",
      battery: "4575 mAh",
      warranty: "1 year manufacturer warranty",
    },
    rating: 4.4,
    review_count: 978,
  },
  {
    name: "MacBook Air M2",
    description: "Thin and light laptop with excellent battery backup for professionals and students.",
    price: 104999,
    category: "Electronics",
    stock: 9,
    image_url:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      processor: "Apple M2",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "13.6 inch Liquid Retina",
      warranty: "1 year",
    },
    rating: 4.8,
    review_count: 1612,
  },
  {
    name: "HP Pavilion 15",
    description: "Balanced productivity laptop with strong performance for coding and multitasking.",
    price: 58999,
    category: "Electronics",
    stock: 14,
    image_url:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      processor: "Intel Core i5",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "15.6 inch FHD",
      warranty: "1 year onsite",
    },
    rating: 4.3,
    review_count: 1254,
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation headphones with premium comfort and battery.",
    price: 29999,
    category: "Electronics",
    stock: 20,
    image_url:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      connectivity: "Bluetooth 5.2",
      battery: "Up to 30 hours",
      driver: "30 mm",
      microphone: "Beamforming mics",
      warranty: "1 year",
    },
    rating: 4.7,
    review_count: 934,
  },
  {
    name: "Logitech MX Master 3S",
    description: "Ergonomic productivity mouse with ultra-precise tracking and silent clicks.",
    price: 8999,
    category: "Electronics",
    stock: 31,
    image_url:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586349906319-48d20e9d17b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      sensor: "8K DPI",
      connectivity: "Bluetooth, USB receiver",
      battery: "Up to 70 days",
      compatibility: "Windows, macOS",
      warranty: "1 year",
    },
    rating: 4.6,
    review_count: 682,
  },
  {
    name: "Nike Air Zoom Pegasus",
    description: "Responsive running shoes with breathable upper and springy cushioning.",
    price: 6599,
    category: "Fashion",
    stock: 28,
    image_url:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      material: "Engineered mesh",
      sole: "Rubber",
      fit: "Regular",
      ideal_for: "Men",
      warranty: "6 months",
    },
    rating: 4.4,
    review_count: 2198,
  },
  {
    name: "Adidas Essentials Hoodie",
    description: "Soft fleece hoodie designed for everyday comfort and casual layering.",
    price: 2999,
    category: "Fashion",
    stock: 42,
    image_url:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      material: "Cotton blend",
      fit: "Regular",
      sleeve: "Full",
      care: "Machine wash",
      ideal_for: "Unisex",
    },
    rating: 4.2,
    review_count: 844,
  },
  {
    name: "Levi's Slim Fit Jeans",
    description: "Classic slim-fit denim with stretch comfort for all-day wear.",
    price: 3499,
    category: "Fashion",
    stock: 36,
    image_url:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      material: "98% cotton, 2% elastane",
      fit: "Slim",
      rise: "Mid rise",
      stretch: "Yes",
      ideal_for: "Men",
    },
    rating: 4.3,
    review_count: 1303,
  },
  {
    name: "Women Tote Handbag",
    description: "Spacious everyday tote with minimal design and durable faux leather.",
    price: 2499,
    category: "Fashion",
    stock: 39,
    image_url:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      material: "PU leather",
      closure: "Zip",
      compartments: "3",
      strap: "Double handle",
      ideal_for: "Women",
    },
    rating: 4.1,
    review_count: 761,
  },
  {
    name: "4K Smart TV 55 inch",
    description: "Ultra HD smart TV with HDR, voice assistant support, and immersive audio.",
    price: 45999,
    category: "Appliances",
    stock: 10,
    image_url:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577979749830-f1d742b96791?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      screen_size: "55 inch",
      resolution: "4K Ultra HD",
      smart_tv: "Yes",
      ports: "3 HDMI, 2 USB",
      warranty: "1 year",
    },
    rating: 4.5,
    review_count: 715,
  },
  {
    name: "IFB Front Load Washing Machine",
    description: "Efficient front load washer with multiple wash programs and smart sensors.",
    price: 32999,
    category: "Appliances",
    stock: 12,
    image_url:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1622372738946-62e02505feb3?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      capacity: "8 kg",
      wash_programs: "15",
      energy_rating: "5 star",
      motor: "Inverter",
      warranty: "2 years",
    },
    rating: 4.3,
    review_count: 489,
  },
  {
    name: "Philips Air Fryer XL",
    description: "Low-oil air fryer with rapid air technology for healthier everyday cooking.",
    price: 9999,
    category: "Appliances",
    stock: 21,
    image_url:
      "https://images.unsplash.com/photo-1595715101930-a3d7d34084a1?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1595715101930-a3d7d34084a1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585515656973-4f90f8d0fe9e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      capacity: "6.2 L",
      power: "1700W",
      controls: "Digital",
      timer: "60 min",
      warranty: "2 years",
    },
    rating: 4.4,
    review_count: 1046,
  },
  {
    name: "Dyson Cool Air Purifier",
    description: "Air purifier with HEPA filtration and smart sensing for cleaner indoor air.",
    price: 38999,
    category: "Appliances",
    stock: 7,
    image_url:
      "https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      coverage: "600 sq ft",
      filter: "HEPA H13",
      control: "App + remote",
      noise_level: "Low",
      warranty: "2 years",
    },
    rating: 4.6,
    review_count: 302,
  },
  {
    name: "Solid Wood Study Desk",
    description: "Modern work desk crafted for home office setups with cable-management tray.",
    price: 8499,
    category: "Home",
    stock: 17,
    image_url:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      material: "Solid wood",
      width: "120 cm",
      finish: "Walnut",
      assembly: "DIY",
      warranty: "1 year",
    },
    rating: 4.2,
    review_count: 593,
  },
  {
    name: "Ergonomic Office Chair",
    description: "Mesh ergonomic chair with lumbar support and adjustable armrests.",
    price: 6999,
    category: "Home",
    stock: 27,
    image_url:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      material: "Mesh + metal frame",
      support: "Lumbar",
      recline: "Tilt lock",
      max_weight: "120 kg",
      warranty: "1 year",
    },
    rating: 4.3,
    review_count: 817,
  },
  {
    name: "Queen Bed Sheet Set",
    description: "Soft cotton bedsheet set including 2 pillow covers in premium prints.",
    price: 1799,
    category: "Home",
    stock: 54,
    image_url:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      material: "100% cotton",
      size: "Queen",
      thread_count: "220",
      wash_care: "Machine wash",
      pieces: "3",
    },
    rating: 4.1,
    review_count: 1201,
  },
  {
    name: "Indoor Plant Set (3 pcs)",
    description: "Decorative low-maintenance indoor plants to brighten up your living space.",
    price: 1299,
    category: "Home",
    stock: 63,
    image_url:
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      quantity: "3 plants",
      pot_material: "Ceramic",
      maintenance: "Low",
      placement: "Indoor",
      height: "8-12 inches",
    },
    rating: 4.0,
    review_count: 488,
  },
  {
    name: "Skyline Cabin Trolley",
    description: "Lightweight cabin luggage with smooth 360 spinner wheels and TSA lock.",
    price: 4499,
    category: "Travel",
    stock: 26,
    image_url:
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      capacity: "38 L",
      wheel_type: "360 spinner",
      material: "Polycarbonate",
      lock: "TSA",
      warranty: "3 years",
    },
    rating: 4.3,
    review_count: 950,
  },
  {
    name: "Travel Backpack 40L",
    description: "Water-resistant backpack with laptop sleeve and organized travel compartments.",
    price: 2699,
    category: "Travel",
    stock: 47,
    image_url:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      capacity: "40 L",
      material: "Polyester",
      laptop_compartment: "15.6 inch",
      water_resistance: "Yes",
      warranty: "1 year",
    },
    rating: 4.2,
    review_count: 712,
  },
  {
    name: "Neck Pillow + Eye Mask Set",
    description: "Memory foam neck pillow set designed for flights and long road trips.",
    price: 999,
    category: "Travel",
    stock: 90,
    image_url:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542291026-1534b0d0f8c9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      material: "Memory foam",
      cover: "Velour",
      washable: "Yes",
      includes: "Pillow, eye mask, ear plugs",
      ideal_for: "Travel",
    },
    rating: 4.1,
    review_count: 1050,
  },
  {
    name: "Organic Basmati Rice 10kg",
    description: "Aromatic long-grain basmati rice sourced from premium organic farms.",
    price: 1499,
    category: "Grocery",
    stock: 140,
    image_url:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      weight: "10 kg",
      type: "Basmati",
      organic: "Yes",
      shelf_life: "12 months",
      origin: "India",
    },
    rating: 4.5,
    review_count: 2133,
  },
  {
    name: "Cold Pressed Olive Oil 1L",
    description: "Extra virgin olive oil suitable for salads, sauteing, and healthy cooking.",
    price: 799,
    category: "Grocery",
    stock: 120,
    image_url:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      quantity: "1 L",
      extraction: "Cold pressed",
      type: "Extra virgin",
      packaging: "Glass bottle",
      shelf_life: "18 months",
    },
    rating: 4.4,
    review_count: 1287,
  },
  {
    name: "Premium Mixed Dry Fruits 1kg",
    description: "Roasted almonds, cashews, pistachios, and raisins in a fresh-seal pack.",
    price: 1399,
    category: "Grocery",
    stock: 98,
    image_url:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1594149929911-78975a43d4f5?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      weight: "1 kg",
      type: "Premium mix",
      added_sugar: "No",
      packaging: "Resealable pouch",
      shelf_life: "9 months",
    },
    rating: 4.3,
    review_count: 954,
  },
  {
    name: "Protein Oats Blend 2kg",
    description: "High-fiber oats blend with seeds and nuts for healthy breakfast prep.",
    price: 699,
    category: "Grocery",
    stock: 130,
    image_url:
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      weight: "2 kg",
      fiber: "High",
      protein: "15 g per serving",
      added_sugar: "No",
      shelf_life: "10 months",
    },
    rating: 4.2,
    review_count: 1180,
  },
  {
    name: "JBL Flip 6 Bluetooth Speaker",
    description: "Portable waterproof speaker with powerful bass and up to 12 hours playback.",
    price: 10999,
    category: "Electronics",
    stock: 25,
    image_url: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      connectivity: "Bluetooth 5.1",
      playback: "12 hours",
      water_resistance: "IP67",
      charging: "USB-C",
      warranty: "1 year",
    },
    rating: 4.5,
    review_count: 835,
  },
  {
    name: "Instant Pot Multi Cooker 6L",
    description: "7-in-1 smart cooker for pressure cooking, sauteing, steaming, and more.",
    price: 12999,
    category: "Appliances",
    stock: 19,
    image_url: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      capacity: "6 L",
      presets: "14 smart programs",
      safety: "10+ safety mechanisms",
      pot_material: "Stainless steel",
      warranty: "2 years",
    },
    rating: 4.4,
    review_count: 562,
  },
  {
    name: "Casio Analog Watch",
    description: "Classic everyday analog watch with stainless steel strap and mineral glass.",
    price: 3999,
    category: "Fashion",
    stock: 46,
    image_url: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      movement: "Quartz",
      dial: "Analog",
      strap: "Stainless steel",
      water_resistance: "50 m",
      warranty: "2 years",
    },
    rating: 4.2,
    review_count: 1407,
  },
  {
    name: "Premium Yoga Mat 6mm",
    description: "Anti-slip yoga mat with high-density cushioning for workouts and meditation.",
    price: 1499,
    category: "Home",
    stock: 58,
    image_url: "https://images.unsplash.com/photo-1571019613540-996a387f0f2b?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1571019613540-996a387f0f2b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      thickness: "6 mm",
      material: "TPE",
      grip: "Anti-slip",
      weight: "900 g",
      ideal_for: "Yoga and pilates",
    },
    rating: 4.4,
    review_count: 698,
  },
  {
    name: "Trekking Shoes Waterproof",
    description: "High-ankle waterproof trekking shoes with durable grip for rough terrain.",
    price: 5299,
    category: "Travel",
    stock: 33,
    image_url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520219306100-ec6d98536902?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504765050519-5f16d74f33f7?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      material: "Synthetic leather",
      grip: "Deep lug outsole",
      waterproof: "Yes",
      fit: "Regular",
      warranty: "6 months",
    },
    rating: 4.3,
    review_count: 511,
  },
  {
    name: "Dark Roast Coffee Beans 1kg",
    description: "Single-origin arabica coffee beans with rich aroma and bold dark-roast flavor.",
    price: 1199,
    category: "Grocery",
    stock: 82,
    image_url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      type: "Arabica",
      roast: "Dark",
      weight: "1 kg",
      grind: "Whole bean",
      shelf_life: "12 months",
    },
    rating: 4.5,
    review_count: 953,
  },
  {
    name: "ASUS ROG 27-inch Gaming Monitor",
    description: "27-inch QHD gaming monitor with 165Hz refresh rate and ultra-low response time.",
    price: 26999,
    category: "Electronics",
    stock: 13,
    image_url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593640408182-31c228c3f5c1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      size: "27 inch",
      resolution: "QHD 2560x1440",
      refresh_rate: "165 Hz",
      response_time: "1 ms",
      warranty: "3 years",
    },
    rating: 4.6,
    review_count: 409,
  },
  {
    name: "Premium Suitcase Set (3 pcs)",
    description: "Hard-shell luggage set with TSA locks and 360 spinner wheels for long trips.",
    price: 12999,
    category: "Travel",
    stock: 21,
    image_url: "https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      pieces: "3",
      material: "Polycarbonate",
      wheel_type: "360 spinner",
      locks: "TSA",
      warranty: "5 years",
    },
    rating: 4.4,
    review_count: 621,
  },
  {
    name: "Realme Pad 2",
    description: "Entertainment-focused tablet with 2K display and large battery backup.",
    price: 21999,
    category: "Electronics",
    stock: 24,
    image_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      display: "11.5 inch 2K",
      storage: "128 GB",
      battery: "8360 mAh",
      speaker: "Quad speakers",
      warranty: "1 year",
    },
    rating: 4.3,
    review_count: 784,
  },
  {
    name: "Crockery Dinner Set 24 pcs",
    description: "Elegant ceramic dinnerware set suitable for daily and special dining.",
    price: 3299,
    category: "Home",
    stock: 40,
    image_url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1492780209445-b698d4e5b1c1?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      material: "Ceramic",
      pieces: "24",
      microwave_safe: "Yes",
      dishwasher_safe: "Yes",
      color: "Ivory",
    },
    rating: 4.2,
    review_count: 562,
  },
  {
    name: "Puma Sports Track Pants",
    description: "Moisture-wicking track pants built for gym sessions and casual wear.",
    price: 2199,
    category: "Fashion",
    stock: 52,
    image_url: "https://images.unsplash.com/photo-1506629905607-c52b2af7d5a9?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1506629905607-c52b2af7d5a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      fit: "Regular",
      fabric: "Polyester blend",
      pockets: "2 side pockets",
      stretch: "Yes",
      ideal_for: "Men",
    },
    rating: 4.1,
    review_count: 913,
  },
  {
    name: "Travel Toiletry Organizer",
    description: "Compact hanging toiletry organizer with multiple zip compartments.",
    price: 899,
    category: "Travel",
    stock: 76,
    image_url: "https://images.unsplash.com/photo-1627638912045-6c2d53639f7f?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1627638912045-6c2d53639f7f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      material: "Water-resistant nylon",
      compartments: "7",
      hanging_hook: "Yes",
      weight: "280 g",
      closure: "Zip",
    },
    rating: 4.3,
    review_count: 488,
  },
  {
    name: "Almond Butter Crunchy 1kg",
    description: "Protein-rich crunchy almond butter made from roasted premium almonds.",
    price: 1249,
    category: "Grocery",
    stock: 88,
    image_url: "https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1200&q=80",
    ],
    specifications: {
      weight: "1 kg",
      type: "Crunchy",
      sugar: "No added sugar",
      preservatives: "No",
      shelf_life: "9 months",
    },
    rating: 4.4,
    review_count: 677,
  },
];
const buildUniqueImageSet = (product, index) => {
  const baseQuery = encodeURIComponent(`${product.category} ${product.name} ecommerce premium`);
  return [
    `https://source.unsplash.com/1200x900/?${baseQuery}&sig=${index * 3 + 1}`,
    `https://source.unsplash.com/1200x900/?${baseQuery}&sig=${index * 3 + 2}`,
    `https://source.unsplash.com/1200x900/?${baseQuery}&sig=${index * 3 + 3}`,
  ];
};

const seededProducts = products.map((product, index) => {
  const uniqueImages = buildUniqueImageSet(product, index);
  return {
    ...product,
    image_url: uniqueImages[0],
    image_urls: uniqueImages,
  };
});

if (seededProducts.length !== 40) {
  throw new Error(`Seed data must contain exactly 40 products. Found: ${seededProducts.length}`);
}

const validateNoRepeatedImages = () => {
  const seen = new Set();
  for (const product of seededProducts) {
    for (const url of product.image_urls) {
      if (seen.has(url)) {
        throw new Error(`Duplicate image URL detected: ${url}`);
      }
      seen.add(url);
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

    validateNoRepeatedImages();

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

const crypto = require("crypto");
const pool = require("../config/db");
const { generateToken } = require("../utils/authToken");

const hashPassword = (password, salt) =>
  crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password || password.length < 6) {
    return res.status(400).json({ message: "Invalid signup details" });
  }

  try {
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const passwordHash = hashPassword(password, salt);

    const result = await pool.query(
      "INSERT INTO users(full_name, email, password_hash, password_salt) VALUES($1,$2,$3,$4) RETURNING id, full_name, email",
      [fullName, email, passwordHash, salt]
    );

    const user = result.rows[0];
    const token = generateToken({ id: user.id, email: user.email });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const result = await pool.query(
      "SELECT id, full_name, email, password_hash, password_salt FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const incomingHash = hashPassword(password, user.password_salt);
    if (incomingHash !== user.password_hash) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.json({
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.me = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, full_name, email FROM users WHERE id = $1", [req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = result.rows[0];
    res.json({
      id: user.id,
      fullName: user.full_name,
      email: user.email,
    });
  } catch (err) {
    console.error("Profile error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

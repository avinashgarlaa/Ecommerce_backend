const crypto = require("crypto");

const TOKEN_SECRET = process.env.AUTH_SECRET || "shopverse-dev-secret";
const TOKEN_EXPIRY_SECONDS = 7 * 24 * 60 * 60;

const toBase64Url = (value) =>
  Buffer.from(value).toString("base64url");

const fromBase64Url = (value) =>
  Buffer.from(value, "base64url").toString("utf8");

const createSignature = (payloadPart) =>
  crypto.createHmac("sha256", TOKEN_SECRET).update(payloadPart).digest("base64url");

exports.generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY_SECONDS,
  };
  const payloadPart = toBase64Url(JSON.stringify(payload));
  const signature = createSignature(payloadPart);
  return `${payloadPart}.${signature}`;
};

exports.verifyToken = (token) => {
  if (!token || !token.includes(".")) {
    return null;
  }

  const [payloadPart, signature] = token.split(".");
  const expectedSignature = createSignature(payloadPart);

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(payloadPart));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
};

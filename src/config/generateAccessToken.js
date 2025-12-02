import jwt from "jsonwebtoken";

function generateAccessToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "24h" });
}

export default generateAccessToken;

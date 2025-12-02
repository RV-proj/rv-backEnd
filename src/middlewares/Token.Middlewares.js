import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // console.log("Auth header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access Denied. No Token Provided.",
    });
  }

  const token = authHeader.substring(7);

  // console.log("token", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log("Token ", decoded);
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

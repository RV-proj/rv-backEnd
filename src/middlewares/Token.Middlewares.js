import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err.message);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

export default verifyToken;

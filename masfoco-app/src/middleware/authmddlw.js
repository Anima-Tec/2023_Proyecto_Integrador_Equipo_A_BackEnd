import jwt from "jsonwebtoken";
import enviromentController from "../config/enviromentController.js";

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  const secretKey = enviromentController.validateSecretKey();

  if (!token) {
    return res.status(403).json({ error: "Token nulo" });
  }

  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: "Token no válido" });
    }

    req.userId = decodedToken.userId;
    next();
  });
}

export default verifyToken;


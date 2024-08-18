import { AuthError } from "../utils/errors.js";
import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AuthError());
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.clearCookie("refreshToken");
    return next(new AuthError());
  }

  try {
    const userId = verifyToken(token);
    req.user = { id: userId };
    next();
  } catch (error) {
    return next(new AuthError());
  }
};

export default authMiddleware;

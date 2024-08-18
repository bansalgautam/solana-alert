import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
export const REFRESH_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000;
export const ACCESS_EXPIRATION_TIME = 15 * 60 * 1000;

const generateRefreshToken = (user) => {
  const { id, email } = user;

  const payload = {
    id,
    email,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: REFRESH_EXPIRATION_TIME,
  });
};

const generateAccessToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: ACCESS_EXPIRATION_TIME,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET).id;
};

export { generateRefreshToken, generateAccessToken, verifyToken };

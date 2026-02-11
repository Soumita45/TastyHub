import jwt from "jsonwebtoken";
import dotenv from "dotenv/config"

export const generateRegisterToken = (id) => {
  return jwt.sign(
    { id: id },
    process.env.secretKey,
    { expiresIn: "10m" }
  );
};

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id:user._id, role: user.role },
    process.env.secretKey,
    { expiresIn: "10d" }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id:user._id, role: user.role },
    process.env.secretKey,
    { expiresIn: "30d" }
  );
};

import express from "express";
import { validateLoginForm, validateSignupForm } from "../utils/validate.js";
import db from "../db/db.js";
import { ServerError, ValidationError } from "../utils/errors.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  REFRESH_EXPIRATION_TIME,
  verifyToken,
} from "../utils/jwt.js";
import logoutUser from "../utils/logoutUser.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res, next) => {
  // Parse the body and check its validation
  const { isValid: isValidBody } = validateSignupForm(req?.body);
  if (!isValidBody) {
    return next(new ValidationError("Please provide valid email and password"));
  }

  // Continue with signup process
  const { email, password } = req?.body;
  try {
    // Find if user with this email already exists
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return next(new ValidationError("User with this email already exists"));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generate a refresh token and set it as a cookie
    const refreshToken = generateRefreshToken(newUser);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + REFRESH_EXPIRATION_TIME),
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    const accessToken = generateAccessToken(newUser.id);
    return res.status(200).json({
      message: "User created successfully",
      user: {
        email: newUser.email,
      },
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
});

authRouter.post("/login", async (req, res, next) => {
  const { isValid: isValidBody } = validateLoginForm(req?.body);
  if (!isValidBody) {
    return next(new ValidationError("Please provide valid email and password"));
  }

  const { email, password } = req?.body;
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return next(new ValidationError("User not found"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ValidationError("Invalid password"));
    }

    const refreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + REFRESH_EXPIRATION_TIME),
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    const accessToken = generateAccessToken(user.id);
    return res.status(200).json({
      message: "Login successful",
      user: {
        email: user?.email,
      },
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
});

authRouter.get("/logout", (_, res) => {
  logoutUser(res);
});

authRouter.get("/refresh-token", async (req, res, next) => {
  const refreshToken = req?.cookies?.refreshToken;
  if (!refreshToken) {
    return next(new ValidationError("Please sign in again to continue"));
  }

  try {
    const userId = verifyToken(refreshToken);
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = generateAccessToken(userId);

    return res.status(200).json({
      message: "Token refreshed",
      accessToken,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    logoutUser(res);
  }
});

export default authRouter;

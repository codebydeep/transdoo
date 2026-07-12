import { Router } from "express";
import bcrypt     from "bcryptjs";
import { z }      from "zod";
import { UserModel } from "../models/index.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  setAuthCookies,
  clearAuthCookies,
} from "../auth.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

const registerSchema = z.object({
  name:     z.string().min(2).max(100),
  email:    z.string().email(),
  password: z.string().min(6).max(100),
  role:     z.enum(["admin", "manager", "driver"]).optional(),
});

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

function buildPayload(user) {
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

router.post("/register", async (req, res) => {
  const parse = registerSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Validation error", errors: parse.error.flatten() });
  }

  const { name, email, password, role } = parse.data;

  try {
    const existing = await UserModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const hashed = await bcrypt.hash(password, 12);
    await UserModel.create({ name, email, password: hashed, role });

    const user = await UserModel.findByEmail(email);
    const payload = buildPayload(user);
    const accessToken  = signAccessToken(payload);
    const refreshToken = signRefreshToken({ id: user.id });
    setAuthCookies(res, { accessToken, refreshToken });

    return res.status(201).json({
      message: "Account created",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("[register]", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const { email, password } = parse.data;

  try {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = buildPayload(user);
    const accessToken  = signAccessToken(payload);
    const refreshToken = signRefreshToken({ id: user.id });
    setAuthCookies(res, { accessToken, refreshToken });

    return res.json({
      message: "Signed in",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("[login]", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (_req, res) => {
  clearAuthCookies(res);
  return res.json({ message: "Signed out" });
});

router.post("/refresh", async (req, res) => {
  const token = req.cookies?.refresh_token;
  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const { id } = verifyRefreshToken(token);
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const payload      = buildPayload(user);
    const accessToken  = signAccessToken(payload);
    const refreshToken = signRefreshToken({ id: user.id });
    setAuthCookies(res, { accessToken, refreshToken });

    return res.json({ message: "Token refreshed" });
  } catch {
    clearAuthCookies(res);
    return res.status(401).json({ message: "Refresh token expired — please log in again" });
  }
});

router.get("/me", requireAuth, (req, res) => {
  return res.json({ user: req.user });
});

export default router;

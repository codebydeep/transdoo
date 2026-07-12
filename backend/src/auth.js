import jwt from "jsonwebtoken";

const ACCESS_SECRET  = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set in .env");
}

export function signAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

const IS_PROD = process.env.NODE_ENV === "production";

export function setAuthCookies(res, { accessToken, refreshToken }) {
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure:   IS_PROD,
    sameSite: IS_PROD ? "strict" : "lax",
    maxAge:   15 * 60 * 1000,
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure:   IS_PROD,
    sameSite: IS_PROD ? "strict" : "lax",
    maxAge:   7 * 24 * 60 * 60 * 1000,
    path:     "/api/auth/refresh",
  });
}

export function clearAuthCookies(res) {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token", { path: "/api/auth/refresh" });
}

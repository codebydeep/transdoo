import { verifyAccessToken } from "../auth.js";

export function requireAuth(req, res, next) {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Session expired — please log in again" });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ message: "Forbidden — insufficient role" });
    }
    next();
  };
}

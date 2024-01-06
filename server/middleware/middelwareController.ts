import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: any;
}

const middlewareController = {
  authorizationMiddleware: (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token is missing" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN || "", (err, data) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(403).json({ error: "Invalid token" });
      }
      req.user = data;
      next();
    });
  },
  verifyToken: (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ error: "Token is missing" });
    }
    if (typeof token === "string") {
      const accessToken = token.split(" ")[1];
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN || "",
        (err: any, data: any) => {
          if (err) {
            console.error("Error verifying token:", err);
            return res.status(403).json({ error: "Invalid token" });
          }
          req.user = data;
          next();
        }
      );
    }
  },
  vefifyTokenAdminAuth: (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    middlewareController.authorizationMiddleware(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        return res.status(403).json({ error: "Not authorized to " });
      }
    });
  },
};

export default middlewareController;

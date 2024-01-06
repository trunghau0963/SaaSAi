import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// interface AuthenticatedRequest extends Request {
//   user: any;
// }

const authController = {
  generateAccessToken: (user: any) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.ACCESS_TOKEN || "",
      {
        expiresIn: "10s",
      }
    );
  },
  generateRefreshToken: (user: any) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.REFRESH_TOKEN || "",
      {
        expiresIn: "365d",
      }
    );
  },
};

export default authController;

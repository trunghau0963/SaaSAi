import express from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/model";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import authController from "../../controllers/authControllers";
import middlewareController from "../../middleware/middelwareController";
dotenv.config();
// import {authController} from '../controllers/auth'

export const authRouter = express.Router();

let refreshTokens: string[] = []; // Initialize refreshTokens array

authRouter.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already in use." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    // create user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });

    console.log("New user object:", newUser);

    // save to db
    const user = await newUser.save();
    console.log("User saved to the database:", user);

    res.status(200).json(user);
  } catch (err) {
    console.error("Error in registration:", err);
    res.status(404).json(err);
  }
});
//
authRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      console.log('wrong username');
      res.status(404).json("Wrong username");
    }
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        console.log("Wrong password");
        res.status(404).json("Wrong password");
      }
      if (validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        console.log("refreshToken when login:: ", refreshToken);

        refreshTokens.push(refreshToken);
        console.log("refreshTokens array when login: ", refreshTokens);
        //STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        // const { password, ...others } = user.toObject();
        res.status(200).json({ user, accessToken, refreshToken });
      }
    }
  } catch (err) {
    console.error("Error in registration:", err);
    res.status(404).json(err);
  }
});

authRouter.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("Refresh token in cookies :", refreshToken);
  console.log("list refresh tokens when refresh: ", refreshTokens);

  if (!refreshToken) {
    console.log("you have no refresh token");
    return res.status(401).json("You are not authenticated");
  }
  // if (!refreshTokens.includes(refreshToken)) {
  //   console.log(refreshTokens.includes(refreshToken));
  //   console.log("refresh token is not valid");
  //   return res.status(403).json("Refresh token is not valid");
  // }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN || "",
    (err: any, user: any) => {
      if (err) {
        res.status(403).json(err);
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);

      console.log('new access: ', newAccessToken);
      console.log('new refresh token: ', newRefreshToken);

      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res
        .status(200)
        .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    }
  );
  console.log('lap lai');
});

authRouter.post(
  "/logout",
  middlewareController.authorizationMiddleware,
  (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json("You logged out successfully");
  }
);

//store token :
// 1? local storage => xss attack
// 2/ cookie -> http only =>>  csrf -> samesite
// 3/ redux store -> access token => optimize
// httponly cookies -> refresh token

// solution => bff pattern ( be for fe )

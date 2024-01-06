import express from "express";
import middlewareController from "../../middleware/middelwareController";
import { User } from "../../models/model";
// import {authController} from '../controllers/auth'

export const userRouter = express.Router();

userRouter.get("/", middlewareController.authorizationMiddleware, async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    console.error("Error in registration:", err);
    res.status(404).json(err);
  }
});

userRouter.get("/info/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    //   $or: [
    //     { _id: req.body.id }, // Replace 'id' with the actual property name for user ID in req.body
    //     { username: req.body.username },
    //     { email: req.body.email },
    //   ],

    const user = await User.find({ _id: userId });
    console.log(user);
    if (user.length > 0) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.delete("/delete/:id", middlewareController.vefifyTokenAdminAuth, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.find({ _id: userId });
    console.log(user);
    if (user.length > 0) {
      await User.deleteOne({ _id: userId });
      res.status(200).json("Deleted user.");
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

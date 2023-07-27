import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", protect, getUser);
router.get("/friends/:id", protect, getUserFriends);
router.patch("/:id/:friendId", protect, addRemoveFriend);

export default router;

import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likeUnlikePost,
} from "../controllers/posts.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/*READ */
router.get("/", protect, getFeedPosts);
router.get("/:userId/posts", protect, getUserPosts);

/*UPDATE */
router.patch("/:id/like", protect, likeUnlikePost);

export default router;

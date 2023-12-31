import Post from "../models/Post.js";
import User from "../models/User.js";

/*CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, postPicturePath } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found!");
    }

    const {
      firstName,
      lastName,
      location,
      picturePath: userPicturePath,
    } = user;

    const newPost = new Post({
      userId,
      firstName,
      lastName,
      description,
      location,
      userPicturePath,
      postPicturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    const posts = await Post.find();

    res.status(201).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ userId });
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*UPDATE */
export const likeUnlikePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { userId } = req.body;

    const [post] = await Post.find({ _id });
    if (post) {
      const isLiked = post.likes.get(userId);

      if (isLiked) {
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }

      const updatedPost = await Post.findByIdAndUpdate(
        _id,
        { likes: post.likes },
        { new: true }
      );
      res.status(200).json(updatedPost);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

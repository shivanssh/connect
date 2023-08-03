import User from "../models/User.js";

/*READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).send("User not found!");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).send("User not found!");
    }

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, picturePath, location, occupation }) => ({
        _id,
        firstName,
        lastName,
        picturePath,
        location,
        occupation,
      })
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    if (id === friendId) {
      return res
        .status(500)
        .json({ msg: "Can't add and remove same user from friend list." });
    }

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((user) => user !== friendId);
      friend.friends = friend.friends.filter((friend) => friend !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, picturePath, location, occupation }) => ({
        _id,
        firstName,
        lastName,
        picturePath,
        location,
        occupation,
      })
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

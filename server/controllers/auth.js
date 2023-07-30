import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { isInputFieldsFilled } from "../common/utils/validation.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      location,
      occupation,
    } = req.body;

    if (
      isInputFieldsFilled(
        firstName,
        lastName,
        email,
        password,
        picturePath,
        location,
        occupation
      )
    ) {
      throw new Error("Please all the required fields");
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // const newUser = new User({
    //   firstName,
    //   lastName,
    //   email,
    //   password: passwordHash,
    //   picturePath,
    //   friends,
    //   location,
    //   occupation,
    //   impression: Math.floor(Math.random() * 10000),
    //   viewProfiled: Math.floor(Math.random() * 10000),
    // });

    // const savedUser = await newUser.save();
    const userCreated = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends: [],
      location,
      occupation,
      impressions: Math.floor(Math.random() * 10000),
      viewedProfile: Math.floor(Math.random() * 10000),
    });

    const userWithoutPassword = userCreated.toObject();
    delete userWithoutPassword.password;

    res.status(201).json({ user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ Error: `${err.message}` });
  }
};

/*LOGIN */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ msg: "User does not exits. " });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(500).json({ msg: "Invalid Credentials. " });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30 days",
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ Error: `${err.message}` });
  }
};

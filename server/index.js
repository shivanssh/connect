import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import { protect } from "./middleware/auth.js";

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts/createPost", upload.single("picture"), protect, createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

/* MONGO SETUP */
connectDB(app);

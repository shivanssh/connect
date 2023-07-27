import mongoose from "mongoose";

const connectDB = async (app) => {
  const PORT = process.env.PORT || 6001;
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Connected with DB:${conn.connection.host} at PORT: ${PORT}`);
    });
  } catch (err) {
    console.log(`Not able to establish connection with db: ${err}`);
    process.exit(1);
  }
};

export default connectDB;

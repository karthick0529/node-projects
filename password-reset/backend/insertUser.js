const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const insertUser = async () => {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = new User({
    email: "karthicknandha619@gmail.com",
    password: hashedPassword,
  });

  await user.save();
  console.log("User inserted");
  mongoose.connection.close();
};

insertUser();

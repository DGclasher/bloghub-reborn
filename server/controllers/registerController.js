const path = require("path");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const User = require("../models/User");

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
mongoose.connect(
  `mongodb+srv://${db_user}:${db_pass}@cluster0.68gjdc2.mongodb.net/?retryWrites=true&w=majority`
);

const salt = bcrypt.genSaltSync(10)

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and Password fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const userDoc = await User.create({
      username: username,
      password: hashedPassword,
    });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

module.exports = { handleNewUser };

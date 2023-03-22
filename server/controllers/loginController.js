const path = require("path");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
mongoose.connect(
  `mongodb+srv://${db_user}:${db_pass}@cluster0.68gjdc2.mongodb.net/?retryWrites=true&w=majority`
);

const secret = process.env.JWT_SECRET

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });

  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    jwt.sign(
      { username: userDoc.username, id: userDoc._id },
      secret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json("ok");
      }
    );
  } else {
    res.status(400).json("Wrong Credentials");
  }
};

module.exports = { loginUser };

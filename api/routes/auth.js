const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res
      .status(200)
      .json({ message: `User ${req.body.username} has been created` });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json("wrong credentials");
      return;
    }
    const validated = await bcrypt.compare(req.body.password, user.password);

    if (validated) {
      jwt.sign(
        { id: user._doc._id, username: user.username },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .status(200)
            .cookie("token", token)
            .json({ message: "logged in", token: token });
        }
      );
    } else {
      res.status(400).json({ message: "wrong credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;

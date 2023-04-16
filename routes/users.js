const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// UPDATE USER
router.put("/:id", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
    if (err || decoded.id != req.params.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  });

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ message: `Updated user` });
  } catch (error) {
    // res.status(500).json({ message: "Error encountered" });
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
    if (err || decoded.id != req.params.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  });
  try {
    const user = await User.findById(req.params.id);
    try {
      await Post.deleteMany({ username: user.username });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).cookie("token", "").json({ message: `Deleted user` });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(404).json("User not found");
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

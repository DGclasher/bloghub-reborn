const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

// NEW POST
router.post("/", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.body.username = decoded.username;
  });
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json({ message: "Post created" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.body.username = decoded.username;
  });
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.username === post.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
      } catch (error) {}
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE POST
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
      res.status(200).json({ message: `Deleted user` });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(404).json("User not found");
  }
});

// GET POST
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

const router = require("express").Router();
const Category = require("../models/Category");
const jwt = require("jsonwebtoken");
const { route } = require("./users");

// GET CATEGORY
router.get("/", async (req, res) => {
  let catgs;
  const catName = req.query.cat;
  try {
    if (catName) {
      catgs = await Category.find({ name: catName });
    } else {
      catgs = await Category.find();
    }
    res.status(200).json(catgs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// CREATE CATEGORY
router.post("/", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.body.username = decoded.username;
  });
  if (req.body.username === "admin" || req.body.username === "melanie") {
    try {
      const newCat = new Category(req.body);
      await newCat.save();
      res.status(200).json({ message: `Catgory created`, details: newCat });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// UPDATE CATEGORY
router.put("/:id", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.body.username = decoded.username;
  });
  if (req.body.username === "admin" || req.body.username === "melanie") {
    try {
      const updatedCat = await Category.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({ message: `Catgory updated`, details: updatedCat });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// DELETE CATEGORY
router.delete("/:id", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.body.username = decoded.username;
  });
  if (req.body.username === "admin" || req.body.username === "melanie") {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: `Catgory deleted` });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;

const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
mongoose.connect(
  `mongodb+srv://${db_user}:${db_pass}@cluster0.68gjdc2.mongodb.net/?retryWrites=true&w=majority`
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({ username, password });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

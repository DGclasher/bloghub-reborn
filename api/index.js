require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const corsOption = require("./config/corsOption");
const corsMiddleWare = require("./middlewares/middleWare");
const { default: mongoose } = require("mongoose");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log(`Connected to MongoDB`))
  .catch((err) => console.log(err));

// IMAGE UPLOAD
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ message: "file has been uploaded" });
});

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/categories", require("./routes/categories"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const bodyParser = require("body-parser");
const blogRouter = require("./routers/blogApis");
const cors = require("cors");
const multer = require("multer");
const authRouter = require("./routers/authApis");
const authValidation = require("./middlewares/authValidation");
const notiRouter = require("./routers/notiApis");
const projectRouter = require("./routers/projectsApis");
const { roleValidation } = require("./middlewares/roleValidation");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../tempUploads"));
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Initialize application express
const app = express();
const PORT = process.env.PORT;
// Middleware
app.set("trust proxy", 1);
app.use(compression());
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(cors());
app.options("*", cors());
app.use(morgan("combined"));
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/tempUploads", express.static(path.join(__dirname, "../tempUploads")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Use blogs routes
app.use(authRouter);
app.use(blogRouter);
app.use(notiRouter);
app.use(projectRouter);
// UploaauthRouterd images routes
app.post(
  "/admin/uploads",
  authValidation,
  roleValidation,
  upload.single("file"),
  (req, res) => {
    const fullUrl = req.protocol + "://" + req.get("host") + "/tempUploads";
    res.json(fullUrl + "/" + req.file.filename);
  }
);
app.post(
  "/admin/uploads/ckeditor",
  authValidation,
  roleValidation,
  upload.any(),
  (req, res) => {
    const fullUrl = req.protocol + "://" + req.get("host") + "/tempUploads";
    const urls = req.files.map((file) => fullUrl + "/" + file.filename);
    res.json({ url: urls });
  }
);
// Handle 404
app.get("*", (req, res) => {
  res.send("404");
});
// Listen application
app.listen(PORT, () => {
  console.log(`App is running on this port: http://localhost:${PORT}`);
});

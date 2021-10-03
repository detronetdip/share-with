const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 3000;
require("dotenv").config();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(
  require("express-fileupload")({
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
require("./config/db");
require("./routers/files")(app);
require("./routers/view")(app);
require("./routers/home")(app);
require("./routers/download")(app);
app.listen(port, () => {
  console.log(`\nListining on ${port} ........\n`);
});

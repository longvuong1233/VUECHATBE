const express = require("express");
const https = require("https");
var fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const fileUpload = require("express-fileupload");
//initial

const app = new express();

app.set("view engine", "ejs");

//database

//middlewares

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

//routes
const startRoutes = require("./routes/start");
const mesRoutes = require("./routes/message");
const callvideoRoutes = require("./routes/callvideo");

app.use("/start", startRoutes);
app.use("/message", mesRoutes);
app.use("/callvideo", callvideoRoutes);
app.get("/", (req, res) => {
  res.send("hello");
});

//handle error

app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.log(err.message);
  return res.status(status).json({
    message: err.message,
  });
});

//start server

const httpsServer = https.createServer(
  {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
  },
  app
);

const port = process.env.PORT || 3000;
httpsServer.listen(port, () => {
  console.log("server are running at port " + port);
});

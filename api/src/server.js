var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var routes = require("./routes/routes");
var app = express();

const Address = {
  localhost: ["127.0.0.1", "localhost"],
  machine: ["0.0.0.0"],
  proxy: [],
};

app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.json({
    limit: "1000mb",
  })
);

// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: false,
  })
);

// allow cross origin resource sharing
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// MAIN APPLICATION STARTS HERE
app.use("/", routes);

// start server
const httpServer = http.createServer(app);
const httpServerLog = function () {
  var dt = new Date();
  console.log(
    dt +
      ": Express Server Listening at " +
      "Address " +
      httpServer.address().address +
      ", Port " +
      httpServer.address().port
  );
};
const port = process.env.PORT || 4000;
// Create an HTTP service.
httpServer.listen(port, Address.machine[0], httpServerLog);

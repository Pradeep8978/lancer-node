const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
var app = express();
var server = require('http').Server(app);
// const PushNotifications = require('node-pushnotifications');
// Start the server
const port = process.env.PORT || 8080;
server.listen(port);
var io  = require('socket.io').listen(server);
const {MONGODB_CONN_STR} = require("./configuration/index")
const bodyParser = require('body-parser');

const CONN_STRING = MONGODB_CONN_STR;
console.log(MONGODB_CONN_STR)
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === "test") {
  mongoose.connect(CONN_STRING, {
    useNewUrlParser: true
  });
} else {
  mongoose.connect(CONN_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=> console.log('MONGO DB CONNECTION SUCCESSFUL'))
  .catch((error) => console.log(error));
}
app.disable('etag');

// const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Routes
app.use('/uploads', express.static( 'uploads' ));
app.use("/users", require("./routes/users"));
app.use("/collaboration", require("./routes/collaboration"));
app.use("/course", require("./routes/course"));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle React routing, return all requests to React app
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}


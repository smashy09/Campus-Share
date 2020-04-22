require('dotenv').config();
const express = require("express");
const PORT = process.env.port || 5000;

const mongoose = require("mongoose")
const app = express();
const passport = require('passport');

const routes = require('./routes/main');
const passwordRoutes = require('./routes/password');
const secureRoutes = require('./routes/secure');




// setup mongo
const uri = process.env.MongoURI;
const mongoConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
};
if (process.env.MONGO_USER_NAME && process.env.MONGO_PASSWORD) {
  mongoConfig.auth = { authSource: 'admin' };
  mongoConfig.user = process.env.MONGO_USER_NAME;
  mongoConfig.pass = process.env.MONGO_PASSWORD;
}
  mongoose.connect(uri, mongoConfig);

  mongoose.connection.on('error', (error) => {
    console.log(error);
    process.exit(1);
  });

  mongoose.set('useFindAndModify', false);


//bodyparse
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

// require passport auth
require('./auth/auth');

//login
app.get('/', (req, res) => {
  res.send(__dirname + '/index.html');
});

// game
app.get('/game.html', function (req, res) {
  res.sendFile(__dirname + '/public/game.html');
});

app.use(express.static(__dirname + '/public'));

// app.use('/', require('./public/'));


// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

app.use((req, res, next) => {
  res.status(404).json({ message: '404 - Not Found' });
});
// app.listen(PORT, () => {
//     console.log("server has started!");
// });

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
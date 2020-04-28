require('dotenv').config();
const express = require("express");
const PORT = process.env.port || 5000;

const mongoose = require("mongoose")
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes/main');
const passwordRoutes = require('./routes/password');
const secureRoutes = require('./routes/secure');
const asyncMiddleware = require('./middleware/asyncMiddleware');



// setup mongo
const uri = process.env.MONGO_CONNECTION_URL;
mongoose.connect(uri, { useUnifiedTopology: true,
  useNewUrlParser: true });
mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});
mongoose.connection.on('connected', function () {
  console.log('connected to mongo');
});
mongoose.set('useFindAndModify', false);


//bodyparse
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));



// require passport auth
require('./auth/auth');

// app.get('/game.html', passport.authenticate('jwt', { session : false }), function (req, res) {
//   res.sendFile(__dirname + '/public/game.html');
// });

app.get('/game.html', function (req, res) {
  res.sendFile(__dirname + '/../public/game.html');
});

app.use(express.static(__dirname + '/../public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/../index.html');
});

// main routes
app.use('/', routes);
app.use('/', passwordRoutes);
app.use('/', passport.authenticate('jwt', { session : false }), secureRoutes);



// app.get('/game.html', passport.authenticate('jwt', {session: false}), (req, res) => {
//   res.status(200).json(req.user);
// });
// //serve static assets
// app.use(express.static(__dirname + '/public'));

// //login
// app.get('/', (req, res) => {
//   res.send(__dirname + '/index.html');
// });

// // game
// app.get('/game.html', function (req, res) {
//   res.sendFile(__dirname + '/public/game.html');
// });



// /// setup routes
// app.use('/', routes);
// app.use('/', passwordRoutes);
// app.use('/', passport.authenticate('jwt', { session: false }), secureRoutes);


// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });


// app.listen(PORT, () => {
//     console.log("server has started!");
// });

// catch all other routes
app.use((req, res, next) => {
  res.status(404).json({ message: '404 - Not Found' });
});

// handle errors
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});

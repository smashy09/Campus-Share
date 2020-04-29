require('dotenv').config();
const express = require("express");
const port= process.env.port || 5000;
const path = require('path')
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



const uri = process.env.MONGO_CONNECTION_URL;
const mongoConfig = {
   useUnifiedTopology: true ,
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
// setup mongo
// const uri = process.env.MONGO_CONNECTION_URL;
// mongoose.connect(uri, { useUnifiedTopology: true,
//   useNewUrlParser: true });
// mongoose.connection.on('error', (error) => {
//   console.log(error);
//   process.exit(1);
// });
// mongoose.connection.on('connected', function () {
//   console.log('connected to mongo');
// });
// mongoose.set('useFindAndModify', false);


//bodyparse
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));



// require passport auth
require('./auth/auth');

// , passport.authenticate('jwt', { session : false })
//app.get('/game.html', (req, res) => {
//  res.sendFile(path.join(__dirname, '../game.html'));
//});

// app.get('/game.html', passport.authenticate('jwt', { session: false }), (request, response) => {
//   response.status(200).json(request.user);
// });

app.use(express.static(path.join(__dirname, '/public')));



//app.get('/', (req, res) => {
//  res.send(path.join(__dirname, '../index.html'));
//});
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '../index.html');
// });

// main routes
app.use('/', routes);
app.use('/', passwordRoutes);
app.use('/', passport.authenticate('jwt', { session : false }), secureRoutes);






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

// app.listen(process.env.PORT || 3000, () => {
//   console.log(`Server started on port ${process.env.PORT || 3000}`);
// });

mongoose.connection.on('connected', () => {
  console.log('connected to mongo');
  app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
  });
});
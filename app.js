const express = require("express");
const PORT = process.env.port || 5000;

const mongoose = require("mongoose")
const app = express();




//DB config
const db = require("./config/keys").MongoURI;
//connect to mongo

// mongoose.connect(db, { useNewUrlParser: true})
// .then(() => console.log('MongoDb Connected...'))
// .catch(err => console.log(err));



//bodyparse
app.use(express.urlencoded({ extended: false}));


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
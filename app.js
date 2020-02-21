const express = require("express");
const PORT = process.env.port || 5000;

const app = express();

const server = require('http').Server(app);

// app.get('/game.html', function (req, res) {
//   res.sendFile(__dirname + '/public/game.html');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use((req, res, next) => {
  res.status(404).json({ message: '404 - Not Found' });
});
// app.listen(PORT, () => {
//     console.log("server has started!");
// });

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
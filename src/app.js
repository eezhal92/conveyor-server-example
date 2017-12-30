var http = require('http');
var path = require('path');
var express = require('express');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');

var db = require('./memory-db');

var app = express();
var server = http.Server(app);

var io = socketIO(server);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/', function (request, response) {
  var data = { goods: db.findAll() };
  return response.render('index', data);
});

var data = [];
var COLOR_BLACK = 'black';
var COLOR_WHITE = 'white';
var colorWhitelist = [COLOR_BLACK, COLOR_WHITE];

function isValidColor(color) {
  return colorWhitelist.indexOf(color) !== -1;
}

function inputErrorMessage() {
  var validColors = colorWhitelist
    .map(function (color) {
      return '`' + color + '`';
    })
    .join(' or ');

  return 'Field `color` should be either of ' + validColors; 
}

app.post('/goods', function (request, response) {
  var color = request.body.color;

  if (!isValidColor(color)) {
    return response.status(422).json({
      message: inputErrorMessage(),
    });
  }

  db.add(color);
  
  var good = db.findByColor(color);

  io.emit('goods:added', good);

  return response.json({ goods: db.findAll() });
});

module.exports = server;
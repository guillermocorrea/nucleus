var express = require('express');
var expressValidator = require('express-validator');
var path = require('path');
var routes = require('./routes/user');
var bodyParser = require('body-parser');
var app = express();

//var User = require('./models/user');

// app.get('/', routes.index);
// app.get('/users', User.list);

app.use(expressValidator);
app.use(bodyParser());
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', routes.signup);

app.get('/add/:first/:second', function (req, res) {
    // convert the two values to floats and add them together
    var sum = parseFloat(req.params.first) + parseFloat(req.params.second);
    res.send(200, String(sum));
});

var port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
console.log('Magin happens on port ' + port);
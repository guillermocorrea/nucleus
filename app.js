var express = require('express');
var expressValidator = require('express-validator');
var path = require('path');
var routes = require('./routes/user');
var bodyParser = require('body-parser');
var auth = require('./routes/auth');
var mongoose = require('mongoose');
var config = require('./config');
var passport = require('passport');
var admin = require('./routes/admin');

var app = express();

// connect mongoose to the mongo dbUrl
//mongoose.connect(config.db[app.settings.env]);
console.log('connected to: ' + config.db[app.settings.env]);
//var User = require('./models/user');

// app.get('/', routes.index);
// app.get('/users', User.list);
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator);
app.use(bodyParser());
// app.use(app.router);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/admin', admin.index);

app.post('/test', function(req, res) {
   console.log(req.body);
    res.send(req.body, 200);
});

app.post('/auth/local', auth.local);
app.post('/signup', routes.signup);

app.get('/add/:first/:second', function (req, res) {
    var sum = parseFloat(req.params.first) + parseFloat(req.params.second);
    res.send(200, String(sum));
});

var port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
console.log('Magic happens on port ' + port);
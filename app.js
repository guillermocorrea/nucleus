var express = require('express');
var app = express();
var User = require('./models/user');

// app.get('/', routes.index);
// app.get('/users', User.list);

app.get('/add/:first/:second', function (req, res) {
    // convert the two values to floats and add them together
    var sum = parseFloat(req.params.first) + parseFloat(req.params.second);
    res.send(200, String(sum));
});

var port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
console.log('Magin happens on port ' + port);
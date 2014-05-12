// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = exports.app = express();   // define our express app
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var config = require('./config');

mongoose.connect(config.db[app.settings.env]); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());
var port = process.env.PORT || 8080; 		// set our port
// START THE SERVER
// =============================================================================
app.listen(port);

console.log('Magic happens on port ' + port);
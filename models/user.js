/**
 * Created by EXTIGLGCORREAG on 12/05/2014.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var auditable = require('./plugins/auditable');
var bcrypt = require('bcrypt-nodejs');

// Constants
var BCRYPT_COST = 12;

// define the userSchema
var userSchema = new Schema({
    name  : {
        givenName   : String,
        familyName  : String
    },
    emails : [{
        type  : {type: String},
        value : String
    }]
});

userSchema.plugin(auditable, {index: true});

userSchema.statics.hashPassword = function (passwordRaw, fn) {
    // To speed up tests, we do a NODE_ENV check.
    // If we are in the test environment we set the BCRYPT_COST = 1
    if (process.env.NODE_ENV === 'test') {
        BCRYPT_COST = 1;
    }

    // encrypt the password using bcrypt; pass the callback function
    // `fn` to bcrypt.hash()
    // bcrypt.hash(passwordRaw, BCRYPT_COST, fn);
    bcrypt.hash(passwordRaw, null, null, fn);
};

userSchema.statics.comparePasswordAndHash = function (password, passwordHash, fn) {
    // compare the password to the passwordHash
    bcrypt.compare(password, passwordHash, fn);
};
// Export the User model
module.exports = mongoose.model('User', userSchema);
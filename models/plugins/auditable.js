/**
 * Created by EXTIGLGCORREAG on 12/05/2014.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO: Set user who created and modified

module.exports = function(schema, options) {
    schema.add({updated: { type: Date}});
    schema.add({created: { type: Date}});

    schema.pre('save', function(next){
        this.updated = new Date;
        if ( !this.created ) {
            this.created = new Date;
        }
        next();
    });

    if (options && options.index) {
        schema.path('created').index(options.index);
        schema.path('updated').index(options.index);
    }
};
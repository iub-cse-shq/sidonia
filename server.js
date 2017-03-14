'use strict';
/**
 * Module dependencies.
 */
var config = require('./config/config.js');
var mongoose = require ('mongoose');
var express = require ('express');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

var uri = process.env.MONGOLAB_URI || config.db.uri;
mongoose.Promise = require('q').Promise;
var db = mongoose.connect(uri,function(){
	require('./seeds.js');
});

// Init the express application
var app = require('./express.js')(db);

// Bootstrap passport config
require('./passport')();

app.listen(app.get('port'), function(){
})

module.exports = app;

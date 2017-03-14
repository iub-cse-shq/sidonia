'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('./../index.ejs', {
		user: req.user || null,
		request: req
	});
};
exports.about = function(req, res) {
	res.render('./../about.ejs', {
		user: req.user || null,
		request: req
	});
};

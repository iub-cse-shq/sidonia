var mongoose = require('mongoose');
var Topic = require('./../models/Topic.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
	Topic.find(function(err, data) {
		if (err) {
			return res.status(400).send({

					message: errorHandler.getErrorMessage(err)
				});
		} else {
			console.log("api called");

			res.status(200).send(data);
		}
	});
};

module.exports.new = function(req, res) {
	res.render('./../public/views/topic/new.ejs', {
		user: req.user || null,
		forum: req.params.forumId || null,
		request: req
	});
};


module.exports.topicList = function (req, res){
	Topic.find({'forum': req.forum}, function(err, data){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
				res.render('./../public/views/topic/topicList.ejs', {
				user: req.user || null,
				forum: req.params.forumId || null,
				request: req,
				topics: data
			});
		}
	});
};


module.exports.create = function(req, res) {
	var topic = new Topic(req.body);
	topic.forum = mongoose.Types.ObjectId(topic.forum);
	console.log(req.body);
	topic.user = req.user;
	topic.save(function(err, data) {
		if (err) {
			return res.status(400).send({

					message: errorHandler.getErrorMessage(err)
				});
		} else {
			res.status(200).send(data);
		}
	});
};

module.exports.read = function(req, res) {
	res.json(req.topic);
};


exports.delete = function(req, res) {
	var topic = req.topic;
	topic.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(topic);
		}
	});
};


module.exports.update = function(req, res) {
	var topic = req.topic;

		topic = _.extend(topic, req.body);

		topic.save(function(err) {
			if (err) {
				return res.status(400).send();
			} else {
				res.json(topic);
			}
		});
};

module.exports.topicByID = function(req, res, next, id) {
	Topic.findById(id).populate('user', 'email').exec(function(err, topic) {
		if (err) return next(err);
		if (!topic) return next(new Error('Failed to load topic ' + id));
		req.topic = topic;
		next();
	});
};

/* exports.topicsByForumID = function(req, res, next, id) {
	topic.findById(forum).populate('user', 'email').exec(function(err, topic) {
		if (err) return next(err);
		if (!topic) return next(new Error('Failed to load topic ' + id));
		req.topic = topic;
		next();
	});
}; */

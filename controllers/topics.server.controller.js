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

module.exports.topicListView = function(req, res) {
  Topic.find(function(err, data) {
    if (err) {
      return res.status(400).send({

          message: errorHandler.getErrorMessage(err)
        });
    } else {
      console.log("api called");

      res.render('./../public/views/topic/list.ejs', {replies:data});
    }
  });
};


module.exports.create = function(req, res) {
  var topic = new topic(req.body);
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

exports.topicByID = function(req, res, next, id) {
  topic.findById(id).populate('user', 'email').exec(function(err, topic) {
    if (err) return next(err);
    if (!topic) return next(new Error('Failed to load topic ' + id));
    req.topic = topic;
    next();
  });
};

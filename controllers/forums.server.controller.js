var mongoose = require('mongoose');
var Forum = require('./../models/Forum.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
  Forum.find(function(err, data) {
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

exports.new = function(req, res) {
  res.render('./../public/views/forum/new.ejs', {
//    user: req.user || null,
  //  request: req
  });
};

exports.edit = function(req, res) {
  res.render('./../public/views/forum/edit.ejs', {
    user: req.user || null,
    request: req
  });
};

exports.view = function(req, res) {
  res.render('./../public/views/forum/forums.ejs', {
    user: req.user || null,
    request: req
  });
};

module.exports.listView = function(req, res) {
  Forum.find(function(err, data) {
    if (err) {
      return res.status(400).send({

          message: errorHandler.getErrorMessage(err)
        });
    } else {
      console.log("api called");

      res.render('./../public/views/forum/forums.ejs', {forums:data});
    }
  });
};


module.exports.create = function(req, res) {
  var forum = new forum(req.body);
  forum.user = req.user;
  forum.save(function(err, data) {
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
  res.json(req.forum);
};


exports.delete = function(req, res) {
  var forum = req.forum;
  forum.remove(function(err) {
    if (err) {
      return res.status(400).send();
    } else {
      res.json(forum);
    }
  });
};


module.exports.update = function(req, res) {
  var forum = req.forum;

    forum = _.extend(forum, req.body);

    forum.save(function(err) {
      if (err) {
        return res.status(400).send();
      } else {
        res.json(forum);
      }
    });
};

exports.forumByID = function(req, res, next, id) {
  Forum.findById(id).populate('user', 'email').exec(function(err, forum) {
    if (err) return next(err);
    if (!forum) return next(new Error('Failed to load forum ' + id));
    req.forum = forum;
    next();
  });
};

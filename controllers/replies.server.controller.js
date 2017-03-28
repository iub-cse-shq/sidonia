var mongoose = require('mongoose');
var Reply = require('./../models/Reply.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
  Reply.find(function(err, data) {
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

module.exports.replyView = function(req, res) {
  Reply.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");

      res.render('./../public/views/reply/list.ejs', {replies:data});
    }
  });
};


module.exports.create = function(req, res) {
  var reply = new reply(req.body);
  reply.user = req.user;
  reply.save(function(err, data) {
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
  res.json(req.reply);
};


exports.delete = function(req, res) {
	var reply = req.reply;
	reply.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(reply);
		}
	});
};


module.exports.update = function(req, res) {
  var reply = req.reply;

  	reply = _.extend(reply, req.body);

  	reply.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(reply);
  		}
  	});
};

exports.replyByID = function(req, res, next, id) {
	reply.findById(id).populate('user', 'email').exec(function(err, reply) {
		if (err) return next(err);
		if (!reply) return next(new Error('Failed to load reply ' + id));
		req.reply = reply;
		next();
	});
};

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ReplySchema = {


  message: {
    type: String,
    default: '',
    trim: true,
    required: 'Content required'

  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  topic: {
    type: Schema.ObjectId,
    ref: 'Topic',
    required: 'Topic Id is required'
  },

  created: {
    type: Date,
    default: Date.now
  }
}

var Reply = mongoose.model('Reply', ReplySchema, 'replies');
module.exports = Reply;

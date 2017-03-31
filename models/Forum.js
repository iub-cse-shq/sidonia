var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ForumSchema = {

  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title required'
  },

  description: {
    type: String,
    default: '',
    trim: true,
    required: 'Description required'

  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  created: {
    type: Date,
    default: Date.now
  }
}

var Forum = mongoose.model('Forum', ForumSchema, 'forums');
module.exports = Forum;

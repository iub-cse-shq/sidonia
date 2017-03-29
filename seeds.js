// initial dummy data for articles and user

var mongoose = require('mongoose');
var Forum = require('./models/Forum.js');
var Topic = require('./models/Topic.js');
var Reply = require ('./models/Reply.js');
var User = require('./models/User.js');
//mongoose.connection.db.dropDatabase();

var user = {
    email: 'abc@def.com',
    password: '12345678',
    firstName: 'TD',
    lastName: 'BD',
    username: 'TD-BD',
    provider: 'local'
};
user = new User(user);
user.save();

var initial = [{
    title: "Forum 1",
    description: "description waddup",
    user:user
  },

  {
    title: "Forum 2",
    description: "description 2 for forum 2",
    user:user
  },

  {
    title: "Forum 3",
    description: "description 3 for forum 3",
    user:user
  }
]

initial.forEach(function(forum) {
    var forums = new Forum(forum);
    forums.save(function(err,data){
      if(err){
        throw err;
      }
      else{
      }
    });
});

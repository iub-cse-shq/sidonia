module.exports = function(app){

 var replies = require('./../controllers/replies.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');
 var topics = require('./../controllers/topics.server.controller.js');
 
 app.route('/topic/:topicId/replies')
  .get(replies.replyList);

app.route('/topic/:topicId/create').post(replies.create);
	
app.param('replyId', replies.replyByID);

app.param('topicId', topics.topicByID);


}

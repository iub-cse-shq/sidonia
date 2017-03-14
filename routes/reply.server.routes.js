module.exports = function(app){

 var replies = require('./../controllers/replies.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');

 app.route('/api/replies')
  .get(replies.replyView);


	app.route('/api/replies')
		.get(replies.list)
		.post(users.requiresLogin, replies.create);

	app.route('/api/replies/:replyId')
		.get(replies.read)
  	.delete(users.requiresLogin, replies.delete);

	app.route('/api/replies/edit/:replyId')
	.get(replies.read)
	.put(users.requiresLogin, replies.update);

	
app.param('replyId', replies.replyByID);

}

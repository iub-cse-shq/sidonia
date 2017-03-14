module.exports = function(app){

 var topics = require('./../controllers/topics.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');

 app.route('/api/topics')
  .get(topics.topicListView);


	app.route('/api/topics')
		.get(topics.list)
		.post(users.requiresLogin, topics.create);

	app.route('/api/topics/:topicId')
		.get(topics.read)
  	.delete(users.requiresLogin, topics.delete);

	app.route('/api/topics/edit/:topicId')
	.get(topics.read)
	.put(users.requiresLogin, topics.update);

	
app.param('topicId', topics.topicByID);

}

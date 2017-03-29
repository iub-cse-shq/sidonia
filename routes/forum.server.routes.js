module.exports = function(app){

 var forums = require('./../controllers/forums.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');

 app.route('/api/forums')
  .get(forums.view);


 app.route('/api/forums')
	.get(forums.list)
	.post(users.requiresLogin, forums.create);

  app.route('/api/forums/:forumId')
	.get(forums.read)
  .delete(users.requiresLogin, forums.delete);

	app.route('/api/forums/edit/:forumId')
	.get(forums.read)
	.put(users.requiresLogin, forums.update);

	 app.route('/forums/all')
  		.get(forums.listView);

app.param('forumId', forums.forumByID);

}


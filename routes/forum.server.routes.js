module.exports = function(app){

var forums = require('./../controllers/forums.server.controller.js');
var users = require('./../controllers/users.server.controller.js');

app.route('/forums')
	.get(forums.view);


//app.route('/forums')
//	.get(forums.list)
//	.post(users.requiresLogin, forums.create);

app.route('/forums/new')
	.get(forums.new);

app.route('/forums/:forumId')
	.get(forums.read)
	.delete(users.requiresLogin, forums.delete);

app.route('/forums/edit/:forumId')
	.get(forums.read)
	.put(users.requiresLogin, forums.update);

app.route('/forums/all')
	.get(forums.listView);



app.param('forumId', forums.forumByID);

}


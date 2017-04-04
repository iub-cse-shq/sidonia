module.exports = function(app){

var forums = require('./../controllers/forums.server.controller.js');
var topics = require('./../controllers/topics.server.controller.js');
var users = require('./../controllers/users.server.controller.js');


app.route('/forum/:forumId/topics/')
	.get(topics.topicList);

app.route('/forum/:forumId/topic/new')
	.get(topics.new);

app.route('/forum/:forumId/topic/:topicId')
	.get(topics.read)
	.delete(users.requiresLogin, topics.delete);

app.route('/forum/:forumId/topic/edit/:topicId')
	.get(topics.read)
	.put(users.requiresLogin, topics.update);

app.route('/topic/create').post(topics.create);

app.param('forumId', forums.forumByID);

app.param('topicId', topics.topicByID);
}

'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('./../controllers/core.server.controller');
	app.route('/').get(core.index);
	app.route('/about').get(core.about);
	//app.route('/main_forum').get(core.main_forum);
	//app.route('/new_forum').get(core.new_forum);
	//app.route('/new_topic').get(core.new_topic);
	//app.route('/signup').get(core.signup);
	//app.route('/login').get(core.login);
	//app.route('/my_profile').get(core.my_profile);
};

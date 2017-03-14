var _ = require('lodash'),
	glob = require('glob'),
	fs = require('fs');


  var resolvingConfig = function() {
 	var conf = {};

 	conf = _.extend(
 		require('./env/all'),
 		require('./env/' + (process.env.NODE_ENV || 'development'))
 	);

 	return _.merge(conf, (fs.existsSync('./config/env/local.js') && require('./env/local.js')) || {});
 };

 /**
  * Load app configurations
  */
 module.exports = resolvingConfig();

 /**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
	// For context switching
	var _this = this;

	// URL paths regex
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	var output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			var files = glob(globPatterns, { sync: true });
			            if (removeRoot) {
			                files = files.map(function(file) {
			                    return file.replace(removeRoot, '');
			                });
			            }

				output = _.union(output, files);

		}
	}

	return output;
};

var esprima = require('esprima');

var parse = function(contents, extraOptions) {
	if (!extraOptions) {
		extraOptions = {};
	}
	if (!extraOptions.range) {
		extraOptions.range = true;
	}
	if (!extraOptions.tolerant) {
		extraOptions.tolerant = true;
	}
	if (!extraOptions.comment) {
		extraOptions.comment = true;
	}
	try {
		var parsedProgram = esprima.parse(contents, extraOptions);
		return parsedProgram;
	} catch (e) {
		console.error(e, e);
		return null;
	}
};

module.exports = parse;

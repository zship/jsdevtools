var fs = require('fs');
var net = require('net');

module.exports.cli = function() {

	process.stdin.resume();
	process.stdin.setEncoding('utf8');

	var inData = '';

	process.stdin.on('data', function(chunk) {
		inData += chunk;
	});

	process.stdin.on('end', function() {
		var sock = new net.Socket();
		sock.connect('/tmp/.jsdevtools');
		//console.log(inData);
		process.argv.push(inData);
		sock.write(JSON.stringify(process.argv));

		sock.on('data', function(buffer) {
			console.log(buffer.toString());
			//process.exit();
			sock.destroy();
		});
	});

};

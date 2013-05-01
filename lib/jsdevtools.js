var fs = require('fs');
var net = require('net');

module.exports.cli = function() {

	var server = net.createServer(function(c) { //'connection' listener
		console.log('server connected');
		c.on('data', function(data) {
			console.log(data.toString());
			setTimeout(function() {
				c.write('test2');
			}, 500);
		});
		c.on('end', function() {
			console.log('server disconnected');
		});
		c.write('hello\r\n');
		c.pipe(c);
	});

	server.listen('/tmp/.jsdevtools', function() {
		console.log(JSON.stringify(arguments, false, 4));
	});

	server.on('close', function() {
		console.log('Server closed.');
	});

	process.on('SIGINT', function () {
		server.close();
	});

};

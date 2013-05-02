var fs = require('fs');
var net = require('net');
var promisify = require('deferred').promisify;
var Deferred = require('deferreds').Deferred;

var parse = require('./parse');

var onRequest = function(args) {
	var deferred = new Deferred();
	switch(args[2]) {
		case 'parse':
			var contents = args[3];
			//console.log('"""' + contents);
			//promisify(fs.readFile)(args[3]).then(function(contents) {
				deferred.resolve(parse(contents.toString()));
			//});
		break;
	}
	return deferred.promise();
};

module.exports.cli = function() {

	var server = net.createServer(function(sock) { //'connection' listener
		console.log('server connected');
		sock.on('data', function(data) {
			//console.log(data.toString());
			try {
				var args = JSON.parse(data.toString());
				onRequest(args).then(function(result) {
					sock.write(JSON.stringify(result));
				});
			}
			catch(e) {
				console.error(e.stack);
				sock.write(JSON.stringify(e.stack, false, 4));
				server.close();
			}
			/*
			 *setTimeout(function() {
			 *    sock.write('test2');
			 *}, 500);
			 */
		});
		sock.on('error', function(e) {
			console.error(e.stack);
		});
		sock.on('end', function() {
			console.log('server disconnected');
		});
		//sock.write('hello\r\n');
		//c.pipe(c);
	});

	server.listen('/tmp/.jsdevtools', function() {
	});

	server.on('close', function() {
		console.log('Server closed.');
	});

	process.on('SIGINT', function () {
		server.close();
	});

};

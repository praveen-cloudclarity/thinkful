var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var express = require('express');

var cache = {};

function sendFile(response, filePath, fileContents) {
	response.writeHead(200, {"content-type" : mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}

function send404(response) {
	response.writeHead(404, {'Content-Type' : 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
}

function serveStatic(response, cache, absPath) {
	if (cache[absPath]) {
		sendFile(response, absPath, cache[absPath]);
	}
	else {
		fs.exists(absPath, function(exists) {
			if (exists) {
				fs.readFile(absPath, function(err, data) {
					if (err) {
						console.log(absPath);
						send404(response);
					}
					else {
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			}
			else {
				send404(response);
			}
		});
	}
}

var server = http.createServer(function(request, response) {
	console.log("HTTP Server Create request url=" + request.url);
	var filePath = false;
	if (request.url == '/') {
		filePath = 'etfs.html';
	}
	else {
		filePath = request.url;
	}
	var absPath = './' + filePath;
	serveStatic(response, cache, absPath);
	
});

var port = 3000;
server.listen(port, function() {
	console.log("Listening on port 3000");
});

var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var port = "443";
var counter = 0;

var app = express();

var options = {
  key: fs.readFileSync('keys/privatekey.pem'),
  cert: fs.readFileSync('keys/certificate.pem')
};

https.createServer(options, app).listen(port);

app.post('/', function(req, res) {
  var body = '';
  req.setEncoding('utf8');

  // Readable streams emit 'data' events once a listener is added
  req.on('data', function (chunk) {
    body += chunk;
  })

  // the end event tells you that you have entire body
  req.on('end', function () {
    counter++;
    console.log(body);

    var bodyResp = 'Hello visitor #' + counter + '; your request was ' + body;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', Buffer.byteLength(bodyResp));
    res.end(bodyResp);
  });
});

console.log('Server is now running');
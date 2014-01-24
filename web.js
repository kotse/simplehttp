// Create a HTTP server on port 8000
// Send plain text headers and 'Hello World' to each client
 
var port = process.env.PORT || 8000;
var http = require('http');
var counter = 0;

var server = http.createServer(function (req, res) {
  // req is an http.IncomingMessage, which is a Readable Stream
  // res is an http.ServerResponse, which is a Writable Stream

  var body = '';
  // we want to get the data as utf8 strings
  // If you don't set an encoding, then you'll get Buffer objects
  req.setEncoding('utf8');

  // Readable streams emit 'data' events once a listener is added
  req.on('data', function (chunk) {
    body += chunk;
  })

  // the end event tells you that you have entire body
  req.on('end', function () {
    console.log('received ' + req.method + ' request from: ' + req.connection.remoteAddress);

  	counter++;
  	console.log('Message Start: \n' + body);
    console.log('Message End: \n');

  	res.writeHead(200, {'Content-Type': 'text/html'}); // prepare response headers
      res.end("requestor # " + counter + ": request was : " + body);
    })

  // console.log(req);
})

console.log('Server running at http://127.0.0.1:' + port);
server.listen(port);
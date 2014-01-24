var https = require('https');
var http = require('http');

var body = '<?xml version="1.0" encoding="utf-8"?>' +
           '<someRequest></someRequest>';

// var host = "http://shrouded-woodland-1421.herokuapp.com"
// var port = 443;
var host = "localhost";
var port = 8000;

var postRequest = {
    host: host,
    path: "/",
    port: port,
    method: "POST",
    headers: {
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(body)
    }
    // ,
    // rejectUnauthorized: false
};

var buffer = "";

// var req = https.request( postRequest, function( res )    {
var req = http.request( postRequest, function( res )    {

   console.log( res.statusCode );
   var buffer = "";
   res.on( "data", function( data ) { buffer = buffer + data; } );
   res.on( "end", function( data ) { console.log( buffer ); } );

});

req.write( body );
req.end();
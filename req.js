var http = require('http');

var body = '<?xml version="1.0" encoding="utf-8"?>' +
           '<someRequest></someRequest>';

var postRequest = {
    host: "localhost",
    path: "/",
    port: 8000,
    method: "POST",
    headers: {
        
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(body)
    }
};

var buffer = "";

var req = http.request( postRequest, function( res )    {

   console.log( res.statusCode );
   var buffer = "";
   res.on( "data", function( data ) { buffer = buffer + data; } );
   res.on( "end", function( data ) { console.log( buffer ); } );

});

req.write( body );
req.end();
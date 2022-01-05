

let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer( { port: 8100 } );

wss.on( 'connection', function(ws){
 console.log("connected");
 ws.on( 'message', function(msg){
  console.log("msg[" + msg + "]" );
  ws.send( msg );
  });
});
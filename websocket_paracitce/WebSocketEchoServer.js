

let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer( { port: 8100 } );

wss.on( 'connection', function(ws){
 console.log("connected");
 // socket.js에서 send로 받은 val()를 msg로.
 ws.on( 'message', function(msg){
  console.log("msg[" + msg + "]" );
  ws.send( msg );
  });
});
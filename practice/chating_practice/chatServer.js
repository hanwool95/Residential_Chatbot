
var app = require("express")();
var url = require("url");


// "/"은 route. get()은 주소에 대한 응답 처리 함수 정의.
app.get("/", function(req, res){
    console.log("get:chatClient.html");
    // 서버에 접속하는 client에게 서버에 형성되어 있는 Client용 html 파일 전송
    res.sendFile("chatClient.html", {root: __dirname});
});

// route("/") 뒤에 무언가 있을 경우 use 호출. url pathname에서 루트의 /를 제외한 나머지를 바탕으로 파일 검색.
app.use(function(req, res){
    var fileName = url.parse(req.url).pathname.replace("/","");
    res.sendFile(fileName, {root: __dirname});
    console.log("use:", fileName);
});

//http 모듈 이용하여 지금까지 정의한 app을 집어 넣어 서버를 생성하고, 서버는 포트 3000으로 계속 listen 상태에 돌입.
var server = require('http').createServer(app);
server.listen(3001);
console.log("listening at http://127.0.0.1:3001...");


//클로저를 사용해, private한 유니크 id를 만든다. 즉, 사용자별 고유 id 생성을 위해 별도의 id를 정의하는 함수가 있는데
// 이 함수는 동작할 때마다 id가 증가.
var uniqueID = (function(){
    let id = 0;
    return function(){ return id++; };
})();

//socket.io 모듈을 이용하여 서버 소켓 생성 후 정의
var socket = require('socket.io')(server);
//소켓 Connection 이벤트가 발생했을 때 동작하는 함수 정의.
socket.sockets.on('connection', function(client){
    //private id를 만들기 위한 함수를 동작하는 것으로 그 상황의 ID를 clientID로 정의.
    var clientID = uniqueID();
    console.log('Connection: '+ clientID);

    //ServerReceiver라는 이벤트 함수를 켜놓는 상황 정의. 클라이언트에서 이것을 호출하면 서버는 받게 됨.
    client.on('serverReceiver', function(value){
    //클라이언트 reciever에 해당 ID와 메세지 전송.
    socket.sockets.emit('clientReceiver', {clientID: clientID, message: value});
  });
});

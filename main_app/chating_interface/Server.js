
const fetch = require('node-fetch');

const express = require("express");
const http = require('http');



const PORT = 3737;


const app = express();
app.set('views', __dirname + '/views')
app.set("view engine", 'ejs')
app.use(express.static(__dirname + '/'));

// app.use(function(req, res){
//     var fileName = url.parse(req.url).pathname.replace("/","");
//     res.sendFile(fileName, {root: __dirname});
//     console.log("use:", fileName);
// });

app.get('/', (req, res) =>{
    res.render('interface')
})

//app.use(cors(corsOptions))


let server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`listening at http://127.0.0.1:${PORT}...`);
});

let socket = require('socket.io')(server);


let uniqueID = (function(){
    let id = 0;
    return function(){ return id++; };
})();



socket.sockets.on('connection', function(client){
    var clientID = uniqueID();
    console.log('Connection: '+ clientID);

    client.on('serverReceiver', function(value){
        socket.sockets.emit('clientReceiver', {clientID: clientID, message: value});
        fetch("http://127.0.0.1:8000/morph/", {
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body: JSON.stringify({
                title: "Text",
                body: value,
                userId: clientID,
            }),
        }).then((response) => response.json()).then((data) =>
            socket.sockets.emit('clientReceiver', {clientID: 'chatbot', message: JSON.stringify(data['body'])}));
    });
});

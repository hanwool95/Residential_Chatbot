
const fetch = require('node-fetch');

let browserEnv = require('browser-env');
browserEnv(['navigator']);

const express = require("express");
const http = require('http');
const mongoose = require("mongoose")

const dotenv = require("dotenv")
dotenv.config()
const MONGO_URI = process.env.MONGO_URI


const PORT = 3737;


const app = express();
app.set('views', __dirname + '/views')
app.set("view engine", 'ejs')
app.use(express.static(__dirname + '/public'));

const Location = require("./models/locations")


function SavePosition(position) {
  let location = new Location();
  location.longitude = position.coords.longitude;
  location.latitude = position.coords.latitude;
  location.index = 0
  location.save((err) =>{
        if (err) {
            console.log('database failure')
        }
    })
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(SavePosition);
  } else {
      console.log('Geolocation is not supported by this browser.')
  }
}


app.get('/', (req, res) =>{
    getLocation();
    res.render('interface')
})

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Successfully connected to mongodb"))
    .catch(e => console.log(e))

let server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`listening at http://127.0.0.1:${PORT}...`);
});

let socket = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});


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

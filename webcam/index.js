var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http').createServer(app);

// let sslOptions = {
// key: fs.readFileSync('./privkey.key'),//里面的文件替换成你生成的私钥
// cert: fs.readFileSync('./cacert.pem')//里面的文件替换成你生成的证书
// };

// const https = require('https').createServer(sslOptions, app);

// var io = require('socket.io')(http);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        allowedHeaders: ["Access-Control-Allow-Origin"],
    }
});
io.on('connect', (socket) => {
    console.log('a user connected: ', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id)
    })
    socket.on('chat message', msg => {
        console.log(socket.id + ' say: ' + msg);
        io.emit('chat message', msg);
    })
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/camera', (req, res) => {
    res.sendFile(__dirname + '/camera.html');
})

http.listen(4443, () => {
    console.log("listening on 4443")
})
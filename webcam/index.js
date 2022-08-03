var express = require('express');
var app = express();
var fs = require('fs');

let sslOptions = {
    key: fs.readFileSync('./privkey.key'),//里面的文件替换成你生成的私钥
    cert: fs.readFileSync('./cacert.pem')//里面的文件替换成你生成的证书
};

// const http = require('https').createServer(sslOptions, app);
var http = require('http').createServer(app);

// var io = require('socket.io')(http);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        allowedHeaders: ["Access-Control-Allow-Origin"],
    }
});
io.on('connect', (socket) => {
    console.log('a user connected: ', socket.id);
    io.emit('welcome', 'hello world');
    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id)
    })
    socket.on('chat message', msg => {
        console.log(socket.id + ' say: ' + msg);
        io.emit('chat message', msg);
    })
	socket.on('login',msg=>{
		console.log('login',msg)
		socket.emit('login',msg)
	})
	socket.on('msg',msg=>{
		console.log('msg',msg)
		socket.emit('msg',msg)
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

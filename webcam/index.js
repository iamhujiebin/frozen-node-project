var express = require('express');
var app = express();
var fs = require('fs');
// var http = require('http').createServer(app);

let sslOptions = {
    key: fs.readFileSync('./privkey.key'),//里面的文件替换成你生成的私钥
    cert: fs.readFileSync('./cacert.pem')//里面的文件替换成你生成的证书
};

const https = require('https').createServer(sslOptions, app);

var io = require('socket.io')(https);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

https.listen(4443, () => {
    console.log("listening on 4443")
})
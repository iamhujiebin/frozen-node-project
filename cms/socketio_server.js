var http = require('http').createServer()

const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        allowedHeaders: ["Access-Control-Allow-Origin"],
    }
})
io.on('connect', (socket) => {
    console.log('a user connected: ', socket.id)
    io.emit('welcome', 'hello world')
    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id)
    })
    socket.on('chat message', msg => {
        console.log(socket.id + ' say: ' + msg)
        io.emit('chat message', msg)
    })
    socket.on('login', msg => {
        console.log('login', msg)
        socket.emit('login', msg)
    })
    socket.on('msg', msg => {
        console.log('msg', msg)
        socket.emit('msg', msg)
    })
})

http.listen(4443, () => {
    console.log("listening on 4443")
})

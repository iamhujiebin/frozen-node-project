const { createServer } = require("http")
const { Server } = require("socket.io")
const { instrument } = require("@socket.io/admin-ui")

const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io", "http://localhost:3000", "http://localhost:3001"],
        credentials: true,
        allowedHeaders: ["Access-Control-Allow-Origin"],
    }
})
var clientMap = new Map()

// 广播连接的client
async function broadcastClientList () {
    const sockets = await io.of('/').fetchSockets()
    var tmpClientMap = new Map()
    for (const socket of sockets) {
        if (clientMap.get(socket.id)) {
            tmpClientMap.set(socket.id, clientMap.get(socket.id))
        }
    }
    clientMap = tmpClientMap
    let socketInfos = []
    clientMap.forEach((name, id) => {
        socketInfos.push({ id, name })
    })
    const msg = JSON.stringify(socketInfos)
    console.log('broadcast sockets', clientMap, socketInfos)
    io.emit('listClients', msg)
}

io.on('connect', (socket) => {
    console.log('a user connected: ', socket.id)
    io.emit('welcome', 'hello world')
    socket.on('disconnect', () => {
        broadcastClientList()
        console.log('user disconnected: ' + socket.id)
    })
    socket.on('login', username => {
        console.log('login', username)
        clientMap.set(socket.id, username)
        socket.emit('login', username)
        broadcastClientList()
    })
    // 公屏数据
    socket.on('public-msg', data => {
        console.log(data)
        const { sender, msg } = data
        let senderName = clientMap.get(sender)
        senderName = senderName ? senderName : '匿名'
        const publicMsg = senderName + '说:' + msg
        console.log(publicMsg)
        io.of('/').emit('public-msg', publicMsg)
    })
    // webrtc连麦
    socket.on('offer', data => {
        console.log('offer', data.sender, data.receiver, data.offer)
        const { receiver } = data
        if (receiver) {
            io.to(receiver).emit('offer', data)
        }
    })
    socket.on('answer', data => {
        console.log('answer', data.sender, data.receiver, data.answer)
        const { receiver } = data
        if (receiver) {
            io.to(receiver).emit('answer', data)
        }
    })
    socket.on('offerIce', data => {
        console.log('offerIce', data.sender, data.receiver, data.ice)
        const { receiver } = data
        if (receiver) {
            io.to(receiver).emit('offerIce', data)
        }
    })
    socket.on('answerIce', data => {
        console.log('answerIce', data.sender, data.receiver, data.ice)
        const { receiver } = data
        if (receiver) {
            io.to(receiver).emit('answerIce', data)
        }
    })
})

// socket.io admin ui
instrument(io, {
    auth: false
})

httpServer.listen(4443, () => {
    console.log("listening on 4443")
})

const SocketIOServer = require("socket.io")

function configSocketIO (server) {
    let io = SocketIOServer(server)

    async function broadcastClientList () {
        const sockets = await io.of("/").fetchSockets()
        let socketIds = []
        for (const socket of sockets) {
            console.log(socket.id)
            socketIds.push(socket.id)
        }
        console.log("sockets ", socketIds)
        io.emit("listClients", socketIds)
    }

    io.on("connection", socket => {
        console.log("socket: ", socket.id)
        broadcastClientList()

        socket.on("msg", data => {
            console.log("recv msg ", data)
            if (data.receiver && data.msg) {
                io.to(data.receiver).emit("msg", data) // 指定receiver
            }
        })

        socket.on("disconnect", (reason) => {
            broadcastClientList()
            console.log("disconnect", socket.id, reason)
        })

        socket.on("offer", data => {
            let receiver = data.receiver
            if (receiver) {
                io.to(receiver).emit("offer", data)
            }
        })

        socket.on("answer", data => {
            let receiver = data.receiver
            if (receiver) {
                io.to(receiver).emit("answer", data)
            }
        })

        socket.on("offerIce", data => {
            let receiver = data.receiver
            if (receiver) {
                io.to(receiver).emit("offerIce", data)
            }
        })

        socket.on("answerIce", data => {
            let receiver = data.receiver
            if (receiver) {
                io.to(receiver).emit("answerIce", data)
            }
        })
    })
}

module.exports.configSocketIO = configSocketIO
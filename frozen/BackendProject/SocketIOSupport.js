const SocketIOServer = require("socket.io");

function configSocketIO(server) {
    let io = SocketIOServer(server);

    io.on("connection", socket => {
        console.log("socket: ", socket.id)
        io.emit("msg", socket.id)
        socket.on("msg", msg => {
            io.emit("msg", msg);
        })
    })
}

module.exports.configSocketIO = configSocketIO;
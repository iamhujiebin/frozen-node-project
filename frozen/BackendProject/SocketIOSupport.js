const SocketIOServer = require("socket.io");

function configSocketIO(server) {
    let io = SocketIOServer(server);

    function broadcastClientList() {
        io.of("/").clients((err, clients) => {
            if (!err) {
                io.emit("listClients", clients)
            }
        })
    }

    io.on("connection", socket => {
        console.log("socket: ", socket.id)

        socket.on("msg", data => {
            console.log("recv msg ", data)
            if (data.receiver && data.msg) {
                io.to(data.receiver).emit("msg", data); // 指定receiver
                socket.emit("msg", data); // 原封不动发回去
            }
        });

        socket.on("disconnect", () => { });

        socket.on("offer", data => {
            let receiver = data.receiver;
            if (receiver) {
                io.to(receiver).emit("offer", data);
            }
        });

        socket.on("answer", data => {
            let receiver = data.receiver;
            if (receiver) {
                io.to(receiver).emit("answer", data);
            }
        });

        socket.on("offerIce", data => {
            let receiver = data.receiver;
            if (receiver) {
                io.to(receiver).emit("offerIce", data);
            }
        });

        socket.on("answerIce", data => {
            let receiver = data.receiver;
            if (receiver) {
                io.to(receiver).emit("answerIce", data);
            }
        });
    })
}

module.exports.configSocketIO = configSocketIO;
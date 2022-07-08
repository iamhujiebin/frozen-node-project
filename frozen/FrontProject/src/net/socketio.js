import Context from "../context";

class SocketIO {
    /**
     * 
     * @param {Context} context 
     */
    constructor(context) {
        this._context = context;
        this._socket = io(); // 路径可以做成配置的
        this._socket.on("listClients", clients => {
            // todo
        });
        this._socket.on("msg", data => {
            console.log("多个io.on,可以触发多次", data.msg)
        });
    }

    get socketId() {
        return this._socket.id;
    }

    sendMsg(msg, targetSocketId) {
        this._socket.emit("msg", { receiver: targetSocketId, sender: this._socket.id, msg: msg })
    }
}

export default SocketIO;
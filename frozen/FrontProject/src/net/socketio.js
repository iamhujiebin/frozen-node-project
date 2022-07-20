import Context from "../context"
import SocketEvents from "../events/SocketEvents"
import Events from "../events/Events"

class SocketIO {
    /**
     * 
     * @param {Context} context 
     */
    constructor(context) {
        this._context = context
        this._socketId = ""
        this._socket = io() // 路径可以做成配置的
        this._socket.on("listClients", clients => {
            // todo
        })
        this._socket.on("msg", data => {
            console.log("多个io.on,可以触发多次", data.msg)
        })
        this._socket.on("connect", () => {
            this._socketId = this._socket.id
        })
        this._socket.on(SocketEvents.OFFER, data => {
            this._context.fire(Events.RECEIVED_OFFER, data)
        })
        this._socket.on(SocketEvents.ANSWER, data => {
            this._context.fire(Events.RECEIVED_ANSWER, data)
        })
        this._socket.on(SocketEvents.OFFER_ICE, data => {
            this._context.fire(Events.RECEIVED_OFFER_ICE, data)
        })
        this._socket.on(SocketEvents.ANSWER_ICE, data => {
            this._context.fire(Events.RECEIVED_ANSWER_ICE, data)
        })
    }

    get socketId () {
        return this._socketId
    }

    emit (eventType, data) {
        data.sender = this._socketId
        this._socket.emit(eventType, data)
    }

    sendMsg (msg, targetSocketId) {
        this._socket.emit("msg", { receiver: targetSocketId, sender: this._socket.id, msg: msg })
    }
}

export default SocketIO
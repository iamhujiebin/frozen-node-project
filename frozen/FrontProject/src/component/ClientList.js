import Context from '../context';
import Tpl from './ClientList.html';
import Events from '../events/Events';

const ClientList = Vue.component("client-list", {
    template: Tpl,

    data() {
        return {
            clients: ["结冰", "梦茵"],
            currentSocketId: "",
            selectSocketId: "",
            msg: "",
            ta: "",
            taMap: new Map() // {targetSocketId:$socketId,ta:$ta"}
        };
    },

    methods: {
        setClients(clients) {
            this.clients.length = 0;
            this.clients.push(...clients);
        },
        /**
         * 
         * @param {Context} context 
         */
        setContext(context) {
            this._context = context;
            this.currentSocketId = context._socketio.socketId;
            this.addSocketListeners();
        },
        sendMsg() {
            /**
             * @type {Context}
             */
            let context = this._context;
            context._socketio.sendMsg(this.msg, this.selectSocketId);
            let session = this.taMap.get(this.selectSocketId)
            if (!session) {
                session = {
                    "targetSocketId": this.selectSocketId,
                    "ta": ""
                }
            }
            session.ta += "我说:" + this.msg + "\n";
            this.ta = session.ta
            this.taMap.set(this.selectSocketId, session)
            this.msg = ''
        },
        addSocketListeners() {
            /**
             * @type {Context}
             */
            let context = this._context;
            context._socketio._socket.on("msg", msg => {
                let session = this.taMap.get(msg.sender)
                if (!session) {
                    session = {
                        "targetSocketId": this.selectSocketId,
                        "ta": ""
                    }
                }
                session.ta += "TA说:" + msg.msg + "\n";
                this.taMap.set(msg.sender, session)
                this.ta = session.ta
            })
            context._socketio._socket.on("listClients", clients => {
                this.setClients(clients);
            })
        },
        targetSocketIDClicked(e) {
            this.selectSocketId = $(e.target).data("socket_id");
            /**
            * @type {Context}
            */
            let context = this._context;
            context.fire(Events.START_CHAT_SESSION, this.selectSocketId)

            let session = this.taMap.get(this.selectSocketId)
            if (!session) {
                session = {
                    "targetSocketId": this.selectSocketId,
                    "ta": ""
                }
            }
            this.ta = session.ta
            this.taMap.set(this.selectSocketId, session)
        },
        targetSocketIDClickHook(socketId) {
            this.selectSocketId = socketId
            let session = this.taMap.get(socketId)
            if (!session) {
                session = {
                    "targetSocketId": socketId,
                    "ta": ""
                }
            }
            this.ta = session.ta
            this.$forceUpdate();
        },
        getSocketIdLabel(socketId) {
            if (!this._context) {
                return
            }
            if (socketId != this._context._socketio.socketId) {
                return socketId
            } else {
                return socketId + "[自己]";
            }
        },
        getStyle(socketId) {
            if (socketId == this.selectSocketId) {
                return "background-color: black; color: white;"
            }
            return ""
        }
    }
});

export default ClientList;
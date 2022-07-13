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
            this.ta += "我说:" + this.msg + "\n";
            this.msg = '';
        },
        addSocketListeners() {
            /**
             * @type {Context}
             */
            let context = this._context;
            context._socketio._socket.on("msg", msg => {
                this.ta += "TA说:" + msg.msg + "\n";
            })
            context._socketio._socket.on("listClients", clients => {
                this.setClients(clients);
            })
        },
        targetSocketIDClicked(e) {
            this.selectSocketId = $(e.target).data("socket_id");
            console.log("targetSocketIDClicked:", this.selectSocketId)
            /**
            * @type {Context}
            */
            let context = this._context;
            context.fire(Events.START_CHAT_SESSION, this.selectSocketId)
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
        }
    }
});

export default ClientList;
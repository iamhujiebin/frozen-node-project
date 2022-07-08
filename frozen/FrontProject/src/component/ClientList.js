import Context from '../context';
import Tpl from './ClientList.html';

const ClientList = Vue.component("client-list", {
    template: Tpl,

    data() {
        return {
            clients: ["结冰", "梦茵"],
            currentSocketId: "",
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
            this.currentSocketId = context._socketio._socket.id;
            this.addSocketListeners();
        },
        sendMsg() {
            /**
             * @type {Context}
             */
            let context = this._context;
            context._socketio.sendMsg(this.msg, "todo TargetSocketId")
            this.msg = '';
        },
        addSocketListeners() {
            /**
             * @type {Context}
             */
            let context = this._context;
            context._socketio._socket.on("msg", msg => {
                this.ta += msg.msg + "\n";
            })
            context._socketio._socket.on("listClients", clients => {
                this.setClients(clients);
            })
        },
        targetSocketIDClicked(e) {
            let selectSocketId = $(e.target).data("socket_id");
            console.log("targetSocketIDClicked:", selectSocketId)
        },
        getSocketIdLabel(socketId) {
            if (socketId != this.currentSocketId) {
                return socketId
            } else {
                return socketId + "[自己]";
            }
        }
    }
});

export default ClientList;
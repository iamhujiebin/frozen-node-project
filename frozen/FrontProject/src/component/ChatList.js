import Tpl from "./ChatList.html"
import Context from "../context";

const ChatList = Vue.component("chat-list", {
    template: Tpl,
    data() {
        return {
            msg: "",
            ta: "",
        }
    },
    mounted() {

    },

    methods: {
        /**
         * 
         * @param {Context} context 
         */
        setContext(context) {
            this._context = context;
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
        }
    },
})

export default ChatList;
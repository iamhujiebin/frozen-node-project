import Tpl from "./ChatList.html"

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
        setIO(io) {
            // console.log("set io ", io)
            this._io = io;
            this.addSocketListeners();
        },
        sendMsg() {
            // console.log("msg ", this.msg);
            this._io.emit("msg", this.msg);
            this.msg = '';
        },
        addSocketListeners() {
            this._io.on("msg", e => {
                // console.log("recevie ", e);
                this.ta += e + "\n";
            })
        }
    },
})

export default ChatList;
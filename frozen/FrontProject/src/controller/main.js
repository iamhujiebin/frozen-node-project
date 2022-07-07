import Tpl from "../views/main.html";
import "../component/ClientList"
import "../component/ChatList"

const Main = Vue.component("main", {
    template: Tpl,
    data() {
        return {
            classroomName: "Frozen"
        }
    },

    mounted() {
        this._socket = io();
        this._remoteStream = new MediaStream();
        this.$refs.remote_preview.srcObject = this._remoteStream;
        this.addSocketListeners();
    },

    methods: {
        addSocketListeners() {
            this._socket.on("msg", e => {
                console.log(e)
            })
        }
    }
})

export default Main;
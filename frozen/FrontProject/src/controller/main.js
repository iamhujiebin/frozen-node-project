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
        this.initRemoteStream();
        this.initDisplayStream();
        this.initSocketIO();
    },

    methods: {
        initSocketIO() {
            this._socket = io();
            this.$refs.chat_list.setIO(this._socket);
            this.addSocketListeners();
        },
        addSocketListeners() {
            // this._socket.on("msg", e => {
            //     console.log(e)
            // })
        },
        async initRemoteStream() {
            // this._remoteStream = new MediaStream();
            this._remoteStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            this.$refs.remote_preview.srcObject = this._remoteStream;
        },
        async initDisplayStream() {
            this._displayStream = await navigator.mediaDevices.getDisplayMedia();
            this.$refs.display_preview.srcObject = this._displayStream;
            this._recorder = new MediaRecorder(this._displayStream, { mimeType: "video/webm;codesc=h264" });
            this._recorder.ondataavailable = this.recorder_dataAvailableHandler.bind(this);
        },
        recorder_dataAvailableHandler(e) {
            console.log(e);
            this.currentWebmData = e.data;
        },
    }
})

export default Main;
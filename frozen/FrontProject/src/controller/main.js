import Tpl from "../views/main.html";
import "../component/ClientList"
import "../component/ChatList"
import Context from "../context"

const Main = Vue.component("main", {
    template: Tpl,
    data() {
        return {
            classroomName: "Frozen",
            remoteFirst: false,
            displayFirst: false,
        }
    },

    mounted() {
        // this.initRemoteStream();
        // this.initDisplayStream();
    },

    methods: {
        /**
         * 
         * @param {Context} context 
         */
        setContext(context) {
            this._context = context;
            this.$refs.client_list.setContext(context);
            this.$refs.chat_list.setContext(context);
        },

        videoSwitch() {
            if (!this.remoteFirst) {
                this.remoteFirst = true
                this.initRemoteStream();
            }
        },

        displaySwitch() {
            if (!this.displayFirst) {
                this.displayFirst = true
                this.initDisplayStream();
            }
        },

        async initRemoteStream() {
            // this._remoteStream = new MediaStream();
            this._remoteStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            this.$refs.remote_preview.srcObject = this._remoteStream;
        },
        async initDisplayStream() {
            this._displayStream = await navigator.mediaDevices.getDisplayMedia();
            this.$refs.display_preview.srcObject = this._displayStream;
            this._recorder = new MediaRecorder(this._displayStream, { mimeType: "video/webm;codesc=h264" });
        },
    }
})

export default Main;
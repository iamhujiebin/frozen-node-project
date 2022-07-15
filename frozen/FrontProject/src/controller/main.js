import Tpl from "../views/main.html";
import "../component/ClientList"
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
        // this.initLocalStream();
        // this.initDisplayStream();
    },

    methods: {
        /**
         * 
         * @param {Context} context 
         */
        async setContext(context) {
            this._context = context;
            this.$refs.client_list.setContext(context);
            context.setClientList(this.$refs.client_list); // context包含clientList

            let media = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            this.$refs.local_preview.srcObject = media;
            context.setLocalStream(media);

            context.setMainApp(this);

            // let remoteStream = new MediaStream();
            // context.setData(Context.KEY_REMOTE_MEDIA_STREAM, remoteStream);
            // this.$refs.remote_preview.srcObject = remoteStream;
        },

        displaySwitch() {
            if (!this.displayFirst) {
                this.displayFirst = true
                this.initDisplayStream();
            }
        },

        async initDisplayStream() {
            this._displayStream = await navigator.mediaDevices.getDisplayMedia();
            this.$refs.display_preview.srcObject = this._displayStream;
            this._recorder = new MediaRecorder(this._displayStream, { mimeType: "video/webm;codesc=h264" });
        },

        setRemoteStream(receiverSocketId, media) {
            this._context.setData(receiverSocketId, Context.KEY_REMOTE_MEDIA_STREAM, media);
            this.$refs.remote_preview.srcObject = media;
        },
        getRemoteStream(receiverSocketId) {
            return this._context.getData(receiverSocketId, Context.KEY_REMOTE_MEDIA_STREAM)
        }
    }
})

export default Main;
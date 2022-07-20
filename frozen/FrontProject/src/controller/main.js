import Tpl from "../views/main.html"
import "../component/ClientList"
import Context from "../context"

const Main = Vue.component("main", {
    template: Tpl,
    data () {
        return {
            classroomName: "Frozen",
            remoteFirst: false,
            displayFirst: false,
        }
    },

    mounted () {
        // this.initLocalStream();
        // this.initDisplayStream();
    },

    methods: {
        /**
         * 
         * @param {Context} context 
         */
        async setContext (context) {
            this._context = context
            this.$refs.client_list.setContext(context)
            context.setClientList(this.$refs.client_list) // context包含clientList

            let media = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: "bsZpDzDZXXJZJ4EUkt+XBDv0XPKhtHmssFW7QnjArSM="
                }, audio: false
            })
            this.$refs.local_preview.srcObject = media
            context.setLocalStream(media)

            context.setMainApp(this)

            let devices = await navigator.mediaDevices.enumerateDevices()
            console.log("devices:", devices)

            // let remoteStream = new MediaStream();
            // context.setData(Context.KEY_REMOTE_MEDIA_STREAM, remoteStream);
            // this.$refs.remote_preview.srcObject = remoteStream;
        },

        displaySwitch () {
            if (!this.displayFirst) {
                this.displayFirst = true
                this.initDisplayStream()
            }
        },

        async initDisplayStream () {
            this._displayStream = await navigator.mediaDevices.getDisplayMedia()
            this.$refs.display_preview.srcObject = this._displayStream
            this._recorder = new MediaRecorder(this._displayStream, { mimeType: "video/webm;codesc=h264" })
        },

        setRemoteStream (receiverSocketId, media) {
            this._context.setData(receiverSocketId, Context.KEY_REMOTE_MEDIA_STREAM, media)
            this.$refs.remote_preview.srcObject = media
        },
        getRemoteStream (receiverSocketId) {
            return this._context.getData(receiverSocketId, Context.KEY_REMOTE_MEDIA_STREAM)
        },

        /**
         * 这个不可行的,子进程需要在server端或者electron之类的app端才能做.
         * 浏览器端做不了
         */
        async pushRTMP () {
            // const child_process = require('child_process')
            // let p = child_process.spawn("ffmpeg", ["-fflags", "nobuffer", "-i", "-", "-vcodec", "copy", "-f", "flv", "rtmp://localhost:1935/hls/100001"])
            // p.stderr.on("data", data => {
            //     console.log(data.toString())
            // })
            // p.stdout.on("data", data => {
            //     console.log(data.toString())
            // })

            // // let stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
            // let stream = await navigator.mediaDevices.getUserMedia({
            //     video: {
            //         deviceId: "bsZpDzDZXXJZJ4EUkt+XBDv0XPKhtHmssFW7QnjArSM="
            //     }, audio: false
            // })

            // let mr = new MediaRecorder(stream, { mimetype: "video/webm; codec=h264" })
            // mr.ondataavailable = async function (e) {
            //     p.stdin.write(NodeBuffer.from(await e.data.arrayBuffer()))
            // }
            // mr.start(40)

            // p.once("exit", code => {
            //     mr.stop()
            //     window.close()
            // })
        }
    }
})

export default Main
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./FrontProject/src/component/ClientList.js":
/*!**************************************************!*\
  !*** ./FrontProject/src/component/ClientList.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../context */ \"./FrontProject/src/context.js\");\n/* harmony import */ var _ClientList_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClientList.html */ \"./FrontProject/src/component/ClientList.html\");\n/* harmony import */ var _events_Events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events/Events */ \"./FrontProject/src/events/Events.js\");\n\n\n\n\nconst ClientList = Vue.component(\"client-list\", {\n    template: _ClientList_html__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n\n    data () {\n        return {\n            clients: [\"结冰\", \"梦茵\"],\n            currentSocketId: \"\",\n            selectSocketId: \"\",\n            msg: \"\",\n            ta: \"\",\n            taMap: new Map() // {targetSocketId:$socketId,ta:$ta\"}\n        }\n    },\n\n    methods: {\n        setClients (clients) {\n            this.clients.length = 0\n            this.clients.push(...clients)\n        },\n        /**\n         * \n         * @param {Context} context \n         */\n        setContext (context) {\n            this._context = context\n            // this.currentSocketId = context.socketIO.socketId; // 这个时候不能设置自己的socketId,还没ready\n            this.addSocketListeners()\n        },\n        sendMsg () {\n            /**\n             * @type {Context}\n             */\n            let context = this._context\n            context._socketio.sendMsg(this.msg, this.selectSocketId)\n            let session = this.taMap.get(this.selectSocketId)\n            if (!session) {\n                session = {\n                    \"targetSocketId\": this.selectSocketId,\n                    \"ta\": \"\"\n                }\n            }\n            session.ta += \"我说:\" + this.msg + \"\\n\"\n            this.ta = session.ta\n            this.taMap.set(this.selectSocketId, session)\n            this.msg = ''\n        },\n        addSocketListeners () {\n            /**\n             * @type {Context}\n             */\n            let context = this._context\n            context._socketio._socket.on(\"msg\", msg => {\n                let session = this.taMap.get(msg.sender)\n                if (!session) {\n                    session = {\n                        \"targetSocketId\": this.selectSocketId,\n                        \"ta\": \"\"\n                    }\n                }\n                session.ta += \"TA说:\" + msg.msg + \"\\n\"\n                this.taMap.set(msg.sender, session)\n                if (this.selectSocketId == msg.sender) {\n                    this.ta = session.ta\n                }\n            })\n            context._socketio._socket.on(\"listClients\", clients => {\n                console.log(\"currentSocketID:\", context.socketIO.socketId)\n                this.currentSocketId = context.socketIO.socketId // 这个时候能设置自己的socketId\n                this.setClients(clients)\n            })\n        },\n        targetSocketIDClicked (e) {\n            this.selectSocketId = $(e.target).data(\"socket_id\")\n            if (this.selectSocketId == this.currentSocketId) {\n                console.log(\"选自己不需要建立webrtc连接\")\n                return\n            }\n            /**\n            * @type {Context}\n            */\n            let context = this._context\n            context.fire(_events_Events__WEBPACK_IMPORTED_MODULE_2__[\"default\"].START_CHAT_SESSION, this.selectSocketId)\n\n            let session = this.taMap.get(this.selectSocketId)\n            if (!session) {\n                session = {\n                    \"targetSocketId\": this.selectSocketId,\n                    \"ta\": \"\"\n                }\n            }\n            this.ta = session.ta\n            this.taMap.set(this.selectSocketId, session)\n        },\n        targetSocketIDClickHook (socketId) {\n            this.selectSocketId = socketId\n            let session = this.taMap.get(socketId)\n            if (!session) {\n                session = {\n                    \"targetSocketId\": socketId,\n                    \"ta\": \"\"\n                }\n            }\n            this.ta = session.ta\n            this.$forceUpdate()\n        },\n        getSocketIdLabel (socketId) {\n            if (!this._context) {\n                return\n            }\n            if (socketId != this._context._socketio.socketId) {\n                return socketId\n            } else {\n                return socketId + \"[自己]\"\n            }\n        },\n        getStyle (socketId) {\n            if (socketId == this.selectSocketId) {\n                return \"background-color: black; color: white;\"\n            }\n            return \"\"\n        }\n    }\n})\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClientList);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/component/ClientList.js?");

/***/ }),

/***/ "./FrontProject/src/config.js":
/*!************************************!*\
  !*** ./FrontProject/src/config.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Config = {\n    PC_INIT_CONFIG: {\n        iceServers: [\n            { urls: \"stun:stun.l.google.com:19302\" }\n        ]\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Config);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/config.js?");

/***/ }),

/***/ "./FrontProject/src/context.js":
/*!*************************************!*\
  !*** ./FrontProject/src/context.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _net_socketio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./net/socketio */ \"./FrontProject/src/net/socketio.js\");\n/* harmony import */ var _events_Events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events/Events */ \"./FrontProject/src/events/Events.js\");\n/* harmony import */ var _controller_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller/main */ \"./FrontProject/src/controller/main.js\");\n/* harmony import */ var _handlers_HandlerReceivedOffer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handlers/HandlerReceivedOffer */ \"./FrontProject/src/handlers/HandlerReceivedOffer.js\");\n/* harmony import */ var _handlers_HandlerStartChatSession__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./handlers/HandlerStartChatSession */ \"./FrontProject/src/handlers/HandlerStartChatSession.js\");\n/* harmony import */ var _handlers_HandlerReceivedAnswer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./handlers/HandlerReceivedAnswer */ \"./FrontProject/src/handlers/HandlerReceivedAnswer.js\");\n/* harmony import */ var _handlers_HandlerReceivedAnswerICE__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./handlers/HandlerReceivedAnswerICE */ \"./FrontProject/src/handlers/HandlerReceivedAnswerICE.js\");\n/* harmony import */ var _handlers_HandlerReceivedOfferICE__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./handlers/HandlerReceivedOfferICE */ \"./FrontProject/src/handlers/HandlerReceivedOfferICE.js\");\n\n\n\n\n\n\n\n\n\nclass Context {\n    constructor() {\n        this._jqThis = $(this)\n        this._shareData = new Map()\n        this._socketio = new _net_socketio__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this)\n\n        this.addListeners()\n    }\n\n    addListeners () {\n        let jqThis = $(this)\n\n        jqThis.on(_events_Events__WEBPACK_IMPORTED_MODULE_1__[\"default\"].START_CHAT_SESSION, _handlers_HandlerStartChatSession__WEBPACK_IMPORTED_MODULE_4__[\"default\"])\n        jqThis.on(_events_Events__WEBPACK_IMPORTED_MODULE_1__[\"default\"].RECEIVED_OFFER, _handlers_HandlerReceivedOffer__WEBPACK_IMPORTED_MODULE_3__[\"default\"])\n        jqThis.on(_events_Events__WEBPACK_IMPORTED_MODULE_1__[\"default\"].RECEIVED_ANSWER, _handlers_HandlerReceivedAnswer__WEBPACK_IMPORTED_MODULE_5__[\"default\"])\n        jqThis.on(_events_Events__WEBPACK_IMPORTED_MODULE_1__[\"default\"].RECEIVED_OFFER_ICE, _handlers_HandlerReceivedOfferICE__WEBPACK_IMPORTED_MODULE_7__[\"default\"])\n        jqThis.on(_events_Events__WEBPACK_IMPORTED_MODULE_1__[\"default\"].RECEIVED_ANSWER_ICE, _handlers_HandlerReceivedAnswerICE__WEBPACK_IMPORTED_MODULE_6__[\"default\"])\n    }\n\n    setData (receiverSocketId, k, v) {\n        let data = this._shareData.get(receiverSocketId)\n        if (!data) {\n            data = new Map()\n        }\n        data.set(k, v)\n        this._shareData.set(receiverSocketId, data)\n    }\n\n    getData (receiverSocketId, k) {\n        let data = this._shareData.get(receiverSocketId)\n        if (!data) {\n            data = new Map()\n            this._shareData.set(k, data)\n        }\n        return data.get(k)\n    }\n\n    setLocalStream (stream) {\n        this._localStream = stream\n    }\n\n    getLocalStream () {\n        return this._localStream\n    }\n\n    fire (type, data) {\n        this._jqThis.trigger(type, [this, data])\n    }\n\n    get socketIO () {\n        return this._socketio\n    }\n\n    setClientList (client) {\n        this._clientList = client\n    }\n\n    get clientList () {\n        return this._clientList\n    }\n\n    setMainApp (mainApp) {\n        this._mainApp = mainApp\n    }\n\n    get mainApp () {\n        return this._mainApp\n    }\n}\n\nContext.KEY_OFFER_PEER_CONNECTION = \"offerPc\"\nContext.KEY_ANSWER_PERR_CONNECTION = \"answerPc\"\nContext.KEY_DATA_CHANNEL = \"dataChannel\"\nContext.KEY_LOCAL_MEDIA_STREAM = \"localMediaStream\"\nContext.KEY_REMOTE_MEDIA_STREAM = \"remoteMediaStream\"\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Context);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/context.js?");

/***/ }),

/***/ "./FrontProject/src/controller/main.js":
/*!*********************************************!*\
  !*** ./FrontProject/src/controller/main.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _views_main_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/main.html */ \"./FrontProject/src/views/main.html\");\n/* harmony import */ var _component_ClientList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component/ClientList */ \"./FrontProject/src/component/ClientList.js\");\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context */ \"./FrontProject/src/context.js\");\n\n\n\n\nconst Main = Vue.component(\"main\", {\n    template: _views_main_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    data () {\n        return {\n            classroomName: \"Frozen\",\n            remoteFirst: false,\n            displayFirst: false,\n        }\n    },\n\n    mounted () {\n        // this.initLocalStream();\n        // this.initDisplayStream();\n    },\n\n    methods: {\n        /**\n         * \n         * @param {Context} context \n         */\n        async setContext (context) {\n            this._context = context\n            this.$refs.client_list.setContext(context)\n            context.setClientList(this.$refs.client_list) // context包含clientList\n\n            let media = await navigator.mediaDevices.getUserMedia({\n                video: {\n                    deviceId: \"bsZpDzDZXXJZJ4EUkt+XBDv0XPKhtHmssFW7QnjArSM=\"\n                }, audio: true\n            })\n            this.$refs.local_preview.srcObject = media\n            context.setLocalStream(media)\n\n            context.setMainApp(this)\n\n            let devices = await navigator.mediaDevices.enumerateDevices()\n            console.log(\"devices:\", devices)\n\n            // let remoteStream = new MediaStream();\n            // context.setData(Context.KEY_REMOTE_MEDIA_STREAM, remoteStream);\n            // this.$refs.remote_preview.srcObject = remoteStream;\n        },\n\n        displaySwitch () {\n            if (!this.displayFirst) {\n                this.displayFirst = true\n                this.initDisplayStream()\n            }\n        },\n\n        async initDisplayStream () {\n            this._displayStream = await navigator.mediaDevices.getDisplayMedia()\n            this.$refs.display_preview.srcObject = this._displayStream\n            this._recorder = new MediaRecorder(this._displayStream, { mimeType: \"video/webm;codesc=h264\" })\n        },\n\n        setRemoteStream (receiverSocketId, media) {\n            this._context.setData(receiverSocketId, _context__WEBPACK_IMPORTED_MODULE_2__[\"default\"].KEY_REMOTE_MEDIA_STREAM, media)\n            this.$refs.remote_preview.srcObject = media\n        },\n        getRemoteStream (receiverSocketId) {\n            return this._context.getData(receiverSocketId, _context__WEBPACK_IMPORTED_MODULE_2__[\"default\"].KEY_REMOTE_MEDIA_STREAM)\n        },\n\n        /**\n         * 这个不可行的,子进程需要在server端或者electron之类的app端才能做.\n         * 浏览器端做不了\n         */\n        async pushRTMP () {\n            // const child_process = require('child_process')\n            // let p = child_process.spawn(\"ffmpeg\", [\"-fflags\", \"nobuffer\", \"-i\", \"-\", \"-vcodec\", \"copy\", \"-f\", \"flv\", \"rtmp://localhost:1935/hls/100001\"])\n            // p.stderr.on(\"data\", data => {\n            //     console.log(data.toString())\n            // })\n            // p.stdout.on(\"data\", data => {\n            //     console.log(data.toString())\n            // })\n\n            // // let stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });\n            // let stream = await navigator.mediaDevices.getUserMedia({\n            //     video: {\n            //         deviceId: \"bsZpDzDZXXJZJ4EUkt+XBDv0XPKhtHmssFW7QnjArSM=\"\n            //     }, audio: false\n            // })\n\n            // let mr = new MediaRecorder(stream, { mimetype: \"video/webm; codec=h264\" })\n            // mr.ondataavailable = async function (e) {\n            //     p.stdin.write(NodeBuffer.from(await e.data.arrayBuffer()))\n            // }\n            // mr.start(40)\n\n            // p.once(\"exit\", code => {\n            //     mr.stop()\n            //     window.close()\n            // })\n        }\n    }\n})\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Main);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/controller/main.js?");

/***/ }),

/***/ "./FrontProject/src/events/Events.js":
/*!*******************************************!*\
  !*** ./FrontProject/src/events/Events.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// jquery 的事件\nconst Events = {\n    LIST_CLIENTS: \"listClients\",\n    MSG: \"msg\",\n    RECEIVED_OFFER: \"receivedOffer\",\n    RECEIVED_OFFER_ICE: \"receivedOfferICE\",\n    RECEIVED_ANSWER: \"receivedAnswer\",\n    RECEIVED_ANSWER_ICE: \"receivedAnswerICE\",\n    START_CHAT_SESSION: \"startChatSession\",\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Events);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/events/Events.js?");

/***/ }),

/***/ "./FrontProject/src/events/SocketEvents.js":
/*!*************************************************!*\
  !*** ./FrontProject/src/events/SocketEvents.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// socket io 事件\nconst SocketEvents = {\n    OFFER: \"offer\",\n    ANSWER: \"answer\",\n    OFFER_ICE: \"offerIce\",\n    ANSWER_ICE: \"answerIce\",\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocketEvents);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/events/SocketEvents.js?");

/***/ }),

/***/ "./FrontProject/src/handlers/HandlerReceivedAnswer.js":
/*!************************************************************!*\
  !*** ./FrontProject/src/handlers/HandlerReceivedAnswer.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../context */ \"./FrontProject/src/context.js\");\n\n\n/**\n * \n * @param {*} e \n * @param {Context} context \n * @param {*} data \n */\nasync function HandlerReceivedAnswser (e, context, data) {\n    console.log(\"answer:\", data.answer)\n    /**\n     * @type {RTCPeerConnection}\n     */\n    let offerPc = context.getData(data.sender, _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].KEY_OFFER_PEER_CONNECTION)\n    offerPc.setRemoteDescription(new RTCSessionDescription(data.answer))\n\n    let media = context.getData(data.sender, _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].KEY_REMOTE_MEDIA_STREAM)\n    context.mainApp.setRemoteStream(data.sender, media)\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HandlerReceivedAnswser);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/handlers/HandlerReceivedAnswer.js?");

/***/ }),

/***/ "./FrontProject/src/handlers/HandlerReceivedAnswerICE.js":
/*!***************************************************************!*\
  !*** ./FrontProject/src/handlers/HandlerReceivedAnswerICE.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../context */ \"./FrontProject/src/context.js\");\n\n\n/**\n * \n * @param {*} e \n * @param {Context} context \n * @param {*} data \n */\nasync function HandlerReceivedAnswserICE (e, context, data) {\n    /**\n     * @type {RTCPeerConnection}\n     */\n    let offerPc = context.getData(data.sender, _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].KEY_OFFER_PEER_CONNECTION)\n    await offerPc.addIceCandidate(new RTCIceCandidate(data.ice))\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HandlerReceivedAnswserICE);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/handlers/HandlerReceivedAnswerICE.js?");

/***/ }),

/***/ "./FrontProject/src/handlers/HandlerReceivedOffer.js":
/*!***********************************************************!*\
  !*** ./FrontProject/src/handlers/HandlerReceivedOffer.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _events_SocketEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events/SocketEvents */ \"./FrontProject/src/events/SocketEvents.js\");\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context */ \"./FrontProject/src/context.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ \"./FrontProject/src/config.js\");\n\n\n\n\n/**\n * \n * @param {*} e \n * @param {Context} context \n * @param {*} data // {sender:sender,offer:offer}\n */\nasync function HandlerReceivedOffer (e, context, data) {\n    let answerPc = new RTCPeerConnection(_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].PC_INIT_CONFIG)\n    /**\n     * @type {MediaStream}\n     */\n    let localStream = context.getLocalStream()\n    localStream.getTracks().forEach(t => {\n        answerPc.addTrack(t)\n    })\n    context.setData(data.sender, _context__WEBPACK_IMPORTED_MODULE_1__[\"default\"].KEY_ANSWER_PERR_CONNECTION, answerPc)\n\n    let remoteStream = new MediaStream()\n    context.mainApp.setRemoteStream(data.sender, remoteStream)\n    answerPc.ontrack = e => {\n        remoteStream.addTrack(e.track)\n    }\n\n    answerPc.onicecandidate = e => {\n        if (e.candidate) {\n            context.socketIO.emit(_events_SocketEvents__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ANSWER_ICE, { receiver: data.sender, ice: e.candidate })\n        }\n    }\n\n    answerPc.ondatachannel = e => {\n        let dataChannel = e.channel\n        dataChannel.onmessage = ev => {\n            console.log(ev)\n        }\n        context.setData(data.sender, _context__WEBPACK_IMPORTED_MODULE_1__[\"default\"].KEY_DATA_CHANNEL, dataChannel)\n    }\n\n    await answerPc.setRemoteDescription(new RTCSessionDescription(data.offer))\n    let answer = await answerPc.createAnswer()\n    context.socketIO.emit(_events_SocketEvents__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ANSWER, { answer: answer, receiver: data.sender })\n    await answerPc.setLocalDescription(new RTCSessionDescription(answer))\n\n    context.clientList.targetSocketIDClickHook(data.sender)\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HandlerReceivedOffer);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/handlers/HandlerReceivedOffer.js?");

/***/ }),

/***/ "./FrontProject/src/handlers/HandlerReceivedOfferICE.js":
/*!**************************************************************!*\
  !*** ./FrontProject/src/handlers/HandlerReceivedOfferICE.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../context */ \"./FrontProject/src/context.js\");\n\n\n/**\n * \n * @param {*} e \n * @param {Context} context \n * @param {*} data \n */\nasync function HandlerReceivedOfferICE (e, context, data) {\n    /**\n     * @type {RTCPeerConnection}\n     */\n    let answerPc = context.getData(data.sender, _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].KEY_ANSWER_PERR_CONNECTION)\n    await answerPc.addIceCandidate(new RTCIceCandidate(data.ice))\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HandlerReceivedOfferICE);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/handlers/HandlerReceivedOfferICE.js?");

/***/ }),

/***/ "./FrontProject/src/handlers/HandlerStartChatSession.js":
/*!**************************************************************!*\
  !*** ./FrontProject/src/handlers/HandlerStartChatSession.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _events_SocketEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events/SocketEvents */ \"./FrontProject/src/events/SocketEvents.js\");\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context */ \"./FrontProject/src/context.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ \"./FrontProject/src/config.js\");\n\n\n\n\n/**\n * createOffer逻辑\n * @param {*} e \n * @param {Context} context \n * @param {*} receiverSocketId\n */\nasync function HandlerStartChatSession (e, context, receiverSocketId) {\n    let offerPc = context.getData(receiverSocketId, _context__WEBPACK_IMPORTED_MODULE_1__[\"default\"].KEY_OFFER_PEER_CONNECTION)\n    if (offerPc) {\n        // 原来就创建了offer了,不必重新创建\n        // 但需要换remoteStream的srcObject\n        let remoteStream = context.mainApp.getRemoteStream(receiverSocketId)\n        console.log(\"remoteStream:\", remoteStream)\n        context.mainApp.setRemoteStream(receiverSocketId, remoteStream)\n        return\n    }\n    offerPc = new RTCPeerConnection(_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].PC_INIT_CONFIG)\n    console.log(\"offerPc:\", offerPc)\n    context.setData(receiverSocketId, _context__WEBPACK_IMPORTED_MODULE_1__[\"default\"].KEY_OFFER_PEER_CONNECTION, offerPc)\n\n    offerPc.onicecandidate = e => {\n        if (e.candidate) {\n            context._socketio.emit(_events_SocketEvents__WEBPACK_IMPORTED_MODULE_0__[\"default\"].OFFER_ICE, { receiver: receiverSocketId, ice: e.candidate })\n        }\n    }\n\n    let remoteStream = new MediaStream()\n    context.mainApp.setRemoteStream(receiverSocketId, remoteStream)\n    offerPc.ontrack = e => {\n        remoteStream.addTrack(e.track)\n    }\n\n    /**\n     * @type {MediaStream}\n     */\n    let stream = context.getLocalStream()\n    stream.getTracks().forEach(t => {\n        offerPc.addTrack(t)\n    })\n\n    let dataChannel = offerPc.createDataChannel(\"MessageChannel\")\n    dataChannel.onopen = e => {\n        dataChannel.send(\"Hello RTC\")\n    }\n    context.setData(receiverSocketId, _context__WEBPACK_IMPORTED_MODULE_1__[\"default\"].KEY_DATA_CHANNEL, dataChannel)\n\n    let offer = await offerPc.createOffer()\n    context.socketIO.emit(_events_SocketEvents__WEBPACK_IMPORTED_MODULE_0__[\"default\"].OFFER, { receiver: receiverSocketId, offer: offer })\n\n    await offerPc.setLocalDescription(new RTCSessionDescription(offer))\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HandlerStartChatSession);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/handlers/HandlerStartChatSession.js?");

/***/ }),

/***/ "./FrontProject/src/main.js":
/*!**********************************!*\
  !*** ./FrontProject/src/main.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controller_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller/main */ \"./FrontProject/src/controller/main.js\");\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ \"./FrontProject/src/context.js\");\n\n\n\nlet context = new _context__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\nlet app = new _controller_main__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\nlet root = document.createElement(\"div\")\ndocument.body.appendChild(root)\napp.$mount(root)\napp.setContext(context)\n\n//# sourceURL=webpack://frozen/./FrontProject/src/main.js?");

/***/ }),

/***/ "./FrontProject/src/net/socketio.js":
/*!******************************************!*\
  !*** ./FrontProject/src/net/socketio.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../context */ \"./FrontProject/src/context.js\");\n/* harmony import */ var _events_SocketEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events/SocketEvents */ \"./FrontProject/src/events/SocketEvents.js\");\n/* harmony import */ var _events_Events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events/Events */ \"./FrontProject/src/events/Events.js\");\n\n\n\n\nclass SocketIO {\n    /**\n     * \n     * @param {Context} context \n     */\n    constructor(context) {\n        this._context = context\n        this._socketId = \"\"\n        this._socket = io() // 路径可以做成配置的\n        this._socket.on(\"listClients\", clients => {\n            // todo\n        })\n        this._socket.on(\"msg\", data => {\n            console.log(\"多个io.on,可以触发多次\", data.msg)\n        })\n        this._socket.on(\"connect\", () => {\n            this._socketId = this._socket.id\n        })\n        this._socket.on(_events_SocketEvents__WEBPACK_IMPORTED_MODULE_1__[\"default\"].OFFER, data => {\n            this._context.fire(_events_Events__WEBPACK_IMPORTED_MODULE_2__[\"default\"].RECEIVED_OFFER, data)\n        })\n        this._socket.on(_events_SocketEvents__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ANSWER, data => {\n            this._context.fire(_events_Events__WEBPACK_IMPORTED_MODULE_2__[\"default\"].RECEIVED_ANSWER, data)\n        })\n        this._socket.on(_events_SocketEvents__WEBPACK_IMPORTED_MODULE_1__[\"default\"].OFFER_ICE, data => {\n            this._context.fire(_events_Events__WEBPACK_IMPORTED_MODULE_2__[\"default\"].RECEIVED_OFFER_ICE, data)\n        })\n        this._socket.on(_events_SocketEvents__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ANSWER_ICE, data => {\n            this._context.fire(_events_Events__WEBPACK_IMPORTED_MODULE_2__[\"default\"].RECEIVED_ANSWER_ICE, data)\n        })\n    }\n\n    get socketId () {\n        return this._socketId\n    }\n\n    emit (eventType, data) {\n        data.sender = this._socketId\n        this._socket.emit(eventType, data)\n    }\n\n    sendMsg (msg, targetSocketId) {\n        this._socket.emit(\"msg\", { receiver: targetSocketId, sender: this._socket.id, msg: msg })\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocketIO);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/net/socketio.js?");

/***/ }),

/***/ "./FrontProject/src/component/ClientList.html":
/*!****************************************************!*\
  !*** ./FrontProject/src/component/ClientList.html ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div class=\\\"card\\\" style=\\\"width: 100%;\\\">\\n    <div class=\\\"card-header\\\">\\n        所有人\\n    </div>\\n    <div>\\n        <button @click=\\\"targetSocketIDClicked\\\" :style=\\\"getStyle(c)\\\" class=\\\"btn btn-outline-dark\\\" v-for=\\\"c in clients\\\"\\n            :data-socket_id=\\\"c\\\">{{getSocketIdLabel(c)}}</button>\\n    </div>\\n    <div style=\\\"float: left;\\\">\\n        <textarea style=\\\"width: 100%;\\\" rows=\\\"10\\\" v-model=\\\"ta\\\" readonly></textarea>\\n        <form @submit.prevent=\\\"sendMsg\\\">\\n            <input type=\\\"text\\\" v-model=\\\"msg\\\" required>\\n            <input type=\\\"submit\\\" value=\\\"发送\\\">\\n        </form>\\n    </div>\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/component/ClientList.html?");

/***/ }),

/***/ "./FrontProject/src/views/main.html":
/*!******************************************!*\
  !*** ./FrontProject/src/views/main.html ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div class=\\\"card\\\">\\n    <div class=\\\"card-header\\\">\\n        教师: {{classroomName}}\\n    </div>\\n    <div style=\\\"display: flex; flex-direction:row;\\\">\\n        <!-- <button @click=\\\"videoSwitch\\\">视频开关</button> -->\\n        <!-- <button @click=\\\"displaySwitch\\\">屏幕开关</button> -->\\n        <!-- <video class=\\\"display_preview\\\" style=\\\"display: block; width:840px\\\" autoplay ref=\\\"display_preview\\\"></video> -->\\n        <button @click=\\\"pushRTMP\\\">推流开关(can't)</button>\\n        <video style=\\\"display: block; width:360px\\\" autoplay ref=\\\"local_preview\\\"></video>\\n        <video style=\\\"display: block; width:360px\\\" autoplay ref=\\\"remote_preview\\\"></video>\\n    </div>\\n    <client-list ref=\\\"client_list\\\"></client-list>\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/views/main.html?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./FrontProject/src/main.js");
/******/ 	
/******/ })()
;
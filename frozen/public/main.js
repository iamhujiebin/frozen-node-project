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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../context */ \"./FrontProject/src/context.js\");\n/* harmony import */ var _ClientList_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClientList.html */ \"./FrontProject/src/component/ClientList.html\");\n\n\n\nconst ClientList = Vue.component(\"client-list\", {\n    template: _ClientList_html__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n\n    data() {\n        return {\n            clients: [\"结冰\", \"梦茵\"],\n            currentSocketId: \"\",\n            selectSocketId: \"\",\n            msg: \"\",\n            ta: \"\",\n        };\n    },\n\n    methods: {\n        setClients(clients) {\n            this.clients.length = 0;\n            this.clients.push(...clients);\n        },\n        /**\n         * \n         * @param {Context} context \n         */\n        setContext(context) {\n            this._context = context;\n            this.currentSocketId = context._socketio.socketId;\n            this.addSocketListeners();\n        },\n        sendMsg() {\n            /**\n             * @type {Context}\n             */\n            let context = this._context;\n            context._socketio.sendMsg(this.msg, this.selectSocketId);\n            this.ta += \"我说:\" + this.msg + \"\\n\";\n            this.msg = '';\n        },\n        addSocketListeners() {\n            /**\n             * @type {Context}\n             */\n            let context = this._context;\n            context._socketio._socket.on(\"msg\", msg => {\n                this.ta += \"TA说:\" + msg.msg + \"\\n\";\n            })\n            context._socketio._socket.on(\"listClients\", clients => {\n                this.setClients(clients);\n            })\n        },\n        targetSocketIDClicked(e) {\n            this.selectSocketId = $(e.target).data(\"socket_id\");\n            console.log(\"targetSocketIDClicked:\", this.selectSocketId)\n        },\n        getSocketIdLabel(socketId) {\n            if (!this._context) {\n                return\n            }\n            if (socketId != this._context._socketio.socketId) {\n                return socketId\n            } else {\n                return socketId + \"[自己]\";\n            }\n        }\n    }\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClientList);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/component/ClientList.js?");

/***/ }),

/***/ "./FrontProject/src/context.js":
/*!*************************************!*\
  !*** ./FrontProject/src/context.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _net_socketio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./net/socketio */ \"./FrontProject/src/net/socketio.js\");\n\n\nclass Context {\n    constructor() {\n        this._jqThis = $(this);\n        this._shareData = new Map();\n        this._socketio = new _net_socketio__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\n    }\n\n    addListeners() {\n        let jqThis = $(this);\n\n        jqThis.on(\"test\", (e, context, data) => {\n            console.log(\"jq on test \", data)\n        })\n    }\n\n    setData(k, v) {\n        this._shareData.set(k, v);\n    }\n\n    getData(k) {\n        return this._shareData.get(k);\n    }\n\n    fire(type, data) {\n        console.log(\"Fire event:\" + type);\n        this._jqThis.trigger(type, [this, data]);\n    }\n\n    get socketIO() {\n        return this._socketio;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Context);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/context.js?");

/***/ }),

/***/ "./FrontProject/src/controller/main.js":
/*!*********************************************!*\
  !*** ./FrontProject/src/controller/main.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _views_main_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/main.html */ \"./FrontProject/src/views/main.html\");\n/* harmony import */ var _component_ClientList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component/ClientList */ \"./FrontProject/src/component/ClientList.js\");\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context */ \"./FrontProject/src/context.js\");\n\n\n\n\nconst Main = Vue.component(\"main\", {\n    template: _views_main_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    data() {\n        return {\n            classroomName: \"Frozen\",\n            remoteFirst: false,\n            displayFirst: false,\n        }\n    },\n\n    mounted() {\n        // this.initRemoteStream();\n        // this.initDisplayStream();\n    },\n\n    methods: {\n        /**\n         * \n         * @param {Context} context \n         */\n        setContext(context) {\n            this._context = context;\n            this.$refs.client_list.setContext(context);\n        },\n\n        videoSwitch() {\n            if (!this.remoteFirst) {\n                this.remoteFirst = true\n                this.initRemoteStream();\n            }\n        },\n\n        displaySwitch() {\n            if (!this.displayFirst) {\n                this.displayFirst = true\n                this.initDisplayStream();\n            }\n        },\n\n        async initRemoteStream() {\n            // this._remoteStream = new MediaStream();\n            this._remoteStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });\n            this.$refs.remote_preview.srcObject = this._remoteStream;\n        },\n        async initDisplayStream() {\n            this._displayStream = await navigator.mediaDevices.getDisplayMedia();\n            this.$refs.display_preview.srcObject = this._displayStream;\n            this._recorder = new MediaRecorder(this._displayStream, { mimeType: \"video/webm;codesc=h264\" });\n        },\n    }\n})\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Main);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/controller/main.js?");

/***/ }),

/***/ "./FrontProject/src/main.js":
/*!**********************************!*\
  !*** ./FrontProject/src/main.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controller_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller/main */ \"./FrontProject/src/controller/main.js\");\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ \"./FrontProject/src/context.js\");\n\n\n\nlet context = new _context__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nlet app = new _controller_main__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nlet root = document.createElement(\"div\");\ndocument.body.appendChild(root);\napp.$mount(root);\napp.setContext(context);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/main.js?");

/***/ }),

/***/ "./FrontProject/src/net/socketio.js":
/*!******************************************!*\
  !*** ./FrontProject/src/net/socketio.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../context */ \"./FrontProject/src/context.js\");\n\n\nclass SocketIO {\n    /**\n     * \n     * @param {Context} context \n     */\n    constructor(context) {\n        this._context = context;\n        this._socketId = \"\";\n        this._socket = io(); // 路径可以做成配置的\n        this._socket.on(\"listClients\", clients => {\n            // todo\n        });\n        this._socket.on(\"msg\", data => {\n            console.log(\"多个io.on,可以触发多次\", data.msg)\n        });\n        this._socket.on(\"connect\", () => {\n            this._socketId = this._socket.id;\n        });\n    }\n\n    get socketId() {\n        return this._socketId;\n    }\n\n    sendMsg(msg, targetSocketId) {\n        this._socket.emit(\"msg\", { receiver: targetSocketId, sender: this._socket.id, msg: msg })\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocketIO);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/net/socketio.js?");

/***/ }),

/***/ "./FrontProject/src/component/ClientList.html":
/*!****************************************************!*\
  !*** ./FrontProject/src/component/ClientList.html ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div class=\\\"card\\\" style=\\\"width: 100%;\\\">\\n    <div class=\\\"card-header\\\">\\n        所有人\\n    </div>\\n    <!-- <div v-for=\\\"c in clients\\\" style=\\\"float: left;\\\"> -->\\n    <!-- {{c}} -->\\n    <!-- </div> -->\\n    <div>\\n        <button @click=\\\"targetSocketIDClicked\\\" class=\\\"btn btn-outline-dark btn-sm\\\" v-for=\\\"c in clients\\\"\\n            :data-socket_id=\\\"c\\\">{{getSocketIdLabel(c)}}</button>\\n    </div>\\n    <div style=\\\"float: left;\\\">\\n        <textarea style=\\\"width: 100%;\\\" rows=\\\"10\\\" v-model=\\\"ta\\\"></textarea>\\n        <form @submit.prevent=\\\"sendMsg\\\">\\n            <input type=\\\"text\\\" v-model=\\\"msg\\\" required>\\n            <input type=\\\"submit\\\" value=\\\"发送\\\">\\n        </form>\\n    </div>\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/component/ClientList.html?");

/***/ }),

/***/ "./FrontProject/src/views/main.html":
/*!******************************************!*\
  !*** ./FrontProject/src/views/main.html ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div class=\\\"card\\\">\\n    <div class=\\\"card-header\\\">\\n        教师: {{classroomName}}\\n    </div>\\n    <div style=\\\"display: flex; flex-direction:row;\\\">\\n        <button @click=\\\"videoSwitch\\\">视频开关</button>\\n        <button @click=\\\"displaySwitch\\\">屏幕开关</button>\\n        <video class=\\\"display_preview\\\" style=\\\"display: block; width:840px\\\" autoplay ref=\\\"display_preview\\\"></video>\\n        <video style=\\\"display: block; width:360px\\\" autoplay ref=\\\"remote_preview\\\"></video>\\n    </div>\\n    <client-list ref=\\\"client_list\\\"></client-list>\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/views/main.html?");

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
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

/***/ "./FrontProject/src/component/ChatList.js":
/*!************************************************!*\
  !*** ./FrontProject/src/component/ChatList.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ChatList_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChatList.html */ \"./FrontProject/src/component/ChatList.html\");\n\n\nconst ChatList = Vue.component(\"chat-list\", {\n    template: _ChatList_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    data() {\n        return {\n            todo: \"\",\n        }\n    },\n})\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatList);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/component/ChatList.js?");

/***/ }),

/***/ "./FrontProject/src/component/ClientList.js":
/*!**************************************************!*\
  !*** ./FrontProject/src/component/ClientList.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ClientList_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClientList.html */ \"./FrontProject/src/component/ClientList.html\");\n\n\nconst ClientList = Vue.component(\"client-list\", {\n    template: _ClientList_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n\n    data() {\n        return {\n            clients: [\"结冰\", \"梦茵\"],\n        };\n    },\n\n    methods: {\n        setClients(clients) {\n            this.clients.length = 0;\n            this.clients.push(...clients);\n        }\n    }\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClientList);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/component/ClientList.js?");

/***/ }),

/***/ "./FrontProject/src/controller/main.js":
/*!*********************************************!*\
  !*** ./FrontProject/src/controller/main.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _views_main_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/main.html */ \"./FrontProject/src/views/main.html\");\n/* harmony import */ var _component_ClientList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component/ClientList */ \"./FrontProject/src/component/ClientList.js\");\n/* harmony import */ var _component_ChatList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component/ChatList */ \"./FrontProject/src/component/ChatList.js\");\n\n\n\n\nconst Main = Vue.component(\"main\", {\n    template: _views_main_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    data() {\n        return {\n            classroomName: \"Frozen\"\n        }\n    },\n\n    mounted() {\n        this._socket = io();\n        this._remoteStream = new MediaStream();\n        this.$refs.remote_preview.srcObject = this._remoteStream;\n        this.addSocketListeners();\n    },\n\n    methods: {\n        addSocketListeners() {\n            this._socket.on(\"msg\", e => {\n                console.log(e)\n            })\n        }\n    }\n})\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Main);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/controller/main.js?");

/***/ }),

/***/ "./FrontProject/src/main.js":
/*!**********************************!*\
  !*** ./FrontProject/src/main.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controller_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller/main */ \"./FrontProject/src/controller/main.js\");\n\n\nlet app = new _controller_main__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nlet root = document.createElement(\"div\");\ndocument.body.appendChild(root);\napp.$mount(root);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/main.js?");

/***/ }),

/***/ "./FrontProject/src/component/ChatList.html":
/*!**************************************************!*\
  !*** ./FrontProject/src/component/ChatList.html ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div>\\n    <div>\\n        <textarea style=\\\"width: 100%;\\\" rows=\\\"10\\\"></textarea>\\n    </div>\\n    <form>\\n        <input type=\\\"text\\\" name=\\\"input\\\" required>\\n        <input type=\\\"submit\\\" value=\\\"发送\\\">\\n    </form>\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/component/ChatList.html?");

/***/ }),

/***/ "./FrontProject/src/component/ClientList.html":
/*!****************************************************!*\
  !*** ./FrontProject/src/component/ClientList.html ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div class=\\\"card\\\" style=\\\"width: 200px;\\\">\\n    <div class=\\\"card-header\\\">\\n        所有人\\n    </div>\\n    <div v-for=\\\"c in clients\\\">\\n        {{c}}\\n    </div>\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/component/ClientList.html?");

/***/ }),

/***/ "./FrontProject/src/views/main.html":
/*!******************************************!*\
  !*** ./FrontProject/src/views/main.html ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div class=\\\"card\\\">\\n    <div class=\\\"card-header\\\">\\n        教师: {{classroomName}}\\n    </div>\\n    <div style=\\\"display: flex; flex-direction:row;\\\">\\n        <client-list ref=\\\"client_list\\\"></client-list>\\n        <video style=\\\"display: block; width:480px;height:320px\\\" autoplay ref=\\\"remote_preview\\\"></video>\\n    </div>\\n    <chat-list ref=\\\"chat-list\\\"></chat-list>\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://frozen/./FrontProject/src/views/main.html?");

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
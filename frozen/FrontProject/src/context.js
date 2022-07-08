import SocketIO from "./net/socketio";

class Context {
    constructor() {
        this._jqThis = $(this);
        this._shareData = new Map();
        this._socketio = new SocketIO(this);
    }

    addListeners() {
        let jqThis = $(this);

        jqThis.on("test", (e, context, data) => {
            console.log("jq on test ", data)
        })
    }

    setData(k, v) {
        this._shareData.set(k, v);
    }

    getData(k) {
        return this._shareData.get(k);
    }

    fire(type, data) {
        console.log("Fire event:" + type);
        this._jqThis.trigger(type, [this, data]);
    }

    get socketIO() {
        return this._socketio;
    }
}

export default Context;
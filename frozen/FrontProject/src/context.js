import SocketIO from "./net/socketio";
import Events from "./events/Events"
import Main from "./controller/main";
import HandlerReceivedOffer from "./handlers/HandlerReceivedOffer";
import HandlerStartChatSession from "./handlers/HandlerStartChatSession"
import HandlerReceivedAnswer from "./handlers/HandlerReceivedAnswer"
import HandlerReceivedAnswserICE from "./handlers/HandlerReceivedAnswerICE";
import HandlerReceivedOfferICE from "./handlers/HandlerReceivedOfferICE";

class Context {
    constructor() {
        this._jqThis = $(this);
        this._shareData = new Map();
        this._socketio = new SocketIO(this);

        this.addListeners();
    }

    addListeners() {
        let jqThis = $(this);

        jqThis.on(Events.START_CHAT_SESSION, HandlerStartChatSession)
        jqThis.on(Events.RECEIVED_OFFER, HandlerReceivedOffer)
        jqThis.on(Events.RECEIVED_ANSWER, HandlerReceivedAnswer)
        jqThis.on(Events.RECEIVED_OFFER_ICE, HandlerReceivedOfferICE)
        jqThis.on(Events.RECEIVED_ANSWER_ICE, HandlerReceivedAnswserICE)
    }

    setData(receiverSocketId, k, v) {
        let data = this._shareData.get(receiverSocketId)
        if (!data) {
            data = new Map()
        }
        data.set(k, v);
        this._shareData.set(receiverSocketId, data)
    }

    getData(receiverSocketId, k) {
        let data = this._shareData.get(receiverSocketId)
        if (!data) {
            data = new Map()
            this._shareData.set(k, data)
        }
        return data.get(k);
    }

    setLocalStream(stream) {
        this._localStream = stream;
    }

    getLocalStream() {
        return this._localStream;
    }

    fire(type, data) {
        this._jqThis.trigger(type, [this, data]);
    }

    get socketIO() {
        return this._socketio;
    }

    setClientList(client) {
        this._clientList = client
    }

    get clientList() {
        return this._clientList;
    }

    setMainApp(mainApp) {
        this._mainApp = mainApp;
    }

    get mainApp() {
        return this._mainApp;
    }
}

Context.KEY_OFFER_PEER_CONNECTION = "offerPc"
Context.KEY_ANSWER_PERR_CONNECTION = "answerPc"
Context.KEY_DATA_CHANNEL = "dataChannel"
Context.KEY_LOCAL_MEDIA_STREAM = "localMediaStream"
Context.KEY_REMOTE_MEDIA_STREAM = "remoteMediaStream"

export default Context;
import SocketEvents from "../events/SocketEvents"
import Context from "../context"
import Config from "../config"

/**
 * createOffer逻辑
 * @param {*} e 
 * @param {Context} context 
 * @param {*} data recevierSocketId
 */
async function HandlerStartChatSession(e, context, data) {
    let offerPc = new RTCPeerConnection(Config.PC_INIT_CONFIG)
    console.log("offerPc:", offerPc)
    context.setData(Context.KEY_OFFER_PEER_CONNECTION, offerPc)

    offerPc.onicecandidate = e => {
        if (e.candidate) {
            context._socketio.emit(SocketEvents.OFFER_ICE, { receiver: data, ice: e.candidate })
        }
    }

    /**
     * @type {MediaStream}
     */
    let remoteStream = context.getData(Context.KEY_REMOTE_MEDIA_STREAM);
    offerPc.ontrack = e => {
        remoteStream.addTrack(e.track)
    }

    /**
     * @type {MediaStream}
     */
    let stream = context.getData(Context.KEY_LOCAL_MEDIA_STREAM)
    stream.getTracks().forEach(t => {
        offerPc.addTrack(t)
    })

    let dataChannel = offerPc.createDataChannel("MessageChannel")
    dataChannel.onopen = e => {
        dataChannel.send("Hello RTC")
    }
    context.setData(Context.KEY_DATA_CHANNEL, dataChannel)

    let offer = await offerPc.createOffer();
    context.socketIO.emit(SocketEvents.OFFER, { receiver: data, offer: offer })

    await offerPc.setLocalDescription(new RTCSessionDescription(offer))
}

export default HandlerStartChatSession;
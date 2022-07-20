import SocketEvents from "../events/SocketEvents"
import Context from "../context"
import Config from "../config"

/**
 * createOffer逻辑
 * @param {*} e 
 * @param {Context} context 
 * @param {*} receiverSocketId
 */
async function HandlerStartChatSession (e, context, receiverSocketId) {
    let offerPc = context.getData(receiverSocketId, Context.KEY_OFFER_PEER_CONNECTION)
    if (offerPc) {
        // 原来就创建了offer了,不必重新创建
        // 但需要换remoteStream的srcObject
        let remoteStream = context.mainApp.getRemoteStream(receiverSocketId)
        console.log("remoteStream:", remoteStream)
        context.mainApp.setRemoteStream(receiverSocketId, remoteStream)
        return
    }
    offerPc = new RTCPeerConnection(Config.PC_INIT_CONFIG)
    console.log("offerPc:", offerPc)
    context.setData(receiverSocketId, Context.KEY_OFFER_PEER_CONNECTION, offerPc)

    offerPc.onicecandidate = e => {
        if (e.candidate) {
            context._socketio.emit(SocketEvents.OFFER_ICE, { receiver: receiverSocketId, ice: e.candidate })
        }
    }

    let remoteStream = new MediaStream()
    context.mainApp.setRemoteStream(receiverSocketId, remoteStream)
    offerPc.ontrack = e => {
        remoteStream.addTrack(e.track)
    }

    /**
     * @type {MediaStream}
     */
    let stream = context.getLocalStream()
    stream.getTracks().forEach(t => {
        offerPc.addTrack(t)
    })

    let dataChannel = offerPc.createDataChannel("MessageChannel")
    dataChannel.onopen = e => {
        dataChannel.send("Hello RTC")
    }
    context.setData(receiverSocketId, Context.KEY_DATA_CHANNEL, dataChannel)

    let offer = await offerPc.createOffer()
    context.socketIO.emit(SocketEvents.OFFER, { receiver: receiverSocketId, offer: offer })

    await offerPc.setLocalDescription(new RTCSessionDescription(offer))
}

export default HandlerStartChatSession
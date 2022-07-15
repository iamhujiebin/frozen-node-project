import Context from "../context";

/**
 * 
 * @param {*} e 
 * @param {Context} context 
 * @param {*} data 
 */
async function HandlerReceivedAnswser(e, context, data) {
    console.log("answer:", data.answer)
    /**
     * @type {RTCPeerConnection}
     */
    let offerPc = context.getData(data.sender, Context.KEY_OFFER_PEER_CONNECTION)
    offerPc.setRemoteDescription(new RTCSessionDescription(data.answer))

    let media = context.getData(data.sender, Context.KEY_REMOTE_MEDIA_STREAM)
    context.mainApp.setRemoteStream(data.sender, media)
}

export default HandlerReceivedAnswser;
import Context from "../context";

/**
 * 
 * @param {*} e 
 * @param {Context} context 
 * @param {*} data 
 */
async function HandlerReceivedAnswser(e, context, data) {
    /**
     * @type {RTCPeerConnection}
     */
    let offerPc = context.getData(Context.KEY_OFFER_PEER_CONNECTION)
    offerPc.setRemoteDescription(new RTCSessionDescription(data.answer))
}

export default HandlerReceivedAnswser;
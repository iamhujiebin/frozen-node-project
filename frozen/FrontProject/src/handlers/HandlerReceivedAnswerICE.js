import Context from "../context";

/**
 * 
 * @param {*} e 
 * @param {Context} context 
 * @param {*} data 
 */
async function HandlerReceivedAnswserICE(e, context, data) {
    /**
     * @type {RTCPeerConnection}
     */
    let offerPc = context.getData(Context.KEY_OFFER_PEER_CONNECTION)
    await offerPc.addIceCandidate(new RTCIceCandidate(data.ice))
}

export default HandlerReceivedAnswserICE;
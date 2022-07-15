import Context from "../context";

/**
 * 
 * @param {*} e 
 * @param {Context} context 
 * @param {*} data 
 */
async function HandlerReceivedOfferICE(e, context, data) {
    /**
     * @type {RTCPeerConnection}
     */
    let answerPc = context.getData(data.sender, Context.KEY_ANSWER_PERR_CONNECTION)
    await answerPc.addIceCandidate(new RTCIceCandidate(data.ice))
}

export default HandlerReceivedOfferICE
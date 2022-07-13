import SocketEvents from "../events/SocketEvents";
import Context from "../context";
import Config from "../config";

/**
 * 
 * @param {*} e 
 * @param {Context} context 
 * @param {*} data // {sender:sender,offer:offer}
 */
async function HandlerReceivedOffer(e, context, data) {
    let answerPc = new RTCPeerConnection(Config.PC_INIT_CONFIG)
    /**
     * @type {MediaStream}
     */
    let localStream = context.getData(Context.KEY_LOCAL_MEDIA_STREAM);
    localStream.getTracks().forEach(t => {
        answerPc.addTrack(t)
    })
    context.setData(Context.KEY_ANSWER_PERR_CONNECTION, answerPc)

    /**
     * @type {MediaStream}
     */
    let remoteStream = context.getData(Context.KEY_REMOTE_MEDIA_STREAM)
    answerPc.ontrack = e => {
        remoteStream.addTrack(e.track)
    }

    answerPc.onicecandidate = e => {
        if (e.candidate) {
            context.socketIO.emit(SocketEvents.ANSWER_ICE, { receiver: data.sender, ice: e.candidate })
        }
    }

    answerPc.ondatachannel = e => {
        let dataChannel = e.channel
        dataChannel.onmessage = ev => {
            console.log(ev)
        }
        context.setData(Context.KEY_DATA_CHANNEL, dataChannel)
    }

    await answerPc.setRemoteDescription(new RTCSessionDescription(data.offer))
    let answer = await answerPc.createAnswer()
    context.socketIO.emit(SocketEvents.ANSWER, { answer: answer, receiver: data.sender })
    await answerPc.setLocalDescription(new RTCSessionDescription(answer))
}

export default HandlerReceivedOffer
import Tpl from "./ChatList.html"

const ChatList = Vue.component("chat-list", {
    template: Tpl,
    data() {
        return {
            todo: "",
        }
    }
})

export default ChatList;
const { http } = require("@/utils")
const { makeAutoObservable } = require("mobx")

class ChannelStore {
  channels = []
  constructor() {
    makeAutoObservable(this)
  }
  getChannels = async () => {
    const res = await http.get('/channels')
    this.channels = res.data.channels
  }
}

export default ChannelStore
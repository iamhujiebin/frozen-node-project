import React from "react"
import "./App.css"
import avatar from './images/avatar.png'
import { v4 as uuid } from 'uuid'

/**
 * 
 * @param {Date} time 
 */
function getTime (time) {
  return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
}

class App extends React.Component {
  state = {
    tabs: [
      { id: 1, name: '热度', type: 'hot' },
      { id: 2, name: '时间', type: 'time' }
    ],
    active: 'time',
    list: [
      {
        id: 1,
        author: '刘德华',
        comment: '给我一杯忘情水',
        time: new Date('2021-10-10 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1
      },
      {
        id: 2,
        author: '周杰伦',
        comment: '哎哟，不错哦',
        time: new Date('2021-10-11 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0
      },
      {
        id: 3,
        author: '五月天',
        comment: '不打扰，是我的温柔',
        time: new Date('2021-10-11 10:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1
      }
    ],
    message: "受控组件消息",
  }

  onTagChange = type => {
    this.setState({
      active: type,
    })
  }
  messageChangeHandler = (e) => {
    this.setState({ message: e.target.value })
  }
  onPublishCommend = () => {
    this.setState({
      list: [...this.state.list, { id: uuid(), author: '杰彬', comment: this.state.message, time: new Date(), attitude: 0 }]
    })
  }
  delMessage = (id) => {
    this.setState({
      list: this.state.list.filter(items => items.id !== id)
    })
  }
  toggerLike = (id) => {
    let targetItem = this.state.list.filter(item => item.id === id)
    if (targetItem.length <= 0) {
      return
    }
    if (targetItem[0].attitude !== 1) {
      targetItem[0].attitude = 1
    } else {
      targetItem[0].attitude = 0
    }
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === id) {
          return targetItem[0]
        }
        return item
      })
    })
  }
  toggerUnLike = (id) => {
    let targetItem = this.state.list.filter(item => item.id === id)
    if (targetItem.length <= 0) {
      return
    }
    if (targetItem[0].attitude !== -1) {
      targetItem[0].attitude = -1
    } else {
      targetItem[0].attitude = 0
    }
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === id) {
          return targetItem[0]
        }
        return item
      })
    })
  }
  render () {
    return (
      <div className="App">
        <div className="comment-container">
          {/* 评论数 */}
          <div className="comment-head">
            <span>5 评论</span>
          </div>
          {/* 排序 */}
          <div className="tabs-order">
            <ul className="sort-container">
              {this.state.tabs.map(items => (
                <li key={items.id} onClick={() => this.onTagChange(items.type)} className={items.type === this.state.active ? 'on' : ''}>{items.name}</li>
              ))}
            </ul>
          </div>

          {/* 添加评论 */}
          <div className="comment-send">
            <div className="user-face">
              <img className="user-head" src={avatar} alt="" />
            </div>
            <div className="textarea-container">
              <textarea
                cols="80"
                rows="5"
                placeholder="发条友善的评论"
                className="ipt-txt"
                onChange={this.messageChangeHandler}
              />
              <button className="comment-submit" onClick={this.onPublishCommend}>发表评论</button>
            </div>
            <div className="comment-emoji">
              <i className="face"></i>
              <span className="text">表情</span>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="comment-list">
            {this.state.list.map(items => (
              <div key={items.id} className="list-item">
                <div className="user-face">
                  <img className="user-head" src={avatar} alt="" />
                </div>
                <div className="comment">
                  <div className="user">{items.author}</div>
                  <p className="text">{items.comment}</p>
                  <div className="info">
                    <span className="time">{getTime(items.time)}</span>
                    <span className={items.attitude === 1 ? "like liked" : 'like'}>
                      <i onClick={() => this.toggerLike(items.id)} className="icon" />
                    </span>
                    <span className={items.attitude === -1 ? "hate hated" : 'hate'}>
                      <i onClick={() => this.toggerUnLike(items.id)} className="icon" />
                    </span>
                    <span className="reply btn-hover" onClick={() => this.delMessage(items.id)}>删除</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default App

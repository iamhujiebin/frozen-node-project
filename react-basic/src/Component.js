import React from "react"
import PropTypes from 'prop-types'

// function ListItem (props) {
// const { name, price, info, id, delHandler } = props
function ListItem ({ name, price, info, id, delHandler, defaultValue = '杰彬❤️梦茵' }) { // 简写接收props
  return (
    <div>
      <h3>{name}</h3>
      <p>{price}</p>
      <p>{info}</p>
      <p>{defaultValue}</p>
      <button onClick={() => delHandler(id)}>删除</button>
    </div>
  )
}

// 箭头函数做组件
const List = props => {
  const list = props.list
  const lis = list.map((item, index) => <li key={index}>{item.name}</li>)
  return <ul>{lis}</ul>
}

List.propTypes = {
  list: PropTypes.array.isRequired
}

class App extends React.Component {
  state = {
    list: [
      { id: 1, name: '超级好吃的棒棒糖', price: 18.8, info: '开业大酬宾，全场8折' },
      { id: 2, name: '超级好吃的大鸡腿', price: 34.2, info: '开业大酬宾，全场8折' },
      { id: 3, name: '超级无敌的冰激凌', price: 14.2, info: '开业大酬宾，全场8折' }
    ],
    test: 0
  }
  delHandler = (id) => {
    this.setState({
      list: this.state.list.filter(item => item.id !== id)
    })
  }
  render () {
    return (
      <>
        {
          this.state.list.map(item =>
            <ListItem
              key={item.id}
              {...item}
              delHandler={this.delHandler}
            />
          )
        }
        {/* 不能用this.state.test作为入参 */}
        <List list={this.state.list} />
      </>
    )
  }
}

export default App
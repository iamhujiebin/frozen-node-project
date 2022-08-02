import { makeAutoObservable } from "mobx"

class TodoStore {
  list = [
    {
      id: 1,
      htmlId: "todo-1",
      name: '学习react',
      isDone: false,
    },
    {
      id: 2,
      htmlId: "todo-2",
      name: '搞掂mobx',
      isDone: false,
    }
  ]
  constructor() {
    // 监听这个类的属性变化
    makeAutoObservable(this)
  }
  singleCheck = (id, checked) => {
    let item = this.list.find(item => item.id === id)
    item.isDone = checked
  }
  allCheck = (checked) => {
    this.list.forEach(item => item.isDone = checked)
  }
  delTodo = (id) => {
    this.list = this.list.filter(item => item.id !== id)
  }
  addTodo = (newTodo) => {
    this.list.push(newTodo)
  }
  get isFinished () {
    return this.list.filter(item => item.isDone).length
  }
  get isAll () {
    return this.list.every(item => item.isDone)
  }
}

export default TodoStore
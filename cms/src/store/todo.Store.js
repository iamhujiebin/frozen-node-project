import {makeAutoObservable} from "mobx"
import {http} from "@/utils"

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

    getMyTodo = async () => {
        const res = await http.get("/todolist")
        this.list = res.data ? res.data : []
    }
    singleCheck = (id, checked) => {
        const param = {
            "isDone": checked,
        }
        http.put("/todolist/" + id, param).then(r => {
            let item = this.list.find(item => item.id === id)
            item.isDone = checked
        }).catch(e => alert("fail"))
    }
    allCheck = (checked) => {
        http.post("/todolist/markAll", {"isDone": checked}).then(r => {
            this.list.forEach(item => item.isDone = checked)
        }).catch(e => alert("fail"))
    }
    delTodo = (id) => {
        http.delete("/todolist/" + id).then(r => {
            this.list = this.list.filter(item => item.id !== id)
        }).catch(e => alert("fail"))
    }
    addTodo = (newTodo) => {
        const param = {
            "name": newTodo.name
        }
        http.post("/todolist", param).then(r => {
            newTodo.id = r.data
            this.list = [newTodo, ...this.list]
        }).catch(e => alert("fail"))
    }

    get isFinished() {
        return this.list.filter(item => item.isDone).length
    }

    get isAll() {
        return this.list.every(item => item.isDone)
    }
}

export default TodoStore
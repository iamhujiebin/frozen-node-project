import './index.scss'
import {observer} from 'mobx-react-lite'
import {useStore} from '@/store'
import {useState, useEffect} from 'react'
import uuid from 'react-uuid'

function Todo() {
    const {todoStore} = useStore()
    useEffect(() => {
        todoStore.getMyTodo().then(r => {
            console.log(process.env)
        })
    }, [todoStore])
    const singleCheck = (id, e) => {
        todoStore.singleCheck(id, e.target.checked)
    }
    const delTodo = (id) => {
        todoStore.delTodo(id)
    }
    const allCheck = (e) => {
        todoStore.allCheck(e.target.checked)
    }
    const [todoValue, setTodoValue] = useState('')
    const addTodo = (e) => {
        if (!todoValue) {
            return
        }
        if (e.keyCode === 13) { // enter键
            const id = uuid()
            todoStore.addTodo({
                id: id,
                name: todoValue,
                isDone: false,
            })
            setTodoValue('')
        }
    }

    return (
        <section className='todoapp'>
            <header className='header'>
                <h1>todos</h1>
                <input
                    className='new-todo'
                    autoFocus
                    autoComplete='off'
                    placeholder='What needs to be done?'
                    value={todoValue}
                    onChange={(e) => setTodoValue(e.target.value)}
                    onKeyUp={addTodo}
                />
            </header>
            <section className='main'>
                <input
                    id='toggle-all'
                    className='toggle-all'
                    type='checkbox'
                    checked={todoStore.isAll}
                    onChange={allCheck}
                />
                {/* lable标签的for元素(react中htmlFor)，于某id=$for的元素对应。点击label中的文字会触发将“焦点”转到和标签相关的表单控件上 */}
                <label htmlFor='toggle-all'></label>
                <ul className='todo-list'>
                    {todoStore.list.map(item => (
                        <li className={item.isDone ? 'todo completed' : 'todo'} key={item.id}>
                            <div className='view'>
                                <input
                                    id={item.htmlId}
                                    className='toggle'
                                    type='checkbox'
                                    checked={item.isDone}
                                    onChange={(e) => singleCheck(item.id, e)}
                                />
                                <label htmlFor={item.htmlId}>{item.name}</label>
                                <button className='destroy' onClick={() => delTodo(item.id)}></button>
                            </div>
                        </li>
                    ))}

                    {/* <li className='todo completed'>
            <div className='view'>
              <input className='toggle' type='checkbox' defaultChecked={true} />
              <label> learn mobx</label>
              <button className='destroy'></button>
            </div>
          </li> */}
                </ul>
            </section>
            <footer className='footer'>
        <span className='todo-count'>
          任务总数: {todoStore.list.length} 已完成: {todoStore.isFinished}
        </span>
            </footer>
        </section>
    )
}

export default observer(Todo)
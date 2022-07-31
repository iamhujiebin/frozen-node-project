import React from 'react'
import ReactDOM from 'react-dom/client'
import Context from './Context'
// import App from './App'
// import App from './Component'
// import App from './Antd'
import App from './Hook'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode> {/*严格模式会导致本地调试，useEffet []调用两次*/}
    <Context.Provider value={'这里是Context的跨组件传递'}>
      <App />
    </Context.Provider>
  </React.StrictMode>
)

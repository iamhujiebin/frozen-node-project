import React from 'react'
import ReactDOM from 'react-dom/client'
import Context from './Context'
// import App from './App'
// import App from './Component'
// import App from './Antd'
import App from './Hook'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Context.Provider value={'这里是Context的跨组件传递'}>
      <App />
    </Context.Provider>
  </React.StrictMode>
)

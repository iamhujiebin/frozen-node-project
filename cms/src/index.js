import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/reset.css' // antd.min.css没有locale包
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    // <React.StrictMode>
    <App/>
    // </React.StrictMode>
)
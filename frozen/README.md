# 多人音视频聊天室

- 聊天室
- 连麦
- 指定多人连麦

# 连麦技术栈

- express: 服务器框架
  - nodejs 启动服务器,serve public 目录
  - 启动 socket.io 服务
- socket.io: 全双工通信，信令服务器
  - 前端: 依赖 jquery 包装 socket.io 的 emit 动作
  - 后端: nodejs 启动 socket.io 服务器
- vue2.0: 前端页面
- jquery: 前端逻辑
- webpack: 前端打包工具
- `webrtc`: p2p 的连麦技术
  - socket.io:做信令服务器
  - stun:google 的打洞服务器
  - mdn:标准音视频协议

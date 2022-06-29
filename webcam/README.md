1. npm init 
2. npm config set registry https://registry.npm.taobao.org
3. npm config get
4. npm install express
5. npm install socket.io
6. 生成私钥：
   openssl genrsa -out privkey.key 2048
   生成证书命令：
   openssl req -new -x509 -key privkey.key -out cacert.pem -days 1095
   common Name 需要输入你的域名(IP)：
7. Code: frozen-node-project
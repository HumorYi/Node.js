单点登录

cd passport
node app.js

cd ../system
PORT=8081 SERVER_NAME=a node app.js
PORT=8082 SERVER_NAME=b node app.js

#user test
#password 123456
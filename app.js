const Koa = require('koa');
const static = require('koa-static');
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('koa-bodyparser');
const router = require('./router/router')
const app = new Koa();

// 静态资源目录对于相对入口文件app.js的路径
const staticPath = './static'
// 访问路径为 http://localhost:3000/common.css    省略 static  
app.use(static(
  path.join( __dirname,  staticPath)   
))

// __filename：指向当前运行的脚本文件名。
// __dirname：指向当前运行的脚本所在的目录。

// parse request body:
app.use(bodyParser());  //bodypaser要在router之前加载才能生效。

router(app)

var db = mongoose.connect("mongodb://127.0.0.1:27017/wsinghai");
mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
mongoose.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});

app.listen(3000);
console.log('app started at port 3000...');


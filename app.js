const Koa = require('koa');
const fs = require('fs');
const static = require('koa-static');
const path = require('path');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const mongoose = require("mongoose");
const app = new Koa();

// 静态资源目录对于相对入口文件app.js的路径
const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))


// parse request body:
app.use(bodyParser());  //bodypaser要在router之前加载才能生效。

// add router middleware:
app.use(router.routes());


var db = mongoose.connect("mongodb://127.0.0.1:27017/wsinghai");
mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
mongoose.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

router.get('/index', async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/index.html');
})

// add url-route:
// ****************************  列表  **********************************//
router.get('/list', async (ctx, next) => {
    await TestModel.find({}, function (error, docs) {
        if(error){
            console.log("error :" + error);
        }else{
            ctx.response.body = docs
        }
    });
})

// ****************************  搜索  **********************************//
router.get('/search', async (ctx, next) => {
    name = ctx.query.name || '',
    await TestModel.find({"name": name}, function (error, data) {
        if(error) {
            console.log(error);
        } else {
            ctx.response.body = data;
        }
    })
})

// ****************************  添加  **********************************//
router.post('/add', async (ctx, next) => {
    let name = ctx.request.body.name || ''
    let age = ctx.request.body.age || ''
    await TestModel.create({ "name": name, 'age':age}, function(error,doc){
        if(error) {
            console.log(error);
        } else {
            ctx.response.body = 'success';
        }
    });
})

// ****************************  更新  **********************************//
router.post('/update', async (ctx, next) => {
    let _id = ctx.request.body._id || ''
    let name = ctx.request.body.name || ''
    let age = ctx.request.body.age || ''
    var conditions = {'_id' : _id};
 
    var update = {$set : { 'name' : name, 'age': age }};
    
    await TestModel.update(conditions, update, function(error){
        if(error) {
            console.log(error);
        } else {
            ctx.response.body = '编辑成功'
        }
    });
})

// ****************************  删除  **********************************//
router.post('/delete', async (ctx, next) => {
    let _id = ctx.request.body._id
    let conditions = { '_id': _id };
 
    await TestModel.remove(conditions, function(error){
        if(error) {
            console.log(error);
        } else {
            ctx.response.body = 'Delete success!';
        }
    });
})





router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});





app.listen(3000);
console.log('app started at port 3000...');


var TestSchema = new mongoose.Schema({
    name : { type:String },//属性name,类型为String
    age  : { type:Number, default:0 },//属性age,类型为Number,默认为0
    time : { type:Date, default:Date.now },
    gender: { type: Boolean, default: true }
});

// 创建Model
var TestModel = mongoose.model("sing", TestSchema);

var TestEntity = new TestModel({
    name : "Lenka",
    age  : 36,
    email: "lenka@qq.com"
});

// TestEntity.save(function(error,doc){
//     if(error){
//         console.log("error :" + error);
//     }else{
//         console.log(doc);
//     }
// });

// TestModel.find({},function(error,docs){
//     //若没有向find传递参数，默认的是显示所有文档
// });
// TestModel.find({ "age": 36 }, function (error, docs) {
//     if(error){
//         console.log("error :" + error);
//     }else{
//         console.log(docs); //docs: age为28的所有文档
//     }
// }); 

const router = require('koa-router')();
const TestModel = require('../mongo/mongo')
const Control = require('../controller/control')
const fs = require('fs');

module.exports = (app) => {
    // log request URL:
    app.use(async (ctx, next) => {
        console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
        await next();
    });

    router.get('/index', async (ctx, next) => {
        ctx.response.type = 'html';
        ctx.response.body = fs.createReadStream('./views/index.html');
    })

    // 增删改差
    // ****************************  列表  **********************************//
    router.get('/list', Control.list);

    // ****************************  搜索  **********************************//
    router.get('/search', Control.search);

    // ****************************  添加  **********************************//
    router.post('/add', Control.add)

    // ****************************  更新  **********************************//
    router.post('/update', Control.update)

    // ****************************  删除  **********************************//
    router.post('/delete', Control.delete)





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
    // // add router middleware:
    // app.use(router.routes());

    app.use(router.routes())
      .use(router.allowedMethods())
}
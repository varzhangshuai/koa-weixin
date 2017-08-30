const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const logUtil = require('./utils/log_util');
const api = require('./routes/api'); //接口
const response_formatter = require('./middlewares/response_formatter');

const index = require('./routes/index');
const users = require('./routes/users');



// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(require('koa-static')(__dirname + '/public')));

app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

// app.use(views(__dirname + '/views-ejs', {
//   extension: 'ejs'
// }));


// logger
// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });
// logger
app.use(async (ctx, next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    var ms;
    try {
        //开始进入到下一个中间件
        await next();

        ms = new Date() - start;
        //记录响应日志
        logUtil.logResponse(ctx, ms);

    } catch (error) {

        ms = new Date() - start;
        //记录异常日志
        logUtil.logError(ctx, error, ms);
    }
});

// router.use('/', index.routes(), index.allowedMethods());
// router.use('/users', users.routes(), users.allowedMethods());
// app.use(router.routes(), router.allowedMethods());
// response
//仅对/api开头的url进行格式化处理
// app.use(response_formatter); //接口数据格式化
app.use(response_formatter('^/api'));


router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
app.use(router.routes(), router.allowedMethods());



app.on('error', function(err, ctx){
  console.log(err)
  log.error('server error', err, ctx);
});


module.exports = app;
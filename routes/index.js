var router = require('koa-router')();

router.get('/', async function (ctx, next) {
    const ua = ctx.header['user-agent']
    console.log('ctx',ua)
    var weixin = ua.match(/micromessenger/i)
    var java = ua.match(/daodaoclub/i)


    if(weixin){
        ctx.state = {
            title: 'koa2 title wx'
        };
        await ctx.render('index', {
        });
    }else if(java){
        ctx.state = {
            title: 'koa2 title java'
        };
        await ctx.render('index', {
        });

    }else{
        ctx.state = {
            title: ua
        };
        await ctx.render('index', {
        });
    }


})
module.exports = router;

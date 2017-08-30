var router = require('koa-router')();
var user_router = require('./user_router');
var user_oauth = require('./user_oauth');



router.use('/users', user_router.routes(), user_router.allowedMethods());
router.use('/oauth',user_oauth.routes(), user_oauth.allowedMethods())

module.exports = router;
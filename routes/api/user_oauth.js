var router = require('koa-router')();
var wx_oauth = require('../../app/controllers/wx_oauth');

var wx_share = require('../../app/controllers/wx_share');

router.get('/wxoauth',wx_oauth.wxOauth);

//分享
router.get('/wxshare',wx_share.wxShare);




module.exports = router;
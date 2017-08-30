/**
 * Created by shuaizhang on 2017/7/5.
 */
var WechatAPI = require('co-wechat-api');
var config = require('../../config.json'); // 读取配置文件
var app_id = config.wx.appid;
var app_secret  = config.wx.appSecret;
var api = new WechatAPI(app_id, app_secret);


exports.wxShare =async(ctx,next)=>{
    var param = {
        debug: false,
        jsApiList: jsApiListAPP,
        url:ctx.header.referer
    };
    var result = await api.getJsConfig(param);
    ctx.body={
        code:'1',
        message:'操作成功',
        data:result
    };
}



var jsApiListAPP = ["onMenuShareAppMessage", "onMenuShareTimeline"]
var jsApiList = [
    'checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'translateVoice',
    'startRecord',
    'stopRecord',
    'onRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'closeWindow',
    'scanQRCode',
    'chooseWXPay',
    'openProductSpecificView',
    'addCard',
    'chooseCard',
    'openCard'
];

//微信认证
var OAuth = require('co-wechat-oauth');
var config = require('../../config.json'); // 读取配置文件
var app_id = config.wx.appid;
var app_secret  = config.wx.appSecret;
var api  = new OAuth(app_id, app_secret);
var apiConfig  = require('../../utils/javaApi/apiConfig')

var request = require('request');

exports.wxOauth = async (ctx,next)=>{
    var code = ctx.query.code
    if(code){
        var TokenObj = await api.getAccessToken(code);
        //获取微信用户信息
        var accessToken = TokenObj.data.access_token;
        var openid = TokenObj.data.openid;
        var unionid = TokenObj.data.unionid;


        var options = {
            openid:openid,
            lang:'zh_CN'
        }
        var personInfo = await api.getUser(options);

        var tokentojava = {
            thirdType:'wechat',
            token:accessToken,
            openid:openid,
            unionid:unionid,
            thirdName:personInfo.nickname ,
            gender:personInfo.sex,
            headUrl:personInfo.headimgurl,
            sharerid:ctx.query.sharerid||''
        }
        console.log('query',ctx.query)
        console.log('tokentojava',tokentojava)
        ctx.body = {
            code:'1',
            message:'操作成功',
            data:tokentojava
        };
    }else {
        var redirectUrl=ctx.query.uri
        var url =await api.getAuthorizeURL(redirectUrl, '', 'snsapi_userinfo');
        ctx.body={
            code:'1',
            message:'操作成功',
            data:url
        }
        console.log(ctx.body)
    }
};



// var postRequest = async (form)=>{
//     request.post(form,function (err,response,body) {
//         if(!err && response.statusCode==200){
//             // console.log('postRequest00',err,body)
//             var data = JSON.parse(body)
//             if(data.code==1){
//                 obj = data.original
//             }
//         }
//     })
// }

//promise
// var preadFile = function(file){
//     fs.readFile(file,function(err,data){
//         // var deferred = Q.defer();
//         if(!err){
//             deferred.resolve(data);
//         }else{
//             deferred.reject(err);
//         }
//
//         return deferred.promise;
//     });
// }


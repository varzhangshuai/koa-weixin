/**
 * Created by daodao on 2017/4/16.
 */
const api ='http://test.api.daodaoclub.com/event';
const apiConfig={
    login: `${api}/auth/login`, //认证登录 POST
    code:`${api}/auth/code`,    //发送验证码 POST
    verify:`${api}/auth/verify`, //手机验证 POST
    getLabel: `${api}/label/all`,  //获取全部数据 GET
    postLabel:`${api}/label`, //获取全部数据 POST
    getIndex:`${api}/label` ,//获取全部数据 GET

    domain:'http://test.m.daodaoclub.com/wx',
    route:'http://test.m.daodaoclub.com/wx/event/label'
}



module.exports= apiConfig



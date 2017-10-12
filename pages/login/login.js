//index.js
//获取应用实例
const app = getApp()
Page({
  data: {


  },
  /**
   * 登录入口函数(维护登录态)
   */
  login: function (e) {
    var type = e.target.dataset.id;
    console.log(app.globalData.userInfo)
    /**
     * 授权了
     */
    if (app.globalData.canuse == 1){
      //表示我已经授权且获取到用户信息了
      console.log(app.globalData.userInfo)
      console.log("login start....")
      //如果用户还没有获取到
      if(app.globalData.userInfo == null){
        app.getUserInfo(app);
      }
      /**
       * 检查下用户的登录是否过期
       */
      wx.checkSession({
        //session 未过期，并且在本生命周期一直有效
        // success: function () {
        //   //此处做页面跳转
        // },
        success: function () {  //登录态过期
          /**
           * 重新登录
           */
          wx.login({
            success: function (res) {
              if (res.code) {
                //发起网络请求，向自己的服务器获取session
                wx.request({
                  url: 'http://localhost:7013/wxapp/login/getToken.do',
                  data: {
                    code: res.code,
                    session: "undefined",//第一次登录
                    type : type,
                    city: app.globalData.userInfo.city,
                    gender: app.globalData.userInfo.gender,
                    country: app.globalData.userInfo.country,
                    nickname: app.globalData.userInfo.nickName,
                    province: app.globalData.userInfo.province,
                    avatarUrl: app.globalData.userInfo.avatarUrl
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded' //post请求
                  },
                  method: "POST",
                  dataType: "json",
                  success: function (res) {
                    console.log(res.data)
                    wx.setStorageSync("token", res.data);
                  }
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          });
        }
      })
    }else{//提示授权
    app.getUserInfo(app);
    }
  },
  /**
   * 页面加载函数
   */
  onLoad: function () {

  }

})

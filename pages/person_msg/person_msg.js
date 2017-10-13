const app = getApp();
Page({
  data: {
    index:0,
    condition: false,//是否登录
    header_image: "/images/cat.png",//用户头像
    name: "",//姓名
    gender: "",
    boy: "/images/male.png",
    girl: "/images/female.png",
    className: "",
    number: "",
    age: "",
    school: ""
  },
  register: (e) => {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    const that = this
    console.log(app.globalData.canuse)
    //没有授权就逼到你授权为止
    if (app.globalData.canuse == 0) {
      console.log(2)
      app.getUserInfo(app);
    } else if (this.data.condition == false) {//未登录,先检查下之前是否注册过
      console.log(3)
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求，向自己的服务器获取session
            wx.request({
              url: app.globalData.host + '/wxapp/login/checkLogined.do',
              data: {
                code: res.code,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' //post请求
              },
              method: "POST",
              dataType: "json",
              success: function (res) {
                console.log(res.data)
                if (res.data.code == 1) {//之前登陆过
                  console.log(res.data.data)
                  var userInfo = res.data.data
                  console.log("as" + userInfo)
                  that.setData({
                    condition: true,
                    header_image: userInfo.image,
                    name: userInfo.name,
                    className: userInfo.className,
                    number: userInfo.number,
                    gender: userInfo.sex,
                    age:userInfo.age,
                    school:userInfo.school
                  })
                  app.globalData.token = res.data.data.token
                }
              }
            })
          }
        }
      });
    }
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  }
})
const app = getApp();
Page({
  data: {
    condition: false,//是否登录
    header_image: "/images/cat.png",//用户头像
    name: "",//姓名
    gender:0,
    boy:"/images/male.png",
    girl: "/images/female.png",
    className: "",
    number: "",
    text1: "班级排名",
    text2: "我的错题",
    text3: "排行版",
    text4: "我的作业",
    text5: "做题历史",
    text6:"个人信息",
    text7:"关于我们",
    text8:"联系我们"
  },
  register:(e)=>{
    wx.navigateTo({
      url: '/pages/register_guide/register_guide',
    })
  },
  first: function () {
    wx.navigateTo({
      url: '/pages/do_time/do_time',
    })
  },
  second: function () {
    wx.navigateTo({
      url: '/pages/my_class/my_class',
    })
  },
  person_msg: function () {
    if(app.globalData.type == 1){
      wx.navigateTo({
        url: '/pages/person_msg/person_msg',
      })
    }
  },
  about_us: function () {
    wx.navigateTo({
      url: '/pages/about_us/about_us',
    })
  },
  contact_us: function () {
    wx.navigateTo({
      url: '/pages/contact_us/contact_us',
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
                    header_image: userInfo.image ,
                    name: userInfo.name,
                    className: userInfo.className,
                    number: userInfo.number,
                    gender:userInfo.sex
                  })
                  if(userInfo.type == 1){
                    that.setData({
                      text1: "学生成绩",
                      text2: "布置作业",
                      text4: "我的考试",
                      text5: "我的班级"
                    })
                  }else{
                    that.setData({
                      text1: "班级排名",
                      text2: "我的错题",
                      text4: "我的作业",
                      text5: "做题历史"
                    })
                  }
                  app.globalData.token = res.data.data.token
                  app.globalData.type = res.data.data.type
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
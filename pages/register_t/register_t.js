Page({
  data: {
    index: 0,
    gender: [
      "男", "女"
    ],
    age: [
      5, 6, 7, 8, 9, 10, 11, 12
    ],
    school: ["广东财经大学"]
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    //设置返回后台的student对象
    this.data.teacher.gender = parseInt(e.detail.value)
  },
  age_Change: function (e) {
    //设置下标
    this.setData({
      age_index: e.detail.value
    })
    //设置返回后台的student对象
    this.data.teacher.age = this.data.age[e.detail.value]
  },
  school_Change: function (e) {
    var that = this
    console.log("xiabiao" + e.detail.value)
    //设置下标
    this.setData({
      school_index: e.detail.value
    })
  },
  bindNumberInput: function (e) {
    this.data.teacher.number = parseInt(e.detail.value)
  },
  bindNameInput: function (e) {
    this.data.teacher.name = e.detail.value
  },
  bindSchoolInput: function (e) {
    this.data.teacher.schoolName = e.detail.value
  },
  register: function () {
    console.log(this.data.teacher)
      console.log(app.globalData.userInfo)
      var that = this
      wx.login({
        success: function (res) {
          var code = res.code
          wx.request({
            url: app.globalData.host +'/wxapp/user/register.do',
            data: {
              number: that.data.teacher.number,
              name: that.data.teacher.name,
              gender: that.data.teacher.gender,
              age: that.data.teacher.age,
              sid: 0,
              cid: 0,
              nickName: app.globalData.userInfo.nickName,
              avatarUrl: app.globalData.userInfo.avatarUrl,
              city: app.globalData.userInfo.city,
              country: app.globalData.userInfo.country,
              language: app.globalData.userInfo.language,
              province: app.globalData.userInfo.province,
              code: code,
              type: 1
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' //post请求
            },
            method: "POST",
            dataType: "json",
            success: function (res) {
              console.log(res.data.code)
              if (res.data.code == 1) {
               app.globalData.token = res.data.data
               wx.switchTab({
                 url: '/pages/logined/logined',
               })
              }
            }
          })
        }
      })
  },
  onLoad: function (options) {
    // Do some initialize when page load.
  },
  onReady: function () {
    // Do something when page ready.
  },
  onShow: function () {
    // Do something when page show.
  },
  onHide: function () {
    // Do something when page hide.
  },
  onUnload: function () {
    // Do something when page close.
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
  },
  onPageScroll: function () {
    // Do something when page scroll
  },
  // Event handler.
  viewTap: function () {
    this.setData({
      text: 'Set some data for updating view.'
    }, function () {
      // this is setData callback
    })
  },
  customData: {
    hi: 'MINA'
  }
})
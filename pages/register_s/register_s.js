const app = getApp()
Page({
  data: {
    //各种下标
    gender_index: 0,
    age_index: 0,
    school_index: 0,
    class_index: 0,
    //各种数组
    gender: [
      "男", "女"
    ],
    age: [
      5, 6, 7, 8, 9, 10, 11, 12
    ],
    school: [],
    sidList: [],
    classRooms: [],
    cidList: [],
    //学生对象
    student: {
      number: 0,
      name: "",
      gender: 1,
      age: 5,
      sid: -1,
      cid: -1
    }
  },
  /**
   * 四个下拉框
   */
  gender_Change: function (e) {
    //设置下标
    this.setData({
      gender_index: e.detail.value
    })
    //设置返回后台的student对象
    this.data.student.gender = parseInt(e.detail.value)
  },
  age_Change: function (e) {
    //设置下标
    this.setData({
      age_index: e.detail.value
    })
    //设置返回后台的student对象
    this.data.student.age = this.data.age[e.detail.value]
  },
  school_Change: function (e) {
    var that = this
    console.log("xiabiao" + e.detail.value)
    //设置下标
    this.setData({
      school_index: e.detail.value
    })
    //设置返回后台的student对象
    this.data.student.sid = this.data.sidList[e.detail.value]
    wx.request({
      url: 'http://localhost:7000/wxapp/login/listAllClassBySid.do',
      data: {
        sid: that.data.sidList[e.detail.value]
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //post请求
      },
      method: "POST",
      dataType: "json",
      success: function (res) {
        console.log(res.data)
        that.setData({
          classRooms: res.data.data.nameList,
          cidList: res.data.data.idList
        })
      }
    })
  },
  class_Change: function (e) {
    //设置下标
    this.setData({
      class_index: e.detail.value
    })
    //设置返回后台的student对象
    this.data.student.cid = this.data.cidList[e.detail.value]
  },
  /**
   * 两个输入框
   */
  bindNumberInput: function (e) {
    this.data.student.number = e.detail.value
  },
  bindNameInput: function (e) {
    this.data.student.name = e.detail.value
  },
  register: function (e) {
    // console.log(this.data.school)
    // console.log(this.data.student)
    // console.log(this.data.classRooms)
  var that= this
    wx.login({
      success: function (res) {
      var code = res.code
          wx.request({
            url: 'http://localhost:7000/wxapp/user/register.do',
            data: {
              number: that.data.student.number,
              name: that.data.student.name,
              gender: that.data.student.gender,
              age: that.data.student.age,
              sid: that.data.student.sid,
              cid: that.data.student.cid,
              nickName: app.globalData.userInfo.nickName,
              avatarUrl: app.globalData.userInfo.avatarUrl,
              city: app.globalData.userInfo.city,
              country: app.globalData.userInfo.country,
              language: app.globalData.userInfo.language,
              province: app.globalData.userInfo.province,
              code:code,
              type: 2
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' //post请求
            },
            method: "POST",
            dataType: "json",
            success: function (res) {
              console.log(res.data.code)
              if(res.data.code==1){
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
    var that = this
    // \获取所有的学校列表
    wx.request({
      url: 'http://localhost:7000/wxapp/login/listAllSchool.do',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded' //post请求
      },
      method: "POST",
      dataType: "json",
      success: function (res) {
        console.log(res.data)
        that.setData({
          school: res.data.data.nameList,
          sidList: res.data.data.idList
        })

      }
    })
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
  }
})
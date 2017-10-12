const app = getApp()
Page({
  data: {
    kindValue: 0,
    gradeValue: 0,
    typeValue: 0,
    kindRange: ['水平等级', '固定时间'],
    gradeRange: ["一级", "二级", "三级", "四级", "五级", "六级", "七级", "八级"],
    typeRange: ["5内加减法", "10内加法", "10内加减法", "20内加法", "20内加减法", "20内减法"],
    showView:true,
  },
  kindPickerBindchange: function (e) {
    if(e.detail.value==0){
      this.setData({
        kindValue: e.detail.value,
        showView:true
      })
    }
    else {
      this.setData({
        kindValue: e.detail.value,
        showView:false
      })
    }
  },
  gradePickerBindchange: function (e) {
    this.setData({
      gradeValue: e.detail.value
    })
  },
  typePickerBindchange: function (e) {
    this.setData({
      typeValue: e.detail.value
    })
  },
  toast:function(){
    var value;
    var kind = this.data.kindValue;
    if (kind == 0){
      value = this.data.gradeValue;  
    }else{
      value = this.data.typeValue;
    }
    wx.navigateTo({
      url:'../do_time/do_time?kind='+kind+'&&value='+value,
    })
  },
  onLoad: function (options) {
    // Do some initialize when page load.
    showView:(options.showView=="true"?true:false)
  },
  onReady: function () {
    // Do something when page ready.
  },
  onShow: function () {
    // Do something when page show.
    console.log(100)
    // Do something when page show.
    if (app.globalData.canuse == 0) {
      console.log(2)
      app.getUserInfo(app);
    }
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
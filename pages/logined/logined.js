const app = getApp();
Page({
  data: {
    condition:false
  },
  a:function(){
  wx.navigateTo({
    url: '/pages/do_time/do_time',
  })
  },
  c: function () {
    wx.navigateTo({
      url: '/pages/create_class/create_class',
    })
  },
  b: function () {
    wx.navigateTo({
      url: '/pages/register_s/register_s',
    })
  },
  d: function () {
    wx.navigateTo({
      url: '/pages/register_t/register_t',
    })
  },
  e: function () {
    wx.navigateTo({
      url: '/pages/table/table',
    })
  },
  onLoad: function (options) {
    

    // Do some initialize when page load.
  },
  onReady: function () {
    // Do something when page ready.
  },
  onShow: function () {
    if (app.globalData.canuse == 0) {
      app.getUserInfo();
    }
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
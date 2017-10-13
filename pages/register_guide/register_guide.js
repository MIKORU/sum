const app = getApp()
Page({
  data: {
    
  },
  register_t:function(e){
    wx.navigateTo({
      url: '/pages/register_t/register_t',
    })
  },
  register_s: function (e) {
    wx.navigateTo({
      url: '/pages/register_s/register_s',
    })
  },
  onLoad: function (options) {
    // Do some initialize when page load.
  },
  onReady: function () {
    // Do something when page ready.
  },
  onShow: function () {
 
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
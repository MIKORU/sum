//app.js
App({
  onLaunch: function () {
    /**
     * 判断用户是否授权了，已经授权，则不会再弹出授权窗口
     */
    wx.getSetting({
      success: res => {
        /**
         * 如果还不允许授权，res.authSetting['scope.userInfo']的值为undefined,false
         */
        console.log(res.authSetting['scope.userInfo'])
        /**
         * 如果用户还没有授权，这里都会进去
         */
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: (res) => {
              this.getUserInfo(this);//设置用户信息
            }
          })
        }
      }
    })
  },
  /**
   * 获取用户信息方法。e为指针
   */
  getUserInfo:function(e){
    wx.getUserInfo({
      success: res => {//为啥这里改为success:function(res)就报错了呢？
        /**
         * 授权成功，保存userInfo对象
         */
        e.globalData.userInfo = res.userInfo
        e.globalData.canuse = 1
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (e.userInfoReadyCallback) {
          e.userInfoReadyCallback(res)
        }
      },
      fail: () => {
        wx.showModal({
          title: '用户未授权',
          content: '若不授权微信登录,您将无法对小程序进行任何操作哟！.........',
          showCancel: false,
          success: (res) => {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting['scope.userInfo']) {//已经授权了
                    e.globalData.canuse = 1
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    canuse:0,//没有授权
    token:"",
    // host:"http://localhost:7000/",//域名配置
    host:"https://wokao666.club/",
    type:0//用户类型，学生2，老师1
  }
})
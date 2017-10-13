const app = getApp();
Page({
  data: {
    kind: 0,
    value: 0,
    index: 0,
    gender: ["nan", "nv"],
    score: 0,
    remainingTime:5,
    num1: 0,
    num2: 0,
    ans:[0,0,0,0],
    cal: "+"
  },
  /**
   * 求随机数 max为范围最大数（10，100，10000）
   */
  range: function(max){
    return Math.floor(Math.random()*1000 % max);
  },
  /**
   * 计算符号选择
   */
  initcal: function (kinds, values){
    if(kinds === 0){
      if ([0, 2, 3, 6].indexOf(values) != -1) {
        var s = Math.random()*1000%2;
        if (Math.ceil(s) === 1) {
          this.setData({
            cal: "-"
          });
        } else {
          this.setData({
            cal: "+"
          });
        }
      }
      if (values === 7) {
        this.setData({
          cal: "-"
        });
      }
    } else {
      if ([0, 2, 4].indexOf(values) != -1) {
        var s = Math.floor(Math.random() * 100 % 2);
        if (s === 1) {
          this.setData({
            cal: "-"
          });
        }else{
          this.setData({
            cal: "+"
          });
        }
      }
      if (values === 5) {
        this.setData({
          cal: "-"
        });
      }
    }
  },
  /**
   * 初始化相加的数，和选择的数组
   */
  init: function(){
    var maxn = 0;
    var values = this.data.value;
    var kinds = this.data.kind;
    if(kinds === 0){
      if(values === 0){
        maxn = 5;
      }else if(values > 0 && values < 4 ){
        maxn = 10;
      }else{
        maxn = 20;
      }
    }else{
      if (values === 0) {
        maxn = 5;
      } else if (values > 0 && values < 3) {
        maxn = 10;
      } else {
        maxn = 20;
      }
    }
    this.initcal(kinds,values)
    this.setData({
      num1: this.range(maxn),
      num2: this.range(maxn),
    });
   
    var indexs = this.range(4);
    var ansNum ;
    if(this.data.cal === "-"){
      ansNum = this.data.num1 - this.data.num2;
    }else{
      ansNum = this.data.num1 + this.data.num2;
    }
    var arr = [ansNum + 1, ansNum - 1, ansNum + 2, ansNum];
    arr.sort(function (a, b) { return Math.random() > 0.5 ? -1 : 1; });
    this.setData({
      ans: arr
    });
  },
  /**
   * 计算得分
   */
  touchAns: function(event){
    var index = event.currentTarget.dataset.alphaBeta;
    if (this.data.num1 + this.data.num2 === this.data.ans[index]){
      this.setData({
        score : this.data.score+1,
      })
    }
    this.init();
  },
  /**
   * 结果显示
   */
  result:function(){
    if (this.data.kind === 0){
      if([0,1,2,4].indexOf(this.data.value) != -1){
        if(this.data.score < 10){
          return "未过关";
        }else{
          return "过关";
        }
      }else{
        if (this.data.score < 15) {
          return "未过关";
        } else {
          return "过关";
        }
      }
    }else{
      return this.data.score+"分";
    }
  },
  /**
   * 简陋的倒计时
   */
  changeTime: function(){
    var time = this.data.remainingTime;
    if(time < 0){
      return ;
    }
    if(time === 0){
      wx.request({
        url:  "",//接口地址
        data: {
          token: app.globalData.token,
          score: this.data.score
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          // wx.showToast({
          //   title: '您的成绩已保存',
          //   duration: 5000
          // })
        },
        fail: function(res){
          console.log(res);
          // wx.showToast({
          //   title: '成绩保存失败',
          //   duration: 5000
          // })
        }
      });
      wx.showModal({
        title: '本次结果',
        content: '时间已经截止 您本次的测试结果为：' + this.result(),
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/guide/guide',
              success: function(res){
                console.log(res);
              },
              fail: function(res){
                console.log(res);
              }
            });
          }
        }
      })
      return ;
    }
    setTimeout(()=>{  
      this.setData({
        remainingTime:time-1
      })
      this.changeTime();
    },1000);
  },
  onLoad: function (options) {
    // console.log(onload);
    this.setData({
      kind:parseInt(options.kind),
      value:parseInt(options.value)
    })
    // this.init();
    // this.changeTime();
    // Do some initialize when page load.
  },
  onReady: function () {
    // Do something when page ready.
  },
  onShow: function () {
    // Do something when page show.
    console.log("show");
    
    this.init();
    this.changeTime();
    console.log(app.globalData.token)
  },
  onHide: function () {
    // Do something when page hide.
    console.log("hide");
  },
  onUnload: function () {
    // Do something when page close.
    wx.showModal({
      title: '提醒',
      content: '本次答题还未结束，您确定要退出吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          this.setData({
            remainingTime: -1,
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    
    console.log("unload");
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

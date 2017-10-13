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
    gradeRange: ["一级", "二级", "三级", "四级", "五级", "六级", "七级", "八级"],
    typeRange: ["5内加减法", "10内加法", "10内加减法", "20内加法", "20内加减法", "20内减法"],
    ans:[0,0,0,0],
    cal: "+",
    flag: 1
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
    var index = parseInt(event.currentTarget.dataset.alphaBeta);
    var ans1;
    if(this.data.cal === "-"){
      ans1 = this.data.num1 - this.data.num2;
    }else{
      ans1 = this.data.num1 + this.data.num2;
    }
    if (ans1 === this.data.ans[index]){
      this.setData({
        score: this.data.score + 1,
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
   * 发送请求
   */
  saveSccore:function(datas){
    console.log(datas);
    wx.request({
      url: "",//接口地址
      data: datas,
      header: {
        'content-type': 'application/json'
      },
      method:"POST",
      success: function (res) {
        console.log(res)
        // wx.showToast({
        //   title: '您的成绩已保存',
        //   duration: 5000
        // })
      },
      fail: function (res) {
        console.log(res);
        // wx.showToast({
        //   title: '成绩保存失败',
        //   duration: 5000
        // })
      }
    });
  },
  /**
   * 简陋的倒计时
   */
  changeTime: function(){
    var time = this.data.remainingTime;
    if(this.data.flag === 0){
      return ;
    }
    if(time === 0){
      var resu = this.result();
      if (this.data.kind === 0 && resu === "过关") {
        this.saveSccore({
          token: app.globalData.token,
          kind:this.data.kind,
          type: this.data.gradeRange[this.data.value]});
      } else if (this.data.kind === 1){
        this.saveSccore({
          token: app.globalData.token,
          kind: this.data.kind,
          type: this.data.typeRange[this.data.value],
          score: this.data.score
        });
      }
      wx.showModal({
        title: '本次结果',
        content: '时间已经截止 您本次的测试结果为：' + resu,
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
  shutdown:function(){
    this.setData({
      flag: 0,
    });
  },
  onLoad: function (options) {
    console.log("onload");
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
    // wx.showModal({
    //   title: '提醒',
    //   content: '本次答题还未结束，您确定要退出吗？',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //       if (this.data.remainingTime > 0) {
    //         console.log(this.data.remainingTime);
    //         this.shutdown();
    //       }
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //       this.onLoad();
    //     }
    //   }
    // })

    if (this.data.remainingTime > 0){
      console.log(this.data.remainingTime);
      this.shutdown();
    }
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

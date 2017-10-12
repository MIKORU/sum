Page({
  data: {
    kind: 0,
    value: 0,
    index: 0,
    gender: ["nan", "nv"],
    score: 0,
    remainingTime: 10,
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
  printad: function() {
    console.log(this.data.num1 +" "+ this.data.num2);
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
    var arr = [this.range(maxn), this.range(maxn), this.range(maxn), this.range(maxn)];
    var indexs = this.range(4);
    if(this.data.cal === "-"){
      arr[indexs] = this.data.num1 - this.data.num2;
    }else{
      arr[indexs] = this.data.num1 + this.data.num2;
    }
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
   * 简陋的倒计时
   */
  changeTime: function(){
    var time = this.data.remainingTime;

    if(time === 0){
      wx.showModal({
        title: '本次结果',
        content: '时间已经截至，您本次的测试结果为：',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.redirectTo({
              url: '../logined/logined',
            })
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
    this.setData({
      kind:parseInt(options.kind),
      value:parseInt(options.value)
    })
    this.init();
    this.changeTime();
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

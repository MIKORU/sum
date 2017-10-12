Page({
  data: {
    index: 0,
    gender: ["nan", "nv"],
    score: 0,
    remainingTime: 60,
    num1: 0,
    num2: 0,
    ans:[0,0,0,0],
  },
  /**
   * 求随机数 max为位数（10，100，10000）
   */
  range: function(max){
    return Math.floor(Math.random()*100 % max);
  },
  printad: function() {
    console.log(this.data.num1 +" "+ this.data.num2);
  },
  /**
   * 初始化相加的数，和选择的数组
   */
  init: function(){
    this.setData({
      num1: this.range(10),
      num2: this.range(10),
    });
    var arr = [this.range(10), this.range(10), this.range(10), this.range(10)];
    var indexs = this.range(100) % 4;
    arr[indexs] = this.data.num1 + this.data.num2;
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
  onLoad: function (options) {
    // Do some initialize when page load.
  },
  onReady: function () {
    // Do something when page ready.
  },
  onShow: function () {
    // Do something when page show.
    this.init();
    this.printad();
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
Page({
  data: {
    beginTime:'2017-10-12',
    endTime:'2017-10-13',
    uid:null,
    text_type:null,
    listData:null,
    listData1: [
      { "name": "01", "no": "text1", "grade": "type1" },
      { "name": "02", "no": "text2", "grade": "type2" },
      { "name": "03", "no": "text3", "grade": "type3" },
      { "name": "04", "no": "text4", "grade": "type4" },
      { "name": "05", "no": "text5", "grade": "type5" },
      { "name": "06", "no": "text6", "grade": "type6" },
      { "name": "07", "no": "text7", "grade": "type7" }
    ]
  },
  timePickerBindchange1: function (e) {
    this.setData({
      beginTime: e.detail.value
    })
  },
  timePickerBindchange2: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  no_t: function (e) {
    this.setData({
      uid: e.detail.value
    })
  },
  onLoad: function (options) {
    this.setData({
      text_type:options.text_type
    })
  },
  query_t:function(){
    var that=this;
    wx.request({
      url:'',
      method:'POST',
      data:{
        'beginTime':this.data.beginTime,
        'endTime':this.data.endTime,
        'uid':this.data.uid,
        'text_type':this.data.text_type
      },
      header:{
        'Content-Type': 'application/json'
      },
      success:function(res){
        console.log(res.data);
        listData:this.res.data;
      }
    })
  }

})
Page({
  data: {
    listData: [
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
      timeValue1: e.detail.value
    })
  },
  timePickerBindchange2: function (e) {
    this.setData({
      timeValue2: e.detail.value
    })
  },
  onLoad: function () {
    console.log('onLoad')
  }

})
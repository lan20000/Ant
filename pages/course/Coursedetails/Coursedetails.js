// pages/course/Coursedetails/Coursedetails.js
const app = new getApp();
const api = require('../../../utils/api/myRequests.js');
const tool = require('../../../utils/publics/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starOption: {
      type: 5,//几颗星
      width: 24,//星星大小
      spacing: 10,//星星间距
      score: 3,//默认分数
    },
    courseId: null,
    coursedata: {}
  },
  getdetails() {
    if (this.data.courseId == null) {
      tool.alert('参数缺失');
      return;
    }
    tool.loading();
    let _this = this;
    api.getCourse({
      userId: app.globalData.udata.userId,
      courseId: this.data.courseId
    }).then((res) => {
      tool.loading_h();
      console.log(res)
      if (res.data.Code == 200) {
        _this.setData({ coursedata: res.data.Data, 'starOption.score': res.data.Data.teacherScore})
      } else {
        tool.alert('获取课程详情失败');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ courseId : options.id });
    this.getdetails();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
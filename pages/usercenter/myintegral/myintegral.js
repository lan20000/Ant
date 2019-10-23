// pages/usercenter/myintegral/myintegral.js
const api = require('../../../utils/api/myRequests.js');
const tool = require('../../../utils/publics/tool.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabtype:0,
    uid:null,
    listdata:[]
  },
  tabchoose(e) {
    this.setData({ tabtype: e.currentTarget.dataset.type });
  },
  more(){
    
  },
  /**
   * 获取积分信息
   */
  getinteral(){
    if (this.data.uid==null){
      tool.alert('参数缺失');
      return;
    }
    let _this = this;
    api.getintegral({
      type: this.data.tabtype,
      userId: this.data.uid
    }).then((res) => {
      console.log(res)
      if (res.data.Code == 200) {
        _this.setData({ listdata: res.data.Data})
      } else {
        tool.alert('注册失败');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.getStorage({
      key: 'userdata',
      success: function(res) {
        _this.setData({ uid : res.data.userId});
      },
    })
    this.getinteral();
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
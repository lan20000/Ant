// pages/usercenter/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userdata: null,
    ulogin:false,//是否登录
    utype:1,//用户类型 1非VIP 2vip 3老师
    useris:null//
    
  },
  blank(e){
    if (!e.currentTarget.dataset.index){
      return;
    }
    if (e.currentTarget.dataset.index.indexOf('top-up') > -1) {
      wx.navigateTo({
        url: './../../' + e.currentTarget.dataset.index
      });
      return;
    }
    if (e.currentTarget.dataset.index.indexOf('userStart')>-1){
      wx.navigateTo({
        url: './../..'+e.currentTarget.dataset.index
      });
      return;
    }
    console.log(e.currentTarget.dataset.index.indexOf('page') > -1);
    wx.navigateTo({
      url: './../' + e.currentTarget.dataset.index
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //是否为老师
    this.setData({ useris: app.globalData.footertab, ulogin: app.globalData.ulogin, userdata: app.globalData.udata})
    console.log(app.globalData.footertab);
    //判断是否开通了会员
    if (this.data.useris){
      this.setData({ utype : 3})
    } else if (this.data.userdata.isVip){
      this.setData({ utype: 2 })
    }
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
// pages/Aboutclass/Aboutclass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useris: true,
    tabtype:0,//类型选择
    tab:0//
  },
  /**
   * 星期选择
   */
  cut:function(e){
    if (e.target.dataset.index==undefined){
      return;
    }
    this.setData({ tab : e.target.dataset.index})
  },
  /**
   * 选择类型
   */
  tabchoose(e){
    this.setData({ tabtype: e.currentTarget.dataset.type});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({ useris: app.globalData.footertab });
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
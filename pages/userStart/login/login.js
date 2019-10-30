// pages/login/login.js
const api = require('../../../utils/api/myRequests.js');
const tool = require('../../../utils/publics/tool.js');
const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        resolve(res)
      }
    })
  })
}
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    session_key: null,
    getphone: false,//获取手机号码
  },
  /**
   * 获取手机号
   */
  getPhoneNumber: function (e) {
    if (this.data.session_key==null){
      tool.alert("注册失败，请稍后试试");
      return;
    }
    if (e.detail.cloudID == undefined) {
      tool.alert("为了用户体验，请先注册我们的会员");
      return;
    }
    api.decryptnumber({ aesIv: encodeURIComponent(e.detail.iv), EncryptedData: encodeURIComponent(e.detail.encryptedData), SessionKey: encodeURIComponent(this.data.session_key) }).then(res => {
      // console.log(res)
      tool.loading_h();
      if (res.data.Code === 200) {
        wx.redirectTo({
          url: "/pages/userStart/bindingPhone/bindingPhone?phone=" + res.data.phoneNumber
        });
      } else {
        tool.alert("登录失败");
      }
    })
  },
  logincode() {
    var _this = this;
    login().then(res => {
      return res.code;
    }).then(res => {
      tool.loading("");
      api.getSessionKey({ Code: encodeURIComponent(res) }).then(dat => {
        console.log(dat)
        tool.loading_h();
        if (dat.data.Code == 200) {
          if (dat.data.Data.openid != null) {
            wx.setStorageSync('openid', dat.data.Data.openid);
            _this.setData({ session_key: dat.data.Data.session_key });
          }
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1111)
    this.logincode();
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
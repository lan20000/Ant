// pages/usercenter/Paymentverification/Paymentverification.js
const api = require('../../../utils/api/myRequests.js');
const tool = require('../../../utils/publics/tool.js');
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexnum: 0,
    iscode: false,
    second: 60,
    blank: 0,
    code: null,
    ucode: ['','','',''],
    phone: null,
    cid: null
  },
  aboutclass() {
    if (this.data.ucode[3]==''){
      tool.alert("请输入验证码");
      return;
    }
    tool.loading();
    api.orderCourse({
      courseSectionId: this.data.cid,
      userId: app.globalData.udata.userId,
      phone: app.globalData.udata.phone,
      verifyCode: this.data.ucode.join(''),
    }).then((res) => {
      console.log(res)
      tool.loading_h();
      if (res.data.Code == 200) {
        wx.redirectTo({
          url: '/pages/About/Aboutsuccess/Aboutsuccess'
        });
      } else {
        tool.alert('约课失败');
      }
    })
  },
  /***
   * 校验手机号
   */
  getcode() {
    if (this.data.second != 60) {
      return;
    }
    tool.loading();
    api.Getcode({
      phone: app.globalData.udata.phone,
    }).then((res) => {
      console.log(res)
      tool.loading_h();
      if (res.data.Code == 200) {
        this.opencode();
        this.setData({ code: res.data.Data });
      } else {
        tool.alert('获取失败');
      }
    })
  },
  opencode() {
    var _this = this;
    if (this.data.second != 60) {
      return;
    }
    this.setData({ iscode: true });
    let result = setInterval(() => {
      _this.setData({ second: --this.data.second });
      if (this.data.second < 0) {
        clearInterval(result);
        _this.setData({ iscode: false, second: 60 });
        console.log(this.data.iscode)
      }
    }, 1000);
  },
  inputcode(e) {
    if (e.target.dataset.index == 3) {
      this.setData({ indexnum: 3 });
      return;
    }
  },
  deletecode(e) {
    if (e.target.dataset.index == 3 && e.detail.value != '') {
      this.setData({ indexnum: this.data.indexnum + 2 });
      return;
    }
  },
  inputon: function (e) {
    console.log(e.target.dataset.index)
    if (e.target.dataset.index == 3 && e.detail.value != '') {
      this.data.ucode[e.target.dataset.index] = e.detail.value;
      this.setData({ indexnum: 3, ucode: this.data.ucode});
      console.log('输入完成')
      return;
    }
    if (e.target.dataset.index == 0 && e.detail.value == '') {
      return;
    }
    if (e.detail.value == '') {
      this.data.ucode[e.target.dataset.index] = e.detail.value;
      this.setData({ indexnum: e.target.dataset.index - 1, ucode: this.data.ucode });
      return;
    }
    this.data.ucode[e.target.dataset.index] = e.detail.value;
    this.setData({ indexnum: e.target.dataset.index + 1, ucode: this.data.ucode});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options.courseId) {
    //   return;
    // }
    // this.getcode();
    this.opencode();
    this.setData({ phone: app.globalData.udata.phone, cid: options.courseId });
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
  //   onShareAppMessage: function () {

  //   }
  // yueke() {
  //   let dat = {
  //     courseSectionId: '1188831408639053824',
  //     userId: wx.getStorageSync("userdata").userId
  //   }
  //   request_01.comYuyue(dat).then((res) => {
  //     console.log(res.data);
  //   })
  // }
})
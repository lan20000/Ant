// pages/course/Coursedetails/Coursedetails.js
const app = new getApp();
const api = require('../../../utils/api/myRequests.js');
const tool = require('../../../utils/publics/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId:null,
    starOption: {
      type: 5,//几颗星
      width: 24,//星星大小
      spacing: 10,//星星间距
      score: 0,//默认分数
    },
    tcourese: {
      data:{},
      index:{}
    },//当前课堂
    courseId: null,
    courseSectionId: null,
    coursedata: {},
    // 0 未预约 1 已预约 2 正在上课 3 已完成
    statustxt: ['未预约', '已预约','正在上课','已完成'],
    bottomButtonText:"",
    uId:"",
    payalert:false,//支付
    paymeet:null,
    udata:{}
  },
  close() {
    this.data.payalert ? this.setData({ payalert: false }) : this.setData({ payalert: true });
  },
  /**
   * 检测支付
   */
  testingpay(){
    this.setData({ udata: app.globalData.udata });
    if (app.globalData.udata.isVip) {
      this.setData({ paymeet: 1 });
      //支付是否足够
      console.log(this.data.coursedata.coursePrice)
      if (this.data.coursedata.coursePrice <= app.globalData.udata.token) {
        this.setData({ paymeet: 2 });
        return;
      }
      this.setData({ paymeet: 3 });
      return;
    }
  },
  coursecancel(){

    if (this.data.coursedata.applyId == null) {
      tool.alert('参数缺失');
      return;
    }
    tool.loading();
    let _this = this;
    api.cancelCourse({
      applyId: this.data.coursedata.applyId,
    }).then((res) => {
      tool.loading_h();
      if (res.data.Code == 200) {
        tool.alert('取消成功');
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          });
        },200);
      } else {
        tool.alert('取消失败');
      }
    });
  },
  cancel(){
    if (this.data.coursedata.status != 1) {
      this.close();
      return;
    }
    var _this = this;
    wx.showModal({
      title: '确定取消该课程吗？',
      content: '会立即取消课程',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确认回调')
          _this.coursecancel();
        } else {
          console.log('点击取消回调')
        }
      }
    });
  },
  getdetails() {
    if (this.data.courseId == null) {
      tool.alert('参数缺失');
      return;
    }
    tool.loading();
    let _this = this;
    api.mycuresDetail({
      userId: app.globalData.udata.userId,
      courseId: this.data.courseId,
      courseSectionId: this.data.courseSectionId
    }).then((res) => {
      tool.loading_h();
      console.log(res)
      if (res.data.Code == 200) {
        //
        _this.setData({ coursedata: res.data.Data, 'starOption.score': res.data.Data.teacherScore, bottomButtonText: res.data.Data.status == 0 ? '立即预约' : '取消预约'});

        //检测支付
        _this.testingpay();
        // for (var x in res.data.Data.classProgress) {
        //   console.log(res.data.Data.classProgress[x].status)
        //   if (res.data.Data.classProgress[x].status==1){
        //     _this.setData({ 'tcourese.data': res.data.Data.classProgress[x],'tcourese.index': x})
        //     return;
        //   }
        // }

        for (let x = 0; x < res.data.Data.classProgress.length; ++x) {
          if (res.data.Data.classProgress[x].status == 1) {
            _this.setData({ 'tcourese.data': res.data.Data.classProgress[x],'tcourese.index': x+1})
            return;
          }
        }

        console.log(_this.data.starOption)
      } else {
        tool.alert('获取课程详情失败');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == undefined || options.storeId==undefined){
      tool.alert('参数错误');
      return;
    }
    this.setData({ courseId: options.id, storeId: options.storeId, courseSectionId: options.courseSectionId, uId: app.globalData.udata.userId });
    this.getdetails();
    // this.testingpay();
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
    this.setData({ payalert : false});
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
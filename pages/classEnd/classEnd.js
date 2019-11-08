// pages/classEnd/classEnd.js
const route = require("../../utils/tool/router.js");
const request_01 = require("../../utils/api/request_01.js");
const app = new getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    useris: null,
	STATICIMG: app.globalData.STATICIMG,
	classData:[],	
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
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
    this.setData({ useris: app.globalData.footertab });
	this.GetCoursesByDate();
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
	// onShareAppMessage: function () {

	// }
	GetCoursesByDate(){//获取课程
		let timestamp = new Date().getTime();
		let dat = {
			time: timestamp
		}
		request_01.GetCoursesByDate(dat).then((res)=>{
			if(res.data.Code=="200")
			this.setData({ classData:res.data.Data});
		})
	}
})
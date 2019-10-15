// pages/fill_info/fill_info.js
const route = require("../../utils/tool/router.js");

const app = new getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		array: ['男', '女'],
		sex:3,
		STATICIMG: app.globalData.STATICIMG,
		date: '0000-00-00',
		region: ['广东省', '广州市', '海珠区'],
		arrayStore: ["门店1", "门店2", "门店3", "门店4", "门店5"],
		currstroe:0,
		danceType: ["舞种1", "舞种2", "舞种3", "舞种4", "舞种5"],
		currDance:0,
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

	// },
	bindPickerChange(e) {//选择性别
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			sex: e.detail.value
		})
	},
	bindDateChange(e) {//选择日期
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date: e.detail.value
		})
	},
	bindRegionChange(e) {//选择地区
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			region: e.detail.value
		})
	}, 
	bindstroeChange(e) {//选择门店
			console.log('picker发送选择改变，携带值为', e.detail.value)
			this.setData({
				currstroe: e.detail.value
			})
	},
	binddanceChange(e){//选择舞种
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			currDance: e.detail.value
		})
	}
})
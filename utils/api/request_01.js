const alert = require('../../utils/publics/tool.js');
const BASEURL = "http://119.23.75.89";
let tokenkey = wx.getStorageSync("userdata").tokenKey;
let method = 'get'
let header = { 'content-type': 'application/json','Authorization': tokenkey}
const videoList = (data = {}) => { //独角兽视频列表
	let url = `${BASEURL}/TopVideo?userId=${data.userId}&isTecher=${data.isTecher}`
	return new Promise((resolve, reject) => {
		wx.request({
			url,
			data,
			method,
			header,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
const kaika = (data = {}) => { //点击立即开卡
	let url = `${BASEURL}/User/CreateUserCard`
	method = 'post'
	return new Promise((resolve, reject) => {
		wx.request({
			url,
			data,
			method,
			header,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

const getUDdots = (data = {}) => { //点击立即开卡
	let url = `${BASEURL}/UDot/GetUDdots`
	method = 'get'
	return new Promise((resolve, reject) => {
		wx.request({
			url,
			data,
			method,
			header,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
const getGifts = (data = {}) => { //获取首充好礼信息
	let url = `${BASEURL}/UDot/GetGifts`
	method = 'get'
	return new Promise((resolve, reject) => {
		wx.request({
			url,
			data,
			method,
			header,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
const getPay= (data = {}) => { //优惠券充值
	let url = `${BASEURL}/UDot/Charge`
	method = 'post';
	return new Promise((resolve, reject) => {
		wx.request({
			url,
			data,
			method,
			header,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
const getDotrecord = (data = {}) => { //获取充值记录User/GetUserDetail
	let url = `${BASEURL}/UDot/GetChargeRecord`
	method = 'get';
	return new Promise((resolve, reject) => {
		wx.request({
			url,
			data,
			method,
			header,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
const getUseinfo = (data = {}) => { //查询用户信息
	let url = `${BASEURL}/User/GetUserDetail`
	method = 'get';
	return new Promise((resolve, reject) => {
		wx.request({
			url,
			data,
			method,
			header,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
module.exports = {
	videoList,
	kaika,
	getUDdots,
	getGifts,
	getPay,
	getDotrecord,
	getUseinfo,
}
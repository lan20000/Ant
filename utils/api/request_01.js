const alert = require('../../utils/publics/tool.js');
const BASEURL = "http://119.23.75.89";
let method = 'get'
let header = { 'content-type': 'application/json' }
const videoList = (data = {}) => { //公告列表GET
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
module.exports = {
	videoList,
}
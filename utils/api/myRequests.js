import $ from './request.js'
const SERVICE = "http://119.23.75.89/"
const myRequest = (data, url, type = 'post') => {
  let _url = `${SERVICE}${url}`
  console.log("_url", _url)
  return new Promise((resolve, reject) => {
    $[`${type}P`](_url, data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//获取openid
const getOpenid = (data, url = 'Login/Login') => { return myRequest(data, url) }
//手机号解密
const getPhoneNumber = (data, url = '/api/Oauth/decryptedPhone') => { return myRequest(data, url) }

//> 获取手机验证码
const Getcode = (data, url = 'Login/GetPhoneCode') => { return myRequest(data, url, 'get') }
//> 获取积分列表
const getintegral = (data, url = 'Login/getintegral') => { return myRequest(data, url, 'get') }


module.exports = {
  myRequest,
  getOpenid,
  Getcode,
  getPhoneNumber,
  getintegral
}
// pages/fill_info/fill_info.js

const route = require("../../utils/tool/router.js");
import WxValidate from '../../utils/plugins/wx-validate/WxValidate.js';
const tool = require('../../utils/publics/tool.js');
const App = new getApp();
Page({
  data: {
    form: {
      userName: '',
    },
    array: ['男', '女'],
    sex: 3,
    STATICIMG: App.globalData.STATICIMG,
    date: '0000-00-00',
    region: ['广东省', '广州市', '海珠区'],
    arrayStore: ["门店1", "门店2", "门店3", "门店4", "门店5"],
    currstroe: 0,
    danceType: ["舞种1", "舞种2", "舞种3", "舞种4", "舞种5"],
    currDance: 0
  },
  onLoad() {
    this.initValidate();
    console.log(this.WxValidate)
  },
  showModal(error) {
    tool.alert(error.msg);
  },
  submitForm(e) {
    const params = e.detail.value

    console.log(params)

    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }

    this.showModal({
      msg: '提交成功',
    })
  },
  initValidate() {
    // 验证字段的规则
    const rules = {
      userName: {
        required: true,
      },
    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      userName: {
        required: '请选择性别',
      },
      assistance: {
        required: '请勾选1-2个敲码助手',
      },
      email: {
        required: '请输入邮箱',
        email: '请输入正确的邮箱',
      },
      tel: {
        required: '请输入手机号',
        tel: '请输入正确的手机号',
      },
      idcard: {
        required: '请输入身份证号码',
        idcard: '请输入正确的身份证号码',
      },
      password: {
        required: '请输入新密码',
        minlength: '密码长度不少于6位',
        maxlength: '密码长度不多于15位',
      },
      confirmPassword: {
        required: '请输入确认密码',
        minlength: '密码长度不少于6位',
        maxlength: '密码长度不多于15位',
        equalTo: '确认密码和新密码保持一致',
      },
      countryIndex: {
        required: '请选择国家/地区',
      },
      slider: {
        required: '请选择年龄',
        min: '年龄不小于18',
        max: '年龄不大于60',
      },
      agree: {
        required: '请同意我们的声明',
      },
      textarea: {
        required: '请输入文本',
        contains: '请输入文本（必须含有自愿两字）',
      },
    }

    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)

    // 自定义验证规则
    this.WxValidate.addMethod('assistance', (value, param) => {
      return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
    }, '请勾选1-2个敲码助手')
  },
 
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
  binddanceChange(e) {//选择舞种
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      currDance: e.detail.value
    })
  }
})



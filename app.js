//app.js
import auth from './utils/publics/authorization.js'
import api from './utils/api/myRequests.js'
import backgroundAudio from './utils/backgroundAudio.js'
import tool from './utils/publics/tool.js'
App({
  onLaunch(opation) {
    //腾讯统计
    // auth.statistics(500689212)
    //背景音乐
    // backgroundAudio.backMusic(this, 'https://game.flyh5.cn/resources/game/wechat/szq/ftxiyouji/images/music.mp3')
    //静默登录
    // this.silentLogin()
    
    //检测是否登录
    this.getulogin();
  },
  getulogin() {
    try {
      var value = wx.getStorageSync('userdata');
      console.log(value)
      value ? this.globalData.ulogin = true : this.globalData.ulogin = false;
      if (!this.globalData.ulogin) {
        console.log('是否登录', this.globalData.ulogin);
        wx.redirectTo({
          url: "pages/userStart/login/login"
        })
      }
      value ? this.globalData.udata = value : '';
      this.globalData.udata.userId = 1;
    } catch (e) {
      console.log('错误')
    }
  },
  silentLogin() {
    if (wx.getStorageSync("userId")) return
    tool.loading("")
    //静默登录
    auth.login().then(res => {
      console.log(res)
      return res
    }).then(res => {
      console.log(res)
      // return api.getOpenid({ code: res.code })
    }).then(res => {
      console.log("请求后端登录接口返回-->", res)
      if (res.data.code === 1) {
        let { data } = res.data
        if (!wx.getStorageSync("userInfo")) wx.setStorageSync("userInfo", {})
        wx.setStorageSync("userId", data.data)
        tool.loading_h()
        tool.alert("静默登录成功")
      } else {
        if (this.globalData.loginNum < 5) {
          myLogin()
          this.globalData.loginNum++
        } else {
          tool.alert("登录失败，请稍后再试")
          this.globalData.loginNum = 0
        }
      }
    })
  },
  globalData: {
    ulogin: false,
    udata: null,
    tabbar: [{ text: '独角兽', path: '/pages/index/index', icon: 'tab_unicorn_' }, { text: '约课', path: '/pages/About/Aboutclass/Aboutclass', icon: 'tab_appointCourse_' }, { text: '课表', path: '/pages/course/schedule/schedule', icon: 'tab_classSchedule_' }, { text: '我的', path: '/pages/usercenter/index/index', icon: 'tab_myCenter_' }],
    footertab: false,// false学生
    loginNum: 0,//登录失败重新登录次数
    STATICIMG: "https://game.flyh5.cn/resources/game/wechat/yls/djx"
  }

  /**
   * 自定义底部注意事项
   * 1.任何菜单页面 需要定义 useris变量，默认值为空
   * 2.需要调用更新用户类型状态 this.setData({ useris: app.globalData.footertab });
   * 3.扩展变量有 tabbar 需要自己添加
   */
})
// components/tabber/cmp.js
const router = require('../../utils/tool/router.js');

const method = require('../../utils/tool/method.js');

const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    useris:{
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal, changedPath) {
        console.log(newVal, oldVal, changedPath);
        if (newVal){
          this.setData({ tabbarList: [{ text: '独角兽', path: '/pages/index/index', icon: 'tab_home_' }, { text: '上课', path: '/pages/classEnd/classEnd', icon: 'tab_appointCourse_' }, { text: '课表', path: '/pages/course/schedule/schedule', icon: 'tab_classSchedule_' }, { text: '我的', path: '/pages/usercenter/index/index', icon: 'tab_myCenter_' }] });
        }else{
          this.setData({ tabbarList: [{ text: '独角兽', path: '/pages/index/index', icon: 'tab_unicorn_' }, { text: '约课', path: '/pages/About/Aboutclass/Aboutclass', icon: 'tab_appointCourse_' }, { text: '课表', path: '/pages/course/schedule/schedule', icon: 'tab_classSchedule_' }, { text: '我的', path: '/pages/usercenter/index/index', icon: 'tab_myCenter_' }] });
        }
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    tabbarList:{
      type:Array,
      value: [],
      observers: {
        'tabbarList': function (subfield) {
          console.log('41444')
          // 使用 setData 设置 this.data.some.subfield 时触发
          // （除此以外，使用 setData 设置 this.data.some 也会触发）
          subfield === this.data.some.subfield
        }
      }
    },
    oData:{
      type:Object,
      value:{}
    },
    IMGSERVICE:{
      type:String,
      value:app.globalData.IMGSERVICE
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:null,
    isIponeX:false,
  },
  attached(){
    this.initData()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //数据初始化
    initData(){
      let currentUrl = this.getUrl();
      let tabbarList = this.properties.tabbarList;
      tabbarList.some((item, index)=>{
        if( item.path.slice(1) == currentUrl ){
          this.setData({
            currentIndex:index
          })
          return true;
        }
      })


      //获取手机信息
      method.getSystem()
        .then((value)=>{
          const model = value.model;

          if ( model.search('iPhone X') != -1 ){
              this.setData({
                isIponeX:true,
              })

          }else{

            this.setData({
              isIponeX:false,
            })

          }
        })
        
    },
    //获取当前页面路径
    getUrl(){
      let pages = getCurrentPages();
      let currentPage = pages[pages.length-1];
      return currentPage.route;
    },  

    switchBtn(e){
      let index = e.currentTarget.dataset.index;
      console.log(index)
      let url = this.properties.tabbarList[index].path;
      
      if( index == this.data.currentIndex )return;

      this.setData({currentIndex:index})

      console.log('currentIndex',this.data.currentIndex)

      router.jump_rel({
        url,
      })
    }
  } 
})

// components/star/star.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    is:{
      type: Boolean,
      value: false
    },
    starOption: {
      type: Object,
      value: {
        type: 5,//几颗星
        width: 40,//星星大小
        spacing: 16,//星星间距
        score: 2//默认分数
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    score: 0
  },
  ready() {
    this.setData({ score: this.data.starOption.score})
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //点击星星
    select: function (e) {

      if (this.data.is) {
        return;
      }
      let score = e.currentTarget.dataset.score
      let type = e.currentTarget.dataset.type
      if (type == 0 && this.data.score == 0.5 && e.currentTarget.dataset.score == 0.5) { score = 0 }
      this.setData({ score: score })
      console.log('curStar')
      this.triggerEvent("curStar", {star: this.data.score})
    }
  }
})

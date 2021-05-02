// pages/category/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
        //分类数组
        leftMenuList:[],
        rightContent:[],
        currentIndex:0
  },
  Cates:[],
  onLoad: function(options) {
    this.getcates2();
    
  },
  getcates2(){
    wx.request({
      url: 'http://127.0.0.1:8080/getCates',
      success: (result)=>{
        this.Cates=result.data.message;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        });
      }
     })
     
  },
  handleItemTap(e){
    const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent
    })
  }
})
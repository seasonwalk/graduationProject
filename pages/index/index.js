Page({
  data: {
    //轮播图数组
    swiperList:[],
    //分类导航数组
    catesList:[],
    //楼层数组
    floorList:[]
  },
  onLoad: function(options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorData();
  },
  //获取轮播图数据
  getSwiperList(){
    wx.request({
      url: 'http://127.0.0.1:8080/json',
      success: (result)=> {
         this.setData({
         swiperList:result.data.message,
         })
      }
    })
  },
  getCatesList(){
    wx.request({
      url: 'http://127.0.0.1:8080/cates',
      success: (result)=> {
          this.setData({
          catesList:result.data.message,
          })
        }
      })
    },
    getFloorData(){
      wx.request({
        url: 'http://127.0.0.1:8080/floor',
        success: (result)=> {
            this.setData({
            floorList:result.data.message,
            })
          }
        })
      }
  
})
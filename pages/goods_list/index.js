import{request}from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList:[],
  },
  totalPages:1,
QueryParams:{
  query:"",
  cid:"",
  pagenum:1,
  pagesize:5
},

  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },
  async getGoodsList(){
    const res=await request({url:"http://127.0.0.1:8080/getList",data:this.QueryParams});
    const total=res.data.message[0].total;
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
      goodsList:[...this.data.goodsList,...res.data.message[0].goods]
    });
    //关闭刷新窗口
    wx.stopPullDownRefresh();
  },
  handleTabsItemChange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs,
    })
  },
  onReachBottom(){
    if(this.QueryParams.pagenum>=this.totalPages){wx.showToast({title: '没有更多商品了'})   }
    else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
      
    }
  },
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum=1;
    this.getGoodsList();
  }
})
import{request}from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);
  },
  async getGoodsDetail(goods_id){
    const res=await request({url:"http://127.0.0.1:8080/getDetail",data:{goods_id}});
    const goodsObj=res.data.message[0];
    this.GoodsInfo=goodsObj;
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        pics:goodsObj.pics,
        goods_introduce:goodsObj.goods_introduce.replace(/max-width:\s+[0-9]+\.[0-9]+px;/gi, 'max-width:100%;height:auto;display:block;"')
      }
    });
  },
  handlePreviewImage(e){
    const urls=this.GoodsInfo.pics.map(v=>v.url);
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })

  },
  handleCartAdd(){
    let cart = wx.getStorageSync('cart')||[];
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask:true
    })
  }
})
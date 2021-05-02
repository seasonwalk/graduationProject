import{ getSetting,chooseAddress,openSetting,showModal,showToast} from"../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data:{
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart")||[];
    // 过滤出已选商品
    cart = cart.filter(v=>v.checked);
    this.setData({
      address
    });
  
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
    wx.setStorageSync("cart", cart);
  },
  handleOrderPay(){
    const token=wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
  }
})

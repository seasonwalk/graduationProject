import{request}from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import{login} from"../../utils/asyncWx.js";

Page({
  async handleGetUserInfo(e){
    wx.getUserProfile({
      desc: '小程序想要获取您的信息', 
      success: (res) => {
         this.setData({
           userInfo: res.userInfo,  
         })
      console.log(res.userInfo)
      }
     })
    wx.setStorageSync("userinfo", this.userInfo);
}
})
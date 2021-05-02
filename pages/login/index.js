// pages/login/index.js
Page({
  getUserProfile() {
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

  },
})
// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },

  onShow: function () {
    const userInfo=wx.getStorageSync('userinfo');
    // console.log(userinfo.avatarUrl);
    this.setData({
      userInfo
    });
  },
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
let ajaxTimes=0;
export const request=(params)=>{
    ajaxTimes++;
    wx.showLoading({
        title:'奋力加载中...' ,
        mask: true,
    });
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            },
            complete: () =>{
                ajaxTimes--;
                if(ajaxTimes===0){
                    wx.hideLoading();
                }
                
            }
        });
    })
}
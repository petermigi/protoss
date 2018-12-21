class Home
{
    constructor(){

    }
    
    getBannerData(id,callback){
        wx.request({
            url: 'http://lh.zerg.com/api/v1/banner/' + id,
            method:'GET',
            success:function(res){
                //console.log(res);
                callback(res);
            }
        })
    }
}

export {Home};
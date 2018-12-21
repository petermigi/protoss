
import { Base } from '../../utils/base.js';
class Home extends Base{
    constructor(){
        super();
    }
    
    getBannerData(id,callback){

        var params = {
            url: 'banner/'+id,
            sCallBack:function(res) {
                callback && callback(res);
            }
        }
        this.request(params);
        /* wx.request({
            url: 'http://lh.zerg.com/api/v1/banner/' + id,
            method:'GET',
            success:function(res){
                //console.log(res);
                callback(res);
            }
        }) */
    }
}

export {Home};
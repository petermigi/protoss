
import { Config } from '../utils/config.js';
class Base{
    constructor(){
        this.baseRequestUrl = Config.restUrl;
    }

    /* 封装的接口请求方法 */
    request(params){
        var url = this.baseRequestUrl + params.url;

        if(!params.type){
            params.type = 'GET';
        }
        wx.request({
            url: url,
            data: params.data,
            method: params.type,
            header: {
                'content-type':'application/json',
                'token':wx.getStorageSync('token')
            },
            success:function(res){                
                params.sCallback&&params.sCallback(res.data);
            },
            fail:function(err){

            }
        }           

        )
    }

    /* 获得元素(组件标签)上的绑定的值(小程序页面跳转参数传递) */
    getDataSet(event, key) {
        return event.currentTarget.dataset[key];
    }

}

export {Base}
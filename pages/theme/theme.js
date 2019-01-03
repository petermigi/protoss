// pages/theme/theme.js
import { Theme } from 'theme-model.js'
var theme = new Theme(); //实例化 主题列表对象

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //接收页面跳转参数
        var id = options.id;
        var name = options.name;
        
        //把页面跳转参数保存到页面对象Page的data属性中,以便在当前页面全局范围内使用
        this.data.id = id;
        this.data.name = name;
        this._loadData();
    },

    //加载主题页面数据
    _loadData:function() {  
        //console.log(this.data.id);      
        theme.getProductsData(this.data.id,(data)=>{            
            this.setData({                
                themeInfo:data
            });
        })
    }

    
})
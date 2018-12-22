// pages/home/home.js

import {Home} from 'home-model.js';
var home = new Home();

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
        this._loadData();
    },

    _loadData:function(){

        //获取首页banner轮播图数据并绑定到视图层wxml文件上
        var id = 1;
        home.getBannerData(id,(res)=>{             
            this.setData({
                'bannerArr':res
            });      
        });  

    //获取首页精选主题数据并绑定到视图层wxml文件上
        home.getThemeData((res)=>{            
            this.setData({
                'themeArr':res
            });
        })

    //获取首页最近新品数据并绑定到视图层wxml文件上
        home.getProductsData((res)=>{            
            this.setData({
                'productsArr':res
            });
        })
          
    },
    

   
})
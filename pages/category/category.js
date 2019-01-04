import { Category } from 'category-model.js';
var category = new Category();


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

    _loadData: function(){
        category.getCategoryType((categoryData)=>{
            this.setData({
                categoryTypeArr:categoryData
            });

        // 一定要在回调函数里再进行获取分类详情的方法调用
        category.getProductsByCategory(categoryData[0].id, (data)=>{

            var dataObj = {
                products: data, 
                topImgUrl: categoryData[0].img.url,
                title: categoryData[0].name
            };

            this.setData({
                categoryProducts:dataObj
            });
        });
        });

        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    }

    
})
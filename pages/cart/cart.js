// pages/cart/cart.js
import { Cart } from './cart-model.js';

var cart = new Cart(); //实例化 购物车页面模型类

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
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var cartData = cart.getCartDataFromLocal();
        //购物车中选中的商品总个数
        var countsInfo = cart.getCartTotalCounts(true);

        this.setData({
            selectedCounts: countsInfo,
            cartData: cartData
        });
    },

    _calcTotalAccountAndCounts: function(data){
        var len = data.length,

        //所需要计算的总价格, 但是要注意排除掉未选中的商品
        account = 0,

        //购买商品的总个数(购物车中选中商品的总个数)
        selectedCounts = 0,

        //购买商品种类的总数(选中的商品)
        selectedTypeCounts = 0;

        let multiple = 100;

        for(let i = 0; i < len; i++) {
            //避免 0.05 +0.01 = 0.0600000005的问题(javascript浮点数相加不准确的问题)
            //先变成整数相加乘以100 0.05*100+0.01*100 最后结果除以100*100 /10000
            if(data[i].selectStatus){
                account += data[i].counts * multiple * Number(data[i].price) * multiple;
                selectedCounts += data[i].counts;
                selectedTypeCounts++;
            }
        }

        return {
            selectedCounts: selectedCounts,
            selectedTypeCounts: selectedTypeCounts,
            account: account / (multiple * multiple)
        };

    }

   
})
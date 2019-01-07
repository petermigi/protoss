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
        //var countsInfo = cart.getCartTotalCounts(true);
        var cal = this._calcTotalAccountAndCounts(cartData);

        this.setData({
            selectedCounts: cal.selectedCounts,
            selectedTypeCounts:cal.selectedTypeCounts,
            account: cal.account,
            cartData: cartData
        });
    },

    /* 计算购物车选中的商品总金额和商品总数 */
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

    },

    /**
        *
        *
        * 功能说明: 点击购物车页面商品勾选框事件处理函数
        * 参数说明:
        * 
    **/
    toggleSelect:function(event){
        var id = cart.getDataSet(event, 'id'),        
            status = cart.getDataSet(event, 'status'),

            //得到页面数据区data中的购物车数组中的单个商品的索引序号
            index = this._getProductIndexById(id);
            this.data.cartData[index].selectStatus = !status;            
            this._resetCartData();

    },

    //重新计算购物车页面中商品选中状态改变后的购物车选中的商品总金额和商品总数
    _resetCartData: function () {
        var newData = this._calcTotalAccountAndCounts(this.data.cartData);
        this.setData({
            account: newData.account,
            selectedCounts: newData.selectedCounts,
            selectedTypeCounts: newData.selectedTypeCounts,
            cartData: this.data.cartData
        });
    },

    /**
        *
        *
        * 功能说明: 点击购物车页面商品全选按钮事件处理函数
        * 参数说明:
        * 
    **/
    toggleSelectAll:function(event){

    },

    /* 根据商品id得到 商品所在下标 */
    _getProductIndexById: function (id) {
        var data = this.data.cartData,
        len = data.length;

        for (let i = 0; i< len; i++) {
            if(data[i].id == id) {
                return i;
            }
        }
    }

   
})
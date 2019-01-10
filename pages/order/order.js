// pages/order/order.js

import { Cart } from '../cart/cart-model.js';
var cart = new Cart();

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
        //订单的商品信息是购物车中提交的选中商品的信息
        var productsArr;
        this.data.account = options.account;
        console.log(options.account);

        //订单的商品信息是购物车中提交的选中商品的信息
        productsArr = cart.getCartDataFromLocal(true);

        this.setData({
            productsArr: productsArr,
            account: options.account,
            orderStatus: 0
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
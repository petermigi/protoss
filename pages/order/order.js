// pages/order/order.js

import { Cart } from '../cart/cart-model.js';
//import { Order } from '../order/order-model.js';
import { Address } from '../../utils/address.js';

var cart = new Cart();
//var order = new Order();
var address = new Address();

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
        

        //订单的商品信息是购物车中提交的选中商品的信息
        productsArr = cart.getCartDataFromLocal(true);

        this.setData({
            productsArr: productsArr,
            account: options.account,
            orderStatus: 0
        });
    },

    editAddress: function(){
        var that = this;
        wx.chooseAddress({
            success:function(res){

                var addressInfo = {
                    name: res.userName,
                    mobile: res.telNumber,
                    totalDetail: address.setAddressInfo(res)
                };

                that._bindAddressInfo(addressInfo);

                //保存用户收货地址
                address.submitAddress(res,(flag) => {
                    if(!flag) {
                        that.showTips('操作提示', '地址信息更新失败! ');
                    }
                })
            }
        });
    },

    /* 
        提示窗口
        参数: title 标题
              content 内容
              flag 是否跳转到 "我的页面"
    */
    showTips: function (title, content, flag) {
        wx.showModal({
            title: title,
            content: content,
            showCancel: false, 
            success: function (res) {
                if (flag) {
                    wx.switchTab({
                        url: '/pages/my/my'
                    });
                }
            }
            
        });
    },

    /* 绑定地址信息 */
    _bindAddressInfo: function (addressInfo) {
        this.setData({
            addressInfo: addressInfo
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
import {Address} from '../../utils/address.js';
import {Order} from '../order/order-model.js';
import {My} from '../my/my-model.js';

var address=new Address();
var order=new Order();
var my=new My();

Page({
    data: {
        pageIndex:1,
        isLoadedAll:false,
        loadingHidden:false,
        orderArr:[],
        addressInfo:null
    },
    onLoad:function(){
        this._loadData();
        this._getAddressInfo();
    },

    onShow:function(){
        //更新订单,相当自动下拉刷新,只有  非第一次打开 “我的”页面，且有新的订单时 才调用。
        var newOrderFlag=order.hasNewOrder();
        if(newOrderFlag){
            this.refresh();
        }
        
    },

    /*刷新my页面*/
    refresh: function(){
        var that=this;
        this.data.orderArr=[];  //订单初始化
        this._getOrders(()=>{
            that.data.isLoadedAll=false;  //是否加载完全
            that.data.pageIndex=1;           
            order.execSetStorageSync(false);  //更新标志位
        });
    },

    _loadData:function(){
        var that=this;
        my.getUserInfo((data)=>{
            that.setData({
                userInfo:data
            });

        });

        this._getOrders();
        order.execSetStorageSync(false);  //更新标志位

    },

    /**地址信息**/
    _getAddressInfo:function(){
        var that=this;
        address.getAddress((addressInfo)=>{
            that._bindAddressInfo(addressInfo);
        });
    },

    /*修改或者添加地址信息*/
    editAddress: function(){
        var that = this;
        wx.chooseAddress({
            success:function(res){

                //console.log(res);
                /* 2019年1月11日微信小程序API的wx.chooseAddress方法
                   在模拟器上返回的用户收货地址数据格式中的telNumber键名的值是带有-符号的电话号码
                   而我们的服务器端API要求的是手机号码,是没有带-的
                   要做处理转化手机号码
                   课程源代码在视频中授课的那一天从chooseAddress获得的是手机号码没带-符号
                   而我自己写的代码现在从chooseAddress获得的是电话号码带有-符号
                   另外县名的键名用的是英文的countyName
                   所以开发者一定要查看明确所调用接口返回的数据格式,否则很容易被坑死

                   以下是2019年1月11日在微信开发者工具中模拟器上微信小程序API的wx.chooseAddress方法返回的模拟收货地址json格式数据
                   {cityName:"广州市",countyName:"海珠区",detailInfo:"新港中路397号",errMsg:"chooseAddress:ok",nationalCode:"510000",postalCode:"510000",provinceName:"广东省",telNumber:"020-81167888",userName:"张三"}
                 */

                 //转换电话号码为手机号码 测试用, 正式上线项目中要确定telNumber的格式是不是手机号码格式
                 //视频课程源代码没有这个转换步骤,这是我自己加的
                 //所有用户收货地址手机号码统一改成字符串18798118175
                 res.telNumber = "18798118175";
                 //console.log(res);

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

    /*绑定地址信息*/
    _bindAddressInfo:function(addressInfo){
        this.setData({
            addressInfo: addressInfo
        });
    },

    /*订单信息*/
    _getOrders:function(callback){
        var that=this;
        order.getOrders(this.data.pageIndex,(res)=>{
            var data=res.data;
            that.setData({
                loadingHidden: true

            });
            if(data.length>0) {
                that.data.orderArr.push.apply(that.data.orderArr,res.data);  //数组合并
                that.setData({
                    orderArr: that.data.orderArr
                });
            }else{
                that.data.isLoadedAll=true;  //已经全部加载完毕
                that.data.pageIndex=1;
            }
            callback && callback();
        });
    },

    /*显示订单的具体信息*/
    showOrderDetailInfo:function(event){
        var id=order.getDataSet(event,'id');
        wx.navigateTo({
            url:'../order/order?from=order&id='+id
        });
    },

    /*未支付订单再次支付*/
    rePay:function(event){
        var id=order.getDataSet(event,'id'),
            index=order.getDataSet(event,'index');

        //online 上线实例，屏蔽支付功能
        if(order.onPay) {
            this._execPay(id,index);
        }else {
            this.showTips('支付提示','本产品仅用于演示，支付系统已屏蔽');
        }
    },

    /*支付*/
    _execPay:function(id,index){
        var that=this;
        order.execPay(id,(statusCode)=>{
            if(statusCode>0){
                var flag=statusCode==2;

                //更新订单显示状态
                if(flag){
                    that.data.orderArr[index].status=2;
                    that.setData({
                        orderArr: that.data.orderArr
                    });
                }

                //跳转到 成功页面
                wx.navigateTo({
                    url: '../pay-result/pay-result?id='+id+'&flag='+flag+'&from=my'
                });
            }else{
                that.showTips('支付失败','商品已下架或库存不足');
            }
        });
    },

    onReachBottom:function(){
        if(!this.data.isLoadedAll) {
            this.data.pageIndex++;
            this._getOrders();
            
        }
    },

    /*
     * 提示窗口
     * params:
     * title - {string}标题
     * content - {string}内容
     * flag - {bool}是否跳转到 "我的页面"
     */
    showTips:function(title,content){
        wx.showModal({
            title: title,
            content: content,
            showCancel:false,
            success: function(res) {

            }
        });
    },

})
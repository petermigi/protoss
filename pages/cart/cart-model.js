import { Base } from '../../utils/base.js';

class Cart extends Base {
    constructor(){
        super();
        this._storageKeyName = 'cart';
    }

    /* 
        加入到购物车
        如果之前没有这样的商品, 则直接添加一条新的记录, 数量为 counts
        如果有, 则只将相应数量 + counts
        @params:
        item - {obj} 商品对象,
        counts - {int} 商品数目,
    */
    add(item, counts){
        var cartData = this.getCartDataFromLocal();        
        var isHasInfo = this._isHasThatOne(item.id, cartData);        
        if(isHasInfo.index==-1){
            item.counts = counts;
            item.selectStatus = true; //设置选中状态
            cartData.push(item);
        }
        else {
            cartData[isHasInfo.index].counts += counts;
        }
        wx.setStorageSync(this._storageKeyName, cartData)
    }

    /**
        *
        *
        * 功能说明: 从缓存中读取购物车数据
        * 参数说明:        
    **/
    getCartDataFromLocal() {
        var res = wx.getStorageSync(this._storageKeyName);
        if(!res){
            res = [];
        }
        return res;
    }

    /**        
        * 功能说明:计算购物车内商品总数量
        * 参数说明:
        * 
    **/
   getCartTotalCounts(){
       var data = this.getCartDataFromLocal();
       var counts = 0;

       for(let i= 0; i < data.length; i++) {
            counts += data[i].counts;
       }
       return counts;
   }

    /**
        *
        *
        * 功能说明: 判断某个商品是否已经被添加到购物车中, 并且返回这个商品的数据以及所在数组中的序号
        * 参数说明:
        * @param  [type] $arg [description]
        * @return [type]      [description]
    **/
    _isHasThatOne(id, arr){
        var item,
        result = { index: -1};
        for (let i = 0; i < arr.length; i++) {
            item = arr[i];
            if (item.id == id) {
                result = {
                    index: i, 
                    data: item
                };
            break;
            }
        }
        return result;
    }
}

export { Cart };

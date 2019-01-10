import { Base } from 'base.js';
import { Config } from 'config.js';

class Address extends Base {
    constructor() {
        super();
    }

    setAddressInfo(res){
        var province = res.provinceName || res.province,
            city = res.cityName || res.city,
            country = res.countryName || res.country,
            detail = res.detailInfo || res.detail;

        var totalDetail = city + country + detail;

        //不是直辖市就添加省名到详细完整的地址的前面
        if(!this.isCenterCity(province)){
            totalDetail = province + totalDetail;
        }

        return totalDetail;
    }

    /* 是否为直辖市 */
    isCenterCity(name){
        var centerCitys = ['北京市', '天津市', '上海市', '重庆市'],
            flag = centerCitys.indexOf(name)>=0;
            return flag;
    }
}

export { Address }
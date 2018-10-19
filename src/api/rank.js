import jsonp from 'common/js/jsonp';
import axios from 'axios';
import {commonParams, options} from "./config";

// 获取排行榜数据
export function getTopList() {
    const url = "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg";
    const data = Object.assign({}, commonParams, {
        g_tk: 1282760144,
        format: 'json',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
    });
    return jsonp(url, data, options);
}

export function getMusicList(topid) {
    const url = "/api/getMusicList"
    const data = Object.assign({}, commonParams, {
        g_tk: 1282760144,
        format: 'json',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid: topid
    });
    //return jsonp(url, data, options);
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
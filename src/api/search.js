import jsonp from 'common/js/jsonp';
import axios from 'axios';
import {commonParams, options} from "./config";

export function getHotkey() {
    const url = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg";

    const data = Object.assign({}, commonParams, {
        g_tk: 1282760144,
        format: 'json',
        notice: 0,
        platform: 'h5',
        needNewCode: 1
    });

    return jsonp(url, data, options);
}

export function search(query, page, zhida, perpage) {
    const url = '/api/search';
    const data = Object.assign({}, commonParams, {
        g_tk: 1282760144,
        format: 'json',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        w: query,
        zhidaqu: 1,
        catZhida: zhida ? 1 : 0,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage: perpage,
        n: perpage,
        p: page
    });

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

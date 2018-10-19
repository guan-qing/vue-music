import axios from 'axios';
import jsonp from 'common/js/jsonp';
import {commonParams, options} from './config';

export function getLyric(mid) {
    const url = "/api/getLyric";
    const data = Object.assign({}, commonParams, {
        g_tk: 1930664565,
        pcachetime: +new Date(),
        hostUin: 0,
        format: 'json',
        platform: 'yqq',
        needNewCode: 0,
        songmid: mid,
    })
    // var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg';


    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

import axios from 'axios';
import jsonp from 'common/js/jsonp';
import {commonParams, options} from './config';

// 获取歌手数据方法
export function getSingerList() {
    const url = '/api/getSingerList'

    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function getSingerDetail(singerId) {
    const url = '/api/getSingerDetail';

    const data = Object.assign({}, commonParams, {
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 100,
        songstatus: 1,
        singermid: singerId,
        g_tk: 1664029744,
    });
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
import {getLyric} from "../../api/song";
import {ERR_OK} from "../../api/config";
import {Base64} from "js-base64";

export default class Song {
    constructor({id, mid, singer, name, album, duration, image, url}) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }

    getLyric() {//获取歌词数据


        if (this.lyric) {
            return Promise.resolve(this.lyric);
        }
        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                var str = res + "";
                var reg = /\(([^()]+)\)/.exec(str)[1];
                var result = JSON.parse(reg);
                if (result.retcode === ERR_OK) {

                    //if (typeof data === 'string') {
                    //var reg = /^\w+\(({[^()]+})\)$/;
                    //var matches = res.data.match(reg);
                    //if (matches) {
                    //res.data = JSON.parse(matches[1]);
                    // 使用base64解码
                    this.lyric = Base64.decode(result.lyric);
                    resolve(this.lyric);
                    //}
                    //}
                } else {
                    this.lyric = {};
                    reject('no lyric');
                }
            });
        });
    }
}

// 获取歌曲数据
export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${musicData.singer[0].mid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=0&guid=126548448`,
    })
}


// 获取推荐歌曲数据
export function formatSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.mid,
        singer: filterSinger(musicData.singer),
        name: musicData.name,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${musicData.singer[0].mid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/C100${musicData.mid}.m4a?fromtag=0&guid=126548448`,
    })
}

// 获取歌手名称
export function filterSinger(singer) {
    let ret = [];
    if (!singer) return '';
    singer.forEach((s) => {
        ret.push(s.name);
    })
    return ret.join('/');

}


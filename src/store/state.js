// 导入播放模式配置的参数
import {playMode} from "common/js/config";
import {loadSearch, loadPlay, loadFavorite} from "common/js/cache";

const state = {
    singer: {},//歌手数据
    playing: false,//播放状态
    fullScreen: false,//是否是全屏打开的
    playList: [],//播放列表
    sequenceList: [],//顺序播放例表
    mode: playMode.sequence,//播放模式
    currentIndex: -1,//当前播放歌曲的下标
    disc: {},//歌单数据
    topList: [],//热门搜索列表
    searchHistory: loadSearch(),//搜索纪录
    playHistory: loadPlay(),//最近播放的歌曲列表
    favoriteList: loadFavorite()//存放我喜欢欢的音乐
}
export default state;
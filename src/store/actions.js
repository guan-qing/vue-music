import * as types from './mutation-types';
import {playMode} from "../common/js/config";
import {shuffle} from "../common/js/util";
import {saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite} from "../common/js/cache";

function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id;
    })
}


//封装方法设置点击歌曲时将数据存放到vuex中
export const setlectPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST, list);//设置播放列表
    if (state.mode === playMode.random) {
        let randomlist = shuffle(list);
        commit(types.SET_PLAYLIST, randomlist);//设置播放列表
        index = findIndex(randomlist, list[index]);
    } else {
        commit(types.SET_PLAYLIST, list);//设置播放列表
    }
    commit(types.SET_CURRENT_INDEX, index);//设置播放下标
    commit(types.SET_FULL_SCREEN, true);//设置全屏播放
    commit(types.SET_PLAYING_STATE, true);//播放
}

// 从播放列表中删除一首歌
export const deleteSong = function ({commit, state}, song) {
    let playList = state.playList.slice();
    let sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;

    let pIndex = findIndex(playList, song);
    playList.splice(pIndex, 1);
    let Sindex = findIndex(sequenceList, song);
    sequenceList.splice(Sindex, 1);

    if (currentIndex > pIndex || currentIndex === playList.length) {
        currentIndex--;
    }

    commit(types.SET_PLAYLIST, playList);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_CURRENT_INDEX, currentIndex);

    const playingState = playList.length > 0;

    //如果没有歌曲了则停止播放
    commit(types.SET_PLAYING_STATE, playingState);
}

//删除歌曲播放列表
export const deleteSongList = function ({commit}) {
    commit(types.SET_PLAYLIST, []);
    commit(types.SET_SEQUENCE_LIST, []);
    commit(types.SET_CURRENT_INDEX, -1);
    commit(types.SET_PLAYING_STATE, false);
}

//设置随机播放list列表
export const randomPlay = function ({commit}, {list}) {
    commit(types.SET_PLAY_MODE, playMode.random);
    commit(types.SET_SEQUENCE_LIST, list);//设置播放列表
    let randomlist = shuffle(list);
    commit(types.SET_PLAYLIST, randomlist);
    commit(types.SET_CURRENT_INDEX, 0);//设置播放下标
    commit(types.SET_FULL_SCREEN, true);//设置全屏播放
    commit(types.SET_PLAYING_STATE, true);//播放
}

// 将搜索到的歌曲添加到当前播放列表
export const insertSong = function ({commit, state}, song) {
    let playList = state.playList.slice();
    let sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;
    //记录当前歌曲
    let currentSong = playList[currentIndex];
    //查询当前列表中是否有待插入的歌曲返回其下标
    let fpIndex = findIndex(playList, song);
    //因为是插入歌曲,下标要+1
    currentIndex++;
    //插入这首歌到当前下标位置
    playList.splice(currentIndex, 0, song);

    if (fpIndex > -1) {
        //如果当前歌曲列表已经存在这一首歌曲,则需要删除
        if (currentIndex > fpIndex) {
            //如果当前插入的序号大于列表中的序号
            playList.splice(fpIndex, 1);
            currentIndex--;
        } else {
            playList.splice(fpIndex + 1, 1);
        }
    }
    let currentSIndex = findIndex(sequenceList, currentSong) + 1;
    let fsIndex = findIndex(sequenceList, song);
    sequenceList.splice(currentSIndex, 0, song);

    if (fsIndex > -1) {
        if (currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1);
        } else {
            sequenceList.splice(fsIndex + 1, 1);
        }
    }

    commit(types.SET_PLAYLIST, playList);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_CURRENT_INDEX, currentIndex);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);

}

// 从本地缓存中读取已有搜索纪录的数据
export const saveSearchHistory = function ({commit}, query) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query));
}

//删除一条搜索纪录
export const deleteSearchHistory = function ({commit}, query) {
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query));
}

//删除所有的搜索纪录
export const clearSearchHistory = function ({commit}) {
    commit(types.SET_SEARCH_HISTORY, clearSearch());
}

//将播放的歌曲添加到播放历史数据中
export const savePlayHistory = function ({commit}, song) {
    commit(types.SET_PLAY_HISTORY, savePlay(song));
}

//点击将喜欢的歌曲保存到列表
export const saveFavoriteList = function ({commit}, song) {
    commit(types.SET_FAVORITE_LIST, saveFavorite(song));
}

//从我喜欢的列表中删除某一首歌
export const deleteFavoriteList = function ({commit}, song) {
    commit(types.SET_FAVORITE_LIST, deleteFavorite(song));
}
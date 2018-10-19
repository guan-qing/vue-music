import * as type from './mutation-types';

const matutaions = {
    [type.SET_SINGER](state, singer) {
        state.singer = singer;
    },
    [type.SET_PLAYING_STATE](state, flag) {
        state.playing = flag;
    },
    [type.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag;
    },
    [type.SET_PLAYLIST](state, list) {
        state.playList = list;
    },
    [type.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list;
    },
    [type.SET_PLAY_MODE](state, mode) {
        state.mode = mode;
    },
    [type.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index;
    },
    [type.SET_DISC](state, list) {
        state.disc = list;
    }
    ,
    [type.SET_TOP_LIST](state, list) {
        state.topList = list;
    },
    [type.SET_SEARCH_HISTORY](state, list) {
        state.searchHistory = list;
    },
    [type.SET_PLAY_HISTORY](state, list) {
        state.playHistory = list;
    },
    [type.SET_FAVORITE_LIST](state, list) {
        state.favoriteList = list;
    }
};
export default matutaions;
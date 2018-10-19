import {mapGetters, mapMutations, mapActions} from 'vuex';
import {playMode} from "common/js/config";
import {shuffle} from "common/js/util";

export const playListMixin = {
    computed: {
        ...mapGetters(['playList'])
    },
    munted() {
        this.handlePlayList(this.playList);
    },
    activated() {
        this.handlePlayList(this.playList);
    },
    watch: {
        playList(newVal) {
            this.handlePlayList(newVal);
        }
    },
    methods: {
        handlePlayList() {
            throw new Error('component must implement handlePlayList method');
        }
    }
}


export const playerMixin = {
    computed: {
        iconMode() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
        },
        ...mapGetters(['fullScreen', 'playList', 'currentSong', 'playing', 'currentIndex', 'mode', 'sequenceList', 'favoriteList'])
    },
    methods: {
        changeMode() {
            const mode = (this.mode + 1) % 3;
            this.setPlayMode(mode);
            let list = null;
            if (mode === playMode.random) {
                //随机播放
                list = shuffle(this.sequenceList);
            } else {
                list = this.sequenceList;
            }
            this.resetCurrentIndex(list);
            this.setPlayList(list);
        },
        resetCurrentIndex(list) {
            let index = list.findIndex((item) => {
                return item.id = this.currentSong.id;
            });
            this.setCurrentIndex(index);
        },
        getFavoriteIcon(song) {
            if (this.isFavorite(song)) {
                return 'icon-favorite';
            } else {
                return 'icon-not-favorite';
            }
        },
        toggleFavorite(song) {
            if (this.isFavorite(song)) {
                this.deleteFavoriteList(song);
            } else {
                this.saveFavoriteList(song);
            }
        },
        isFavorite(song) {
            let index = this.favoriteList.findIndex((item) => {
                return item.id === song.id;
            })
            return index > -1;
        },
        ...mapMutations({
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAYLIST'
        }),
        ...mapActions(['saveFavoriteList', 'deleteFavoriteList'])
    }
}

export const searchMixin = {
    data() {
        return {
            query: '',
            refreshDelay: 100
        }
    },
    computed: {
        ...mapGetters(['searchHistory'])
    },
    methods: {
        blurInput() {
            this.$refs.searchBox.blur();
        },
        saveSearch() {
            this.saveSearchHistory(this.query);
        },
        onQueryChange(query) {
            this.query = query;
        },
        addQuery(item) {
            this.$refs.searchBox.setQuery(item);
        },
        ...mapActions(['saveSearchHistory', 'deleteSearchHistory'])
    }
}
<template>
    <transition name="slide">
        <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
    import MusicList from "components/music-list/music-list"
    import {mapGetters} from "vuex";
    import {getMusicList} from "api/rank";
    import {ERR_OK} from "api/config";
    import {createSong} from "common/js/song";

    export default {
        name: "",
        data() {
            return {
                songs: [],
                rank: true
            }
        },
        computed: {
            title() {
                return this.topList.topTitle;
            },
            bgImage() {
                if (this.songs.length) {
                    return this.songs[0].image;
                }
                return "";
            },
            ...mapGetters(['topList'])
        },
        created() {
            this._getMusicList();
        },
        components: {
            MusicList
        },
        methods: {
            _getMusicList() {
                if (!this.topList.id) {
                    this.$router.back();
                    return
                }
                getMusicList(this.topList.id).then((res) => {
                    if (res.code === ERR_OK) {
                        this.songs = this._normalizSongs(res.songlist);
                    }
                })
            },
            _normalizSongs(list) {
                let ret = [];
                list.forEach((item) => {
                    const musicData = item.data;
                    ret.push(createSong(musicData));
                })
                return ret;
            }
        }
    }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
    .slide-enter-active, .slider-leave-active
        transition: all 0.3s ease

    .slider-enter, .slider-leave-to
        transition: translate3d(100%, 0, 0);

</style>
<template>
    <div class="singer" ref="singer">
        <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
        <router-view></router-view>
    </div>
</template>

<script>
    import {getSingerList} from "api/singer";
    import {ERR_OK} from "api/config";
    import Singer from "common/js/singer";
    import ListView from "base/listview/listview";
    import {mapMutations} from 'vuex';
    import {playListMixin} from "common/js/mixin";

    const HOT_NAME = '热门';
    const HOT_SINGER_LEN = 10;
    export default {
        mixins: [playListMixin],
        name: "singer",
        data() {
            return {
                singers: []
            }
        },
        created() {
            this._getSingerList();
        },
        methods: {
            handlePlayList(playList) {
                const bottom = playList.length > 0 ? '60px' : '';
                this.$refs.singer.style.bottom = bottom;
                this.$refs.list.refresh();
            },
            _getSingerList() {
                getSingerList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.singers = this._normalizeSinger(res.data.list);
                    }
                })
            },
            _normalizeSinger(list) { //该方法用于处理返回的歌手数据
                let map = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                };
                list.forEach((item, index) => {
                    //将前十条数据添加到热门数据中
                    if (index < HOT_SINGER_LEN) {
                        map.hot.items.push(new Singer({
                            id: item.Fsinger_mid,
                            name: item.Fsinger_name,
                        }));
                    }

                    const key = item.Findex;
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name,
                    }));
                });
                //将map集合进行排序
                let hot = [];//用于存放热门的数组
                let ret = [];//用于放是字母的数组
                for (let key in map) {
                    let val = map[key];
                    if (val.title.match(/[a-zA-Z]/)) {
                        ret.push(val);
                    } else if (val.title === HOT_NAME) {
                        hot.push(val);
                    }
                }
                // 对数组进行排序
                ret.sort((a, b) => {
                    //将A-Z转换在成Unicode编码再进行对比排序
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                });
                // 连接两个数据并返回
                return hot.concat(ret);
            },
            selectSinger(singer) {
                this.$router.push({path: `/singer/${singer.id}`});
                this.setSinger(singer);
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        },
        components: {
            ListView
        }
    }
</script>

<style type="text/stylus" scoped lang="stylus" rel="stylesheet/stylus">
    .singer
        position: fixed
        top: 88px
        bottom: 0px
        width 100%
</style>
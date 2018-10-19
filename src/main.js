import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload';
import 'common/stylus/index.styl';
import store from './store'
//Vue.config.productionTip = false

//设置手机端每次点击都取消掉300毫秒延迟
fastclick.attach(document.body);
//注册图片懒加载时默认显示的图片
Vue.use(VueLazyLoad, {
    loading: require('common/image/login.jpg')
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

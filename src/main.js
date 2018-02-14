// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'assets/stylus/index.styl'
import 'babel-polyfill'
import fastclick from 'fastclick'
// import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 使得整个项目都没有300ms点击延时
fastclick.attach(document.body)
// Vue.use(VueLazyLoad, {
//   loading: require('common/image/default.jpg'),
//   error: require('common/image/error.jpg')
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoader from 'vue-lazyload'
import App from './App.vue'

//mock测试数据
const mock = true;
if (mock) {
  require('./mock/api');
}
//截取数据，接口代理方式
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
axios.interceptors.response.use(function(response) {
  let res = response.data;
  if (res.status == 0) {
    return res.data;
  } else if (res.status == 10) {
    window.location.href = '/#/login';
  } else {
    alert(res.msg);
  }
})

Vue.use(VueAxios, axios);
//图片加载动画
Vue.use(VueLazyLoader,{
 laoding:'/imgs/loading-svg/loading-bars.svg'
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

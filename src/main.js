// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import CodeMirror from 'vue-codemirror-lite';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import robot from './assets/lib/robot';
import './assets/css/global.css';

Vue.use(CodeMirror);
Vue.use(ElementUI);
robot.connect();
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

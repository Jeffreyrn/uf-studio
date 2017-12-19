// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import CodeMirror from 'vue-codemirror-lite';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import robot from './assets/lib/robot';
import './assets/css/global.css';
// import GlobalUtil from './core/global_util';

Vue.use(CodeMirror);
Vue.use(ElementUI);
Vue.use(VueI18n);
robot.connect();
Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: 'en',
  silentTranslationWarn: true,
  messages: {
    en: require('./assets/i18n/en'),
    cn: require('./assets/i18n/cn'),
  },
});
/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

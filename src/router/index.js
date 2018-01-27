import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Control from '@/components/Control';
import Editor from '@/components/Editor';
import Paint from '@/components/Paint';
import Emulator from '@/components/Emulator';
import Blockly from '@/components/Blockly';
import Params from '@/components/Params';
import Teach from '@/components/Teach';
import EditHome from '@/components/EditHome';
import Setting from '@/components/Setting';
import AppStore from '@/components/AppStore';
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/EditHome',
      name: 'EditHome',
      component: EditHome,
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
    },
    {
      path: '/AppStore',
      name: 'AppStore',
      component: AppStore,
    },
    {
      path: '/control',
      name: 'Control',
      component: Control,
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor,
    },
    {
      path: '/paint',
      name: 'Paint',
      component: Paint,
    },
    {
      path: '/emulator',
      name: 'Emulator',
      component: Emulator,
    },
    {
      path: '/blockly',
      name: 'Blockly',
      component: Blockly,
    },
    {
      path: '/params',
      name: 'Params',
      component: Params,
    },
    {
      path: '/teach',
      name: 'Teach',
      component: Teach,
    },
  ],
});

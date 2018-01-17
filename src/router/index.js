import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Control from '@/components/Control';
import Editor from '@/components/Editor';
import Paint from '@/components/Paint';
import Emulator from '@/components/Emulator';
import Blockly from '@/components/Blockly';

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
  ],
});

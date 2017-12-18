<template lang="html">
    <div id='index-page' class="app-container limitWH">
      <div>
        uFactory Servo
        <button class="change-btn" @click="onLink()">
          link/unlink
        </button>
        <span id='show'>{{ model.localDeviceStatus.xarm_connected ? 'Linked' : 'Unlinked' }}</span>
      </div>
      <div>
        <button name='change-btn' class="change-btn" @click="change($event, 1)">
          Serial
        </button>
        <button name='change-btn' class="change-btn" @click="change($event, 2)">
          Scope
        </button>
        <button name='change-btn' class="change-btn" @click="change($event, 3)">
          IC MU PVL
        </button>
        <button name='change-btn' class="change-btn" @click="change($event, 4)">
          Parameter Set
        </button>
        <button name='change-btn' class="change-btn" @click="change($event, 5)">
          Divice Info
        </button>
        <button name='change-btn' class="change-btn" @click="change($event, 6)">
          Cmd Test
        </button>
        <button name='change-btn' class="change-btn" @click="change($event, 7)">
          ScreenSize
        </button>
      </div>
      <Page01 v-if="model.localParamsSetting.page === '1'"></Page01>
      <Page02 v-if="model.localParamsSetting.page === '2'"></Page02>
      <Page03 v-if="model.localParamsSetting.page === '3'"></Page03>
      <Page04 v-if="model.localParamsSetting.page === '4'"></Page04>
      <Page05 v-if="model.localParamsSetting.page === '5'"></Page05>
      <Page06 v-if="model.localParamsSetting.page === '6'"></Page06>
      <ScreenSize v-if="model.localParamsSetting.page === '7'"></ScreenSize>
    </div>
</template>
<script>

console.log('Rounter = Index');

require('../assets/css/reseet.css');
require('../assets/css/common.css');
// require('../assets/css/test.scss');

// import './assets/css/sweetalert2.css';

import GlobalUtil from '../core/global_util';
// import JSColor from '../lib/jscolor';

const r = GlobalUtil.getUrlParam('lan');
GlobalUtil.store.lan = r;

// import conf from '../../build/webpack.base.conf';
// console.log('conf = ' + conf);

const min_width = GlobalUtil.getMinWidth();
console.log('min_width = ' + min_width);
//
GlobalUtil.autoSizeScale = min_width / 375.0;
//
console.log('main GlobalUtil getUrlParam = ' + r);

import Page01 from './params/Page01.vue';
import Page02 from './params/Page02.vue';
import Page03 from './params/Page03.vue';
import Page04 from './params/Page04.vue';
import Page05 from './params/Page05.vue';
import Page06 from './params/Page06.vue';
import ScreenSize from './params/ScreenSize.vue';

// var html = document.getElementById("index-page");
// console.log("html = " + html.innerHTML);

export default {
  data() {
    return {
      model: GlobalUtil.model,
      width: 0,
      height: 0,
    };
  },
  mounted() {
    this.width = screen.width;
    this.height = screen.height;

    if (window.WebSocket) {
      console.log('This browser supports WebSocket');
      // document.getElementById('show').innerHTML = 'can web WebSocket';
    }
    else {
      console.log('This browser does not supports WebSocket');
      // document.getElementById('show').innerHTML = 'can not web WebSocket';
    }
    this.change(null, GlobalUtil.model.localParamsSetting.page);
    GlobalUtil.fixSize();
  },
  methods: {
    change(e, num) {
      GlobalUtil.model.localParamsSetting.page = '' + num;
      // console.log('params_page = ' + this.model.localParamsSetting.page);
      // console.log('thisBtn id = ' + btnID);
      var changeBtns = document.getElementsByName('change-btn');
      for (var i = 0; i < changeBtns.length; i++) {
        var btn = changeBtns[i];
        btn.style.backgroundColor = 'transparent';
      };
      if (!e) {
        changeBtns[num-1].style.backgroundColor = 'yellow';
      }
      else {
        e.currentTarget.style.backgroundColor = 'yellow';
      }
    },
    onLink() {
      const state = GlobalUtil.socketCom.socket_info.socket.readyState;
      console.log(state);
      if (1 === state) {
        GlobalUtil.socketCom.close();
      } else {
         GlobalUtil.socketCom.open();
      }
    },
  },
  beforeDestroy() {
  },
  components: {
    Page01,
    Page02,
    Page03,
    Page04,
    Page05,
    Page06,
    ScreenSize,
  },
  computed: {
  },
};

</script>
<style lang="scss" scoped>
.container-background {

}
.change-btn {
  height: 30px;
}
.change-btn-background {
  background-color: yellow;
}
</style>

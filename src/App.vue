<template>
  <div id="app">
    <div>
      <!-- <router-link :to="{ name: 'Home'}">
        <el-button >Home</el-button>
      </router-link> -->
    </div>
    <div class="main-container">
      <router-view>
        <!-- <keep-alive slot="xarm"> -->
          <xarm-model slot="xarm"></xarm-model>
          <!-- <component :is="componentId"></component> -->
        <!-- </keep-alive> -->
      </router-view>
    </div>
  </div>
</template>

<script>
import XarmModel from './components/common/XarmModel';
import meshResource from './lib/threeJSLoader'
import * as types from './store/mutation-types';

export default {
  name: 'app',
  data() {
    return {
      componentId: 'XarmModel',
    }
  },
  mounted() {
    window.GlobalUtil.store = this.$store;
    this.$store.dispatch('openWebsocket');
    // preload meshs of threeJS
    meshResource.init().then(() => {
      console.log('load geometry promise resolve')
      this.$store.commit(types.XARM_SRC_LOADED)
    })
  },
  components: {
    XarmModel,
    EmptyComponent: '<template></template>',
  },
  methods: {
    tabClick() {
      this.componentId = this.componentId === 'XarmModel' ? 'EmptyComponent' : 'XarmModel'
    },
  },
};
</script>

<style>
</style>

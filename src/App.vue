<template>
  <div id="app">
    <div>
      <!-- <router-link :to="{ name: 'Home'}">
        <el-button >Home</el-button>
      </router-link> -->
      <div @click="tabClick">switch</div>
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
import baseg from './lib/threeJSLoader'

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
    baseg.init().then(() => {
      console.log('load geometry promise resolve')
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

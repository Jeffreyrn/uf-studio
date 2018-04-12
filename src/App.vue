<template>
  <div id="app">
    <div>
      <!-- <router-link :to="{ name: 'Home'}">
        <el-button >Home</el-button>
      </router-link> -->
    </div>
    <div class="main-container">
      <router-view>
        <xarm-model slot="xarm"></xarm-model>
      </router-view>
    </div>
  </div>
</template>

<script>
import XarmModel from './components/common/XarmModel';

export default {
  name: 'app',
  mounted() {
    window.GlobalUtil.store = this.$store;
    this.$store.dispatch('openWebsocket');
  },
  components: {
    XarmModel,
  },
};
</script>

<style>
</style>

<template>
  <div id="app" unselectable="on" onselectstart="return false;">
    <div>
      <!-- <router-link :to="{ name: 'Home'}">
        <el-button >Home</el-button>
      </router-link> -->
    </div>
    <div class="main-container">
      <keep-alive>
        <router-view>
          <xarm-model slot="xarm"></xarm-model>
        </router-view>
      </keep-alive>
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

<template>
  <div id="app">
    <div>
      <!-- <router-link :to="{ name: 'Home'}">
        <el-button >Home</el-button>
      </router-link> -->
    </div>
    <div class="main-container">
      <keep-alive><router-view/></keep-alive>
    </div>
  </div>
</template>

<script>
import XarmModel from './components/common/XarmModel';

export default {
  name: 'app',
  mounted() {
    this.$store.dispatch('openWebsocket');
  },
  components: {
    XarmModel,
  },
};
</script>

<style>
</style>

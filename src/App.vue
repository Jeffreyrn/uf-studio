<template>
  <div id="app">
    <div>
      <!-- <router-link :to="{ name: 'Home'}">
        <el-button >Home</el-button>
      </router-link> -->
    </div>
    <div class="main-container">
      <keep-alive include="xarmsmodel">
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted() {
    this.$store.dispatch('openWebsocket');
  },
};
</script>

<style>
</style>

<template>
  <div id="app">
    <div>
      <router-link :to="{ name: 'Home'}">
        <el-button >Home</el-button>
      </router-link>
    </div>
    <div class="main-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import GlobalUtil from './core/global_util';
export default {
  name: 'app',
  mounted() {
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>

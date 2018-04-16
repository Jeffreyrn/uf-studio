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
*{   
  -webkit-touch-callout:none;  /*系统默认菜单被禁用*/   
  -webkit-user-select:none; /*webkit浏览器*/   
  -khtml-user-select:none; /*早期浏览器*/   
  -moz-user-select:none;/*火狐*/   
  -ms-user-select:none; /*IE10*/   
  user-select:none;
  -moz-touch-callout:none;
  -ms-touch-callout:none;
  touch-callout:none;
}

input {      
  -webkit-user-select:auto; /*webkit浏览器*/     
}

input[type=range] {
  -webkit-user-select:none; /*webkit浏览器*/ 
}

</style>

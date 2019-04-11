<template>
  <div>
    <div class="tab-contain">
      <ul>
        <li v-for="(data, index) in model.localAppsMgr.allApps.thirdparty.data" class="com-app-icon">
          <router-link v-if="data.control==='run'" :to="{name: 'Blockly', params:{data: data}}">
            <div class="background-icon com-app-icon-hover">
            </div>
          </router-link>
          <router-link v-if="data.control==='install'" :to="{name: 'AppDetail', params:{data: data}}">
            <div class="background-icon com-app-icon-hover">
            </div>
          </router-link>
          <AppIcon :data='data'></AppIcon>
          <AppTitle :data='data'></AppTitle>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import AppTitle from './AppTitle';
import AppIcon from './AppIcon';

export default {
  data() {
    return {
      model: window.GlobalUtil.model,
    };
  },
  mounted() {
  },
  methods: {
  },
  components: {
    AppTitle,
    AppIcon,
  },
};
</script>

<style scoped lang="scss">
.tab-contain ul li {
  position: relative;
}
.background-icon {
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('./../../assets/img/appStore/icon_3rdparty.svg');
}

</style>

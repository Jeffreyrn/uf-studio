<template>
  <div>
    <div class="tab-contain">
      <ul>
        <li class="com-app-icon">
          <router-link :to="{name: 'Emulator', params:{data: {name: null}} }">
            <div class="background-icon-control com-app-icon-hover">
            </div>
          </router-link>
          <AppTitle :data="{omitname: 'Control'}"></AppTitle>
        </li>
        <li class="com-app-icon">
          <router-link :to="{name: 'Paint', params:{data: {name: null}} }">
            <div class="background-icon-painting com-app-icon-hover">
            </div>
          </router-link>
          <AppTitle :data="{omitname: 'Paint'}"></AppTitle>
        </li>
        <li v-for="(data ,index) in model.localAppsMgr.allApps.default.data" class="com-app-icon">
          <router-link :to="{name: 'Blockly', params:{data: data}}" v-if="data.control==='run'">
            <div class="background-icon-default com-app-icon-hover">
            </div>
          </router-link>
          <router-link :to="{name: 'AppDetail', params:{data: data}}" v-if="data.control==='install'">
            <div class="background-icon-default com-app-icon-hover">
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
      titleEditing: true,
      jumpTo: 'AppDetail',
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
.background-icon-painting {
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('./../../assets/img/appStore/icon_painting.svg');
}
.background-icon-control {
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('./../../assets/img/appStore/icon_control.svg');
}
.background-icon-default {
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('./../../assets/img/appStore/icon_default.svg');
}

</style>

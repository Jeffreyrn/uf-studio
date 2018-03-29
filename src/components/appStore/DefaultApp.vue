<template>
  <div>
    <div class="tab-contain">
      <ul>
        <li class="com-app-icon">
          <router-link :to="{name: 'Emulator', params:{data: {name: null}} }">
            <div class="background-icon-control">
            </div>
          </router-link>
          <AppTitle :data="{omitname: 'Control'}"></AppTitle>
        </li>
        <li class="com-app-icon">
          <router-link :to="{name: 'Paint', params:{data: {name: null}} }">
            <div class="background-icon-painting">
            </div>
          </router-link>
          <AppTitle :data="{omitname: 'Paint'}"></AppTitle>
        </li>
        <li v-for="(data ,index) in model.localAppsMgr.allApps.default.data" class="com-app-icon">
          <router-link :to="{name: 'AppDetail', params:{data: data}}">
            <div class="background-icon-default">
            </div>
          </router-link>
          <AppTitle :data='data'></AppTitle>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import AppTitle from './AppTitle';

export default {
  data() {
    return {
      model: window.GlobalUtil.model,
      titleEditing: true,
    };
  },
  mounted() {
  },
  methods: {
  },
  components: {
    AppTitle,
  },
};
</script>

<style scoped lang="scss">
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

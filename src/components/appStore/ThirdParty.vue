<template>
  <div>
    <div class="tab-contain">
      <ul>
        <li v-for="(data, index) in model.localAppsMgr.allApps.thirdparty.data" class="com-app-icon">
          <router-link :to="{name: 'AppDetail', params:{data: data}}">
            <div class="background-icon">
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

.background-icon {
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('./../../assets/img/appStore/icon_3rdparty.svg');
}

</style>

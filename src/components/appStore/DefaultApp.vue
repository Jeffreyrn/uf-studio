<template>
  <div>
    <div class="tab-contain">
      <ul>
        <li v-for="(data ,index) in model.localAppsMgr.allApps.default.data" class="app-deault-icon">
          <router-link :to="{name: 'AppDetail', params:{data: data}}">
            <div style="width:100%;height:100%;">
            </div>
          </router-link>
          <div class="app-title">{{ data.omitname }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-deault-icon {
  width: 136px;
  height: 136px;
  border-radius: 4px;
  margin: 1.4rem 3.2rem 1.4rem 0;
  display: inline-block;
  text-align: center;
  background: #F3F5F7;
  cursor: pointer;
}
.app-title {
  font-family: 'Gotham-Book';
  // font-size: 16px;
  font-size: 1.2rem;
  color: #4A4A4A;
  letter-spacing: -0.67px;
  /* background: yellow; */
  height: 40px;
  // line-height: 40px;
  // line-height: 1.2rem;
}
</style>

<template>
  <div>
    <div class="tab-contain">
      <ul>
        <li v-for="(data ,index) in model.localAppsMgr.allApps.default.data" class="app-deault-icon">
          <router-link :to="{name: 'AppSubmit', params:{data: data}}">
            <div style="width:100%;height:100%;">
            </div>
          </router-link>
          <div class="app-title">{{ data.name }}</div>
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
</style>

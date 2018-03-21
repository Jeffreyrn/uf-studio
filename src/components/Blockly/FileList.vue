
<template>
  <div id="app-list" class="applist">
    <div v-for="item in model.children" :key="item.uuid" class="block">
      <div class="file-icon"><span v-text="item.label.slice(0,1)"></span></div>
      <div class="file-name">{{item.label}}</div>
    </div>
  </div>

</template>
<script>
// import eventBus from './eventBus'

export default {
  // props: ['onok'],
  data() {
    return {
      model: window.GlobalUtil.model.localAppsMgr.appTreeDatas[2],
      curSelectedFileUUID: '',
      curProTreeDatas: [],
      block: null,
    };
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style scoped lang="scss">
#app-list {
  background: #F5F5F5;
  height: 45vh;
  .block {
    width: 12%;
    padding: 2%;
    margin: 5%;
    display: inline-block;
    .file-icon {
      color: white;
      background: green;
      text-align: center;
      font-family: Gotham-Book;
      font-size: 24px;
    }
  }
}
</style>

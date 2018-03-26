
<template>
  <div style="background: #F5F5F5;">
    <div class="my-app">
      MY APP
  <!--<div id="app-list" class="applist">-->
    <!--<div v-for="item in model.children" :key="item.uuid" @click="loadProject(item.label)" class="block">-->
      <!--<div class="file-icon"><span v-text="item.label.slice(0,1)"></span></div>-->
      <!--<div class="file-name">{{item.label}}</div>-->

    </div>
    <div id="app-list" class="app-list">
      <div v-for="(item, index) in model.children" :key="item.uuid" @click="loadProject(item.label)"  class="block">
        <div class="file-icon" style="background:#9CC5F7;" v-if="index % 5 === 0"><span v-text="item.label.slice(0,1)"></span></div>
        <div class="file-icon" style="background:#F8C6DE;" v-if="index % 5 === 1"><span v-text="item.label.slice(0,1)"></span></div>
        <div class="file-icon" style="background:#B8E986;" v-if="index % 5 === 2"><span v-text="item.label.slice(0,1)"></span></div>
        <div class="file-icon" style="background:#D5D5D5;" v-if="index % 5 === 3"><span v-text="item.label.slice(0,1)"></span></div>
        <div class="file-icon" style="background:#9EE0D2;" v-if="index % 5 === 4"><span v-text="item.label.slice(0,1)"></span></div>
        <div class="file-name">{{item.label}}</div>

      </div>
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
    loadProject(path) {
      this.$emit('loadProject', path)
    },
  },
}
</script>

<style scoped lang="scss">
.my-app {
  font-family: 'Gotham-Medium';
  font-size: 1.8rem;
  color: #444;
  letter-spacing: -1.56px;
  padding: 1.6rem 2.2rem;
}
.app-list {
  height: 40vh;
  overflow-y: auto;
  padding: 10px 1.6rem;
  display: inline-block;
  width: 100%;
  .block {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    cursor: pointer;
    margin-bottom: 24px;
    .file-icon {
      color: white;
      font-family: 'Gotham-Book';
      font-size: 1.8rem;
      width: 5rem;
      height: 5rem;
      line-height: 5rem;
      text-align: center;
      text-transform: uppercase;
    }
    .file-name {
      padding-top: 6px;
      text-align: center;
      width: 100%;
      font-size: 14px;
    }
  }
}
.app-list::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.app-list::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #D8D8D8;;
}
.app-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(231,231,231,0.4);
  border-radius: 0;
  background: rgba(231,231,231,0.4);
}
</style>

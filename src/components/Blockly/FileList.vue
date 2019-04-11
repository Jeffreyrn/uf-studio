
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
        <div class="file-icon" :style="'background:#'+colorList[index % 5]+';'">
          <span v-text="item.label.slice(0,1)"></span>
          <img v-if="selected === item.label" src="./../../assets/img/appStore/gou.svg" alt="checked">
        </div>
        <div class="file-name">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>
<script>
// import eventBus from './eventBus'

export default {
  props: ['selected'],
  data() {
    return {
      model: window.GlobalUtil.model.localAppsMgr.appTreeDatas[2],
      // curSelectedFileUUID: '',
      curProTreeDatas: [],
      block: null,
      colorList: ['9CC5F7', 'F8C6DE', 'B8E986', 'D5D5D5', '9EE0D2'],
    };
  },
  mounted() {
  },
  methods: {
    loadProject(path) {
      // this.curSelectedFileUUID = path;
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
  padding: 1.6rem 2.2rem 0;
}
.app-list {
  height: 44vh;
  overflow-y: auto;
  padding: 10px 1.6rem;
  display: inline-block;
  width: 100%;
  .selected {
    background-color: #fff;
  }
  .block {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    cursor: pointer;
    padding: 1% 1%;
    margin: 3% 0;
    .file-icon {
      color: white;
      font-family: 'Gotham-Book';
      font-size: 1.8rem;
      width: 100%;
      height: 4rem;
      line-height: 5rem;
      text-align: center;
      text-transform: uppercase;
      position: relative;
      img {
        right: 0;
        bottom: 0;
        position: absolute;
      }
    }
    .file-name {
      padding-top: 6px;
      text-align: center;
      width: 100%;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
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

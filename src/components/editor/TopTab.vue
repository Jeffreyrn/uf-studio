<template>
  <div class="float-left top-tab" name="top-tab" :id="getTabId()">
    <div class="float-left top-tab-item-border">
      <div class="float-left top-tab-item" @click="onselect()">
        <div v-if="data.localContent !== data.remoteContent" class="float-left"></div>
        <div v-if="data.uuid !== model.localProjTree.curSelectedFileUUID" class="float-left top-tab-background-color-unselect">{{ data.name }}</div>
        <div v-if="data.uuid === model.localProjTree.curSelectedFileUUID" class="float-left top-tab-background-color">{{ data.name }}</div>
      </div>
      <div @click="close()" class="float-left tab-cancel">X</div>
    </div>
  </div>
</template>

<script>


export default {
  props: ['data'],
  data() {
    return {
      model: GlobalUtil.model,
    };
  },
  mounted() {
  },
  methods: {
    getTabId() {
      const uuid = this.data.uuid;
      return `top-tab-${uuid}`;
    },
    onselect() {
      const uuid = this.data.uuid;
      GlobalUtil.model.localProjTree.setSelectedUUID(uuid);
      console.log(`folder uuid = ${GlobalUtil.model.localProjTree.curFile.uuid}`);
      console.log(`folder uuid curSelectedUUID = ${GlobalUtil.model.localProjTree.curSelectedUUID}`);
      GlobalUtil.model.localProjTree = GlobalUtil.model.localProjTree;
    },
    close() {
      const uuid = this.data.uuid;
      console.log(`close uuid = ${uuid}, curSelectedFileUUID = ${GlobalUtil.model.localProjTree.curFile.uuid}`);
      GlobalUtil.model.localProjTree.removeOpenTab(uuid);
    },
  },
  beforeDestroy() {
  },
  watch: {
  },
  computed: {
    // curSelectUUID() {
    //   const curUUID = GlobalUtil.model.localProjTree.getCurSelectedFileUUIDs();
    //   console.log(`curUUID = ${curUUID}, data.uuid = ${this.data.uuid}`);
    //   return curUUID;
    // },
  },
  components: {
  },
};
</script>

<style scoped>
.top-tab {
  height: 20px;
  font-size: 10px;
  line-height:20px;
  /*pointer-events:none;*/
}
.tab-cancel {
  background-color:yellow;
  width: 20px;
  height: 20px;
  text-align:center;
  line-height:20px;
  cursor:pointer;
}
.top-tab-item {
  height: 20px;
  padding-left: 10px;
  padding-right: 10px;
}
.top-tab-item-border {
  border: solid 1px gray;
}
.top-tab-background-color {
  background-color:pink;
}
.top-tab-background-color-unselect {
  background-color:transparent;
}
</style>

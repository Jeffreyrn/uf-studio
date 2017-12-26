<template>
  <div class="float-left top-tab" name="top-tab" :id="getTabId()">
    <div class="float-left top-tab-item-border">
      <div class="float-left top-tab-item" @click="onselect()">
        <div v-if="data.uuid !== model.localProjTree.curSelectedFileUUID" class="float-left top-tab-background-color-unselect">{{ data.name }}</div>
        <div v-if="data.uuid === model.localProjTree.curSelectedFileUUID" class="float-left top-tab-background-color">{{ data.name }}</div>
      </div>
      <div @click="close()" class="float-left tab-cancel">X</div>
    </div>
  </div>
</template>

<script>

import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
  props: ['data'],
  data() {
    return {
      model: GlobalUtil.model,
    };
  },
  mounted() {
    const isSelected = this.uuid === GlobalUtil.model.localProjTree.curSelectedFileUUID;
    console.log(`top tab mounted data uuid = ${this.data.uuid}, isSelected = ${isSelected}`);
  },
  methods: {
    getTabId() {
      const uuid = this.data.uuid;
      return `top-tab-${uuid}`;
    },
    onselect() {
      const uuid = this.data.uuid;
      GlobalUtil.model.localProjTree.setSelectedFileUUID(uuid);
      console.log(`folder uuid = ${GlobalUtil.model.localProjTree.curFile.uuid}`);
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
    tabBgColor: () => {
      // console.log(`this.uuid = ${this.uuid}`);
      // const isSelected = this.uuid === GlobalUtil.model.localProjTree.curSelectedFileUUID;
      return {
        // 'top-tab-background-color-unselect': !isSelected,
        // 'top-tab-background-color': isSelected,
      };
    },
  },
  components: {
  },
};
</script>

<style scoped>
.float-left {
  float: left;
}
.float-right {
  float: right;
}
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

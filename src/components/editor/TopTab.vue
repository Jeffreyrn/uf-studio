<template>
  <div class="noselected">
    <!-- un selected -->
    <div v-if="data.uuid!==model.localProjTree.curSelectedFileUUID" class="">
      <div class="float-left top-tab" name="top-tab" :id="getTabId()" style="background:transparent;">
        <div class="float-left top-tab-item-border">
          <div class="float-left tab-left-icon" @click="onselect()"></div>
          <div class="float-left top-tab-item" @click="onselect()">
            <!-- <div v-if="data.localContent !== data.remoteContent" class="float-left"></div> -->
            <div class="float-left top-tab-background-color-unselect">{{ data.name }}</div>
          </div>
          <div @click="close()" class="float-left tab-cancel"></div>
        </div>
      </div>
    </div>
    <!-- un selected end -->
    <!-- selected -->
    <div v-if="data.uuid===model.localProjTree.curSelectedFileUUID" class="">
      <div class="float-left top-tab" name="top-tab" :id="getTabId()" style="background:#3F4955;">
        <div class="float-left top-tab-item-border">
          <div class="float-left tab-left-icon-white" @click="onselect()"></div>
          <div class="float-left top-tab-item" @click="onselect()">
            <!-- <div v-if="data.localContent !== data.remoteContent" class="float-left"></div> -->
            <div class="float-left top-tab-background-color">{{ data.name }}</div>
          </div>
          <div @click="close()" class="float-left tab-cancel-white"></div>
        </div>
      </div>
    </div>
    <!-- selected end -->
  </div>
</template>

<script>

export default {
  props: ['data'],
  data() {
    return {
      model: window.GlobalUtil.model,
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
      window.GlobalUtil.model.localProjTree.setSelectedUUID(uuid);
      console.log(`folder uuid = ${window.GlobalUtil.model.localProjTree.curFile.uuid}`);
      console.log(`folder uuid curSelectedUUID = ${window.GlobalUtil.model.localProjTree.curSelectedUUID}`);
      window.GlobalUtil.model.localProjTree = window.GlobalUtil.model.localProjTree;
    },
    close() {
      const uuid = this.data.uuid;
      console.log(`close uuid = ${uuid}, curSelectedFileUUID = ${window.GlobalUtil.model.localProjTree.curFile.uuid}`);
      window.GlobalUtil.model.localProjTree.removeOpenTab(uuid);
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
  height: 26px;
  line-height: 26px;
  font-family: 'Gotham-Book';
  font-size: 12px;
  color: #A5ACB3;
  letter-spacing: -0.8px;
  /*pointer-events:none;*/
}
.tab-cancel {
  /* background-color:yellow; */
  width: 20px;
  height: 26px;
  text-align:center;
  line-height:26px;
  cursor:pointer;
  background-image: url('./../../assets/img/ide/icon_close.svg');
  background-size: 6px 6px;
  background-repeat: no-repeat;
  background-position: center;
}
.tab-cancel-white {
  /* background-color:yellow; */
  width: 20px;
  height: 26px;
  text-align:center;
  line-height:26px;
  cursor:pointer;
  background-image: url('./../../assets/img/ide/icon_close_white.svg');
  background-size: 6px 6px;
  background-repeat: no-repeat;
  background-position: center;
}
.tab-left-icon {
  margin-left: 8px;
  margin-top: 7px;
  width: 12px;
  height: 12px;
  background-image: url('./../../assets/img/ide/language_python.svg');
  background-size: 12px 12px;
}
.tab-left-icon-white {
  margin-left: 8px;
  margin-top: 7px;
  width: 12px;
  height: 12px;
  background-image: url('./../../assets/img/ide/language-python_white.svg');
  background-size: 12px 12px;
}
.top-tab-item {
  height: 26px;
  padding-left: 10px;
  padding-right: 3px;
}
.top-tab-item-border {
  /* border: solid 1px gray; */
}
.top-tab-background-color {
  /* background-color:pink; */
  color: white;
}
.top-tab-background-color-unselect {
  /* background-color:transparent; */
  color: #A5ACB3;
}
</style>

<template>
  <!-- <div class="float-left top-tab" name="top-tab" :id="getTabId()">
    <div class="float-left top-tab-item-border">
      <div class="float-left tab-left-icon" @click="onselect()"></div>
      <div class="float-left top-tab-item" @click="onselect()">
        <div v-if="data.localContent !== data.remoteContent" class="float-left"></div>
        <div v-if="data.uuid !== model.localProjTree.curSelectedFileUUID" class="float-left top-tab-background-color-unselect">{{ data.name }}</div>
        <div v-if="data.uuid === model.localProjTree.curSelectedFileUUID" class="float-left top-tab-background-color">{{ data.name }}</div>
      </div>
      <div @click="close()" class="float-left tab-cancel"></div>
    </div>
  </div> -->
  <div>

    <!-- un selected -->
    <div v-if="data.uuid!==model.localProjTree.curSelectedFileUUID" class="">
      <div class="float-left top-tab" name="top-tab" :id="getTabId()" style="background:transparent;">
        <div class="float-left top-tab-item-border">
          <div class="float-left tab-left-icon" @click="onselect()"></div>
          <div class="float-left top-tab-item" @click="onselect()">
            <div v-if="data.localContent !== data.remoteContent" class="float-left"></div>
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
          <div class="float-left tab-left-icon" @click="onselect()"></div>
          <div class="float-left top-tab-item" @click="onselect()">
            <div v-if="data.localContent !== data.remoteContent" class="float-left"></div>
            <div class="float-left top-tab-background-color">{{ data.name }}</div>
          </div>
          <div @click="close()" class="float-left tab-cancel"></div>
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
  line-height: 20px;
  font-family: Gotham-Book;
  font-size: 12px;
  color: #A5ACB3;
  letter-spacing: -0.8px;
  /*pointer-events:none;*/
}
.tab-cancel {
  /* background-color:yellow; */
  width: 15px;
  height: 20px;
  text-align:center;
  line-height:20px;
  cursor:pointer;
  background-image: url('./../../assets/img/ide/icon_close.svg');
  background-size: 6px 6px;
  background-repeat: no-repeat;
  background-position: center;
}
.tab-left-icon {
  margin-left: 3px;
  margin-top: 3px;
  width: 12px;
  height: 12px;
  background-image: url('./../../assets/img/ide/language_python.svg');
  background-size: 12px 12px;
}
.top-tab-item {
  height: 20px;
  padding-left: 3px;
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

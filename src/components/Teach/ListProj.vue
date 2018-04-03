<template lang="html">
  <div class="list-project-wrapper" @scroll="checkscroll()">
    <div class="scroll-container" :style="{width: listWidth}" v-if="model.localTeach.getFileInfo(model.localTeach.curEditingFileUUID)!==null || model.localTeach.curEditingFileUUID===''">
      <!-- <div v-for='index in model.localTeach.showArr'>
        <ListProjCell :index='index' :file='model.localTeach.getFileInfo(model.localTeach.curEditingFileUUID)'></ListProjCell>
        {{ index }}
      </div> -->
      <div class="block-cell" v-if="model.localTeach.curSelectedTreeItem.uuid!==''" v-bind:class="isMarginLeft">
        <div v-if="model.localTeach.curProj.type==='continuous'" style="width:40px;">
        </div>
        <!-- <div v-if="model.localTeach.curProj.type==='discontinuous'" style="width:0px;">
        </div> -->
        <div class="cell-wrapper" v-for='index in visableList' :style="{left: (scrollLeft + (index-firstCellInView)*60)+ 'px'}">
          <ListProjCell :index='index' :file='model.localTeach.getFileInfo(model.localTeach.curEditingFileUUID)' :editState='editState'></ListProjCell>
        </div>
        <div style="width:100px;">
        </div>
        <!-- <div v-if='model.localTeach.curProj.type==='continuous''>
          <ListProjCell :editState='editState'></ListProjCell>
        </div> -->
      </div>
    </div>
    <!-- scroll timer end -->
  </div>
</template>
<script>

import ListProjCell from './ListProjCell';

export default {
  props: ['editState', 'parentWidth'],
  data() {
    return {
      model: window.GlobalUtil.model,
      firstCellInView: 0,
      scrollLeft: 0,
    };
  },
  mounted() {
  },
  methods: {
    test_get_pos() {
      window.GlobalUtil.model.localTeach.genAndPushTestPoints();
    },
    onClick(e, uuid) {
      const attr = e.currentTarget.value;
      console.log(`attr = ${attr}, uuid = ${uuid}`);
      // const file = window.GlobalUtil.model.localTeach.getTeachFileInfo(window.GlobalUtil.model.localTeach.curProj, uuid);
    },
    checkscroll() {
      this.scrollLeft = document.getElementById('bottom-right-frame').scrollLeft;
      console.log(`check scroll = ${this.scrollLeft}, index = ${parseInt(this.scrollLeft / 60)}`);
      this.firstCellInView = this.scrollLeft / 60
    },
    onSelect(e, index) {
      window.GlobalUtil.model.localTeach.onSelect(e, index);
    },
  },
  beforeDestroy() {
  },
  components: {
    ListProjCell,
  },
  computed: {
    // classObject: () => ({
    //   'bgcolor0': !window.GlobalUtil.model.localProjTree.hasOpenFileInCurPro,
    //   'bgcolor1': window.GlobalUtil.model.localProjTree.hasOpenFileInCurPro,
    // }),
    listWidth() {
      return `${this.model.localTeach.showArr.length * 60}px`
    },
    visableList() {
      if (this.model.localTeach.showArr) {
        return this.model.localTeach.showArr.slice(this.firstCellInView, this.firstCellInView + this.visableCount)
      }
      return []
    },
    isMarginLeft: () => ({
      'list-margin-left': window.GlobalUtil.model.localTeach.curProj.type === 'discontinuous',
    }),
    visableCount() {
      return (this.parentWidth / 60) + 1
    }
  },
};

</script>
<style lang="scss" scoped>
.list-project-wrapper {
  width: 70%;
  overflow-x: auto;
  background: #434343;
  display: flex;
  justify-content: flex-start;
  position: relative;
  .scroll-container {
    position: absolute;
  }
  // height: 250px;
  // align-items: center;
}
.list-project-wrapper::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 12px;
}
.list-project-wrapper::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 6px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #7E7E7E;
}
.list-project-wrapper::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px #434343;
  border-radius: 0;
  background: #434343;
  // background: yellow;
}
.list-margin-left {
  margin-left: -30px;
}
.bgcolor0 {
  background-color: transparent;
}
.bgcolor1 {
  background-color: green;
}
.block-cell {
  display:flex;
  // justify-content: flex-start;
  // align-items: center;
  font-size: 5px;
  position: relative;
  .cell-wrapper {
    position: absolute;
  }
  // text-align: center;
}
</style>

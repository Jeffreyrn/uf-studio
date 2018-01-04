<template>
  <div class="main-wrapper" id="editor-wrapper">
    <TopMenu></TopMenu>
    <div id="total-frame" class="float-left total-frame position-absolute">
      <!-- <ProjTree class="float-left left-frame"></ProjTree> -->
      <ElTree id="left-frame" class="float-left left-frame position-absolute"></ElTree>
      <!-- <FilesOpenTab></FilesOpenTab> -->
      <div id="right-frame" class="float-left right-frame position-absolute">
        <div class="float-left top-tab-color">
          <div class="float-left" style="height:20px;width:1px;"></div>
          <template v-for='(data,index) in model.localProjTree.curOpenedFilesList'>
            <TopTab :data='data'></TopTab>
          </template>
        </div>
        <div class="float-clear"></div>
        <div class="float-left" style="width:100%">
          <CodeEditor></CodeEditor>
          <div class="" style="background-color:#e9e6d3;height:20px"></div>
          <div class="" style="background-color:gray;height:100px;overflow:scroll;">
            <el-input
              type="textarea"
              :rows="4"
              v-model="model.localProjTree.runningCmdResult">
            </el-input>
          </div>
          <div class="float-clear"></div>
          <ResultRun class="result-frame position-absolute" style="width:100%"></ResultRun>
        </div>
      </div>
    </div>
    <!-- <div style="z-index:10;position:absolute;overflow:hidden;left:18%;width:15px;height:100%;background-color:red;"></div> -->
  </div>
</template>
<script>
import TopMenu from './editor/TopMenu';
// import ProjTree from './editor/ProjTree';
import ElTree from './editor/ElTree';
import CodeEditor from './editor/CodeEditor';
import ResultRun from './editor/ResultRun';
import TopTab from './editor/TopTab';
// import FilesOpenTab from './editor/FilesOpenTab';

import '../assets/css/reseet.css';

export default {
  data() {
    return {
      model: GlobalUtil.model,
      clientWidth: 100,
      clientHeight: 200,
      leftFrameWidth: 200,
    };
  },
  mounted() {
    // let totalFrame = document.getElementById("total-frame");
    // totalFrame.style.height = `${screen.height - 400}px`;
    window.addEventListener('resize', this.onwinresize, false);
    this.onwinresize();
    CommandsSocket.listProjs((dict) => {

    });
  },
  methods: {
    onwinresize() {
      // console.log(`global window width: ${document.body.clientWidth}, height: ${document.body.clientHeight}`);
      // let store = self.store;
      this.clientWidth = document.body.clientWidth;
      this.clientHeight = document.body.clientHeight;
      console.log(`2 global window width: ${this.clientWidth}, height: ${this.clientHeight}`);
      // self.store = store;
      const leftFrame = document.getElementById("left-frame");
      // leftFrame.style.width = `${leftFrameWidth}px`;
      const rightFrame = document.getElementById("right-frame");
      rightFrame.style.width = `${this.clientWidth - this.leftFrameWidth}px`;
    },
  },
  beforeDestroy() {
  },
  watch: {
  },
  computed: {
    // openedFilesList() {
    //   // GlobalUtil.model.localProjTree.curOpenedFilesList
    //   const proId = GlobalUtil.model.localProjTree.curProj.uuid;
    //   const curOpenedTabs = GlobalUtil.model.localProjTree.curOpenedTabs[proId];
    //   // console.log(`curOpenedTabs = $`);
    //   return curOpenedTabs;
    // },
  },
  components: {
    TopMenu,
    // ProjTree,
    ElTree,
    CodeEditor,
    ResultRun,
    TopTab,
    // FilesOpenTab,
  },
};
</script>
<style scoped>
#editor-wrapper {
  background: white;
  text-align: left;
}
a {
  color: white;
}
.position-absolute {
  position: absolute;
}
.total-frame {

  /*background-color:gray;*/
  width:100%;
  height:600px;
}
.left-frame {
  width:200px;
  height: 100%;
  overflow: scroll;
}
.right-frame {
  left: 200px;
  width:85%;
  /*width:100%;*/
  height: 100%;
  /*background-color:#e9e6d3;*/
  background-color:#f6f6f6;
}
.result-frame {
  /*position: absolute;*/
  background-color:#e9e6d3;
  /*position:absolute;*/
  bottom:0px;
  padding:0px;
  margin:0px;
}
.top-tab-color {
  width: 100%;
  background-color:#e9e6d3;
}
</style>

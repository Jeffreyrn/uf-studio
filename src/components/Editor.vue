<template>
  <div class="main-wrapper editor-wrapper">
    <div class="top-style">
      <router-link :to="{ name: 'Home'}">
        <!-- <el-button >Home</el-button> -->
        <div class="back-icon"></div>
      </router-link>
      <span class="title-ide">IDE</span>
    </div>
    <TopMenu style="position:absolute;width:100%;top:64px;height:36px;background:#313131;"></TopMenu>
    <div class="float-clear"></div>
    <div id="total-frame" class="total-frame position-absolute">
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
          <template v-for='(data,index) in model.localProjTree.curOpenedFilesList'>
            <CodeEditor :data='data'></CodeEditor>
          </template>
          <!-- <div class="" style="background-color:#e9e6d3;height:20px"></div> -->
          <!-- <div class="position-absolute" style="background-color:gray;width:100%;height:200px;bottom:35px;">
          </div> -->
          <div class="position-absolute" v-if="model.localProjTree.isResultFrameDisplay" style="width:100%;bottom:40px;left:0px;">
            <div style="width:100%;height:18px;background:#434749;">
              <!-- background-image: url('./../assets/img/ide/icon_close.svg'); -->
              <!-- background-image:url('./../assets/img/ide/icon_btmclose.svg'); -->
              <!-- background:yellow; -->
              <div class="position-absolute" style="top:0px;right:10px;width:18px;height:18px;background:yellow;cursor:pointer;" @click="onCloseResult()"></div>
            </div>
            <textarea
              id="result-text"
              type="textarea"
              disabled
              style="background:#313131;width:100%;color:white;border:0;height:100px;"
              v-model="model.localProjTree.runningCmdResult">
            </textarea>
          </div>
      </div>
      <ResultRun class="result-frame position-absolute" style="width:100%;"></ResultRun>
    </div>
    </div>
    <!-- <div style="z-index:10;position:absolute;overflow:hidden;left:18%;width:15px;height:100%;background-color:red;"></div> -->
  </div>
</template>
<script>
// import GlobalUtil from '../core/global_util';
import TopMenu from './editor/TopMenu';
// import ProjTree from './editor/ProjTree';
import ElTree from './editor/ElTree';
import CodeEditor from './editor/CodeEditor';
import ResultRun from './editor/ResultRun';
import TopTab from './editor/TopTab';
// import FilesOpenTab from './editor/FilesOpenTab';

import '../assets/css/reseet.css';
import { setTimeout } from 'timers';

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
    const curFile = GlobalUtil.model.localProjTree.curFile;
    if (curFile !== null && curFile !== undefined && curFile.uuid !== undefined) {
      // const editors = document.getElementsByName("code-editor");
      // console.log(`editor value =  cur ${curFile.uuid}`);
      // for (let i = 0; i < editors.length; i += 1) {
      //   const editor = editors[i];
      //   editor.style.display = 'none';
      // }
      GlobalUtil.model.localProjTree.setSelectedUI(curFile.uuid);
    }
    window.addEventListener('resize', GlobalUtil.model.localProjTree.onwinresize, false);
    GlobalUtil.model.localProjTree.onwinresize();
    // self.onwinresize
    // setTimeout(() => {
    //   GlobalUtil.model.localProjTree.onwinresize();
    // }, 5);
    CommandsEditorSocket.listProjs((dict) => {

    });

    // const leftFrame = document.getElementById("left-frame");
  //   const rightFrame = document.getElementById("right-frame");
  // const totalFrameWidth = document.body.clientWidth;//- 120;
  // const leftFrameWidth = 200;
  // const rightFrameWidth = totalFrameWidth - leftFrameWidth;
  // console.log(`totalFrameWidth = ${totalFrameWidth}, rightFrameWidth = ${rightFrameWidth}`);
  // totalFrame.style.width = `${totalFrameWidth}px`;
  // rightFrame.style.width = `${rightFrameWidth}px`;
  // totalFrame.style.height = `${totalFrameHeight}px`;

    // const editors = document.getElementsByName("code-editor");
    // for (let i = 0; i < editors.length; i += 1) {
    //   const editor = editors[i];
    //   console.log(`editor value = ${JSON.stringify(editor)}`);
    // }
    // console.log(`rightFrame value 1`);
    // const rightFrame = document.getElementById("right-frame");
    // console.log(`rightFrame value = ${rightFrame.innerHTML}`);
    // console.log(`rightFrame value 2`);
  },
  methods: {
    onCloseResult() {
      GlobalUtil.model.localProjTree.isResultFrameDisplay = false;
      GlobalUtil.model.localProjTree.onwinresize();
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

.editor-wrapper {
  text-align: left;
}

a {
  color: white;
}

.top-style {
  position:absolute;
  height:67px;
  width:100%;
  background: #3C3F41;
}

.back-icon {
  position: absolute;
  left: 20px;
  width: 28px;
  height: 28px;
  top: 50%;
  transform: translateY(-50%);
  background-image: url('./../assets/img/ide/icon_back.svg');
}

.title-ide {
  position: absolute;
  left: 62px;
  top: 50%;
  transform: translateY(-50%);
  font-family: Gotham-Bold;
  font-size: 36px;
  color: #FFFFFF;
  letter-spacing: -1px; 
}

.total-frame {
  /*background-color:gray;*/
  width:100%;
  height:600px;
  top: 100px;
  /* left: 10px; */
  border:1px solid #96c2f1;
  background:yellow;
  /*top: 200px;
  left: 100px;*/
}

.left-frame {
  width:200px;
  height: 100%;
  overflow-y: scroll;
  background: #3C3F41;
  scrollbar-track-color: #3C3F41;
}

.right-frame {
  left: 200px;
  /* width:90%; */
  /*width:100%;*/
  height: 100%;
  /*background-color:#e9e6d3;*/
  background: #3C3F41;
}

.result-frame {
  /*position: absolute;*/
  background-color:#e9e6d3;
  /*position:absolute;*/
  left:0px;
  bottom:0px;
  padding:0px;
  margin:0px;
}

.top-tab-color {
  width: 100%;
  background: #313335;
}

</style>

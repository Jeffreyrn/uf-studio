<template>
  <div class="main-wrapper" id="editor-wrapper">
    <TopMenu></TopMenu>
    <div class="float-left total-frame">
      <!-- <ProjTree class="float-left left-frame"></ProjTree> -->
      <ElTree class="float-left left-frame"></ElTree>
      <!-- <FilesOpenTab></FilesOpenTab> -->
      <div class="float-left right-frame">
        <div class="float-left">
          <div class="float-left" style="height:20px;width:1px;"></div>
          <template v-for='(data,index) in model.localProjTree.curOpenedFilesList'>
            <TopTab :data='data'></TopTab>
          </template>
        </div>
        <div class="float-clear"></div>
        <div class="float-left" style="width:100%">
          <CodeEditor></CodeEditor>
          <ResultRun class="result-frame"></ResultRun>
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
      null: '.',
    };
  },
  mounted() {
  },
  methods: {
  },
  beforeDestroy() {
  },
  watch: {
  },
  computed: {
    openedFilesList() {
      // GlobalUtil.model.localProjTree.curOpenedFilesList
      const proId = GlobalUtil.model.localProjTree.curProj.uuid;
      const curOpenedTabs = GlobalUtil.model.localProjTree.curOpenedTabs[proId];
      // console.log(`curOpenedTabs = $`);
      return curOpenedTabs;
    },
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
.total-frame {
  /*background-color:gray;*/
  width:100%;
  height:450px;
}
.left-frame {
  width:20%;
  height: 100%;
  overflow: scroll;
}
.right-frame {
  width:80%;
  height: 100%;
  background-color:#e9e6d3;
}
.result-frame {
  /*height:200px;*/
}

</style>

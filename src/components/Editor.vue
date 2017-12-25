<template>
  <div class="main-wrapper" id="editor-wrapper">
    <TopMenu></TopMenu>
    <div class="float-left total-frame">
      <ProjTree class="float-left left-frame"></ProjTree>
      <div class="float-left">
        <div class="float-left">.</div>
        <template v-for='(data,index) in model.localProjTree.curOpenedFilesList'>
          <TopTab :data='data'></TopTab>
        </template>
      </div>
      <div class="float-left right-frame">
        <CodeEditor></CodeEditor>
        <ResultRun class="result-frame"></ResultRun>
      </div>
    </div>
    <!-- <div style="z-index:10;position:absolute;overflow:hidden;left:18%;width:15px;height:100%;background-color:red;"></div> -->
  </div>
</template>
<script>
import TopMenu from './editor/TopMenu';
import ProjTree from './editor/ProjTree';
import CodeEditor from './editor/CodeEditor';
import ResultRun from './editor/ResultRun';
import TopTab from './editor/TopTab';

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
  },
  components: {
    TopMenu,
    ProjTree,
    CodeEditor,
    ResultRun,
    TopTab,
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
.float-clear {
  clear: both;
}
.float-left {
  float: left;
}
.float-right {
  float: right;
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
  background-color:green;
}
.result-frame {
  /*height:200px;*/
}
</style>

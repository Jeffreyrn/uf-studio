<template>
  <div class="main-wrapper" id="editor-wrapper">
    <TopMenu></TopMenu>
    <div class="float-left total-frame">
      <ProjTree class="float-left left-frame"></ProjTree>
      <div class="float-left right-frame">
        <CodeEditor></CodeEditor>
        <ResultRun class="result-frame"></ResultRun>
      </div>
    </div>
    <div style="z-index:10;position:absolute;left:19%;width:15px;height:500px;background-color:red;"></div>
  </div>
</template>
<script>
import TopMenu from './editor/TopMenu';
import ProjTree from './editor/ProjTree';
import CodeEditor from './editor/CodeEditor';
import ResultRun from './editor/ResultRun';

import '../assets/css/reseet.css';

export default {
  data() {
    return {
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
.float-left {
  float: left;
}
.total-frame {
  background-color:gray;
  width:100%;
}
.left-frame {
  width:20%;
}
.right-frame {
  width:80%;
  background-color:green;
}
.result-frame {
  height:200px;
}

</style>

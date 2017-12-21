<template>
  <div class="main-wrapper" id="editor-wrapper">
    <div>
      Menu
    </div>
    <div style="float:left;background-color:yellow;width:100%;">
      <ProjMenu style="float:left;width:15%;"></ProjMenu>
      <div style="float:left;width:85%;background-color:green;">
        <CodeEditor></CodeEditor>
        <div style="height:20px;background-color:green;">
          Run
        </div>
        <div style="height:200px;background-color:blue;">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProjMenu from './editor/ProjMenu';
import CodeEditor from './editor/CodeEditor';

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
    ProjMenu,
    CodeEditor,
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
</style>

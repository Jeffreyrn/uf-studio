<template>
  <div>
    <el-input class="float-left" id="pip-install-input-id" v-model="input" placeholder="pip install" style="width:500px;"></el-input>
    <el-button class="float-right" @click="clearText()">Clear</el-button>
    <el-button class="float-right" @click="runCmd()">Run</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      model: GlobalUtil.model,
    };
  },
  mounted() {
  },
  methods: {
    clearText() {
      GlobalUtil.model.localProjTree.runningCmdResult = '';
    },
    runCmd() {
      console.log(`run run`);
      if (this.input === null || this.input === undefined || this.input === '') {
        return;
      }
      GlobalUtil.model.localProjTree.isResultFrameDisplay = true;
      // GlobalUtil.model.localProjTree.runningCmdResult = "";
      GlobalUtil.model.localProjTree.onwinresize();
      CommandsEditorSocket.stopPythonScript((dict) => {
        console.log(`has stopPythonScript = ${JSON.stringify(dict)}`);
        // GlobalUtil.model.localProjTree.runningCmdResult = "";
        CommandsEditorSocket.runPipCommand(this.input, [], (dict) => {
          // GlobalUtil.model.localProjTree.runningCmdResult = "";
          GlobalUtil.model.localProjTree.remoteCmdResult2Local(dict);
        });
      });

    },
  },
  beforeDestroy() {
  },
  watch: {
  },
  computed: {
  },
  components: {
  },
};
</script>

<style scoped>
</style>

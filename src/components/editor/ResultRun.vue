<template>
  <div>
    <el-input v-model="input" placeholder="pip install" style="width:500px;"></el-input>
    <el-button @click="runCmd()">Run</el-button>
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
    runCmd() {
      console.log(`run run`);
      if (this.input === null || this.input === undefined || this.input === '') {
        return;
      }
      CommandsSocket.stopPythonScript((dict) => {
        console.log(`has stopPythonScript = ${JSON.stringify(dict)}`);
        // GlobalUtil.model.localProjTree.runningCmdResult = "";
        CommandsSocket.runPipCommand(this.input, [], (dict) => {
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

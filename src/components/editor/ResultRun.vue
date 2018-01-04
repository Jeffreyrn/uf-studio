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
      GlobalUtil.model.localProjTree.runningCmdResult = "";
      CommandsSocket.runPipCommand(this.input, [], (dict) => {
        let stdout = dict.data.stdout;
        const programID = dict.data.program_id;
        if (stdout === undefined && programID === undefined) {
          stdout = dict.data;
        }
        if (stdout !== undefined) {
          GlobalUtil.model.localProjTree.runningCmdResult += stdout + "\n";
          // GlobalUtil.model.localProjTree.runningCmdResult = stdout;
        }
        if (programID !== undefined) {
          GlobalUtil.model.localProjTree.runningCmdProgramID = programID;
        }
        console.log(`runPipCommand dict = ${stdout}, programID = ${programID}`);
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

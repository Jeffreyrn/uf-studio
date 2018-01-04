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
      CommandsSocket.runPipCommand(this.input, [], (dict) => {
        const stdout = dict.data.stdout;
        const programID = dict.data.program_id;
        if (stdout !== undefined) {
          GlobalUtil.model.localProjTree.runningCmdResult = stdout;
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

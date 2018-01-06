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
        GlobalUtil.model.localProjTree.remoteCmdResult2Local(dict);
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


<template>
  <div style="height:30px;background:#282828;">
    <input
      class="float-left pip-input-text"
      id="pip-install-input-id"
      v-model="input"
      placeholder="pip install" />
    <!-- <el-button class="float-right" @click="clearText()">Clear</el-button> -->
    <!-- <span v-if="model.localProjTree.isCmdRunning===true">
      <el-button class="float-right" @click="runCmd()" disabled>
        Run
      </el-button>
    </span> -->
    <div class="clear-icon float-right" @click="clearText()" title='Clear'>
    </div>
    <span v-if="model.localProjTree.isCmdRunning===false">
      <div class="run-icon float-right" @click="runCmd()" title='Run'>
      </div>
    </span>
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
    GlobalUtil.model.localProjTree.onwinresize();
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
        GlobalUtil.model.localProjTree.runningCmdResult = "";
        CommandsEditorSocket.runPipCommand(this.input, [], (dict) => {
          // GlobalUtil.model.localProjTree.isCmdRunning = true;
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

.pip-input-text {
  width:1100px;
  height:30px;
  border:0;
  background:#46494B;
  color:white;
  /* box-shadow:inset 0 0 0px 0 rgba(255,255,255,0.50); */
  /* top: -5px; */
  bottom: 5px;
  padding-left: 10px;
  outline:none;
}

.run-icon {
  margin-right: 1px;
  /* margin-top: 4px; */
  width: 30px;
  height: 30px;
  background: #3C3F41;
  background-image: url('./../../assets/img/ide/icon_running.svg');
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.clear-icon {
  margin-right: 0px;
  /* margin-top: 4px; */
  width: 30px;
  height: 30px;
  background: #3C3F41;
  background-image: url('./../../assets/img/ide/btn_clear.svg');
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

</style>

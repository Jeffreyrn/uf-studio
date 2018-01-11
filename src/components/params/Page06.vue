<template lang="html">
    <div class="app-container">
      Cmd Test
      <button class="change-btn" @click="xarm_get_version()">xarm_get_version</button>
      <button class="change-btn" @click="xarm_get_state()">xarm_get_state</button>
      <button class="change-btn" @click="xarm_get_tcp_pose()">xarm_get_tcp_pose</button>
      <button class="change-btn" @click="xarm_get_joint_pose()">xarm_get_joint_pose</button>
      <div>{{ socketCom.response }}</div>
      <div>{{ socketCom.diff }}</div>
    </div>
</template>
<script>
console.log('Rounter = 06');

export default {
  data() {
    return {
      socketCom: GlobalUtil.socketCom,
      // diff: 0,
    };
  },
  methods: {
    xarm_get_joint_pose() {
      CommandsEditorSocket.sendCmd(CommandsEditorSocket.CMD_ID_GET_POINT_POSE, '', (dict) => {
      });
    },
    xarm_get_tcp_pose() {
      CommandsEditorSocket.sendCmd(CommandsEditorSocket.CMD_ID_GET_TCP_POSE, '', (dict) => {
      });
    },
    xarm_get_version() {
      CommandsEditorSocket.sendCmd(CommandsEditorSocket.CMD_ID_GET_VERSION, '', (dict) => {
      });
    },
    xarm_get_state() {
      CommandsEditorSocket.sendCmd(CommandsEditorSocket.CMD_ID_GET_STATE, '', (dict) => {
      });
    },
  },
  mounted() {
  },
  beforeDestroy() {
  },
  components: {
  },
  computed: {
  },
};

</script>
<style lang="scss" scoped>

</style>

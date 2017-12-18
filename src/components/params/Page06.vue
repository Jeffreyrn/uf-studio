<template lang="html">
    <div class="app-container">
      Cmd Test
      <button class="change-btn" @click="xarm_get_version()">xarm_get_version</button>
      <button class="change-btn" @click="xarm_get_state()">xarm_get_state</button>
      <div>{{ socketCom.response }}</div>
      <div>{{ diff }}</div>
    </div>
</template>
<script>

console.log("Rounter = 06");

export default {
  data() {
    return {
      socketCom: GlobalUtil.socketCom,
      diff: 0,
    };
  },
  methods: {
    xarm_get_version() {
      const self = this;
      var startTime  = new Date().getTime();
      GlobalUtil.socketCom.send_msg({
        cmd: 'xarm_get_version',
        data: '',
      }, function(dict) {
        console.log('send response = ' + JSON.stringify(dict));
        var endTime2  = new Date().getTime();
        const diff = endTime2 - startTime;
        self.diff = 'time diff = ' + diff + ' ms';
      });
    },
    xarm_get_state() {
      const self = this;
      var startTime  = new Date().getTime();
      GlobalUtil.socketCom.send_msg({
        cmd: 'xarm_get_state',
        data: '',
      }, function(dict) {
        console.log('send response = ' + JSON.stringify(dict));
        var endTime2  = new Date().getTime();
        const diff = endTime2 - startTime;
        self.diff = 'time diff = ' + diff + ' ms';
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

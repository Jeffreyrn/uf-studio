<template lang="html">
    <div class="app-container">
      Device Info
      <div>{{ deviceInfo }}</div>
      <div>{{ deviceStatus }}</div>
    </div>

</template>
<script>

console.log("Rounter = 05");

export default {
  data() {
    return {
      model: GlobalUtil.model,
    };
  },
  methods: {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  components: {
  },
  computed: {
    deviceInfo() {
      return GlobalUtil.model.localDeviceInfo.dump();
    },
    deviceStatus() {
      return GlobalUtil.model.localDeviceStatus.dump();
    },
  },
};

</script>
<style lang="scss" scoped>

</style>

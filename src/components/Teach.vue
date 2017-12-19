<template lang="html">
    <div id='index-page' class='app-container limitWH'>
      <div>
        Teach
      </div>
    </div>
</template>
<script>
import GlobalUtil from '../core/global_util';

export default {
  data() {
    return {
      model: GlobalUtil.model,
      width: 0,
      height: 0,
    };
  },
  mounted() {
    GlobalUtil.fixSize();
  },
  methods: {
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

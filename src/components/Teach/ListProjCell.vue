<template lang="html">
  <div class="float-left" style="border:1px solid lightgray;width:40px;height:50px;" @click='onSelect($event, index)'>
    <!-- button -->
    <div style="width:40px;height:20px;background-color:yellow;">
      <!-- isContinus true -->
      <div v-if="model.localTeach.isContinus===true">
        <div class="float-left" v-if="index % 10 === 0" style="background-color:lightpink;">
          {{ parseInt(index / 10) }}.0s
        </div>
        <div v-if="index % 10 !== 0">
          <div class="float-left" v-if="index < model.localTeach.fileDatas[file.uuid].length">
            .{{ index % 10 }}
          </div>
        </div>
      </div>
      <!-- isContinus true end -->

      <!-- isContinus false -->
      <div v-if="model.localTeach.isContinus!==true">
        <div class="float-left">
          {{ index }}
        </div>
      </div>
      <!-- isContinus false end -->

      <div class="float-left" v-if="index === model.localTeach.curSelectedIndex" style="width:40px;height:1px;background-color:red;"></div>
    </div>
    <!-- button end -->
  </div>
</template>
<script>

import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
  props: ['file', 'index'],
  data() {
    return {
      model: GlobalUtil.model,
    };
  },
  mounted() {
  },
  methods: {
    onSelect(e, index) {
      GlobalUtil.model.localTeach.onSelect(e, index);
    },
  },
  beforeDestroy() {
  },
  components: {
  },
  computed: {
    classObject: () => {
      return {
        'bgcolor0': !GlobalUtil.model.localProjTree.hasOpenFileInCurPro,
        'bgcolor1': GlobalUtil.model.localProjTree.hasOpenFileInCurPro,
      }
    },
  },
};

</script>
<style lang="scss" scoped>

</style>

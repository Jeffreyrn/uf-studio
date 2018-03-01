<template lang="html">
  <div class="line-block-wrapper" @click='onSelect($event, index)'>
    <!-- button -->
    <div class="line-block">
      <!-- isContinus true -->
      <div v-if="model.localTeach.curProj.type==='continuous'">
        <div v-if="index % 10 === 0" style="background-color:lightpink;">
          {{ parseInt(index / 10) }}.0s
        </div>
        <div v-else>
          <div v-if="model.localTeach.curEditingFileUUID===''">
            <div v-if="index < model.localTeach.fileDatas['temp'].length">
              .{{ index % 10 }}
            </div>
          </div>
          <div v-else>
            <div v-if="index < model.localTeach.fileDatas[file.uuid].length">
              .{{ index % 10 }}
            </div>
          </div>
        </div>
      </div>
      <!-- isContinus true end -->

      <!-- isContinus false -->
      <div v-else>
        <div>
          {{ index }}
        </div>
      </div>
      <!-- isContinus false end -->
      <div v-if="model.localTeach.curProj.type==='discontinuous' && index === model.localTeach.curSelectedIndex" style="width:60px;height:1px;background-color:red;"></div>
    </div>
    <!-- button end -->
  </div>
</template>
<script>

export default {
  props: ['file', 'index'],
  data() {
    return {
      model: GlobalUtil.model,
    };
  },
  mounted() {
    // console.log(`cell mounted index = ${this.index}`);
  },
  methods: {
    onSelect(e, index) {
      if (GlobalUtil.model.localTeach.curProj.type==='discontinuous') {
        GlobalUtil.model.localTeach.onSelect(e, index);
      }
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
.line-block-wrapper {
  /*border:1px solid lightgray;*/
  width:60px;
  height:30px;
}
.line-block {
  width:60px;
  height:30px;
  background-color:rgba(74,144,226,0.50);
  border-right: 1px solid #444;
  color: #fff;
  line-height: 30px;
}
</style>

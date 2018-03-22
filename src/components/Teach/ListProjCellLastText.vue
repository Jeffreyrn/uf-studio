<template lang="html">
  <div>
    <div class="line-block-text-right">
      <div v-if="model.localTeach.curEditingFileUUID==='' && index===model.localTeach.fileDatas['temp'].length-1">
        <div v-if="(index+1) % 10 === 0">
          {{ parseInt((index+1) / 10) }}.0s
        </div>
        <div v-else>
          .{{ (index+1) % 10 }}
        </div>
      </div>
      <div v-else>
        <div v-if="index===model.localTeach.fileDatas[file.uuid].length-1">
          <div v-if="(index+1) % 10 === 0">
            {{ parseInt((index+1) / 10) }}.0s
          </div>
          <div v-else>
            .{{ (index+1) % 10 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ['file', 'index'],
  data() {
    return {
      model: window.GlobalUtil.model,
    };
  },
  mounted() {
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
.line-block-text-right {
  width:60px;
  height:30px;
  font-family: 'Gotham-Book';
  font-size: 14px;
  color: #FFFFFF;
  text-align: right;
  margin-left: -5px;
  margin-top: -30px;
}
</style>

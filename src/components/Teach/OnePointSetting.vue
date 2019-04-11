<template lang="html">
  <div>
    <div class="block">
      <span>A0:</span>
      <el-slider
        v-model="model.localTeach.curPoint[0]"
        class='teach-slider'
        :min='aMin'
        :max='aMax'
        @change="onChange('a0', $event)"></el-slider>
        <span>{{ model.localTeach.curPoint[0] }}</span>
    </div>

    <div class="block">
      <span>A1:</span>
      <el-slider
        v-model="model.localTeach.curPoint[1]"
        class='teach-slider'
        :min='aMin'
        :max='aMax'
        @change="onChange('a1', $event)"></el-slider>
        <span>{{ model.localTeach.curPoint[1] }}</span>
    </div>

    <div class="block">
      <span>A2:</span>
      <el-slider
        v-model="model.localTeach.curPoint[2]"
        class='teach-slider'
        :min='aMin'
        :max='aMax'
        @change="onChange('a2', $event)"></el-slider>
        <span>{{ model.localTeach.curPoint[2] }}</span>
    </div>

    <div class="block">
      <span>A3:</span>
      <el-slider
        v-model="model.localTeach.curPoint[3]"
        class='teach-slider'
        :min='aMin'
        :max='aMax'
        @change="onChange('a3', $event)"></el-slider>
        <span>{{ model.localTeach.curPoint[3] }}</span>
    </div>

    <div class="block">
      <span>A4:</span>
      <el-slider
        v-model="model.localTeach.curPoint[4]"
        class='teach-slider'
        :min='aMin'
        :max='aMax'
        @change="onChange('a4', $event)"></el-slider>
        <span>{{ model.localTeach.curPoint[4] }}</span>
    </div>

    <div class="block">
      <span>A5:</span>
      <el-slider
        v-model="model.localTeach.curPoint[5]"
        class='teach-slider'
        :min='aMin'
        :max='aMax'
        @change="onChange('a5', $event)"></el-slider>
        <span>{{ model.localTeach.curPoint[5] }}</span>
    </div>

    <div class="block">
      <span>A6:</span>
      <el-slider
        v-model="model.localTeach.curPoint[6]"
        class='teach-slider'
        :min='aMin'
        :max='aMax'
        @change="onChange('a6', $event)"></el-slider>
        <span>{{ model.localTeach.curPoint[6] }}</span>
    </div>
    <!-- One setting end -->
  </div>
</template>
<script>

export default {
  data() {
    return {
      model: window.GlobalUtil.model,
      aMin: 0,
      aMax: 360,
    };
  },
  mounted() {
  },
  methods: {
    onChange(uid, value) {
      const curSelectedIndex = window.GlobalUtil.model.localTeach.curSelectedIndex;
      const curEditingFileUUID = window.GlobalUtil.model.localTeach.curEditingFileUUID;
      console.log(`${uid} change = ${value}, curSelectedIndex = ${curSelectedIndex}`);
      switch (uid) {
        case 'a0': {
          // GlobalUtil.model.localTeach.setPoint(0, curSelectedIndex, value);
          window.GlobalUtil.model.localTeach.updateFileData(curEditingFileUUID, curSelectedIndex, 0, value);
          break;
        }
        case 'a1': {
          // GlobalUtil.model.localTeach.setPoint(1, curSelectedIndex, value);
          window.GlobalUtil.model.localTeach.updateFileData(curEditingFileUUID, curSelectedIndex, 1, value);
          break;
        }
        case 'a2': {
          // GlobalUtil.model.localTeach.setPoint(2, curSelectedIndex, value);
          window.GlobalUtil.model.localTeach.updateFileData(curEditingFileUUID, curSelectedIndex, 2, value);
          break;
        }
        case 'a3': {
          // GlobalUtil.model.localTeach.setPoint(3, curSelectedIndex, value);
          window.GlobalUtil.model.localTeach.updateFileData(curEditingFileUUID, curSelectedIndex, 3, value);
          break;
        }
        case 'a4': {
          // GlobalUtil.model.localTeach.setPoint(4, curSelectedIndex, value);
          window.GlobalUtil.model.localTeach.updateFileData(curEditingFileUUID, curSelectedIndex, 4, value);
          break;
        }
        case 'a5': {
          // GlobalUtil.model.localTeach.setPoint(5, curSelectedIndex, value);
          window.GlobalUtil.model.localTeach.updateFileData(curEditingFileUUID, curSelectedIndex, 5, value);
          break;
        }
        case 'a6': {
          // GlobalUtil.model.localTeach.setPoint(6, curSelectedIndex, value);
          window.GlobalUtil.model.localTeach.updateFileData(curEditingFileUUID, curSelectedIndex, 6, value);
          break;
        }
        default:
          break;
      }
      // const myChart = window.myChart;
      // GlobalUtil.model.localTeach.fileData2ChartSeries(curEditingFileUUID);
      // const option = GlobalUtil.model.localTeach.chartOption;
      // myChart.setOption(option, true);
    },
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
.block {
  span{
    width: 50px;
  }
  display: flex;
  align-items: center;
  .teach-slider {
    width: 200px;
  }
}

</style>

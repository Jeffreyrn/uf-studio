<template lang="html">
    <div class='app-container'>
      <div>
        Teach
      </div>
      <div class="block">
        <span>X:</span>
        <el-slider v-model="model.localTeach.curPoint.x" class='teach-slider' @change="onChange('x', $event)">X:</el-slider>
      </div>
      <div class="block">
        <span>Y:</span>
        <el-slider v-model="model.localTeach.curPoint.y" class='teach-slider' @change="onChange('y', $event)"></el-slider>
      </div>
      <div class="block">
        <span>Z:</span>
        <el-slider v-model="model.localTeach.curPoint.z" class='teach-slider' @change="onChange('z', $event)"></el-slider>
      </div>
      <button value='start' @click='onClick($event)'>Start</button>
      <button value='pause' @click='onClick($event)'>Pause</button>
      <button value='stop' @click='onClick($event)'>Stop</button>
      <div class="block">
        <span>Timer:</span>
        <el-slider v-model="model.localTeach.curDuration" class='teach-slider' :show-input='true' :min='0' :max='1800' style="width:1000px;" @change="onChange('time', $event)">
        </el-slider>
      </div>
    </div>
</template>
<script>
import GlobalUtil from '../core/global_util';

let t

export default {
  data() {
    return {
      model: GlobalUtil.model,
    };
  },
  mounted() {
    // GlobalUtil.fixSize();
  },
  methods: {
    onClick(e) {
      const attr = e.currentTarget.value;
      console.log(`attr = ${attr}`);
      switch (attr) {
        case 'pause':
          {
            clearTimeout(t);
            t = null;
            break;
          }
        case 'stop':
          {
            GlobalUtil.model.localTeach.curDuration = 0;
            clearTimeout(t);
            t = null;
            break;
          }
        case 'start':
          {
            if (t === undefined || t === null) {
              this.timedCount();
            }
            break;
          }
        default:
          break;
      }
    },
    onChange(uid, value) {
      console.log(`${uid} change = ${value}`);
    },
    timedCount() {
      GlobalUtil.model.localTeach.curDuration -= -1;
      t = setTimeout(this.timedCount, 100);
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

.teach-slider {
  margin-left: 20px;
}

.block {
  span{
    width: 50px;
  }
  display: flex;
  align-items: center;
  .el-slider {
    width: 400px;
  }
}

</style>

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
      <span>send: {{ sentCounter }}</span>
      <span>rec: {{ recCounter }}</span>
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

let t;

export default {
  data() {
    return {
      model: GlobalUtil.model,
      diff: 0,
      sentCounter: 0,
      recCounter: 0,
    };
  },
  mounted() {
    // GlobalUtil.fixSize();
  },
  methods: {
    test_get_pos() {
      const self = this;
      self.sentCounter += 1;
      const startTime = new Date().getTime();
      GlobalUtil.socketCom.send_msg({
        cmd: 'xarm_get_tcp_pose',
        data: '',
      }, (dict) => {
        console.log(`send response = ${JSON.stringify(dict)}`);
        const endTime2 = new Date().getTime();
        const diff = endTime2 - startTime;
        self.diff = `time diff = ${diff} ms`;
        self.recCounter += 1;
      });
    },
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
            this.sentCounter = 0;
            this.recCounter = 0;
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
      if (GlobalUtil.model.localTeach.curDuration >= 1800) {
        GlobalUtil.model.localTeach.curDuration = 1800;
        clearTimeout(t);
        t = null;
      }
      else {
        this.test_get_pos();
        t = setTimeout(this.timedCount, 100);
      }
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

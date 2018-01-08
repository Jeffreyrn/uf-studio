<template lang="html">
    <div class='app-container'>
      <div>
        Teach
      </div>
      <span>send: {{ sentCounter }}</span>
      <span>rec: {{ recCounter }}</span>
      <el-button value='start' @click='onClick($event)'>Start</el-button>
      <el-button value='pause' @click='onClick($event)'>Pause</el-button>
      <el-button value='stop' @click='onClick($event)'>Stop</el-button>

      <!-- chart begin -->
      <div class="chart" id="echart-main-2">
      </div>
      <!-- chart end -->

      <div id="scroll-timer" style="margin-left:50px;width:1000px;height:100px;background-color:lightgray;overflow-x:scroll;">
        <div style="width:81100px;margin-top:20px;">
          <template v-for='index in showArr'>
            <div class="float-left" style="margin-left:5px;font-size:3px;width:40px;height:20px;background-color:yellow;">
              <div class="float-left" v-if="index % 10 === 0" style="background-color:lightpink;">
                {{ parseInt(index / 10) }}.0
              </div>
              <div class="float-left" v-if="index % 10 !== 0 && index <= model.localTeach.curDuration">
                <div style="background-color:lightgreen">
                  .{{ index % 10 }}
                </div>
              </div>
              <div class="float-left" v-if="index % 10 !== 0 && index > model.localTeach.curDuration">
                <div style="">
                  .{{ index % 10 }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <!-- <div>
        <div class="float-left" style="margin-left:20px;width:20px;height:20px;background-color:yellow">
        </div>
        <div class="float-left" style="margin-left:20px;width:20px;height:20px;background-color:yellow">
        </div>
      </div> -->
      <div class="float-clear"></div>
      <div class="block">
        <span>hand(ms):</span>
        <el-slider
          v-model="model.localTeach.curDuration"
          class='teach-slider'
          :min='minMs'
          :max='maxMs'
          @change="onChange('ms-time', $event)">
        </el-slider>
      </div>

      <div class="block">
        <span>A0:</span>
        <el-slider
          v-model="model.localTeach.curPoint.a0"
          class='teach-slider'
          :min='aMin'
          :max='aMax'
          @change="onChange('a0', $event)"></el-slider>
      </div>

      <div class="block">
        <span>A1:</span>
        <el-slider
          v-model="model.localTeach.curPoint.a1"
          class='teach-slider'
          :min='aMin'
          :max='aMax'
          @change="onChange('a1', $event)"></el-slider>
      </div>

      <div class="block">
        <span>A2:</span>
        <el-slider
          v-model="model.localTeach.curPoint.a2"
          class='teach-slider'
          :min='aMin'
          :max='aMax'
          @change="onChange('a2', $event)"></el-slider>
      </div>

      <div class="block">
        <span>A3:</span>
        <el-slider
          v-model="model.localTeach.curPoint.a3"
          class='teach-slider'
          :min='aMin'
          :max='aMax'
          @change="onChange('a3', $event)"></el-slider>
      </div>

      <div class="block">
        <span>A4:</span>
        <el-slider
          v-model="model.localTeach.curPoint.a4"
          class='teach-slider'
          :min='aMin'
          :max='aMax'
          @change="onChange('a4', $event)"></el-slider>
      </div>

      <div class="block">
        <span>A5:</span>
        <el-slider
          v-model="model.localTeach.curPoint.a5"
          class='teach-slider'
          :min='aMin'
          :max='aMax'
          @change="onChange('a5', $event)"></el-slider>
      </div>

      <div class="block">
        <span>A6:</span>
        <el-slider
          v-model="model.localTeach.curPoint.a6"
          class='teach-slider'
          :min='aMin'
          :max='aMax'
          @change="onChange('a6', $event)"></el-slider>
      </div>
    </div>
</template>
<script>

const echarts = require('echarts');
let t;


export default {
  data() {
    return {
      showArr: [],
      model: GlobalUtil.model,
      diff: 0,
      sentCounter: 0,
      recCounter: 0,
      minMs: 0,
      maxMs: 1800,
      aMin: 0,
      aMax: 360,
    };
  },
  mounted() {
    // GlobalUtil.fixSize();

    //
    const dom = document.getElementById('echart-main-2');
    const myChart = echarts.init(dom);
    window.myChart = myChart;
    const option = GlobalUtil.model.localTeach.chartOption;
    if (option && typeof option === 'object') {
      myChart.setOption(option, true);
    }

    this.showArr = [];
    for (let i = GlobalUtil.model.localTeach.msMin; i <= GlobalUtil.model.localTeach.msMax; i += 1) {
      this.showArr.push(i);
    }
    // GlobalUtil.model.localTeach.chartOption.xAxis.data = this.showArr;
  },
  methods: {
    test_get_pos() {
      const self = this;

      const startTime = new Date().getTime();

      GlobalUtil.model.localTeach.genAndPushTestPoints();
      const myChart = window.myChart;
      const option = GlobalUtil.model.localTeach.chartOption;
      myChart.setOption(option, true);

      // const points = CommandsSocket.getTestPost();
      // console.log(`get points = ${JSON.stringify(points)}`);
      //
      // if (self.sentCounter % 100 === 0) {
      //   GlobalUtil.model.localTeach.pushPoint(points);
      //   const option = GlobalUtil.model.localTeach.chartOption;
      //   GlobalUtil.model.localTeach.chartOption = option;
      //   const myChart = window.myChart;
      //   myChart.setOption(option, true);
      // }

      self.sentCounter += 1;
      self.recCounter += 1;

      // GlobalUtil.socketCom.send_msg({
      //   cmd: 'xarm_get_tcp_pose',
      //   data: '',
      // }, (dict) => {
      //   console.log(`send response = ${JSON.stringify(dict)}`);
      //   const endTime2 = new Date().getTime();
      //   const diff = endTime2 - startTime;
      //   self.diff = `time diff = ${diff} ms`;
      //   self.recCounter += 1;
      // });
    },
    onClick(e) {
      const attr = e.currentTarget.value;
      console.log(`attr = ${attr}`);
      switch (attr) {
        case 'scroll':
          {
            document.getElementById("scroll-timer").scrollLeft = 3000;
            break;
          }
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
    scrollTo(time) {
      document.getElementById("scroll-timer").scrollLeft = 45 * (parseInt(time / 10) * 10);
    },
    onChange(uid, value) {
      console.log(`${uid} change = ${value}`);
      switch (uid) {
        case 'ms-time':
          {
            // console.log(`value = ${parseInt(value / 10)}`);
            this.scrollTo(value);
            break;
          }
        default:
          break;
      }
    },
    timedCount() {
      GlobalUtil.model.localTeach.curDuration -= -1;
      this.scrollTo(GlobalUtil.model.localTeach.curDuration);
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

.block {
  span{
    width: 150px;
  }
  display: flex;
  align-items: center;
  /*.el-slider {
    width: 400px;
  }*/
  .teach-slider {
    width: 400px;
  }
  .teach-slider-timer {
    /*width: 8000px;
    left: 20px;
    right: 20px;*/
  }
}

/*.time-slider-wrapper {
  margin-left: 20px;
  margin-right: 20px;
  width: 800px;
  height: 100px;
  background-color: yellow;
  overflow-x: scroll;
}*/
.chart {
  margin-left: 50px;
  background-color: white;
  width: 1000px;
  height: 300px;
}
</style>

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

      <div id="scroll-timer" style="font-size:5px;margin-left:50px;width:1000px;background-color:lightgray;overflow-x:scroll;" @scroll="checkscroll()">
        <div style="width:81100px;">
          <template v-for='index in showArr'>
            <div class="float-left" style="border:1px solid lightgray;width:40px;height:200px;background-color:#fffae2;" @click='onSelect($event, index)'>
              <!-- button -->
              <div style="width:40px;height:20px;background-color:yellow;">
                <div class="float-left" v-if="index % 10 === 0" style="background-color:lightpink;">
                  {{ parseInt(index / 10) }}.0
                </div>
                <div class="float-left" v-if="index % 10 !== 0">
                  <div style="background-color:lightgreen" v-if="index <= model.localTeach.curDuration">
                    .{{ index % 10 }}
                  </div>
                  <div style="" v-if="index > model.localTeach.curDuration">
                    .{{ index % 10 }}
                  </div>
                </div>
                <div class="float-left" v-if="index === curSelectedIndex" style="width:40px;height:1px;background-color:red;"></div>
              </div>
              <!-- button end -->

              <!-- data -->
              <!-- <div>
                {{ model.localTeach.chartOption.series[0].data[index] }}
              </div>
              <div>
                {{ model.localTeach.chartOption.series[1].data[index] }}
              </div>
              <div>
                {{ model.localTeach.chartOption.series[2].data[index] }}
              </div>
              <div>
                {{ model.localTeach.chartOption.series[3].data[index] }}
              </div>
              <div>
                {{ model.localTeach.chartOption.series[4].data[index] }}
              </div>
              <div>
                {{ model.localTeach.chartOption.series[5].data[index] }}
              </div>
              <div>
                {{ model.localTeach.chartOption.series[6].data[index] }}
              </div> -->
              <!-- data end -->
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
        <!-- <span>hand(ms):</span>
        <el-slider
          v-model="model.localTeach.curDuration"
          class='teach-slider'
          :min='minMs'
          :max='maxMs'
          @change="onChange('ms-time', $event)">
        </el-slider> -->
        <span>{{ model.localTeach.curDuration }}</span>
      </div>

      <el-button value='scroll' @click='onClick($event)'>Scroll to {{ model.localTeach.curDuration }}</el-button>

      <div class="block">
        <span>A0:</span>
        <el-slider
          v-model="model.localTeach.curPoint.a0"
          class='teach-slider'
          :min='aMin'
          :max='aMax'
          @change="onChange('a0', $event)"></el-slider>
          <span>{{ model.localTeach.curPoint.a0 }}</span>
      </div>

      <div class="block">
        <span>A1:</span>
        <el-slider
          v-model="model.localTeach.curPoint.a1"
          class='teach-slider'
          :min='aMin'
          :max='aMax'
          @change="onChange('a1', $event)"></el-slider>
          <span>{{ model.localTeach.curPoint.a1 }}</span>
      </div>

      <div class="block">
        <span>A2:</span>
        <el-slider
          v-model="model.localTeach.curPoint.a2"
          class='teach-slider'
          :min='aMin'
          :max='aMax'
          @change="onChange('a2', $event)"></el-slider>
          <span>{{ model.localTeach.curPoint.a2 }}</span>
      </div>

      <div class="block">
        <span>A3:</span>
        <el-slider
          v-model="model.localTeach.curPoint.a3"
          class='teach-slider'
          :min='aMin'
          :max='aMax'
          @change="onChange('a3', $event)"></el-slider>
          <span>{{ model.localTeach.curPoint.a3 }}</span>
      </div>

      <div class="block">
        <span>A4:</span>
        <el-slider
          v-model="model.localTeach.curPoint.a4"
          class='teach-slider'
          :min='aMin'
          :max='aMax'
          @change="onChange('a4', $event)"></el-slider>
          <span>{{ model.localTeach.curPoint.a4 }}</span>
      </div>

      <div class="block">
        <span>A5:</span>
        <el-slider
          v-model="model.localTeach.curPoint.a5"
          class='teach-slider'
          :min='aMin'
          :max='aMax'
          @change="onChange('a5', $event)"></el-slider>
          <span>{{ model.localTeach.curPoint.a5 }}</span>
      </div>

      <div class="block">
        <span>A6:</span>
        <el-slider
          v-model="model.localTeach.curPoint.a6"
          class='teach-slider'
          :min='aMin'
          :max='aMax'
          @change="onChange('a6', $event)"></el-slider>
          <span>{{ model.localTeach.curPoint.a6 }}</span>
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
      curSelectedIndex: 0,
    };
  },
  mounted() {
    // GlobalUtil.fixSize();

    //
    const dom = document.getElementById('echart-main-2');
    const myChart = echarts.init(dom);
    window.myChart = myChart;
    const option = GlobalUtil.model.localTeach.chartOption;
    myChart.setOption(option, true);

    this.showArr = [];
    for (let i = GlobalUtil.model.localTeach.msMin; i <= GlobalUtil.model.localTeach.msMax; i += 1) {
      this.showArr.push(i);
    }
    // GlobalUtil.model.localTeach.chartOption.xAxis.data = this.showArr;
  },
  methods: {
    checkscroll() {
      // console.log(`check scroll = ${document.getElementById("scroll-timer").scrollLeft}`);
    },
    test_get_pos() {
      const self = this;

      const startTime = new Date().getTime();

      GlobalUtil.model.localTeach.genAndPushTestPoints();
      const myChart = window.myChart;
      const option = GlobalUtil.model.localTeach.chartOption;
      if (self.sentCounter % 100 === 0) {
        // myChart.setOption(option, true);
      }

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
    onSelect(e, index) {
      console.log(`onSelect = ${index}`);
      this.curSelectedIndex = index;
      const point = GlobalUtil.model.localTeach.getPoint(index);
      GlobalUtil.model.localTeach.curPoint.a0 = point[0];
      GlobalUtil.model.localTeach.curPoint.a1 = point[1];
      GlobalUtil.model.localTeach.curPoint.a2 = point[2];
      GlobalUtil.model.localTeach.curPoint.a3 = point[3];
      GlobalUtil.model.localTeach.curPoint.a4 = point[4];
      GlobalUtil.model.localTeach.curPoint.a5 = point[5];
      GlobalUtil.model.localTeach.curPoint.a6 = point[6];
    },
    onClick(e) {
      const attr = e.currentTarget.value;
      console.log(`attr = ${attr}`);
      switch (attr) {
        case 'scroll':
          {
            const time = GlobalUtil.model.localTeach.curDuration;
            document.getElementById("scroll-timer").scrollLeft = 40 * (parseInt(time / 10) * 10);
            break;
          }
        // case 'pause':
        //   {
        //     clearTimeout(t);
        //     t = null;
        //     break;
        //   }
        case 'stop':
          {
            CommandsSocket.debugSetBeart(false, 0.1, (dict) => {
              console.log(`SetBeart false = dict = ${JSON.stringify(dict)}`);
            });
            // GlobalUtil.model.localTeach.curDuration = 0;
            // clearTimeout(t);
            // t = null;
            this.sentCounter = 0;
            this.recCounter = 0;
            break;
          }
        case 'start':
          {
            CommandsSocket.debugSetBeart(true, 0.1, (dict) => {
              console.log(`SetBeart true = dict = ${JSON.stringify(dict)}`);

              GlobalUtil.model.localTeach.curDuration -= -1;
              this.scrollTo(GlobalUtil.model.localTeach.curDuration);
              if (GlobalUtil.model.localTeach.curDuration >= 1800) {
                GlobalUtil.model.localTeach.curDuration = 1800;
                // clearTimeout(t);
                // t = null;

                CommandsSocket.debugSetBeart(false, (dict) => {
                  console.log(`SetBeart false = dict = ${JSON.stringify(dict)}`);
                });
              }
              else {
                this.test_get_pos();
                // t = setTimeout(this.timedCount, 100);
              }

            });
            // if (t === undefined || t === null) {
            //   this.timedCount();
            // }
            break;
          }
        default:
          break;
      }
    },
    scrollTo(time) {
      document.getElementById("scroll-timer").scrollLeft = 40 * (parseInt(time / 10) * 10);
    },
    onChange(uid, value) {
      console.log(`${uid} change = ${value}, this.curSelectedIndex = ${this.curSelectedIndex}`);
      switch (uid) {
        case 'a0':
        {
          GlobalUtil.model.localTeach.setPoint(0, this.curSelectedIndex, value);
          break;
        }
        case 'a1':
        {
          GlobalUtil.model.localTeach.setPoint(1, this.curSelectedIndex, value);
          break;
        }
        case 'a2':
        {
          GlobalUtil.model.localTeach.setPoint(2, this.curSelectedIndex, value);
          break;
        }
        case 'a3':
        {
          GlobalUtil.model.localTeach.setPoint(3, this.curSelectedIndex, value);
          break;
        }
        case 'a4':
        {
          GlobalUtil.model.localTeach.setPoint(4, this.curSelectedIndex, value);
          break;
        }
        case 'a5':
        {
          GlobalUtil.model.localTeach.setPoint(5, this.curSelectedIndex, value);
          break;
        }
        case 'a6':
        {
          GlobalUtil.model.localTeach.setPoint(6, this.curSelectedIndex, value);
          break;
        }
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
        // clearTimeout(t);
        // t = null;
      }
      else {
        this.test_get_pos();
        // t = setTimeout(this.timedCount, 100);
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

.background-color-transparent {
  background-color: transparent;
}

.background-color-green {
  background-color: green;
}

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

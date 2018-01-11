<template lang="html">
  <div>
    <el-button @click='addRecord()'>addRecord</el-button>
    <div class="float-clear"></div>
    <template v-for='(file,index) in model.localTeach.curProj.files' style="background-color:lightblue;">
      <div style="background-color:red;height:2px;width:1000px;"></div>
      <div>{{ index }} -- {{ file.uuid }}</div>
      <div v-if="model.localTeach.curEditingFileUUID === file.uuid">
        <el-button value='delete' @click='onClick($event, file.uuid)'>Delete</el-button>
        <el-button value='start' @click='onClick($event, file.uuid)'>Start</el-button>
        <!-- <el-button value='pause' @click='onClick($event)'>Pause</el-button> -->
        <el-button value='stop' @click='onClick($event)'>Stop</el-button>
        <el-button value='scroll' @click='scrollTo(model.localTeach.fileDatas[file.uuid].length)'>ScrollTo {{ model.localTeach.fileDatas[file.uuid].length }}</el-button>
        <el-button value='save' @click='onClick($event, file.uuid)'>Save</el-button>
        <span>Total count: {{ model.localTeach.fileDatas[file.uuid].length }}</span>
      </div>
      <!-- scroll timer  -->
      <div v-if="model.localTeach.curEditingFileUUID === file.uuid" id="scroll-timer" style="border:1px solid lightblue;font-size:5px;margin-left:50px;width:900px;background-color:lightgray;overflow-x:scroll;" @scroll="checkscroll()">
        <div style="width:81100px;">
          <template v-for='index in showArr'>
            <div class="float-left" style="border:1px solid lightgray;width:40px;height:50px;" @click='onSelect($event, index)'>
              <!-- button -->
              <div style="width:40px;height:20px;background-color:yellow;">
                <div class="float-left" v-if="index % 10 === 0" style="background-color:lightpink;">
                  {{ parseInt(index / 10) }}.0s
                </div>
                <div v-if="index % 10 !== 0">
                  <div class="float-left" style="background-color:lightgreen" v-if="index < model.localTeach.fileDatas[file.uuid].length">
                    .{{ index % 10 }}
                  </div>
                  <div class="float-left" style="" v-if="index >= model.localTeach.fileDatas[file.uuid].length">
                    .{{ index % 10 }}
                  </div>
                </div>
                <div class="float-left" v-if="index === model.localTeach.curSelectedIndex" style="width:40px;height:1px;background-color:red;"></div>
              </div>
              <!-- button end -->
            </div>
          </template>
        </div>
      </div>
      <!-- scroll timer end -->
    </template>

  </div>
</template>
<script>

import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
  data() {
    return {
      model: GlobalUtil.model,
      // curSelectedIndex: 0,
      showArr: [],
    };
  },
  mounted() {
    this.showArr = [];
    for (let i = GlobalUtil.model.localTeach.msMin; i <= GlobalUtil.model.localTeach.msMax; i += 1) {
      this.showArr.push(i);
    }
    // GlobalUtil.model.localTeach.chartOption.xAxis.data = this.showArr;
  },
  methods: {
    scrollTo(time) {
      document.getElementById("scroll-timer").scrollLeft = 40 * (parseInt(time / 10) * 10);
    },
    test_get_pos() {
      const self = this;
      // const startTime = new Date().getTime();
      GlobalUtil.model.localTeach.genAndPushTestPoints();
      // const myChart = window.myChart;
      // const option = GlobalUtil.model.localTeach.chartOption;
      // if (self.sentCounter % 100 === 0) {
      //   myChart.setOption(option, true);
      // }
      // self.sentCounter += 1;
      // self.recCounter += 1;
    },
    onClick(e, uuid) {
      const attr = e.currentTarget.value;
      console.log(`attr = ${attr}, uuid = ${uuid}`);
      const file = GlobalUtil.model.localTeach.getTeachFileInfo(GlobalUtil.model.localTeach.curProj, uuid);
      switch (attr) {
        case 'save':
          {
            CommandsTeachSocket.saveOrUpdateFile(uuid, (dict) => {
              // console.log(`CommandsTeachSocket.saveOrUpdateFile = ${JSON.stringify(dict)}`);
            });
            break;
          }
        case 'stop':
          {
            CommandsTeachSocket.debugSetBeart(false, 0.1, (dict) => {
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
            self.curEditingFileUUID = uuid;
            GlobalUtil.model.localTeach.curDuration = 0;
            CommandsTeachSocket.debugSetBeart(true, 0.1, (dict) => {
              console.log(`SetBeart true = dict = ${JSON.stringify(dict)}`);
              const curFileDatas = GlobalUtil.model.localTeach.fileDatas[uuid];
              // this.scrollTo(GlobalUtil.model.localTeach.curDuration);
              this.scrollTo(curFileDatas.length);
              if (curFileDatas.length >= 1800) {
                // GlobalUtil.model.localTeach.curDuration = 1800;
                CommandsTeachSocket.debugSetBeart(false, (dict) => {
                  console.log(`SetBeart false = dict = ${JSON.stringify(dict)}`);
                });
              }
              else {
                // test data
                const testData = GlobalUtil.model.localTeach.getTestData(GlobalUtil.model.localTeach.curDuration);
                GlobalUtil.model.localTeach.pushFileData(uuid, testData);
                this.onSelect(null, GlobalUtil.model.localTeach.curDuration);
              }
              if (GlobalUtil.model.localTeach.curDuration % 100 === 0) {
                const myChart = window.myChart;
                GlobalUtil.model.localTeach.fileData2ChartSeries(uuid);
                const option = GlobalUtil.model.localTeach.chartOption;
                myChart.setOption(option, true);
              }
              GlobalUtil.model.localTeach.curDuration -= -1;
            });
            break;
          }
        case 'delete':
          {
            swal({
              text: `Delete ${file.name}?`,
              showCancelButton: true,
              confirmButtonText: 'OK',
              cancelButtonText: 'CANCEL',
              showLoaderOnConfirm: true,
              allowOutsideClick: false,
              reverseButtons: true,
              width: '300px',
              preConfirm: text => new Promise((resolve, reject) => {
                resolve();
              }),
            }).then((text) => {
              CommandsTeachSocket.delFiles(uuid, (dict) => {
                const proj = GlobalUtil.model.localTeach.getProjInfo(GlobalUtil.model.localTeach.curProj.uuid);
                GlobalUtil.model.localTeach.curProj = proj;
              });
            });
            break;
          }
        default:
      }
    },
    checkscroll() {
      // console.log(`check scroll = ${document.getElementById("scroll-timer").scrollLeft}`);
    },
    addRecord() {
      const dateStr = GlobalUtil.getTimeString();
      CommandsTeachSocket.createFile(dateStr, (dict) => {
        console.log(`dict = ${JSON.stringify(dict)}`);
        const proj = GlobalUtil.model.localTeach.getProjInfo(GlobalUtil.model.localTeach.curProj.uuid);
        GlobalUtil.model.localTeach.curProj = proj;
      });
    },
    onSelect(e, index) {
      const point = GlobalUtil.model.localTeach.getFileData(GlobalUtil.model.localTeach.curEditingFileUUID, index);
      if (point === null || point === undefined) {
        console.log(`point null null null`);
        return;
      }
      GlobalUtil.model.localTeach.curSelectedIndex = index;
      console.log(`onSelect = ${index}, point = ${JSON.stringify(point)}`);
      GlobalUtil.model.localTeach.curPoint.a0 = point[0];
      GlobalUtil.model.localTeach.curPoint.a1 = point[1];
      GlobalUtil.model.localTeach.curPoint.a2 = point[2];
      GlobalUtil.model.localTeach.curPoint.a3 = point[3];
      GlobalUtil.model.localTeach.curPoint.a4 = point[4];
      GlobalUtil.model.localTeach.curPoint.a5 = point[5];
      GlobalUtil.model.localTeach.curPoint.a6 = point[6];
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

.bgcolor0 {
  background-color: transparent;
}
.bgcolor1 {
  background-color: green;
}

</style>

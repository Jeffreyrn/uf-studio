<template lang="html">
  <div>
    <div v-for='(file,index) in model.localTeach.curProj.files' style="background-color:lightblue;">
      <div v-if="model.localTeach.curEditingFileUUID === file.uuid">
        <div style="background-color:red;height:2px;width:1000px;"></div>
        <div>{{ index }} -- {{ file.uuid }}</div>
        <!-- <div v-if="model.localTeach.curEditingFileUUID === file.uuid"> -->
          <el-button style="display:none;" id="start-id" value='start' @click='onClick($event, file.uuid)'>Start</el-button>
          <el-button style="display:none;" id="save-id" value='save' @click='onClick($event, file.uuid)'>Save</el-button>
          <el-button value='delete' @click='onClick($event, file.uuid)'>Delete</el-button>
          <!-- <el-button value='pause' @click='onClick($event)'>Pause</el-button> -->
          <span v-if="model.localTeach.isEditingPoints===true">
            <el-button v-if="model.localTeach.isContinus===false" value='cut' @click='onClick($event, file.uuid)'>Cut</el-button>
            <el-button value='stop' @click='onClick($event, file.uuid)'>Stop</el-button>
          </span>
          <!-- <el-button value='scroll' @click='scrollTo(model.localTeach.fileDatas[file.uuid].length)'>ScrollTo {{ model.localTeach.fileDatas[file.uuid].length }}</el-button> -->
          <span>Total count: {{ model.localTeach.fileDatas[file.uuid].length }}</span>
          <span>Type: {{ file.storeType }}</span>
        <!-- </div> -->
        <!-- scroll timer  -->
        <div v-if="model.localTeach.curEditingFileUUID === file.uuid" id="scroll-timer" style="border:1px solid lightblue;font-size:5px;margin-left:50px;width:900px;height:80px;background-color:lightgray;overflow-x:scroll;" @scroll="checkscroll()">
          <div style="width:81100px;">
            <!-- <template v-for='(data,index) in model.localTeach.fileDatas[file.uuid]'> -->
            <div v-for='index in model.localTeach.showArr'>
              <ListProjCell :index='index' :file='file'></ListProjCell>
            </div>
          </div>
        </div>
        <!-- scroll timer end -->
      </div>
    </div>
  </div>
</template>
<script>
import ListProjCell from './ListProjCell';

export default {
  data() {
    return {
      model: GlobalUtil.model,
      // curSelectedIndex: 0,
      // showArr: [],
    };
  },
  mounted() {
    // this.showArr = [];
    // for (let i = GlobalUtil.model.localTeach.msMin; i <= GlobalUtil.model.localTeach.msMax; i += 1) {
    //   this.showArr.push(i);
    // }
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
        case 'cut':
          {
            const lastFileData = GlobalUtil.model.localTeach.lastFileData;
            console.log(`cut last data = ${lastFileData}`);
            GlobalUtil.model.localTeach.pushFileData(uuid, lastFileData);
            let tempArr = [];
            for (let i = 0; i < GlobalUtil.model.localTeach.fileDatas[uuid].length; i += 1) {
              tempArr.push(i);
            }
            GlobalUtil.model.localTeach.showArr = tempArr;
            this.onSelect(null, GlobalUtil.model.localTeach.curDuration);
            break;
          }
        case 'save':
          {
            CommandsTeachSocket.saveOrUpdateFile(uuid, GlobalUtil.model.localTeach.isContinus, (dict) => {
              // console.log(`CommandsTeachSocket saveOrUpdateFile = ${JSON.stringify(dict)}`);
            });
            break;
          }
        case 'stop':
          {
            CommandsTeachSocket.saveOrUpdateFile(uuid, GlobalUtil.model.localTeach.isContinus, (dict) => {
              GlobalUtil.model.localTeach.isEditingPoints = false;
              console.log(`CommandsTeachSocket saveOrUpdateFile = ${JSON.stringify(dict)}`);
            });
            CommandsTeachSocket.debugSetBeart(false, 0.1, (dict) => {
              console.log(`SetBeart false = dict = ${JSON.stringify(dict)}`);
            });
            // GlobalUtil.model.localTeach.curDuration = 0;
            // clearTimeout(t);
            // t = null;
            // this.sentCounter = 0;
            // this.recCounter = 0;
            break;
          }
        case 'start':
          {
            GlobalUtil.model.localTeach.curEditingFileUUID = uuid;
            GlobalUtil.model.localTeach.curDuration = 0;
            CommandsTeachSocket.debugSetBeart(true, 0.1, (dict) => {
              console.log(`SetBeart true = dict = ${JSON.stringify(dict)}`);
              console.log(`GlobalUtil.model.localTeach.curDuration = ${GlobalUtil.model.localTeach.curDuration}`);
              const curFileDatas = GlobalUtil.model.localTeach.fileDatas[uuid];
              // this.scrollTo(GlobalUtil.model.localTeach.curDuration);
              // test data
              const testData = GlobalUtil.model.localTeach.getTestData(GlobalUtil.model.localTeach.curDuration);
              GlobalUtil.model.localTeach.lastFileData = testData;
              if (false == GlobalUtil.model.localTeach.isContinus) {
                GlobalUtil.model.localTeach.curDuration -= -1;
                return;
              }
              this.scrollTo(curFileDatas.length);
              if (curFileDatas.length >= 1800) {
                // GlobalUtil.model.localTeach.curDuration = 1800;
                CommandsTeachSocket.debugSetBeart(false, (dict) => {
                  console.log(`SetBeart false = dict = ${JSON.stringify(dict)}`);
                  CommandsTeachSocket.saveOrUpdateFile(uuid, true, (dict) => {
                    console.log(`CommandsTeachSocket saveOrUpdateFile = ${JSON.stringify(dict)}`);
                  });
                });
              }
              else {
                // test data
                const testData = GlobalUtil.model.localTeach.getTestData(GlobalUtil.model.localTeach.curDuration);
                GlobalUtil.model.localTeach.pushFileData(uuid, testData);
                let tempArr = [];
                for (let i = 0; i < GlobalUtil.model.localTeach.fileDatas[uuid].length; i += 1) {
                  tempArr.push(i);
                }
                GlobalUtil.model.localTeach.showArr = tempArr;
                this.onSelect(null, GlobalUtil.model.localTeach.curDuration);
              }
              if (GlobalUtil.model.localTeach.curDuration % 100 === 0) {
                // const myChart = window.myChart;
                // GlobalUtil.model.localTeach.fileData2ChartSeries(uuid);
                // const option = GlobalUtil.model.localTeach.chartOption;
                // myChart.setOption(option, true);
              }
              GlobalUtil.model.localTeach.curDuration -= -1;
            });
            break;
          }
        case 'delete':
          {
            this.$confirm(`Delete ${file.name}?`, {
              confirmButtonText: 'OK',
              cancelButtonText: 'CANCEL',
              type: 'info',
              showClose: false,
              closeOnClickModal: false,
            }).then(() => {
              CommandsTeachSocket.delFiles(uuid, (dict) => {
                const proj = GlobalUtil.model.localTeach.getProjInfo(GlobalUtil.model.localTeach.curProj.uuid);
                GlobalUtil.model.localTeach.curProj = proj;
              });
            }).catch(() => {
            });
            break;
          }
        default:
      }
    },
    checkscroll() {
      // const scrollLeft = document.getElementById("scroll-timer").scrollLeft;
      // console.log(`check scroll = ${scrollLeft}, index = ${parseInt(scrollLeft / 40)}`);
    },
    onSelect(e, index) {
      GlobalUtil.model.localTeach.onSelect(e, index);
    },
  },
  beforeDestroy() {
  },
  components: {
    ListProjCell,
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

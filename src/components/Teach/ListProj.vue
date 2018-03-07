<template lang="html">
  <div class="list-project-wrapper" @scroll="checkscroll()">
    <div v-if="model.localTeach.getFileInfo(model.localTeach.curEditingFileUUID)!==null || model.localTeach.curEditingFileUUID===''">
      <!-- <div v-for='index in model.localTeach.showArr'>
        <ListProjCell :index='index' :file='model.localTeach.getFileInfo(model.localTeach.curEditingFileUUID)'></ListProjCell>
        {{ index }}
      </div> -->
      <div class="block-cell" v-if="model.localTeach.curSelectedTreeItem.uuid!==''">
        <div style="width:90px;">
        </div>
        <div v-for='index in model.localTeach.showArr'>
          <ListProjCell :index='index' :file='model.localTeach.getFileInfo(model.localTeach.curEditingFileUUID)' :editState='editState'></ListProjCell>
        </div>
        <div style="width:90px;">
        </div>
        <!-- <div v-if='model.localTeach.curProj.type==='continuous''>
          <ListProjCell :editState='editState'></ListProjCell>
        </div> -->
      </div>
    </div>
    <!-- scroll timer end -->
  </div>
</template>
<script>

import ListProjCell from './ListProjCell';

export default {
  props:['editState'],
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
    // scrollTo(time) {
    //   document.getElementById("scroll-timer").scrollLeft = 60 * (parseInt(time / 10) * 10);
    // },
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
      // switch (attr) {
        // case 'cut':
        //   {
        //     const lastFileData = GlobalUtil.model.localTeach.lastFileData;
        //     console.log(`cut last data = ${lastFileData}`);
        //     GlobalUtil.model.localTeach.pushFileData(uuid, lastFileData);
        //     let tempArr = [];
        //     for (let i = 0; i < GlobalUtil.model.localTeach.fileDatas[uuid].length; i += 1) {
        //       tempArr.push(i);
        //     }
        //     GlobalUtil.model.localTeach.showArr = tempArr;
        //     this.onSelect(null, GlobalUtil.model.localTeach.curDuration);
        //     break;
        //   }
        // case 'save':
        //   {
        //     CommandsTeachSocket.saveOrUpdateFile(uuid, GlobalUtil.model.localTeach.isContinus, (dict) => {
        //       // console.log(`CommandsTeachSocket saveOrUpdateFile = ${JSON.stringify(dict)}`);
        //     });
        //     break;
        //   }
        // case 'stop':
        //   {
        //     CommandsTeachSocket.saveOrUpdateFile(uuid, GlobalUtil.model.localTeach.isContinus, (dict) => {
        //       GlobalUtil.model.localTeach.isEditingPoints = false;
        //       console.log(`CommandsTeachSocket saveOrUpdateFile = ${JSON.stringify(dict)}`);
        //     });
        //     CommandsTeachSocket.debugSetBeart(false, 0.1, (dict) => {
        //       console.log(`SetBeart false = dict = ${JSON.stringify(dict)}`);
        //     });
        //     // GlobalUtil.model.localTeach.curDuration = 0;
        //     // clearTimeout(t);
        //     // t = null;
        //     // this.sentCounter = 0;
        //     // this.recCounter = 0;
        //     break;
        //   }
        // case 'start':
        //   {
        //     GlobalUtil.model.localTeach.curEditingFileUUID = uuid;
        //     GlobalUtil.model.localTeach.curDuration = 0;
        //     CommandsTeachSocket.debugSetBeart(true, 0.1, (dict) => {
        //       console.log(`SetBeart true = dict = ${JSON.stringify(dict)}`);
        //       console.log(`GlobalUtil.model.localTeach.curDuration = ${GlobalUtil.model.localTeach.curDuration}`);
        //       const curFileDatas = GlobalUtil.model.localTeach.fileDatas[uuid];
        //       // this.scrollTo(GlobalUtil.model.localTeach.curDuration);
        //       // test data
        //       const testData = GlobalUtil.model.localTeach.getTestData(GlobalUtil.model.localTeach.curDuration);
        //       GlobalUtil.model.localTeach.lastFileData = testData;
        //       if (false == GlobalUtil.model.localTeach.isContinus) {
        //         GlobalUtil.model.localTeach.curDuration -= -1;
        //         return;
        //       }
        //       this.scrollTo(curFileDatas.length);
        //       if (curFileDatas.length >= 1800) {
        //         // GlobalUtil.model.localTeach.curDuration = 1800;
        //         CommandsTeachSocket.debugSetBeart(false, (dict) => {
        //           console.log(`SetBeart false = dict = ${JSON.stringify(dict)}`);
        //           CommandsTeachSocket.saveOrUpdateFile(uuid, true, (dict) => {
        //             console.log(`CommandsTeachSocket saveOrUpdateFile = ${JSON.stringify(dict)}`);
        //           });
        //         });
        //       }
        //       else {
        //         // test data
        //         const testData = GlobalUtil.model.localTeach.getTestData(GlobalUtil.model.localTeach.curDuration);
        //         GlobalUtil.model.localTeach.pushFileData(uuid, testData);
        //         let tempArr = [];
        //         for (let i = 0; i < GlobalUtil.model.localTeach.fileDatas[uuid].length; i += 1) {
        //           tempArr.push(i);
        //         }
        //         GlobalUtil.model.localTeach.showArr = tempArr;
        //         this.onSelect(null, GlobalUtil.model.localTeach.curDuration);
        //       }
        //       if (GlobalUtil.model.localTeach.curDuration % 100 === 0) {
        //         // const myChart = window.myChart;
        //         // GlobalUtil.model.localTeach.fileData2ChartSeries(uuid);
        //         // const option = GlobalUtil.model.localTeach.chartOption;
        //         // myChart.setOption(option, true);
        //       }
        //       GlobalUtil.model.localTeach.curDuration -= -1;
        //     });
        //     break;
        //   }
        // case 'delete':
          // {
          //   this.$confirm(`Delete ${file.name}?`, {
          //     confirmButtonText: 'OK',
          //     cancelButtonText: 'CANCEL',
          //     type: 'info',
          //     showClose: false,
          //     closeOnClickModal: false,
          //   }).then(() => {
          //     CommandsTeachSocket.delFiles(uuid, (dict) => {
          //       const proj = GlobalUtil.model.localTeach.getProjInfo(GlobalUtil.model.localTeach.curProj.uuid);
          //       GlobalUtil.model.localTeach.curProj = proj;
          //     });
          //   }).catch(() => {
          //   });
          //   break;
          // }
        // default:
      // }
    },
    checkscroll() {
      const scrollLeft = document.getElementById("bottom-right-frame").scrollLeft;
      console.log(`check scroll = ${scrollLeft}, index = ${parseInt(scrollLeft / 60)}`);
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
.list-project-wrapper {
  width: 70%;
  overflow-x: auto;
  background: #434343;
  display: flex;
  justify-content: flex-start;
  // align-items: center;
}
.list-project-wrapper::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 9px;
}
.list-project-wrapper::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #666;;
}
.list-project-wrapper::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px #434343;
  border-radius: 0;
  background: #434343;
}
.bgcolor0 {
  background-color: transparent;
}
.bgcolor1 {
  background-color: green;
}
.block-cell {
  display:flex;
  // justify-content: flex-start;
  // align-items: center;
  font-size: 5px;
  // text-align: center;
}
</style>

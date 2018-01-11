<template lang="html">
    <div class='app-container'>
      <div>
        Teach
      </div>

      <span class="float-left">.   current project: {{ model.localTeach.curProj.name }}</span>
      <span>send: {{ sentCounter }}</span>
      <span>rec: {{ recCounter }}</span>

      <el-button value='new' @click='newProj()'>New</el-button>
      <!-- <el-button value='file' @click='addFile()'>+File</el-button> -->
      <!-- <el-button value='start' @click='onClick($event)'>Start</el-button>
      <el-button value='pause' @click='onClick($event)'>Pause</el-button>
      <el-button value='stop' @click='onClick($event)'>Stop</el-button> -->

      <div id="total-teach-frame" class="total-frame position-absolute">
        <div id="left-teach-frame" class="left-frame position-absolute">
          <el-tree
            :data="model.localTeach.curProTreeDatas"
            node-key="uuid"
            :default-expanded-keys="model.localTeach.curProjExpandedKeys"
            @node-click="handleNodeClick">
          </el-tree>
        </div>
        <div id="right-teach-frame" class="right-frame position-absolute">
          <!-- chart begin -->
          <div class="chart" id="echart-main-2">
          </div>
          <!-- chart end -->

          <!-- scroll -->
          <ListProj></ListProj>
          <!-- scroll end -->

          <div class="float-clear"></div>
        </div>
      </div>

      <!-- One setting -->
      <OnePointSetting style="position:absolute;right:10px;top:10px;"></OnePointSetting>
      <!-- One setting end -->

      <!-- dialog -->
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="300px"
        :before-close="handleClose"
        center>
        <el-input v-model="inputText" auto-complete="off"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="add()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- dialog end -->

    </div>
</template>
<script>

import OnePointSetting from './Teach/OnePointSetting';
import ListProj from './Teach/ListProj';

const echarts = require('echarts');
let t;

export default {
  data() {
    return {

      model: GlobalUtil.model,
      diff: 0,
      sentCounter: 0,
      recCounter: 0,
      // curSelectedIndex: 0,
      dialogVisible: false,
      folderOrFile: '',
      title: '',
      inputText: '',
      clientWidth: 100,
      clientHeight: 200,
      leftFrameWidth: 200,
    };
  },
  mounted() {
    const dom = document.getElementById('echart-main-2');
    const myChart = echarts.init(dom);
    window.myChart = myChart;
    const option = GlobalUtil.model.localTeach.chartOption;
    myChart.setOption(option, true);

    window.addEventListener('resize', this.onwinresize, false);
    this.onwinresize();

    CommandsTeachSocket.listProjs((dict) => {

    });
  },
  methods: {
    add() {
      console.log(`add add add`);
      this.dialogVisible = false;
      const text = this.inputText;
      console.log(`text = ${text}`);
      if (this.folderOrFile === 'proj') {
        CommandsTeachSocket.createProj(text);
      }
      if (this.folderOrFile === 'file') {
        CommandsTeachSocket.createFile(text);
      }
    },
    newProj() {
      this.folderOrFile = 'proj';
      this.title = 'new project name';
      this.inputText = '';
      this.dialogVisible = true;
    },
    addFile() {
      console.log('add file');
      this.folderOrFile = 'file';
      this.title = 'add file';
      this.inputText = '';
      this.dialogVisible = true;
    },
    onwinresize() {
      this.clientWidth = document.body.clientWidth;
      this.clientHeight = document.body.clientHeight;
      const leftFrame = document.getElementById("left-teach-frame");
      const rightFrame = document.getElementById("right-teach-frame");
      const totalFrame = document.getElementById("total-teach-frame");
      const totalFrameWidth = this.clientWidth - 20;
      const totalFrameHeight = this.clientHeight - 120;
      totalFrame.style.width = `${totalFrameWidth}px`;
      totalFrame.style.height = `${totalFrameHeight}px`;
      rightFrame.style.width = `${totalFrameWidth - this.leftFrameWidth - 2}px`;
      // console.log(`totalFrameHeight = ${totalFrameHeight}, totalFrameHeight = ${totalFrame.style.height}, rightFrameWidth = ${rightFrame.style.width}`);
    },
    handleNodeClick(data) {
      const uuid = data.uuid;
      const proj = GlobalUtil.model.localTeach.getProjInfo(uuid);
      // console.log(`handleNodeClick 2 uuid = ${uuid}, proj = ${JSON.stringify(proj)}`);
      GlobalUtil.model.localTeach.curProj = proj;
      // GlobalUtil.model.localTeach.curProjExpandedKeys = [proj.uuid];
      // GlobalUtil.model.localTeach = GlobalUtil.model.localTeach;
      // console.log(`extend uuid = ${GlobalUtil.model.localTeach.curProjExpandedKeys}`);
    },
    test_get_pos() {
      const self = this;

      const startTime = new Date().getTime();

      GlobalUtil.model.localTeach.genAndPushTestPoints();
      const myChart = window.myChart;
      const option = GlobalUtil.model.localTeach.chartOption;
      if (self.sentCounter % 100 === 0) {
        myChart.setOption(option, true);
      }
      self.sentCounter += 1;
      self.recCounter += 1;
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
    OnePointSetting,
    ListProj,
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
.total-frame {
  /*background-color:gray;*/
  width:100%;
  height:600px;
  top: 90px;
  left: 10px;
  border:1px solid #96c2f1;
  background:#eff7ff;
  /*top: 200px;
  left: 100px;*/
}
.left-frame {
  width:200px;
  height: 100%;
  overflow: scroll;
}
.right-frame {
  left: 200px;
  width:85%;
  /*width:100%;*/
  height: 100%;
  /*background-color:#e9e6d3;*/
  background-color:#f6f6f6;
  overflow-y: scroll;
}
</style>

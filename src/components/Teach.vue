<template lang="html">
    <div class='app-container'>
      <div>
        Teach
      </div>

      <span class="float-left">.   current project: {{ model.localTeach.curProj.name }}</span>

      <el-button value='new' @click='newProj()'>New</el-button>
      <el-button value='new' @click='delProj()'>Delete</el-button>
      <span> {{ socketCom.diff }} </span>
            <!-- :default-expanded-keys="model.localTeach.curProjExpandedKeys" -->
      <div id="total-teach-frame" class="total-frame position-absolute">
        <div id="left-teach-frame" class="left-frame position-absolute">
          <el-tree
            :data="model.localTeach.curProTreeDatas"
            node-key="uuid"
            highlight-current
            :default-expanded-keys="model.localTeach.curProjExpandedKeys"
            @node-click="handleNodeClick">
          </el-tree>
        </div>
        <div id="right-teach-frame" class="right-frame position-absolute">
          <!-- chart begin -->
          <div class="chart" id="echart-main-2">
          </div>
          <!-- chart end -->

          <el-button @click='addRecord(true)'>addContinusRecord</el-button>
          <el-button @click='addRecord(false)'>addDiscontinusRecord</el-button>

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

import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import OnePointSetting from './Teach/OnePointSetting';
import ListProj from './Teach/ListProj';

const echarts = require('echarts');
let t;

export default {
  data() {
    return {
      socketCom: GlobalUtil.socketCom,
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
      leftFrameWidth: 250,
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

    GlobalUtil.model.localTeach.setSelectedTreeItem(null);
    // const nodes = document.getElementsByClassName('el-tree-node__label');
    // for (let i = 0; i < nodes.length; i += 1) {
    //   const node = nodes[i];
    //   node.style.color = 'gray';
    // }

    CommandsTeachSocket.listProjs((dict) => {

    });
  },
  methods: {
    addDiscontinusRecord() {

    },
    addRecord(isContinus) {
      const dateStr = GlobalUtil.getTimeString();
      let createdUUID = null;
      GlobalUtil.model.localTeach.isContinus = isContinus;
      CommandsTeachSocket.createFile(dateStr, (dict) => {
        createdUUID = dict.uuid;
      }, (dict) => {
        console.log(`dict = ${JSON.stringify(dict)}`);
        const proj = GlobalUtil.model.localTeach.getProjInfo(GlobalUtil.model.localTeach.curProj.uuid);
        GlobalUtil.model.localTeach.curProj = proj;
        GlobalUtil.model.localTeach.curEditingFileUUID = createdUUID;
        setTimeout(() => {
          GlobalUtil.model.localTeach.showArr = [];
          const file = GlobalUtil.model.localTeach.getTeachFileInfo(proj, createdUUID);
          GlobalUtil.model.localTeach.setSelectedTreeItem(file);
          document.getElementById("start-id").click();
        }, 10);
      });
    },
    delProj() {
      const curProj = GlobalUtil.model.localTeach.curProj;
      swal({
        text: `Delete ${curProj.name}?`,
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
        CommandsTeachSocket.delProj(curProj.uuid, (dict) => {
          console.log(`localTeach.delProj = ${curProj.uuid}, dict = ${JSON.stringify(dict)}`);
        });
      });
    },
    add() {
      console.log(`add add add`);
      this.dialogVisible = false;
      const text = this.inputText;
      console.log(`text = ${text}`);
      if (this.folderOrFile === 'proj') {
        CommandsTeachSocket.createProj(text);
      }
      // if (this.folderOrFile === 'file') {
      //   CommandsTeachSocket.createFile(text);
      // }
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
      GlobalUtil.model.localTeach.curProj = proj;
      const file = GlobalUtil.model.localTeach.getTeachFileInfo(proj, uuid);
      console.log(`curFile file = ${JSON.stringify(file)}`);
      // el-tree-node__label
      if (file !== null && file !== undefined) {
        GlobalUtil.model.localTeach.setSelectedTreeItem(file);
        // const nodes = document.getElementsByClassName('el-tree-node__label');
        // for (let i = 0; i < nodes.length; i += 1) {
        //   const node = nodes[i];
        //   if (file.name === node.innerHTML) {
        //     node.style.color = 'blue';
        //   }
        //   else {
        //     node.style.color = 'gray';
        //   }
        // }
        CommandsTeachSocket.getFile(uuid, (dict) => {
          // console.log(`CommandsTeachSocket getFile dict = ${JSON.stringify(dict)}`);
          if (dict.code === 0) {
            let data = dict.data;
            if (data === "" || data === undefined || data === null) {
              GlobalUtil.model.localTeach.fileDatas[uuid] = [];
            }
            else {
              data = JSON.parse(data);
              data = data.points;
              GlobalUtil.model.localTeach.fileDatas[uuid] = data;
            }
            GlobalUtil.model.localTeach.curEditingFileUUID = uuid;
            let tempArr = [];
            for (let i = 0; i < GlobalUtil.model.localTeach.fileDatas[uuid].length; i += 1) {
              tempArr.push(i);
            }
            GlobalUtil.model.localTeach.showArr = tempArr;
          }
        });
      }
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
        default:
          break;
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
  .teach-slider {
    width: 400px;
  }
}

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
  width:250px;
  height: 100%;
  overflow: scroll;
}
.right-frame {
  left: 250px;
  width:85%;
  /*width:100%;*/
  height: 100%;
  /*background-color:#e9e6d3;*/
  background-color:#f6f6f6;
  overflow-y: scroll;
}
</style>

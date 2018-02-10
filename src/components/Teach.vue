<template lang="html">
  <div class="app-container com-module-wrapper">
    <div class="recording-header-wrapper">
      <div><router-link :to="{name: 'EditHome'}"><img src="../assets/img/common/icon_back.svg" alt="back"/></router-link><span>Recording</span></div>
      <div class="edit-btn-wrapper">
        <el-button class="com-btn" type="primary" v-if="!editState" @click="editState=true">Edit</el-button>
        <div v-else>
          <el-button class="com-btn" type="danger" @click="cancelEdit()">Cancel</el-button>
          <el-button class="com-btn" type="success" @click="saveEdit()">Save Change</el-button>
        </div>
      </div>
    </div>
    <div class="main-contain">
      <div class="recording-area-wrapper">
        <div class="top-area">

        </div>
        <div class="bottom-area">
          <div class="switch-wrapper">
            <div class="switch-btn">
              <span :class="{'active': pointWay}" @click="changePointWay(true)">Waypoint</span>
              <span :class="{'active': !pointWay}" @click="changePointWay(false)">Single Point</span>
            </div>
            <div class="recording">
              <div class="file-name"><img src="../assets/img/edit/recording/icon_pathfile_grey.svg"/><span>{{ model.localTeach.curProj.name }}</span></div>
              <div class="recording-btn">
                <el-button class="com-btn" type="success">Finish Recording</el-button>
                <el-button class="com-btn" type="danger">Press to record</el-button>
              </div>
              <div class="start-btn"><i class="el-icon-caret-right"></i></div>
              <div class="recording-time">00 : 00 : 00</div>
            </div>
          </div>
          <ListProj></ListProj>
        </div>
      </div>

      <div id="left-teach-frame" class="projects-list-wrapper">
        <h3>My Projects <button class="add-file" @click='newProj()'><img src="../assets/img/edit/recording/icon_addfile.svg" alt="add file"/></button></h3>
        <el-tree
          :data="model.localTeach.curProTreeDatas"
          node-key="uuid"
          highlight-current
          :default-expanded-keys="model.localTeach.curProjExpandedKeys"
          @node-click="handleNodeClick"
          :render-content="renderContent"
          >
        </el-tree>
        <div class="add-project"><i class="el-icon-circle-plus"></i>
          Project
        </div>
      </div>

    </div>


      <!--<span class="float-left">.   current project: {{ model.localTeach.curProj.name }}</span>-->

      <!--<el-button value='new' @click='newProj()'>New</el-button>-->
      <!--<el-button value='new' @click='delProj()'>Delete</el-button>-->

      <!--<el-button @click='addRecord(true)'>addContinusRecord</el-button>-->
      <!--<el-button @click='addRecord(false)'>addDiscontinusRecord</el-button>-->




      <!--<div id="total-teach-frame" class="total-frame position-absolute">-->
        <!--<div id="right-teach-frame" class="right-frame position-absolute">-->
        <!--</div>-->
      <!--</div>-->


      <!--<OnePointSetting style="position:absolute;right:10px;top:10px;"></OnePointSetting>-->

      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="300px"
        center>
        <el-input v-model="inputText" auto-complete="off"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="add()">确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>
<script>

import OnePointSetting from './Teach/OnePointSetting';
import ListProj from './Teach/ListProj';
import XarmModel from './common/XarmModel'; import ElButton from "../../node_modules/element-ui/packages/button/src/button";

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
      pointWay: false,
      editState: false,
      fileIcon: {
        front: require('../assets/img/edit/recording/icon_pathfile_grey.svg'),
      },
    };
  },
  mounted() {
    // const dom = document.getElementById('echart-main-2');
    // const myChart = echarts.init(dom);
    // window.myChart = myChart;
    // const option = GlobalUtil.model.localTeach.chartOption;
    // myChart.setOption(option, true);
    console.log('aaaa',this.model.localTeach.curProTreeDatas);
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
    changePointWay(way) {
      this.pointWay = way;
    },
    cancelEdit() {
      this.editState = false;
    },
    saveEdit() {
      this.editState = false;
    },
    addDiscontinusRecord() {
    },
    addRecord(isContinus) {
      const dateStr = GlobalUtil.getTimeString();
      let createdUUID = null;
      GlobalUtil.model.localTeach.isContinus = isContinus;
      GlobalUtil.model.localTeach.isEditingPoints = true;
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
      this.$confirm(`Delete ${curProj.name}?`, {
        confirmButtonText: 'OK',
        cancelButtonText: 'CANCEL',
        type: 'info',
        showClose: false,
        closeOnClickModal: false,
      }).then(() => {
        CommandsTeachSocket.delProj(curProj.uuid, (dict) => {
          console.log(`localTeach.delProj = ${curProj.uuid}, dict = ${JSON.stringify(dict)}`);
        });
      }).catch(() => {
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
      if (totalFrame !== null && totalFrame !== undefined) {
        totalFrame.style.width = `${totalFrameWidth}px`;
        totalFrame.style.height = `${totalFrameHeight}px`;
      }
      if (rightFrame !== null && rightFrame !== undefined) {
        rightFrame.style.width = `${totalFrameWidth - this.leftFrameWidth - 2}px`;
      }
      // console.log(`totalFrameHeight = ${totalFrameHeight}, totalFrameHeight = ${totalFrame.style.height}, rightFrameWidth = ${rightFrame.style.width}`);
    },
    handleNodeClick(data) {
      const uuid = data.uuid;
      const proj = GlobalUtil.model.localTeach.getProjInfo(uuid);
      GlobalUtil.model.localTeach.curProj = proj;
      const file = GlobalUtil.model.localTeach.getTeachFileInfo(proj, uuid);
      // console.log(`curFile file = ${JSON.stringify(file)}`);

      //
      // const myChart = window.myChart;
      // GlobalUtil.model.localTeach.fileData2ChartSeries(uuid);
      // const option = GlobalUtil.model.localTeach.chartOption;
      // myChart.setOption(option, true);

      //
      // el-tree-node__label
      if (file !== null && file !== undefined) {
        GlobalUtil.model.localTeach.setSelectedTreeItem(file);
        CommandsTeachSocket.getFile(uuid, (dict) => {
          // console.log(`CommandsTeachSocket getFile dict = ${JSON.stringify(dict)}`);
          if (dict.code === 0) {
            let data = dict.data;
            if (data === "" || data === undefined || data === null) {
              GlobalUtil.model.localTeach.fileDatas[uuid] = [];
            }
            else {
              data = JSON.parse(data);
              const isContinus = data.type === 'continus';
              const points = data.points;
              const type = data.tpye;
              file.storeType = data.type;
              file.isContinus = isContinus;
              GlobalUtil.model.localTeach.isContinus = isContinus;
              // console.log(`isContinus = ${isContinus}, data.type = ${type}`);
              GlobalUtil.model.localTeach.fileDatas[uuid] = points;
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
    renderContent(createElement, { node, data, store }) {
      return createElement(
        'span', [
          createElement('span',{
            attrs:{
              style:`background:url('${this.fileIcon.front}') no-repeat center left;padding-left:30px;`,
            }},node.label),
          createElement('span',{
            attrs:{
              style:"color: red;"
            },
            on:{
              click: function() {
                console.log('rename-button');
              }
            }},'rename'),
          createElement('span',{
            on:{
              click: function() {
                console.log('delete-button');
              }
            }},'delete'),
        ]);
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
    ElButton,
OnePointSetting,
    ListProj,
    XarmModel,
  },
  computed: {
  },
};

</script>
<style lang="scss" scoped>
.app-container {
  .recording-header-wrapper {
    height: 60px;
    line-height: 60px;
    padding: 0 2rem;
    background: #F8F8F8;
    display: flex;
    justify-content: space-between;
    img {
      width: 1.6rem;
    }
    span {
      margin-left: 1rem;
      font-family: 'Gotham-Bold';
      font-size: 2rem;
      color: #444;
      letter-spacing: -1px;
    }
  }
  .main-contain {
    width: 100%;
    padding: 0 14px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    .recording-area-wrapper {
      width: 80%;
      margin: 0 12px;
      font-size: 14px;
      .top-area {
        box-shadow: 0 0 6px 0 rgba(205,205,205,0.50);
        border-radius: 8px;
        height: 530px;
      }
      .bottom-area {
        display: flex;
        margin-top: 20px;
      }
      .switch-wrapper {
        width: 350px;
        text-align: center;
        .switch-btn {
          height: 62px;
          line-height: 62px;
          background: #ECECEC;
          border-radius: 30px;
          color: #9C9C9C;
          letter-spacing: -0.78px;
          text-align: center;
          display: flex;
          justify-content: space-around;
          span {
            width: 50%;
            cursor: pointer;
          }
          .active {
            background: #FFF;
            border-radius: 100px;
          }
        }
        .recording {
          background: #F3F3F3;
          .file-name {
            height: 42px;
            line-height: 42px;
            color: #8B8B8B;
            background: #EFEFEF;
            span {
              padding-left: 38px;
            }
          }
          .recording-btn {
            padding-top: 120px;
            height: 270px;
            button {
              margin: 18px auto;
              display: block;
            }
          }
          .start-btn {
            height: 42px;
            line-height: 42px;
            background: #D4D4D4;
            font-size: 22px;
            color: #fff;
            cursor: pointer;
            transition: all .4s;
          }
          .start-btn:hover {
            background: rgba(212,212,212,0.6);
          }
          .recording-time {
            height: 36px;
            line-height: 36px;
          }
        }
      }

    }
    .projects-list-wrapper {
      width: 440px;
      background: #EDEDED;
      border: 1px solid #DFDFDF;
      position: relative;
      h3 {
        height: 58px;
        line-height: 58px;
        font-family: 'Gotham-Bold';
        font-size: 1.4rem;
        color: #444;
        letter-spacing: -1.33px;
        padding: 0 22px;
        display: flex;
        justify-content: space-between;
        .add-file {
          border: none;
          outline: 0;
          cursor: pointer;
        }
      }
      .add-project {
        width: 100%;
        height: 62px;
        line-height: 62px;
        text-align: center;
        background: #E2E2E2;
        font-family: 'Gotham-Book';
        font-size: 1rem;
        color: #707274;
        letter-spacing: -1px;
        cursor: pointer;
        transition: all .4s;
        position: absolute;
        bottom: 0;
      }
      .add-project:hover {
        background: rgba(226,226,226,0.4);
      }
    }
  }
}




.com-btn {
  width: 168px;
  height: 40px;
  border-radius: 100px;
}
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
  margin-top: 50px;
  margin-left: 50px;
  background-color: white;
  width: 1000px;
  height: 200px;
}
.total-frame {
  /*background-color:gray;*/
  width:100%;
  height:600px;
  top: 90px;
  // left: 10px;
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
  // width:85%;
  /*width:100%;*/
  height: 100%;
  /*background-color:#e9e6d3;*/
  background-color:#f6f6f6;
  overflow-y: scroll;
}
</style>

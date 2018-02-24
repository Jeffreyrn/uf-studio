<template lang="html">
  <div class="app-container com-module-wrapper">
    <div class="recording-header-wrapper">
      <div><router-link :to="{name: 'EditHome'}"><img src="../assets/img/common/icon_back.svg" alt="back"/></router-link><span>Recording</span></div>
    </div>
    <div class="main-contain">
      <div class="recording-area-wrapper"  id="left-teach-frame">
        <div class="top-area">

        </div>
        <div class="bottom-area">
          <div class="switch-wrapper">
            <div class="recording">
              <div class="recording-time">{{ protype }}</div>
              <!--<div class="file-name"><img src="../assets/img/edit/recording/icon_pathfile_grey.svg"/><span>{{ getCurFile }}</span></div>-->

              <div class="recording-btn" v-if="model.localTeach.curSelectedTreeItem.type==='proj'">
                <el-button v-if="model.localTeach.visible.starRecording===false" class="com-btn" type="danger" @click='startRecord()'>Start Recording</el-button>
                <el-button v-else class="com-btn" type="success" @click="finishRecord(model.localTeach.curEditingFileUUID)">Finish Recording</el-button>
                <el-button v-if="model.localTeach.visible.starRecording && model.localTeach.curProj.type==='discontinuous'" class="com-btn" type="danger" @click='addRecord()'>Press to record</el-button>
              </div>
              <div class="recording-btn" v-if="model.localTeach.curSelectedTreeItem.type==='proj'">
                <button class="start-btn"><i class="el-icon-caret-right" v-if="model.localTeach.curProj.files.length>0"></i></button>
              </div>
              <div class="recording-btn" v-if="model.localTeach.curSelectedTreeItem.type==='file'">
                <el-button class="com-btn" type="danger" @click=''>Edit</el-button>
                <button class="start-btn"><i class="el-icon-caret-right"></i></button>
              </div>
              
            </div>
          </div>
          <ListProj id="bottom-right-frame"></ListProj>
        </div>
      </div>

      <div class="projects-list-wrapper">
        <h3>My Projects <button class="add-file" @click="newProj()"><i class="el-icon-circle-plus"></i>Project</button></h3>
        <div class="tree-wrapper">
          <el-tree
            class="recording-project-list"
            :data="model.localTeach.curProTreeDatas"
            node-key="uuid"
            :default-expanded-keys="model.localTeach.curProjExpandedKeys"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
            :render-content="renderContent"
            >
          </el-tree>
        </div>
      </div>

    </div>

      <el-dialog
        class="save-dialog"
        title="System Notice"
        width="470px"
        :visible.sync="visible.saveDialog"
        >
        <p>Stop Recording and save automatically.</p>
        <span>The recording file will be saved to my project list</span>
        <el-button @click="finishRecordOK">确 定</el-button>
      </el-dialog>
      
      <DialogTeachProjName v-if="model.localTeach.projTypeSelectedShow"></DialogTeachProjName>

  </div>
</template>
<script>
import OnePointSetting from './Teach/OnePointSetting';
import ListProj from './Teach/ListProj';
import XarmModel from './common/XarmModel';
import ElButton from "../../node_modules/element-ui/packages/button/src/button";
import DialogTeachProjName from './DialogTeachProjName';

const echarts = require('echarts');
let t;

export default {
  data() {
    return {
      socketCom: GlobalUtil.socketCom,
      model: GlobalUtil.model,
      protype: '',
      folderOrFile: '',
      title: '',
      inputText: '',
      clientWidth: 100,
      clientHeight: 200,
      rightFrameWidth: 320,
      bottomLeftWidth: 300,
      pointWay: false,
      editState: false,
      radio: '2',
      fileIcon: {
        front: require('../assets/img/edit/recording/icon_pathfile_grey.svg'),
        discontinuous: require('../assets/img/edit/recording/icon_singlepoint_14x14_dark.svg'),
        continuous: require('../assets/img/edit/recording/icon_waypoint_14x14_dark.svg'),
        discontinuous_white: require('../assets/img/edit/recording/icon_singlepoint_14x14_white.svg'),
        continuous_white: require('../assets/img/edit/recording/icon_waypoint_14x14_white.svg'),
        pathFileGrey: require('../assets/img/edit/recording/icon_pathfile_grey.svg'),
        rename: require('../assets/img/edit/recording/btn_rename.svg'),
        delete: require('../assets/img/edit/recording/btn_trash_white.svg')
      },
      visible: {
        createProjectDialog: false,
        saveDialog: false,
        editSinglePointWay: false,
        singlePointRecording: false,
        wayPointRecording: false,
        // starRecording: true,
      },
      createWayPoint: true,
      createProjectDisable: true,
    };
  },
  mounted() {
    // const dom = document.getElementById('echart-main-2');
    // const myChart = echarts.init(dom);
    // window.myChart = myChart;
    // const option = GlobalUtil.model.localTeach.chartOption;
    // myChart.setOption(option, true);
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
    console.log('sssaaa', this.model.localTeach.curProTreeDatas)
  },
  methods: {
    checkInputText() {
      if(this.inputText !== ''){
        this.createProjectDisable = false;
      }
    },
    finishRecord (){
      // CommandsTeachSocket.saveOrUpdateFile(uuid, GlobalUtil.model.localTeach.isContinus, (dict) => {
      //   GlobalUtil.model.localTeach.isEditingPoints = false;
      //   console.log(`CommandsTeachSocket saveOrUpdateFile = ${JSON.stringify(dict)}`);
      // });
      // CommandsTeachSocket.debugSetBeart(false, 0.1, (dict) => {
      //   GlobalUtil.model.localTeach.visible.starRecording = false;
      //   console.log(`SetBeart false = dict = ${JSON.stringify(dict)}`);
      // });
      this.visible.saveDialog = true;
      this.visible.singlePointRecording = false;
      this.visible.wayPointRecording = false;
    },
    finishRecordOK() {
      this.visible.saveDialog = false;
      GlobalUtil.model.localTeach.visible.starRecording = false;

      const curFileDatas = GlobalUtil.model.localTeach.curFileDatas;
      console.log(`curFileDatas = ${JSON.stringify(curFileDatas)}`);

      const textDict = {
        type: GlobalUtil.model.localTeach.curProj.type,
        points: curFileDatas,
      };
      const text = JSON.stringify(textDict);

      const dateStr = GlobalUtil.getTimeString();
      CommandsTeachSocket.createFile(dateStr, text, (dict) => {
      }, (dict) => {
      });

      CommandsTeachSocket.debugSetBeart(false, 0.1, (dict) => {
        console.log(`SetBeart false = dict = ${JSON.stringify(dict)}`);
      });
    },
    startRecord() {
      this.visible.starRecording = false;
      const dateStr = GlobalUtil.getTimeString();
      const curSelectedTreeItemUUID = GlobalUtil.model.localTeach.curSelectedTreeItem.uuid;
      const proj = GlobalUtil.model.localTeach.getCurProj(curSelectedTreeItemUUID);
      if (proj === null) {
        return;
      }
      const isContinus = proj.type === 'continuous';
      GlobalUtil.model.localTeach.visible.starRecording = true;

      // GlobalUtil.model.localTeach.curEditingFileUUID = uuid;
      GlobalUtil.model.localTeach.curDuration = 0;

      // GlobalUtil.model.localTeach.fileDatas[uuid] = [];
      GlobalUtil.model.localTeach.curFileDatas = [];
      CommandsTeachSocket.debugSetBeart(true, 0.1, (dict) => {
        console.log(`SetBeart false = dict = ${JSON.stringify(dict)}`);
        const testData = GlobalUtil.model.localTeach.getTestData(GlobalUtil.model.localTeach.curDuration);
        GlobalUtil.model.localTeach.lastFileData = testData;
        if (isContinus === false) {
          GlobalUtil.model.localTeach.curDuration -= -1;
          return;
        }
        // this.scrollTo(curFileDatas.length);
        if (GlobalUtil.model.localTeach.curFileDatas.length >= 1800) {
          this.finishRecordOK();
        }
        else {
          // test data
          const testData = GlobalUtil.model.localTeach.getTestData(GlobalUtil.model.localTeach.curDuration);
          GlobalUtil.model.localTeach.curFileDatas.push(testData)
          // GlobalUtil.model.localTeach.pushFileData(uuid, testData);
          // let tempArr = [];
          // for (let i = 0; i < GlobalUtil.model.localTeach.fileDatas[uuid].length; i += 1) {
          //   tempArr.push(i);
          // }
          // GlobalUtil.model.localTeach.showArr = tempArr;
          // this.onSelect(null, GlobalUtil.model.localTeach.curDuration);
        }
      });
      GlobalUtil.model.localTeach.curDuration -= -1;      
    },
    addRecord() {
      const testData = GlobalUtil.model.localTeach.getTestData(GlobalUtil.model.localTeach.curDuration);
      GlobalUtil.model.localTeach.curFileDatas.push(testData)
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
    newProj() {
      GlobalUtil.model.localTeach.curDialogProjInputText = '';
      GlobalUtil.model.localTeach.projTypeSelectedShow = true;
    },
    addFile() {
      console.log('add file');
      this.folderOrFile = 'file';
      this.title = 'add file';
      this.inputText = '';
    },
    onwinresize() {
      this.clientWidth = document.body.clientWidth;
      this.clientHeight = document.body.clientHeight;
      const leftFrame = document.getElementById("left-teach-frame");
      const bottomRightFrame = document.getElementById("bottom-right-frame");
      const totalFrameWidth = this.clientWidth - 20;
      const totalFrameHeight = this.clientHeight - 120;
      if (leftFrame !== null && leftFrame !== undefined) {
        leftFrame.style.width = `${totalFrameWidth - this.rightFrameWidth}px`;
      }
      if (bottomRightFrame !== null && bottomRightFrame !== undefined) {
        bottomRightFrame.style.width = `${totalFrameWidth - this.rightFrameWidth - this.bottomLeftWidth}px`;
      }
      console.log(`totalFrameHeight = ${totalFrameHeight}, bottomRightFrame = ${bottomRightFrame.style.width}`);
    },
    handleNodeClick(data) {
      const uuid = data.uuid;
      GlobalUtil.model.localTeach.setCurSelectedTreeItem(uuid);
      const proj = GlobalUtil.model.localTeach.getProjInfo(uuid);
      GlobalUtil.model.localTeach.curProj = proj;
      const file = GlobalUtil.model.localTeach.getTeachFileInfo(proj, uuid);

      this.protype = proj.type;

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
              const isContinus = data.type === 'continuous';
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

//    renderContent(createElement, { node, data, store }) {
//      console.log(`createElement node.uuid = ${data.uuid}`);
//      console.log(`createElement node.type = ${data.type}`);
//      console.log(`createElement node.proType = ${data.proType}`);
//      let iconUrl = '';
//      if (data.proType === 'continuous') {
//        iconUrl = `background:url('${this.fileIcon.front}')`;
//      }
//      if (data.proType === 'discontinuous') {
//        iconUrl = `background:url('${this.fileIcon.discontinuous}')`;
//      }
//      return createElement(
//        'span', [
//          createElement('span',{
//            attrs:{
//              style:`${iconUrl} no-repeat center left;padding-left:20px;`,
//            }}, GlobalUtil.model.localTeach.getRealFileName(data.label)),
//          createElement('span',{
//            attrs:{
//              style:"color:red;padding-left:5px;"
//            },
//            on:{
//              click: function() {
//                console.log('rename-button');
//              }
//            }},'rename'),
//          createElement('span',{
//            attrs:{
//              style:"color:blue;padding-left:5px;"
//            },
//            on:{
//              click: function() {
//                console.log('delete-button');
//              }
//            }},'delete'),
//        ]);
//
//    },
    renderContent(h, { node, data, store }) {
      let iconUrl = '';
      if (data.proType === 'continuous') {
        iconUrl = `background:url('${this.fileIcon.continuous}')`;
        if (GlobalUtil.model.localTeach.curSelectedTreeItem.uuid === data.uuid) {
          iconUrl = `background:url('${this.fileIcon.continuous_white}')`;
        }
      }
      if (data.proType === 'discontinuous') {
        iconUrl = `background:url('${this.fileIcon.discontinuous}')`;
        if (GlobalUtil.model.localTeach.curSelectedTreeItem.uuid === data.uuid) {
          iconUrl = `background:url('${this.fileIcon.discontinuous_white}')`;
        }
      }
      const iconStyle = `${iconUrl} no-repeat center left;padding-left: 20px;`;

      const label = GlobalUtil.model.localTeach.getRealFileName(data.label);
      return (
        <span class="tree-list">
          <span style={iconStyle}>{label}</span>
          <span class="display-none" style="margin-right: 12px">
            <el-button size="mini" type="text" on-click={ () => this.rename(data) }><img style="margin-right: 10px" src={this.fileIcon.rename} /></el-button>
            <el-button size="mini" type="text" on-click={ () => this.delete(node, data) }><img src={this.fileIcon.delete} /></el-button>
          </span>
      </span>);
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
    XarmModel,
    DialogTeachProjName,
  },
  computed: {
    getCurFile(){
      const tempArr = this.model.localTeach.curEditingFileUUID.split('/');
      return tempArr[tempArr.length-1];
    },
  },
};

</script>
<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
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
    height: 100%;
    /*padding: 0 14px;*/
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .recording-area-wrapper {
      width: 80%;
      /*margin: 0 12px;*/
      font-size: 14px;
      .top-area {
        box-shadow: 0 0 6px 0 rgba(205,205,205,0.50);
        border-radius: 8px;
        height: 60%;
      }
      .bottom-area {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        height: 40%;
      }
      .switch-wrapper {
        position: relative;
        width: 350px;
        background: #F3F3F3;
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
            /*padding-top: 120px;*/
            padding-top: 20vh;
            button {
              margin: 0px auto;
              display: block;
            }
          }
          .start-btn {
            height: 42px;
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100%;
            line-height: 42px;
            background: #52BF53;
            font-size: 22px;
            color: #fff;
            /*cursor: pointer;*/
            transition: all .4s;
            border: none;
            outline: 0;
          }
          /*.start-btn:hover {*/
            /*background: rgba(212,212,212,0.6);*/
          /*}*/
          .recording-time {
            height: 36px;
            line-height: 36px;
          }
        }
      }

    }
    .projects-list-wrapper {
      width: 320px;
      /*min-width: 300px;*/
      /*max-width: 400px;*/
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
          font-size: 14px;
          color: #8E959D;
          .el-icon-circle-plus {
            margin-right: 14px;
          }
        }
      }
      .tree-wrapper {
        height: inherit;
        overflow-y: auto;
        height: 90%;
        font-size: 14px;
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
.display-none {
  display: none;
}
.tree-wrapper::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.tree-wrapper::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #D8D8D8;;
}
.tree-wrapper::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(231,231,231,0.4);
  border-radius: 0;
  background: rgba(231,231,231,0.4);
}
</style>
<style lang="scss">
  .tree-list {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-left: 8px;
  }
  .recording-project-list {
    background: #fff;
  }
  .recording-project-list .el-tree-node__content {
    height: 36px;
  }
  .recording-project-list .el-tree-node.is-expanded>.el-tree-node__children {
    /*background: #E8E8E8;*/
    border-top: 1px solid #E3E3E3;
  }
  /*.recording-project-list .el-tree-node__expand-icon.is-leaf:before{*/
    /*background: url("../assets/img/edit/recording/icon_pathfile_grey.svg") no-repeat center left;*/
    /*padding: 10px;*/
  /*}*/
  /*.recording-project-list .el-tree-node.is-current >.el-tree-node__content .el-tree-node__expand-icon.is-leaf:before{*/
    /*background: url("../assets/img/edit/recording/icon_pathfile_white.svg") no-repeat center left;*/
  /*}*/
  .recording-project-list .el-tree-node.is-current>.el-tree-node__content {
    background-color: #575C62;
    color: #fff;
  }
  .recording-project-list .el-tree-node.is-current>.el-tree-node__content .display-none {
    display: inline-block;
  }
  .save-dialog .el-dialog__title{
    font-size: 16px;
    letter-spacing: -0.57px;
    color: #E27347;
  }
  .save-dialog .el-dialog__body {
    text-align: center;
  }
  .save-dialog .el-dialog__body p{
    font-size: 16px;
    color: #555;
    letter-spacing: -0.57px;
  }
  .save-dialog .el-dialog__body span {
    font-size: 12px;
    letter-spacing: -0.38px;
  }
  .save-dialog .el-dialog__body button {
    width: 168px;
    height: 40px;
    margin-top: 50px;
    background: #444;
    border-radius: 2px;
    color: #fff;
    border: none;
  }
  .create-project-dialog {
    .el-dialog__body {
      text-align: center;
    }
    .select-way {
      display: flex;
      justify-content: space-around;
      margin-bottom: 30px;
      .common-box {
        width: 120px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f3f3f3;
        cursor: pointer;
      }
      .active {
        border: 1px solid blue;
      }
    }
    .project-name-input {
      width: 350px;
    }
    .create-project-btn {
      width: 100%;
      border: none;
    }
  }
</style>

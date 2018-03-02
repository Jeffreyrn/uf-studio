<template lang="html">
  <div class="app-container com-module-wrapper">
    <div class="recording-header-wrapper">
      <div><router-link :to="{name: 'EditHome'}"><img src="../assets/img/common/icon_back.svg" alt="back"/></router-link><span>Recording</span></div>
    </div>
    <div class="main-contain">
      <div class="recording-area-wrapper"  id="left-teach-frame">
        <div class="left-top-area" id="left-top-area">
          <!-- <div style="position:relative;">
          </div> -->
          <div class="left-emulator" id="left-emulator">
          </div>
          <!-- <div v-if="editState===true" class="left-show" id="left-show">
          </div>
          <div v-if="editState===true" class="left-control" id="left-control" style="overflow-y:scroll">
            <XarmModel></XarmModel>
            <EndSet></EndSet>
            <EndJointControl></EndJointControl>
          </div> -->
          <!-- <div v-if="editState===false" style="background:gray;width:100%;height:100%;">
          </div> -->
        </div>
        <div class="left-bottom-area" id="left-bottom-area">
          <div class="switch-wrapper">
            <div class="recording">
              <div class="recording-time">
                <div v-if="model.localTeach.curSelectedTreeItem.type==='file'">
                  {{ fileLength(model.localTeach.curEditingFileUUID) }}
                </div>
                <div v-if="model.localTeach.curSelectedTreeItem.type==='proj'">
                  {{ `${Math.floor(curProjTotal/10)}.${curProjTotal%10}` }}
                </div>
              </div>
              <div class="recording-name" v-if="model.localTeach.curSelectedTreeItem.type==='file'">
                <span class="file-proj-icon" v-if="model.localTeach.curProj.type==='discontinuous'">
                  <img src="./../assets/img/edit/recording/icon_singlepoint_16x16.svg" width="12px" height="12px" />
                </span>
                <span class="file-proj-icon" v-if="model.localTeach.curProj.type==='continuous'">
                  <img src="./../assets/img/edit/recording/icon_waypoint_16x16.svg" width="12px" height="12px" />
                </span>
                <span>
                  {{ model.localTeach.getRealFileFileName(model.localTeach.curSelectedTreeItem.uuid) }}
                </span>
              </div>
              <!--<div class="file-name"><img src="../assets/img/edit/recording/icon_pathfile_grey.svg"/><span>{{ getCurFile }}</span></div>-->
              <div v-if="editState===false">
                <div class="" v-if="model.localTeach.curSelectedTreeItem.type==='proj'">
                  <button v-if="model.localTeach.visible.starRecording===false" class="bottom-btn start-recording-btn" @click='startRecord()'>Start Recording</button>
                  <button v-if="model.localTeach.visible.starRecording===true" class="bottom-btn finish-recording-btn" @click="finishRecord(model.localTeach.curEditingFileUUID)">Finish Recording</button>
                  <button class="bottom-btn" v-bind:class="classObject"><i class="el-icon-caret-right"></i></button>
                  <button v-if="model.localTeach.visible.starRecording && model.localTeach.curProj.type==='discontinuous'" class="bottom-btn press-btn" @click='addRecord()'>Press to record</button>
                </div>
                <div class="" v-if="model.localTeach.curSelectedTreeItem.type==='file'">
                  <button v-if="model.localTeach.curProj.type==='discontinuous'" class="bottom-btn eidt-btn" @click='startEdit'>Edit</button>
                  <button class="bottom-btn start-btn"><i class="el-icon-caret-right"></i></button>
                </div>
              </div>
              <div v-if="editState===true">
                <button class="bottom-btn" v-bind:class="saveChangeClassObject" @click='onSaveChange'>Save change</button>
                <button class="bottom-btn edit-cancel-btn" @click='cancelEdit'>Cancel</button>
              </div>

            </div>
          </div>
          <ListProj id="bottom-right-frame"></ListProj>
        </div>
      </div>

      <div class="projects-list-wrapper" v-if="editState===false">
        <h3>My Projects <button class="add-file" @click="newProj()"><i class="el-icon-circle-plus"></i>Project</button></h3>
        <div class="tree-wrapper" id="tree-wrapper">
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
      <div class="control-wrapper" v-else>
        <!-- <XarmModel></XarmModel> -->
        <!-- <div>
          <EndSet></EndSet>
        </div> -->
        <!-- <EndJointControl></EndJointControl> -->
        <EmulatorControl></EmulatorControl>
      </div>
    </div>

    <el-dialog
      class="save-dialog"
      title="System Notice"
      width="470px"
      :visible.sync="visible.saveDialog"
      :before-close="finishRecordCancle"
      >
      <p>Stop Recording and save automatically.</p>
      <span>The recording file will be saved to my project list</span>
      <el-button @click="finishRecordOK">确 定</el-button>
    </el-dialog>

    <DialogTeachProjName
      title="Please choose the way you want to record with xArm in this project"
      :onok='oncreate'
      v-if="model.localTeach.projTypeSelectedShow">
    </DialogTeachProjName>

    <DialogTeachProjName
      title="Please rename your project"
      :onok='onrename'
      width='400'
      height='200'
      input_top='90'
      show_selected='false'
      v-if="model.localTeach.projRenameShow">
    </DialogTeachProjName>

  </div>
</template>
<script>

import OnePointSetting from './Teach/OnePointSetting';
import ListProj from './Teach/ListProj';
import ElButton from "../../node_modules/element-ui/packages/button/src/button";
import DialogTeachProjName from './DialogTeachProjName';
import { setTimeout } from 'timers';
import XarmModel from './common/XarmModel';
import EndSet from './common/EndSet';
// import EndJointControl from './common/EndJointControl';
import EmulatorControl from './common/EmulatorControl';
// import { constants } from 'perf_hooks';
import * as types from './../store/mutation-types';

const path = require('path');

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
      rightFrameWidth: 360,
      bottomLeftWidth: 200,
      pointWay: false,
      editState: false,
      curProjTotal: 0,
      fileIcon: {
        front: require('../assets/img/edit/recording/icon_pathfile_grey.svg'),
        discontinuous: require('../assets/img/edit/recording/icon_singlepoint_14x14_dark.svg'),
        continuous: require('../assets/img/edit/recording/icon_waypoint_14x14_dark.svg'),
        discontinuous_white: require('../assets/img/edit/recording/icon_singlepoint_14x14_white.svg'),
        continuous_white: require('../assets/img/edit/recording/icon_waypoint_14x14_white.svg'),
        pathFileGrey: require('../assets/img/edit/recording/icon_pathfile_grey.svg'),
        rename: require('../assets/img/edit/recording/icon_rename_white.svg'),
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
    // GlobalUtil.model.localTeach.setSelectedTreeItem(null);
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
    // basename(name) {
    //   name = path.basename(name);
    //   name = name.split('.')[0];
    //   return name;
    // },
    onSaveChange() {
      console.log(`on Save Change`);
      const uuid = GlobalUtil.model.localTeach.curEditingFileUUID;
      const index = GlobalUtil.model.localTeach.curSelectedIndex;
      const point = GlobalUtil.model.localTeach.curPoint;
      const points = GlobalUtil.model.localTeach.fileDatas[uuid];
      points[index] = point;

      const textDict = {
        type: GlobalUtil.model.localTeach.curProj.type,
        total: points.length,
        points: points,
      };
      const text = JSON.stringify(textDict);

      CommandsTeachSocket.saveOrUpdateFile(uuid, text, () => {
        GlobalUtil.model.localTeach.hasChange = false;
      });
    },
    oncreate() {
      const text = this.model.localTeach.curDialogProjInputText
      CommandsTeachSocket.createProj(text, GlobalUtil.model.localTeach.projTypeSelected);
      GlobalUtil.model.localTeach.projTypeSelectedShow = false;
    },
    onrename() {
      let text = this.model.localTeach.curDialogProjInputText;
      GlobalUtil.model.localTeach.projRenameShow = false;
      const projTypeSelected = GlobalUtil.model.localTeach.projTypeSelected;
      const pre = projTypeSelected === '1' ? 'continuous_' : 'discontinuous_';
      text = `${pre}${text}`;
      console.log(`onrename text = ${text}`);
      CommandsTeachSocket.renameProj(text, () => {

      });
    },
    rename(data) {
      console.log(`rename data uuid = ${data.uuid}`)
      GlobalUtil.model.localTeach.projRenameShow = true;
      GlobalUtil.model.localTeach.curDialogProjInputText = GlobalUtil.model.localTeach.getRealProjFileName(path.basename(data.uuid));
      if (data.uuid.indexOf('discontinuous_') >= 0) {
        GlobalUtil.model.localTeach.projTypeSelected = '2';
      }
      else {
        GlobalUtil.model.localTeach.projTypeSelected = '1';
      }
      setTimeout(() => {
        document.getElementById('teach-input-text').focus();
      }, 100);
    },
    fileLength(uuid) {
      if (uuid.indexOf('.json') < 0) {
        return;
      }
      if (GlobalUtil.model.localTeach.fileDatas[uuid] !== undefined) {
        if (GlobalUtil.model.localTeach.curProj.type === 'discontinuous') {
          return GlobalUtil.model.localTeach.fileDatas[uuid].length;
        }
        if (GlobalUtil.model.localTeach.curProj.type === 'continuous') {
          const length = GlobalUtil.model.localTeach.fileDatas[uuid].length;
          const msec = length % 10;
          const sec = Math.floor(length / 10);
          const str = `${sec}.${msec}`;
          // const sec = Math.floor(length / 10) % 60;
          // const min = Math.floor(Math.floor(length / 10) / 60) % 60;
          // const str = `${min}:${sec}.${msec}00`;
          return str;
        }
      }
      return 0;
    },
    checkInputText() {
      if(this.inputText !== ''){
        this.createProjectDisable = false;
      }
    },
    finishRecord () {
      this.visible.saveDialog = true;
      this.visible.singlePointRecording = false;
      this.visible.wayPointRecording = false;
    },
    finishRecordOK() {
      this.visible.saveDialog = false;
      GlobalUtil.model.localTeach.visible.starRecording = false;

      const curFileDatas = GlobalUtil.model.localTeach.fileDatas['temp']; //GlobalUtil.model.localTeach.curFileDatas;
      console.log(`curFileDatas = ${JSON.stringify(curFileDatas)}`);

      const textDict = {
        type: GlobalUtil.model.localTeach.curProj.type,
        total: curFileDatas.length,
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
    finishRecordCancle() {
      this.visible.saveDialog = false;
      GlobalUtil.model.localTeach.visible.starRecording = false;
      CommandsTeachSocket.debugSetBeart(false, 0.1, (dict) => {
        console.log(`1111SetBeart false = dict = ${JSON.stringify(dict)}`);
      });
    },
    startRecord() {
      GlobalUtil.model.localTeach.curEditingFileUUID = '';
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

      GlobalUtil.model.localTeach.fileDatas['temp'] = [];
      // GlobalUtil.model.localTeach.curFileDatas = [];
      CommandsTeachSocket.debugSetBeart(true, 0.1, (dict) => {
        console.log(`SetBeart false = dict = ${JSON.stringify(dict)}`);
        const testData = GlobalUtil.model.localTeach.getTestData(GlobalUtil.model.localTeach.curDuration);
        GlobalUtil.model.localTeach.lastFileData = testData;
        if (isContinus === false) {
          GlobalUtil.model.localTeach.curDuration -= -1;
          return;
        }

        if (GlobalUtil.model.localTeach.fileDatas['temp'].length >= 1800) {
          this.finishRecordOK();
        }
        else {
          // test data
          const testData = GlobalUtil.model.localTeach.getTestData(GlobalUtil.model.localTeach.curDuration);
          // GlobalUtil.model.localTeach.curFileDatas.push(testData)
          GlobalUtil.model.localTeach.pushFileData('temp', testData);
          let tempArr = [];
          for (let i = 0; i < GlobalUtil.model.localTeach.fileDatas['temp'].length; i += 1) {
            tempArr.push(i);
          }
          // GlobalUtil.model.localTeach.curEditingFileUUID = uuid;
          GlobalUtil.model.localTeach.showArr = tempArr;
          // this.onSelect(null, GlobalUtil.model.localTeach.curDuration);
        }
        this.scrollTo(GlobalUtil.model.localTeach.fileDatas['temp'].length);
      });
      GlobalUtil.model.localTeach.curDuration -= -1;
    },
    scrollTo(time) {
      document.getElementById("bottom-right-frame").scrollLeft = 60 * (parseInt(time / 10) * 10);
    },
    addRecord() {
      const testData = GlobalUtil.model.localTeach.getTestData(GlobalUtil.model.localTeach.curDuration);
      // GlobalUtil.model.localTeach.curFileDatas.push(testData);
      GlobalUtil.model.localTeach.pushFileData('temp', testData);
      let tempArr = [];
      for (let i = 0; i < GlobalUtil.model.localTeach.fileDatas['temp'].length; i += 1) {
        tempArr.push(i);
      }
      // GlobalUtil.model.localTeach.curEditingFileUUID = uuid;
      GlobalUtil.model.localTeach.showArr = tempArr;
      this.scrollTo(GlobalUtil.model.localTeach.fileDatas['temp'].length);
    },
    startEdit() {
      this.editState = true;
      GlobalUtil.model.localTeach.hasChange = false;
      GlobalUtil.model.localTeach.onSelect(null, 0);
      this.onwinresize();
      setTimeout(() => {
        document.getElementById("bottom-right-frame").scrollLeft = 0;
        this.$store.commit(types.ROBOT_MOVE_JOINT, GlobalUtil.model.localTeach.curPoint);
        this.onwinresize();
      });
    },
    cancelEdit() {
      this.editState = false;
      GlobalUtil.model.localTeach.hasChange = false;
      GlobalUtil.model.localTeach.onSelect(null, 0);
      // this.$store.commit(types.ROBOT_MOVE_JOINT, GlobalUtil.model.localTeach.curPoint);
      document.getElementById("bottom-right-frame").scrollLeft = 0;
      this.onwinresize();
    },
    delProj(uuid) {
      const realName = GlobalUtil.model.localTeach.getRealFileFileName(uuid)
      if (uuid.indexOf('.json') >=0 ) {
        this.$confirm(`Delete ${realName}?`, {
          confirmButtonText: 'OK',
          cancelButtonText: 'CANCEL',
          type: 'info',
          showClose: false,
          closeOnClickModal: false,
        }).then(() => {
          CommandsTeachSocket.delFiles(uuid, (dict) => {
            // console.log(`localTeach.delProj = ${curProj.uuid}, dict = ${JSON.stringify(dict)}`);
          });
        }).catch(() => {
        });
        return;
      }
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
      setTimeout(() => {
        document.getElementById('teach-input-text').focus();
      }, 100);
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
      const totalFrameWidth = this.clientWidth - 13;
      const totalFrameHeight = this.clientHeight - 120;
      const leftTopArea = document.getElementById('left-top-area');
      const leftBottomArea = document.getElementById('left-bottom-area');
      const rightFrame = document.getElementById('tree-wrapper');
      // const leftControl = document.getElementById('left-control');
      // const leftEmulator = document.getElementById('left-emulator');
      // const leftShow = document.getElementById('left-show');

      const leftFrameWidth = totalFrameWidth - this.rightFrameWidth;
      if (leftFrame !== null && leftFrame !== undefined) {
        leftFrame.style.width = `${leftFrameWidth}px`;
      }
      if (bottomRightFrame !== null && bottomRightFrame !== undefined) {
        bottomRightFrame.style.width = `${totalFrameWidth - this.rightFrameWidth - this.bottomLeftWidth}px`;
      }
      const bottomHeight = 300 //this.editState ? 200 : 300;
      leftBottomArea.style.height = `${bottomHeight}px`;
      const leftTopHeight = totalFrameHeight + 50 - bottomHeight;
      leftTopArea.style.height = `${leftTopHeight}px`;
      if (rightFrame !== null && rightFrame !== undefined) {
        rightFrame.style.height = `${totalFrameHeight}px`;
      }
      if (this.editState) {
        // const emulatorHeight = leftTopHeight - 200 - 0;
        // if (leftShow !== null) {
        //   leftShow.style.height = `${emulatorHeight}px`;
        // }
        // leftEmulator.style.height = `${emulatorHeight}px`;
        // leftEmulator.style.width = `${leftFrameWidth - 210}px`;
      }
      else {
        // leftEmulator.style.height = `100%`;
        // leftEmulator.style.width = `100%`;
        // if (leftShow !== null) {
        //   leftShow.style.height = `100%`;
        // }
      }
      // console.log(`totalFrameHeight = ${totalFrameHeight}, bottomRightFrame = ${bottomRightFrame.style.width}`);
    },
    handleNodeClick(data) {
      // if (this.editState) {
      //   return;
      // }
      this.cancelEdit();
      const uuid = data.uuid;
      GlobalUtil.model.localTeach.setCurSelectedTreeItem(uuid);
      const proj = GlobalUtil.model.localTeach.getProjInfo(uuid);
      GlobalUtil.model.localTeach.curProj = proj;
      const file = GlobalUtil.model.localTeach.getTeachFileInfo(proj, uuid);

      this.protype = proj.type;

      const curProj = GlobalUtil.model.localTeach.getCurProj(uuid);
      if (curProj !== null && curProj !== undefined) {
        GlobalUtil.model.localTeach.showArr = [];
        CommandsTeachSocket.getProjFiles(uuid, (dict) => {
          const total = dict.data.total;
          this.curProjTotal = total;
          console.log(`CommandsTeachSocket getProjFiles dict = ${JSON.stringify(dict)}`);
        });
      }

      if (file !== null && file !== undefined) {
        // GlobalUtil.model.localTeach.setSelectedTreeItem(file);
        // GlobalUtil.model.localTeach.onSelect(null, 0);
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
            let tempArr = [];
            for (let i = 0; i < GlobalUtil.model.localTeach.fileDatas[uuid].length; i += 1) {
              tempArr.push(i);
            }
            GlobalUtil.model.localTeach.curEditingFileUUID = uuid;
            GlobalUtil.model.localTeach.showArr = tempArr;
            GlobalUtil.model.localTeach.onSelect(null, 0);
            this.$store.commit(types.ROBOT_MOVE_JOINT, GlobalUtil.model.localTeach.curPoint);
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
//            }}, GlobalUtil.model.localTeach.getRealProjFileName(data.label)),
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
      const label = GlobalUtil.model.localTeach.getRealProjFileName(data.label);
//      const isProj = data.uuid.indexOf('discontinuous_') >= 0 || data.uuid.indexOf('continuous_') >= 0 ? true:false;
      const isProj = data.uuid.indexOf('.json') >= 0 ? false:true;
      return (
        <span class="tree-list">
          <span style={iconStyle}>{label}</span>
          <span class="display-none" style="margin-right: 20px">
            {isProj?<el-button style="mini" size="mini" type="text" on-click={ () => this.rename(data) }><img style="margin-right: 10px" src={this.fileIcon.rename} /></el-button>:<span style="display:none">1</span>}
            <el-button size="mini" type="text" on-click={ () => this.delProj(data.uuid) }><img src={this.fileIcon.delete} /></el-button>
          </span>
      </span>);
    },
    // onClick(e) {
    //   const attr = e.currentTarget.value;
    //   console.log(`attr = ${attr}`);
    //   switch (attr) {
    //     case 'scroll':
    //       {
    //         const time = GlobalUtil.model.localTeach.curDuration;
    //         document.getElementById("scroll-timer").scrollLeft = 60 * (parseInt(time / 10) * 10);
    //         break;
    //       }
    //     default:
    //       break;
    //   }
    // },
  },
  beforeDestroy() {
  },
  components: {
    OnePointSetting,
    ListProj,
    XarmModel,
    DialogTeachProjName,
    XarmModel,
    EndSet,
    // EndJointControl,
    EmulatorControl,
  },
  computed: {
    getCurFile(){
      const tempArr = this.model.localTeach.curEditingFileUUID.split('/');
      return tempArr[tempArr.length-1];
    },
    classObject: () => {
      return {
        'start-btn': GlobalUtil.model.localTeach.curProj.files.length > 0 && GlobalUtil.model.localTeach.visible.starRecording===false,
        'start-btn-dark': GlobalUtil.model.localTeach.curProj.files.length === 0 || GlobalUtil.model.localTeach.visible.starRecording===true,
      }
    },
    saveChangeClassObject: () => {
      return {
        'save-change-btn': GlobalUtil.model.localTeach.hasChange === true,
        'save-change-btn-dark': GlobalUtil.model.localTeach.hasChange === false,
      }
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
    background: #F8F8F8;
    .recording-area-wrapper {
      width: 80%;
      /*margin: 0 12px;*/
      font-size: 14px;
      .left-top-area {
        box-shadow: 0 0 6px 0 rgba(205,205,205,0.50);
        border-radius: 8px;
        height: 300px;
      }
      .left-bottom-area {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        height: 100px;
      }
      .left-emulator {
        float: left;
        width: 100%;
        height: 100%;
        background: lightcyan;
        // background: yellow;
        // padding-bottom:5px;
      }
      .left-show {
        float: right;
        width: 200px;
        height:200px;
        background: lightgray;
      }
      .left-control {
        float: left;
        // margin-top: 10px;
        width: 100%;
        height:200px;
        // height: 100%;
        // bottom: 0px;
        background: gray;
        // background: transparent;
      }
      .switch-wrapper {
        position: relative;
        width: 250px;
        background: #F3F3F3;
        text-align: center;
        // .switch-btn {
        //   height: 62px;
        //   line-height: 62px;
        //   background: #ECECEC;
        //   border-radius: 30px;
        //   color: #9C9C9C;
        //   letter-spacing: -0.78px;
        //   text-align: center;
        //   display: flex;
        //   justify-content: space-around;
        //   span {
        //     width: 50%;
        //     cursor: pointer;
        //   }
        //   .active {
        //     background: #FFF;
        //     border-radius: 100px;
        //   }
        // }
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
            // padding-top: 20vh;
            // button {
            //   margin: 0px auto;
            //   display: block;
            // }
          }
          .bottom-btn {
            height: 42px;
            width: 100%;
            right: 0px;
            line-height: 42px;
            position: absolute;
            transition: all .4s;
            border: none;
            outline: 0;
            font-family: 'Gotham-Book';
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: -0.06px;
          }
          .start-recording-btn {
            bottom: 42px;
            background: #E24D4A;
            cursor: pointer;
          }
          .finish-recording-btn {
            bottom: 42px;
            background: #52BF53;
            cursor: pointer;
          }
          .eidt-btn {
            bottom: 42px;
            background: #4A90E2;
            cursor: pointer;
          }
          .save-change-btn {
            bottom: 42px;
            background: #52BF53;
            cursor: pointer;
          }
          .save-change-btn-dark {
            bottom: 42px;
            background: #BCBDBC;
            // cursor: pointer;
          }
          .edit-cancel-btn {
            bottom: 0px;
            background: #E24D4A;
            cursor: pointer;
          }
          .start-btn {
            bottom: 0;
            background: #52BF53;
            cursor: pointer;
          }
          .press-btn {
            bottom: 0;
            background: #E24D4A;
            z-index: 50px;
            cursor: pointer;
          }
          .start-btn-dark {
            bottom: 0;
            background: #E3E3E3;;
          }
          /*.start-btn:hover {*/
            /*background: rgba(212,212,212,0.6);*/
          /*}*/
          .recording-time {
            height: 36px;
            line-height: 36px;
            font-family: 'Gotham-Book';
            font-size: 14px;
            color: #444444;
            letter-spacing: -0.78px;
            background: #E5E5E5;
          }
          .recording-name {
            height: 43px;
            line-height: 43px;
            font-family: 'Gotham-Book';
            font-size: 14px;
            color: #6D7175;
            letter-spacing: -0.78px;
            background: #FFFFFF;
          }
        }
      }
    }
    .control-wrapper {
      width: 360px;
    }
    .projects-list-wrapper {
      width: 360px;
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
        overflow-y: scroll;
        height: 92%;
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
  width:200px;
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
  }
  .recording-project-list {
    background: #fff;
  }
  .recording-project-list .el-tree-node__content {
    height: 36px;
  }
  /*.recording-project-list .el-tree-node.is-expanded>.el-tree-node__children {*/
    /*background: #E8E8E8;*/
  /*}*/
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
  .file-proj-icon {
    // padding-left: 5px;
  }
</style>

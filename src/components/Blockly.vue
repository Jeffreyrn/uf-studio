<template>
<div class="blockly-wrapper">
  <CommonTopMenu
    title='App Editor'
    :isFileSelected='enableRun'
    :issaved='saveStatus'
    :curFileName='model.localAppsMgr.curProName + notSaved'
    :onback='quitPage'
    :onsave='saveProject'
    :onnew='newProject'
    :isRunning='false'
    :onstart='startRun'>
  </CommonTopMenu>
  <div class="main-wrapper">
    <div id="blockly-area" class="blockly-workspace" v-bind:class="{'div-disable': divDisable}" tabindex="0">
      <div id="tab-blocks"></div>
      <div class="hide-button el-icon-arrow-right" v-bind:class="{rotate: !uiData.sideShow}" @click="toggleSideShow"></div>
    </div>
    <div id="slide-area" v-show="uiData.sideShow">
      <div class="emulator-wrapper">
        <!-- <div class="for-dev">
          <button class="button" @click="genjs">gen</button>
          <div v-html="jsCode"></div>
          <button class="button" @click="genxml">gen xml</button>
          <button class="button" @click="onIDE()">test ide list</button>
          <button class="button" @click="onTeach()">test teach list</button>
          <button class="button" @click="onApp()">test app list</button>
          <div v-text="xmlCode"></div>
        </div> -->
        <slot name="xarm"></slot>
      </div>
      <div class="file-list">
        <file-list @loadProject="loadProject" :selected="model.localAppsMgr.curProName"></file-list>
      </div>
    </div>
  </div>
  <dialogs v-if="model.localAppsMgr.isProjListDialogShow===true" @insertProject="insertProject"></dialogs>
  <dialog-input-name v-if="uiData.inputName" @hideInput="uiData.inputName = false" @saveProject="saveProject"></dialog-input-name>
</div>
</template>
<script>
import { Blockly, init as initBlockly } from '../assets/lib/blockly/blockly';
import BlocklyLib from '../assets/lib/blockly/uarm/blockly_lib';
// import eventBus from './Blockly/eventBus'
import Dialogs from './Blockly/Dialogs'
import DialogInputName from './Blockly/DialogInputName'
import FileList from './Blockly/FileList'
import CommonTopMenu from './common/CommonTopMenu';
import * as types from '../store/mutation-types';

const BLOCK_TYPES = {
  python: 'studio_run_python',
  record: 'studio_play_recording',
  app: 'studio_run_app',
}
export default {
  props: ['blocklyData', 'moduleName'],
  data() {
    return {
      enableRun: false,
      divDisable: false,
      saveStatus: true,
      pre: '',
      category: 'myapp',
      xmlLoaded: true,
      block: {},
      model: window.GlobalUtil.model,
      jsCode: '',
      xmlCode: '',
      myAppData: {},
      backStr: 'EditHome',
      constData: {
        tabName: {
          JS: 'Javascript',
          XML: 'XML',
          BLOCKS: 'Blocks',
        },
        untitledProject: this.$t('untitledProject'),
      },
      uiData: {
        snackbar: false,
        snackbarMessage: '',
        projectNameEdit: false,
        sideShow: true,
        inputName: false,
      },
      activeTab: null,
      projectNameEditing: false,
      currentBlock: null,
      // currentBlockTemp: null,
      currentBlockId: 0,
      sideToggle: true,
      toggleSideVisible: true,
      dialog: {
        [BLOCK_TYPES.python]: () => {
          this.onIDE()
        },
        [BLOCK_TYPES.record]: () => {
          this.onTeach()
        },
        [BLOCK_TYPES.app]: () => {
          this.onApp()
          // console.log('open other app')
        },
      },
    };
  },
  beforeDestroy() {
    this.setOnline(false)
    Blockly.removeEndListener(this.endCallback);
    window.removeEventListener('resize', self.resizeWorkspace, false); // avoid fire event listener twice or more
    // Blockly.BlockWorkspace.removeChangeListener(self.onChangeEvent);
  },
  activated: function() {
    console.log(`params = ${JSON.stringify(this.$route.params.data)}`);
    this.category = 'myapp';
    if (this.$route.params.data !== undefined) {
      this.myAppData = this.$route.params.data;
      const name = this.myAppData.name;
      this.backStr = 'AppStore';
      this.category = this.myAppData.category;
      this.getProject(name);
      if (this.category !== 'myapp') {
        this.divDisable = true
      }
      this.enableRun = this.blocksNotEmpty()
    }
    this.setOnline(true)
  },
  deactivated() {
    this.setOnline(false)
    this.divDisable = false
  },
  components: {
    Dialogs,
    FileList,
    DialogInputName,
    CommonTopMenu,
  },
  mounted() {
    const self = this;
    this.model.localAppsMgr.curProName = ''
    this.setOnline(true)
    window.xArmVuex = this.$store;
    if (this.uarmConnectStatus) {
      window.UArm.set_acceleration({
        printingMoves: 200,
        travelMoves: 200,
        retractMoves: 200,
      });
    }
    // init Blockly
    this.initBlocklyDiv().then(() => {
      self.resizeWorkspace();
      // if (this.model.localAppsMgr.curProName === '') {
      //   this.newProject()
      // }
    });
    window.addEventListener('resize', self.resizeWorkspace, false);
    Blockly.BlockWorkspace.addChangeListener(self.onChangeEvent);

    Blockly.Blocks[BLOCK_TYPES.python].onchange = (event) => {
      // console.log('event change', event)
      // console.log('event type', event.type) // move change ui
      const blockId = event.blockId
      const block = Blockly.BlockWorkspace.getBlockById(blockId)
      // console.log('event block', block)
      if (block && event.type === 'ui') {
        // eventBus.$emit('show', block)
        this.block = block
        this.popDialog(block.type)
        console.log('onchange 1.1')
      }
    }
    Blockly.Blocks[BLOCK_TYPES.record].onchange = (event) => {
      // console.log('event change', event)
      // console.log('event type', event.type) // move change ui
      const blockId = event.blockId
      const block = Blockly.BlockWorkspace.getBlockById(blockId)
      // console.log('event block', block)
      if (block && event.type === 'ui') {
        // eventBus.$emit('show', block)
        this.block = block
        this.popDialog(block.type)
        console.log('onchange 1.2')
      }
    }
//    Blockly.addEndListener(this.endCallback);
    self.activeTab = self.constData.tabName.BLOCKS;
    // load project
  },
  methods: {
    backToEdit() {
      this.enableRun = this.blocksNotEmpty()
      this.category = 'myapp'
      this.divDisable = false
    },
    setOnline(value) {
      const data = {
        index: 'online',
        value,
      };
      this.$store.commit(types.SET_ROBOT_STATE, data);
    },
    startRun() {
      console.log('start run');
      this.runProject()
    },
    quitPage() {
      if (this.saveStatus || this.emptyProject()) {
        this.$router.push({ name: this.backStr });
      }
      else {
        this.$confirm('Are you sure quit without save?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }).then(() => {
          this.$router.push({ name: this.backStr });
        }).catch(() => {
          console.log('quit canceled')
        })
      }
    },
    insertProject(path) {
      if (path.name) {
        path.project = this.model.localAppsMgr.curProName
      }
      console.log(path)
      if (this.block.type === BLOCK_TYPES.app) {
        window.CommandsAppsSocket.getBlockXml(path).then((xml) => {
          console.log('get xml text', xml.xmlData)
          Blockly.appendXML(xml.xmlData)
          this.block = {}
          // this.enableRun = this.blocksNotEmpty() // ReferenceError: blocksNotEmpty is not defined FileList,vue
        }, (data) => {
          this.$message({
            type: 'info',
            message: `get app xml failed, code${data.code}`,
          })
        })
      }
      else {
        const children = this.block.childBlocks_
        const inputField = children[0].inputList[0].fieldRow[1]
        inputField.setText(path)
        this.block = {}
      }
      window.setTimeout(() => {
        this.xmlLoaded = true
        this.enableRun = this.blocksNotEmpty()
      }, 1600)
    },
    popDialog(type) {
      if (Object.prototype.hasOwnProperty.call(this.dialog, type)) {
        this.dialog[type]()
      }
    },
    saveProject() {
      const name = this.model.localAppsMgr.curProName
      if (!name) {
        this.uiData.inputName = true
      }
      else {
        window.CommandsAppsSocket.createFile(name, this.projectContent(), () => {
          this.$message('Saved')
          this.uiData.inputName = false
          this.saveStatus = true
        })
      }
    },
    runProject() {
      if (this.blocksLength() > 0) {
        Blockly.executeCode().then().catch((err) => {
          this.$message(`excute error${err}`);
          // eventBus.$emit('running-status-changed', false);
          console.log(err);
        });
      }
    },
    onIDE() {
      this.model.localAppsMgr.setProjListDialogType('ide');
    },
    onTeach() {
      this.model.localAppsMgr.setProjListDialogType('teach');
    },
    onApp() {
      this.model.localAppsMgr.setProjListDialogType('app');
    },
    clearBlockly() {
      Blockly.clearWorkspace().then(() => {
        // this.uiData.inputName = true
        this.model.localAppsMgr.curProName = ''
        this.saveStatus = true
        console.log('workspace cleared')
      });
    },
    newProject() {
      // if (this.divDisable) {
      //   return false
      // }
      if (this.saveStatus || this.emptyProject()) {
        this.clearBlockly()
        // this.model.localAppsMgr.curProName = ''
      }
      else {
        this.$confirm('Discard current changes and create new?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }).then(() => {
          this.clearBlockly()
        }).catch(() => {
          console.log('quit canceled')
        })
      }
    },
    genxml() {
      this.xmlCode = this.projectContent()
    },
    genjs() {
      this.jsCode = Blockly.JavaScript.workspaceToCode(Blockly.BlockWorkspace);
    },
    onChangeEvent(event) {
      const blockId = event.blockId
      const block = Blockly.BlockWorkspace.getBlockById(blockId)
      // console.log(`on change ${event.type}`)
      // console.log(event, block)
      this.backToEdit()
      if (block !== null && event.type === Blockly.Events.CREATE && this.xmlLoaded) {
        // eventBus.$emit('show', block)
        const type = block.type
        if (!Object.is(block, {})) {
          this.popDialog(type)
        }
        console.log('sss', type, block)
        if (type === BLOCK_TYPES.app) {
          console.log('delete block type: APP')
          this.block = {}
          this.block.type = type
          block.dispose(false)
          this.xmlLoaded = false
        }
        else {
          this.block = block
          console.log('onchange 2')
        }
      }
      else if (this.blocksLength() > 0 && event.type !== 'ui') {
        this.saveStatus = false
        console.log(this.blocksLength())
        if (!this.model.localAppsMgr.curProName) {
          this.pre = 'Untitled'
        }
        else {
          this.pre = ''
        }
        console.log(`event ${event.type} emit change save status to false`)
      }
      else {
        console.log('not handled', event)
      }
    },
    toggleSideShow() {
      this.uiData.sideShow = !this.uiData.sideShow
      window.setTimeout(this.resizeWorkspace, 0)
    },
    initBlocklyDiv() {
      return new Promise((resolve) => {
        initBlockly('en');
        const blocklyDiv = document.getElementById('tab-blocks');
        Blockly.initBlockly(blocklyDiv);
        resolve();
      });
    },
    endCallback() {
      Blockly.setBlocksDeletable(true);
      Blockly.onBlocklyProjectStop();
      // window.UArm.stop_all();
      BlocklyLib.KeyPressEvent.clearEventListener();
      Blockly.Running = false;
    },
    // loadProject(projectName) {
    //   return new Promise((resolve, reject) => {
    //     window.FileManager.loadProject(this.moduleName, projectName).then((xmlText) => {
    //       window.UserConfig.setItem(this.moduleName, 'LastProjectName', projectName);
    //       Blockly.loadWorkspace(xmlText, this.onChangeEvent);
    //       // this.containVisionBlock();
    //       resolve();
    //     }).catch(err => reject(err));
    //   });
    // },
    loadProject(path) {
      this.backToEdit()
      if (path === this.model.localAppsMgr.curProName) {
        console.log('selected')
      }
      else if (this.disableLoadProject) {
        this.$message('Click too fast')
      }
      else if (this.saveStatus || this.emptyProject()) {
        this.getProject(path)
      }
      else {
        this.$confirm('Are you sure load app without save?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }).then(() => {
          this.getProject(path)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'load app canceled',
          })
        })
      }
    },
    getProject(path) {
      const self = this;
      this.disableLoadProject = true;
      window.setTimeout(() => {
        this.disableLoadProject = false
        this.enableRun = self.blocksNotEmpty()
      }, 1500)
      const data = {
        category: this.category,
        name: path,
      }
      console.log(`path = ${path}, category = ${this.category}`);
      window.CommandsAppsSocket.getProject(data).then((xml) => {
        // console.log('get xml return', xml.xmlData)
        Blockly.clearWorkspace().then(() => {
          Blockly.loadWorkspace(xml.xmlData, this.onChangeEvent)
          this.model.localAppsMgr.curProName = path
          this.saveStatus = true
        })
      }, (error) => {
        this.$message(`get xml error code${error.code}`)
      })
    },
    resizeWorkspace() {
      const blocklyArea = document.getElementById('blockly-area');
      const blocklyDiv = document.getElementById('tab-blocks');
      let element = blocklyArea;
      console.log('resize', blocklyArea.offsetWidth, blocklyArea.offsetHeight)
      let x = 0;
      let y = 0;
      if (element === null) {
        return;
      }
      do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
      } while (element);
      blocklyDiv.style.left = `${x}px`;
      blocklyDiv.style.top = `${y}px`;
      blocklyDiv.style.width = `${blocklyArea.offsetWidth}px`;
      blocklyDiv.style.height = `${blocklyArea.offsetHeight - 1}px`;
      Blockly.svgResize(Blockly.BlockWorkspace);
    },
    handleTabChange(val) {
      this.activeTab = val;
      if (this.activeTab === this.constData.tabName.BLOCKS) {
        Blockly.BlockWorkspace.setVisible(true);
        setTimeout(() => {
          Blockly.svgResize(Blockly.BlockWorkspace);
        }, 0);
      }
      else {
        Blockly.BlockWorkspace.setVisible(false);
      }
    },
    projectContent() {
      const xml = Blockly.generateXML();
      if (xml !== '') {
        return xml;
      }
      return null;
    },
    emptyProject() {
      return !this.blocksLength() && !this.model.localAppsMgr.curProName
    },
    blocksNotEmpty() {
      // console.log('block length', this.blocksLength());
      return this.blocksLength() > 0;
    },
    blocksLength() {
      if (Blockly.BlockWorkspace) {
        return Blockly.BlockWorkspace.getAllBlocks().length;
      }
      return 0;
    },
    projectSaveStatus() {
      const self = this;
      const projectContent = self.blocklyData.projectFileContent;
      let status;
      if (Blockly.BlockWorkspace !== null) {
        if (projectContent === null && self.blocksLength() <= 0) {
          status = true;
        }
        else if (projectContent === null && self.blocksLength() > 0) {
          status = false;
        }
        else {
          status = self.projectContent() === projectContent;
        }
      }
      else {
        status = true;
      }
      return status;
    },
  },
  computed: {
    displayProjectTitle() {
      return this.blocklyData.projectName !== null ?
        this.blocklyData.projectName : this.constData.untitledProject;
    },
    notSaved() {
      console.log('block length', this.blocksLength())
      return this.saveStatus ? '' : `${this.pre}*`
    },
  },
  watch: {
    'model.localAppsMgr.curProName'() {
      if (this.model.localAppsMgr.curProName) {
        this.pre = ''
      }
    },
    uarmConnectStatus() {
      if (this.uarmConnectStatus) setTimeout(Blockly.onUArmConnect, 5000);
    },
  },
};

</script>
<style lang="scss" src="./../assets/css/blockly.scss"></style>
<style lang="scss" scoped>
  $themeOrange:#D95E2E;
  .div-disable {
    pointer-events: none;
    opacity: 0.8;
  }
  .main-wrapper {
    display: flex;
    flex-direction: row;
    height: 100%;
    overflow: hidden;
    #blockly-area {
      width: 66.2%;
      min-height: 500px;
      position: relative;
      .hide-button {
        position: absolute;
        /*height: 40px;*/
        width: 10px;
        border-bottom: 8px solid transparent;
        border-right: 12px solid #F5F5F5;
        border-top: 8px solid transparent;
        line-height: 30px;
        right: 0;
        top: 0;
        z-index: 39;
        cursor: pointer;
        text-align: center;
        color: #767676;
      }
      .hide-button.rotate {
        transform: rotate(-180deg);
      }
    }
    #slide-area {
      background: #ccc;
      width: 33.8%;
      position: relative;
      .file-list {
        height: 55%;
      }
      .emulator-wrapper {
        position: relative;
        height: 45%;
        .for-dev{
          position: absolute;
        }
      }
    }
  }
  /*==========*/
  .blockly-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .blockly-wrapper.notfull{
    width: 80%;
  }
  .page-main {
    display: flex;
    width: 100%;
    flex: 1;
  }

  .project-name {
    display: table-cell;
    width: 10%;
  }

  .content-code {
    padding-bottom:1vw;
    height:94%;
    width:100%;
    overflow: auto;
  }

  .blockoy-workspace {
    flex: 1;
  }

  .blockly-sidebar {
    flex: 0;
  }

  pre.blockoy-workspace {
    border: 1px solid #ccc;
    overflow: scroll;
  }

  #blocklyDiv {
    position: absolute;
  }

  .farSide {
    text-align: right;
  }

  /* Buttons */


  #blockly-page h1 {
    font-weight: normal;
    font-size: 140%;
    margin-left: 5px;
    margin-right: 5px;
  }

  .content {
    visibility: hidden;
    margin: 0;
    padding: 1ex;
    position: absolute;
    direction: ltr;
  }

  pre.content {
    border: 1px solid #ccc;
    overflow: scroll;
  }

  #content_blocks {
    padding: 0;
  }

  .blocklySvg {
    border-top: none !important;
  }

  #content_xml {
    resize: none;
    outline: none;
    border: 1px solid #ccc;
    font-family: monospace;
    overflow: scroll;
  }

  #languageMenu {
    vertical-align: top;
    margin-top: 15px;
    margin-right: 15px;
  }

  /* Sprited icons. */

  .trash {
    background-position: 0px 0px;
  }

  .link {
    background-position: -21px 0px;
  }

  .run {
    background-position: -42px 0px;
  }

  /* add for uarm studio */

  .app-container {
    background: #F6F6F6;
    height: 100%;
    color: #222;
    display: flex;
    flex-direction: row;
  }

  .modal .modal-footer {
    text-align: center;
  }


  .uarm-name img {
    width: 50%;
    margin-top: 14%;
    padding-bottom: 7%;
  }

  input:not([type]) {
    height: auto;
    margin: 0;
    border: none;
    background-color: aliceblue;
  }


  #wrist-canvas:active, #turn-canvas:active, #wrist-canvas:hover, #turn-canvas:hover {
    cursor: move;
  }

  #modal-turn .modal-content, #modal-wrist .modal-content {
    padding-bottom: 0;
  }

  .light-green, .label-success {
    background-color: #B0D586 !important;
    font-size: 90% !important;
    padding: 6px 17px;
    border-radius: 100px;
    font-weight: normal;
    color: white;
  }

  .label-default {
    font-size: 75% !important;
    padding: 6px 17px;
    border-radius: 100px;
    font-weight: normal;
  }

  .sidebar-wrapper button, .hardware-wrapper button {
    width: 52%;
  }

  .sidebar-wrapper table, .hardware-wrapper table {
    margin: 0 20%;
    width: 60%;
    word-wrap: normal;
  }
  .mu-overlay {
    background-color: transparent !important;
  }

  .switch label input[type=checkbox]:checked + .lever {
    background-color: #ccc;
    &:after {
      background-color: #52BF53;
    }
  }

  .mu-menu-list {
    padding: 0;
    overflow: hidden;
    width: 240px;
    .mu-menu-item-wrapper {
      height: 44px;
      font-size: 12px;
      line-height: 44px;
      border-bottom: 1px solid #e6e6e6;
    }
  }

  #blockly-page {
    .mu-card .mu-card-header {
      padding: 10px 16px;
      .mu-card-title {
        font-size: 14px;
        color: #E95516;
        letter-spacing: 0.89px;
      }
    }

    .tabs-bar {
      display: flex;
      background-color: #555;
      color:white;
      min-height: 45px;
      align-items: center;
      justify-content: space-between;
      min-height: 45px;
      .mu-flat-button-label{
        color:white;
      }
    }
    .tab-title {
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #f9f9f9;
      cursor: pointer;
      .mu-flat-button-label{
        font-size: 14px;
        color:white !important;
        font-family: 'PingFangSC-Light','sans-serif';
      }
      .demo-flat-button{
        margin-right:3vw;
      }
    }
    .tabs {
      height: 45px;
      width: 35%;
      background-color: #555;
      .tab {
        line-height: 45px;
        height: 45px;
        a {
          font-size: 12px;
          color: #555;
          opacity: 0.8;
          &:hover, &.active {
            color: #E95516;
          }
        }
      }
      .indicator {
        background-color: #E95516;
      }
      button {
        color: #fff;
        padding-top: 8px;
        padding-bottom: 8px;
        .mu-tab-text {
          font-size: 12px;
          color:white !important;
          font-family: 'Microsoft YaHei','STXihei';
        }
        .mu-flat-button-label{
          color:white !important;
          font-family: 'Microsoft YaHei','STXihei';
        }
      }
    }
  }

  [type="checkbox"] {
    + label {
      width: 100%;
      padding-left: 0px 16%;
      color: #555;
      font-size: 12px;
      height: 40px;
      line-height: 40px;
      &:before {
        width: 12px;
        height: 12px;
        border: 2px solid #777;
        margin-top: 6px;
        margin: 14px 6%;
      }
    }
    &:not(.filled-in) + label:after {
      width: 12px;
      height: 12px;
      border: 2px solid #777;
      margin-top: 6px;
      margin: 14px 6%;
    }
    &:checked + label {
      color: white;
      background: #5A93D7;
      &:before {
        width: 8px;
        height: 16px;
        border-right: 2px solid white;
        border-bottom: 2px solid white;
      }
    }
  }

  #modal-move img {
    cursor: pointer;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }

  .swal2-modal {
    .swal2-title {
      font-size: 12px;
      color: #555555;
      font-weight: 200;
    }
    .swal2-input {
      height: 30px;
      padding: 0 12px;
    }
    .swal2-styled {
      padding: 1px 10px;
      font-size: 12px;
      font-weight: 300;
    }
    .swal2-confirm {
      background-color: #52BF53;
      border-left-color: #52BF53;
      border-right-color: #52BF53;
    }
  }

  .mu-dialog {
    height: 100%;
    background-color: #fff;
    display:flex;
    flex-direction:column;
    .mu-dialog-title {
      flex-direction: column;
      font-size: 14px;
    }
    .mu-dialog-actions {
      justify-content: center;
    }
  }
  .blockly-workspace {
    flex: 1;
    height:100%;
    width:100%;
  }

  .blockly-sidebar {
    flex: 0;
  }

  pre.blockly-workspace {
    border: 1px solid #ccc;
    overflow: scroll;
  }

  .back-button {
    padding-right: 10px;
    border-right: 2px #505050 solid;
    cursor: pointer;
  }

  .runButton-running {
    border-radius: 0;
    background-color: #0a5;
    &:hover {
      background-color: #dd4b39;
    }
  }

  .runButton-stop {
    border-radius: 0;
    background-color: transparent;
    &:hover {
      background-color: #0a5;
    }
  }
</style>

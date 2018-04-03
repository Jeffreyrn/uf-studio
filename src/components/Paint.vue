<template>
  <div class="main-wrapper" id="paint-wrapper">
    <CommonTopMenu
      type='paint'
      :onlist='listProjects'
      :isFileSelected="model.localPaintMgr.curProj!==null"
      title='Draw / Laser'
      :issaved='model.localPaintMgr.state.saved'
      :curFileName="curProj.name"
      :onback='onBack'
      :onsave='saveProject'
      :onnew='newProject'
      :isRunning='model.localPaintMgr.state.isRunnningPrint'
      :onstart='startPrint'
      :onstop='stopPrint'>
    </CommonTopMenu>

    <div style="" class="fabric-container" v-show="model.localPaintMgr.curProj!==null">
      <!-- <canvas style="" id="fabric" tabindex='1' width="825" height="385"></canvas> -->
      <canvas style="" id="fabric" tabindex='1' width="900" height="450"></canvas>
    </div>

    <!-- buffer : {{ this.model.localPaintMgr.state.buffer.length }} -- backStep: {{ model.localPaintMgr.state.backStep }} -->

    <div class="float-type" style="" v-show="model.localPaintMgr.curProj!==null">
      <span class="point">
      </span>
      Mode: {{ curProj.projType }}
    </div>

    <div class="bottom-progress" v-if="model.localPaintMgr.state.isRunnningPrint && 1===2">
      {{ Number(progressNum) * 1 }} %
    </div>

    <BottomTools
      class="paint-bottom"
      v-if="model.localPaintMgr.curProj!==null"
      :onredo='onredo'
      :onundo='onundo'
      :onimage="openImage"
      :onadd="addIconsDialog"
      :ondelete="removeSelected"
      :oncopy="duplicate"
      :onremoveall='removeAll'
      :ontext="textDialog">
    </BottomTools>

    <DialogNewProj
      :onclose='closeDialog'
      :onok='createProj'
      v-if="model.localPaintMgr.visible.pattern">
    </DialogNewProj>
    <DialogProjs
      :onclose='closeDialog'
      :onopen='selectProj'
      v-if="model.localPaintMgr.visible.projs">
    </DialogProjs>
    <DialogIcons
      :onclose='closeDialog'
      :onok='addEmotion'
      v-if="model.localPaintMgr.visible.icons">
    </DialogIcons>

    <DialogFontSelect
      :onclose='closeDialog'
      :onopen='addTextAsPath'
      v-if="model.localPaintMgr.visible.text">
    </DialogFontSelect>

    <DialogTeachAlert
      title='Clear all ?'
      cancel='Cancel'
      ok='Delete'
      :onok='removeAllOK'
      :isdelete=true
      :oncancel='closeDialog'
      v-if="model.localPaintMgr.visible.clear">
    </DialogTeachAlert>

    <DialogPaintSetting
      :onclose='closeDialog'
      :onok='startPrintOK'
      v-if="model.localPaintMgr.visible.setting">
    </DialogPaintSetting>

    <DialogTeachAlert
      :title='model.localPaintMgr.curToDelProjTitle'
      cancel='Cancel'
      ok='Delete'
      :onok='onDeleteOK'
      :isdelete=true
      :oncancel='closeDel'
      v-if="model.localPaintMgr.visible.del">
    </DialogTeachAlert>

    <input type="file" v-show="false" ref="addFile" @change="addImage()"/>​​​​​​​​​

  </div>
</template>

<script>
import { fabric } from 'fabric-webpack';
import opentype from 'opentype.js';
import Potrace from '../assets/lib/potrace';
import CommonTopMenu from './common/CommonTopMenu';
import BottomTools from './Paint/BottomTools';
import DialogNewProj from './Paint/DialogNewProj';
import DialogProjs from './Paint/DialogProjs';
import DialogIcons from './Paint/DialogIcons';
import DialogFontSelect from './Paint/DialogFontSelect';
import DialogTeachAlert from './DialogTeachAlert';
import DialogPaintSetting from './Paint/DialogPaintSetting';
// import { constants } from 'http2';
// import { setTimeout } from 'timers';
// const path = require('path');
// const SVG_LIST2 = require.context('../assets/svg/shapes2', false, /\.svg$/);
// const SVG_LIST1 = require.context('../assets/svg/shapes1', false, /\.svg$/);

const CONFIG = {
  addPosition: {
    left: 350,
    top: 70,
    width: 100,
    fontSize: 20,
  },
};
export default {
  i18n: {
    messages: {
      en: {
        selectMode: {
          title: 'How would you want your patterns to be drawn/engraved? ',
          outline: 'Outline',
          grayscale: 'Grayscale',
          ok: 'OK',
        },
      },
      cn: {
        selectMode: {
          title: '请选择一个模式',
          outline: '轮廓',
          grayscale: '灰度',
          ok: '确定',
        },
      },
    },
  },
  data() {
    return {
      model: window.GlobalUtil.model,
      playground: null,
      // backStr: 'AppStore',
      emotions: {},
      progressNum: '0',
    };
  },
  mounted() {
    this.initFabric();
    // this.fabricModified();
    this.loadEmotions();
    console.log(this.playground.toSVG());
    setTimeout(() => {
      this.model.localPaintMgr.state.saved = true;
    });
  },
  activated: function() {
    setTimeout(() => {
      if (this.model.localPaintMgr.projList.length === 0) {
        this.newProject();
      }
      else if (this.model.localPaintMgr.curProj === null) {
        this.listProjects();
      }
    }, 50);
  },
  methods: {
    onDeleteOK() {
      this.closeDel();
      const toDelProj = this.model.localPaintMgr.curToDelProj;
      const toDelUUID = toDelProj.uuid;
      console.log(`toDelProj uuid = ${toDelUUID}`);
      window.CommandsPaintSocket.delProj(toDelUUID, () => {
        if (this.model.localPaintMgr.curProj !== null) {
          if (toDelUUID === this.model.localPaintMgr.curProj.uuid) {
            this.model.localPaintMgr.curProj = null;
          }
        }
      });
    },
    closeDel() {
      this.model.localPaintMgr.visible.del = false;
    },
    closeDialog() {
      this.model.localPaintMgr.visible.text = false;
      this.model.localPaintMgr.visible.setting = false;
      this.model.localPaintMgr.visible.pattern = false;
      this.model.localPaintMgr.visible.projs = false;
      this.model.localPaintMgr.visible.icons = false;
      this.model.localPaintMgr.visible.text = false;
      this.model.localPaintMgr.visible.clear = false;
      this.model.localPaintMgr.visible.del = false;
    },
    addIconsDialog() {
      this.model.localPaintMgr.selectedIcon = null;
      this.model.localPaintMgr.visible.icons = true;
    },
    textDialog() {
      this.model.localPaintMgr.curDialogFontInputText = '';
      this.model.localPaintMgr.visible.text = true;
    },
    listProjects() {
      // console.log('list projects');
      this.model.localPaintMgr.curProj = this.model.localPaintMgr.curProj;
      this.model.localPaintMgr.visible.projs = true;
    },
    saveProject() {
      // console.log('save project');
      const jsonStr = JSON.stringify(this.playground);
      console.log(jsonStr);
      window.CommandsPaintSocket.saveOrUpdateFile(this.model.localPaintMgr.curProj.uuid, jsonStr, () => {
        // console.log(`dict = ${JSON.stringify(dict)}`);
        this.model.localPaintMgr.state.saved = true;
      });
    },
    selectProj(index) {
      // console.log(`select project = ${JSON.stringify(this.model.localPaintMgr.curProj)}`);
      this.closeDialog();
      const curProj = this.model.localPaintMgr.projList[index];
      window.CommandsPaintSocket.getFile(curProj.uuid, (dict) => {
        // console.log(`dict = ${JSON.stringify(dict)}`);
        if (dict.code === 0) {
          const canvas = this.playground;
          this.removeAllOK();
          const jsonStr = dict.data; // GlobalUtil.decode(dict.data);
          // console.log(`jsonStr = ${jsonStr}`);
          canvas.loadFromJSON(jsonStr, canvas.renderAll.bind(canvas));
          this.model.localPaintMgr.curProj = curProj;
          setTimeout(() => {
            this.model.localPaintMgr.state.saved = true;
          });
        }
      });
    },
    // startPrinting(setting) {
    //   setting.canvasMode = this.ui_data.canvasMode;
    //   // console.log(setting);
    //   let sendData;
    //   if (setting.mode === '0') { // pen / outline mode
    //     setting.zero = setting.zero0;
    //   }
    //   else { // laser mode
    //     setting.zero = setting.zero1;
    //   }
    //   if (setting.canvasMode === '1') { // black white mode
    //     sendData = this.mainCanvas.toDataURL('png');
    //   }
    //   else { // outline mode setting.canvasMode === 2
    //     sendData = this.mainCanvas.toSVG();
    //   }
    //   // console.log(sendData, setting);
    //   window.CommandsAppsSocket.startPrinting(sendData, setting, (dict) => {
    //     console.log(`start printing = ${JSON.stringify(dict)}`);
    //   });
    //   sendData = null;
    // },
    startPrint() {
      window.CommandsPaintSocket.getZeroConfig((dict) => {
        this.model.localPaintMgr.state.zero = dict.data;
        this.model.localPaintMgr.visible.setting = true;
      });
    },
    startPrintOK() {
      this.closeDialog();
      const projType = this.model.localPaintMgr.curProj.projType;
      const sendData = projType === 'outline' ? this.playground.toSVG() : this.playground.toDataURL('png');
      const end_type = 'pen'; // 0: 'pen', 1: 'laser',
      const zeroHeightDict = projType === 'outline' ? this.model.localPaintMgr.state.zero.outline : this.model.localPaintMgr.state.zero.grayscale;
      const config = {
        speed: this.model.localPaintMgr.state.speed || 100,
        canvasMode: projType === 'outline' ? 2 : 1, // 2. outline 1. gray
        zeropoint_height: end_type === 'pen' ? zeroHeightDict.pen : zeroHeightDict.laser, // Number(this.model.localPaintMgr.state.zero),
        end_type: end_type,
        drawing_feedrate: 500,
      };
      window.CommandsPaintSocket.startPrinting(sendData, config, (dict) => {
        // console.log(`start printing = ${JSON.stringify(dict)}`);
        if (dict.code === 0) {
          this.model.localPaintMgr.state.isRunnningPrint = true;
        }
        if (dict.code === 1) {
          this.progressNum = dict.data.progress;
        }
        if (dict.code === 1111) {
          this.model.localPaintMgr.state.isRunnningPrint = false;
        }
      });
    },
    stopPrint() {
      window.CommandsPaintSocket.stopPrinting((dict) => {
        if (dict.code === 0) {
          this.model.localPaintMgr.state.isRunnningPrint = false;
        }
      });
    },
    createProj() {
      // console.log('create proj');
      this.closeDialog();
      const projType = this.model.localPaintMgr.projTypeSelected;
      window.CommandsPaintSocket.createProj(this.model.localPaintMgr.curDialogProjInputText, projType, (dict, filePath) => {
        console.log(`dict = ${JSON.stringify(dict)}`);
        this.model.localPaintMgr.state.saved = true;
        const curProjIndex = this.model.localPaintMgr.findProjIndex(filePath);
        console.log(`curProjIndex = ${curProjIndex}`);
        this.selectProj(curProjIndex);
      });
    },
    newProject() {
      this.playground.clear().renderAll();
      this.model.localPaintMgr.state.buffer = [];
      this.model.localPaintMgr.curDialogProjInputText = '';
      this.model.localPaintMgr.visible.pattern = true;
    },
    initFabric() {
      this.playground = new fabric.Canvas('fabric', {
        fireRightClick: true,
        backgroundColor: '#ECEFF1',
        // selectionBorderColor: 'yellow',
      });
      this.playground.on({
        'object:modified': () => {
          // this.fabricModified();
        },
        'object:added': (options) => {
          options.target.bringToFront();
          // this.fabricModified();
        },
      });
    },
    addEmotion() {
      this.closeDialog();
      const data = this.model.localPaintMgr.selectedIcon;
      fabric.loadSVGFromURL(data, (objects, options) => {
        Object.keys(objects).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(objects, 'key')) {
            objects[key].set({ strokeWidth: 0.3 });
          }
        });
        // this code lag in windows
        const obj = fabric.util.groupSVGElements(objects, options);
        const scale = 150 / obj.width;
        obj.set({
          left: CONFIG.addPosition.left,
          top: CONFIG.addPosition.top,
          scaleX: scale,
          scaleY: scale,
          viewBox: {
            x: 0,
            y: 0,
            width: 36,
            height: 35,
          },
        });
        this.playground.add(obj);
        this.fabricModified();
        this.visible.pattern = false;
      });
    },
    openImage() {
      this.$refs.addFile.click();
    },
    addImage() {
      const file = this.$refs.addFile.files[0];
      this.$refs.addFile.value = '';
      if (file) {
        const fileType = file.type;
        if (fileType === 'image/svg+xml') { // svg
          const url = URL.createObjectURL(file);
          fabric.loadSVGFromURL(url, (objects, options) => {
            const svg = fabric.util.groupSVGElements(objects, options);
            svg.scaleToWidth(CONFIG.addPosition.width);
            svg.scaleToHeight(CONFIG.addPosition.width);
            svg.set({ left: CONFIG.addPosition.left, top: CONFIG.addPosition.top });
            this.playground.add(svg);
            this.fabricModified();
          });
        }
        else if (fileType.match('image.*')) { // not svg
          const edge = (this.model.localPaintMgr.curProj.projType === 'outline');
          Potrace.loadImageFromFile(file);
          Potrace.setParameter({
            optcurve: true,
            opttolerance: 0.8,
            alphamax: 5,
            edge,
            // greyscale: true,
          });
          Potrace.process(() => {
            const pathstr = Potrace.getSVGPath(1);
            const path = new fabric.Path(pathstr);
            const scale = 100 / path.width;
            path.set({
              left: CONFIG.addPosition.left,
              top: CONFIG.addPosition.top,
              scaleX: scale,
              scaleY: scale,
              fill: 'black',
            });
            this.playground.add(path);
            this.fabricModified();
          });
        }
        else {
          this.$message(this.$t('paintApp.dailog.onlysvg'));
        }
      }
    },
    addTextAsPath() {
      this.closeDialog();
      const text = this.model.localPaintMgr.curDialogFontInputText;
      const fontList = this.model.localPaintMgr.FONT_LIST;
      const fontSelect = this.model.localPaintMgr.dialog.fontSelect;
      if (text.trim()) {
        opentype.load(fontList[fontSelect].src, (err, font) => {
          if (err) {
            this.$message(`Could not load font: ${err}`);
          }
          else {
            const textpath = font.getPath(text, 0, 150, 72);
            // console.log(textpath)
            const path = new fabric.Path(textpath.toPathData(2));
            // const scale = 100 / path.width;
            path.set({
              left: CONFIG.addPosition.left,
              top: CONFIG.addPosition.top,
              fontSize: CONFIG.addPosition.fontSize,
              // scaleX: scale,
              // scaleY: scale,
              fill: 'black',
              stroke: 'black',
              strokeWidth: 1,
            });
            this.playground.add(path);
            this.fabricModified();
            // this.visible.text = false; // close dialog
          }
          // console.log(font);
        });
      }
      else {
        this.$message(this.$t('recordApp.dialog.name.emptyAlert'));
      }
    },
    fabricModified() {
      const backStep = this.model.localPaintMgr.state.backStep;
      const size = this.model.localPaintMgr.state.buffer.length;
      const last = this.model.localPaintMgr.state.buffer[size - 1];
      const current = JSON.stringify(this.playground);
      if (backStep > 0) {
        this.model.localPaintMgr.state.buffer = this.model.localPaintMgr.state.buffer.slice(0, size - backStep);
        this.model.localPaintMgr.state.backStep = 0;
      }
      if (last !== current) {
        this.model.localPaintMgr.state.buffer.push(current);
        this.model.localPaintMgr.state.saved = false;
        // fabric.log(myjson);
        this.model.localPaintMgr.state.empty = this.playground.isEmpty();
        // console.log(this.state.buffer.length, this.state.backStep);
      }
    },
    undoEvent(reverse = false) { // do redo when reverse is true
      const canvas = this.playground;
      const size = this.model.localPaintMgr.state.buffer.length;
      let checkValid;
      let nextStep;
      if (reverse) { // redo
        checkValid = this.model.localPaintMgr.state.backStep > 0;
        nextStep = this.model.localPaintMgr.state.backStep - 1;
      }
      else { // undo
        checkValid = this.model.localPaintMgr.state.backStep < (size - 1);
        nextStep = this.model.localPaintMgr.state.backStep + 1;
      }
      const backStep = this.model.localPaintMgr.state.backStep;
      console.log(`model.localPaintMgr.state.buffer size = ${size}, backStep = ${backStep}, checkValid = ${checkValid}, reverse = ${reverse}`);
      if (checkValid) {
        canvas.clear().renderAll();
        this.model.localPaintMgr.state.backStep = nextStep;
        const loadJsonStr = this.model.localPaintMgr.state.buffer[size - nextStep - 1];
        canvas.loadFromJSON(loadJsonStr, canvas.renderAll.bind(canvas));
      }
    },
    onundo() {
      this.undoEvent(false);
    },
    onredo() {
      this.undoEvent(true);
    },
    duplicate() {
      const activeObject = this.playground.getActiveObject();
      const activeGroup = this.playground.getActiveGroup();
      if (activeObject) {
        activeObject.clone((obj) => {
          obj.set('left', obj.left + 8);
          obj.set('top', obj.top + 8);
          this.playground.add(obj);
          this.fabricModified();
        });
      }
      else if (activeGroup) {
        const objects = activeGroup.getObjects();
        this.playground.discardActiveGroup();
        objects.forEach((obj) => {
          const objTop = obj.originalTop + 5;
          const objLeft = obj.originalLeft + 5;
          obj.clone((o) => {
            o.set('left', objLeft);
            o.set('top', objTop);
            this.playground.add(o);
            this.playground.discardActiveGroup();
          });
        });
        this.playground.discardActiveGroup().renderAll();
        this.fabricModified();
      }
      else {
        this.$message('You must select before duplicate.');
      }
    },
    removeSelected() {
      const deleteObj = this.playground.getActiveObject();
      const deleteGroup = this.playground.getActiveGroup();
      if (deleteObj) {
        this.playground.remove(deleteObj);
        this.fabricModified();
      }
      else if (deleteGroup) {
        // console.log(deleteGroup);
        const objs = deleteGroup.getObjects();
        this.playground.discardActiveGroup();
        objs.forEach((obj) => {
          this.playground.remove(obj);
        });
        this.fabricModified();
      }
      else {
        this.$message('You must select before delete.');
      }
    },
    removeAll() {
      this.model.localPaintMgr.visible.clear = true;
    },
    removeAllOK() {
      this.model.localPaintMgr.visible.clear = false;
      this.playground.clear().renderAll();
      this.fabricModified();
    },
    loadEmotions() {
      // [1, 2, 3].findIndex(() => 0);
      // this.emotions.list2 = SVG_LIST2;
      // this.emotions.list1 = SVG_LIST1;
      // SVG_LIST2.keys().forEach(key => this.emotions.list2 = SVG_LIST2(key));
      // SVG_LIST1.keys().forEach(key => this.emotions[key] = SVG_LIST1(key));
      // console.log(`this.emotions = ${JSON.stringify(this.emotions)}`);
    },
    onBack() {
      this.$router.push({ name: 'AppStore' });
    },
  },
  beforeDestroy() {
    this.playground = null;
  },
  watch: {
  },
  computed: {
    curProj: {
      get() {
        return this.model.localPaintMgr.curProj || {};
      },
      set(value) {
        this.model.localPaintMgr.curProj = value;
      },
    },
    topTitle() {
      const fullname = `${this.curProj.name}`;
      return this.curProj.name !== undefined ? fullname : '';
    },
  },
  components: {
    CommonTopMenu,
    BottomTools,
    DialogNewProj,
    DialogProjs,
    DialogIcons,
    DialogFontSelect,
    DialogTeachAlert,
    DialogPaintSetting,
  },
};
</script>
<style scoped lang="scss">
#paint-wrapper {
  #fabric {
    background: '#ECEFF1';
    // background: white; #D95E2E 100%
    // box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
}
.fabric-container {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  // margin: auto;
  width: fit-content;
}
a {
  color: white;
}
.emotion-wrapper {
  max-height: 50vh;
  overflow-y: scroll;
  img{
    width: 10%;
    padding: 2%;
    cursor: pointer;
  }
  img:hover{
    background-color: #eee;
  }
}

.paint-header-wrapper {
  height: 60px;
  line-height: 60px;
  background: #575C62;
  display: flex;
  justify-content: space-between;
  img {
    width: 1.6rem;
  }
  span {
    margin-left: 1rem;
    font-family: 'Gotham-Bold';
    font-size: 2rem;
    color: #fff;
    letter-spacing: -1px;
  }
}
.back-wrapper {
  .btn {
    cursor: pointer;
  }
  padding-left: 1vw;
}
.menu-wrapper {
  display: flex;
  & > div {
    padding: 0 1vw;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    span {
      font-size: 0.7em;
      padding: 0;
      margin: 0;
      line-height: 1.2vw;
      text-transform: capitalize;
    }
  }
  .run-btn {
    background-color: #52BF53;
    line-height: 0.2;
    padding: 1.2vw;
    img{
      width: 120%;
    }
  }
}

.bottom-progress {
  position:absolute;
  width: 100px;
  height: 30px;
  line-height: 30px;
  left: 0px;
  right: 0px;
  bottom: 100px;
  margin: auto;
  border: 1px solid #D8D8D8;
  text-align: center;
}

.float-type {
  position:absolute;
  left:0;
  right:0;
  bottom:110px;
  margin:auto;
  width:145px;
  height:30px;
  line-height: 30px;
  font-family: 'Gotham-Medium';
  font-size: 14px;
  color: #4A4A4A;
  letter-spacing: -0.58px;
  text-align: center;
  background: #FFFFFF;
  border-radius: 100px;
  // border: 1px solid gray;
  box-shadow: 0 0 4px 0 rgba(192,192,192,0.50);
  // #D95E2E 100%  #E27347;
  .point {
    position: absolute;
    left: 15px;
    width: 4px;
    height: 4px;
    top: 13px;
    border-radius: 2px;
    background: #D95E2E
  }
}

.paint-bottom {
  position:absolute;
  width:621px;
  height:63px;
  left: 0px;
  right: 0px;
  bottom: 30px;
  margin:auto;
  border: 1px solid #D8D8D8;
  // background:lightgreen;
}
// .blockly-wrapper {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   position: relative;
// }
// .blockly-wrapper.notfull{
//   width: 80%;
// }
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  // opacity: 0;
}
</style>
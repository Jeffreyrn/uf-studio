<template>
  <div class="main-wrapper" id="paint-wrapper">
    <CommonTopMenu
      type='paint'
      :onlist='listProjects'
      title='Draw/Laser'
      :issaved='model.localPaintMgr.state.saved'
      :curFileName='(model.localPaintMgr.curProj||{}).name'
      :onback='onBack'
      :onsave='saveProject'
      :onnew='newProject'
      :onstart='startPrint'>
    </CommonTopMenu>

    <div style="" class="fabric-container" v-show="model.localPaintMgr.curProj!==null">
      <canvas style="" id="fabric" tabindex='1' width="800" height="400"></canvas>
    </div>

    <BottomTools
      v-if="model.localPaintMgr.curProj!==null"
      :onundo='undoEvent'
      :onredo='undoEvent'
      :onimage="openImage"
      :onadd="addIconsDialog"
      :ondelete="removeSelected"
      :oncopy="duplicate"
      :onremoveall='removeAll'
      :ontext="textDialog">
    </BottomTools>
    <DialogNewProj
      :onclose='closeDialog'
      :onok='creatProj'
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
    };
  },
  mounted() {
    this.initFabric();
    this.fabricModified();
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
    closeDialog() {
      this.model.localPaintMgr.visible.text = false;
      this.model.localPaintMgr.visible.setting = false;
      this.model.localPaintMgr.visible.pattern = false;
      this.model.localPaintMgr.visible.projs = false;
      this.model.localPaintMgr.visible.icons = false;
      this.model.localPaintMgr.visible.text = false;
      this.model.localPaintMgr.visible.clear = false;
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
      console.log('list projects');
      this.model.localPaintMgr.visible.projs = true;
    },
    saveProject() {
      console.log('save project');
      const jsonStr = JSON.stringify(this.playground);
      console.log(jsonStr);
      window.CommandsPaintSocket.saveOrUpdateFile(this.model.localPaintMgr.curProj.uuid, jsonStr, (dict) => {
        console.log(`dict = ${JSON.stringify(dict)}`);
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
          console.log(`jsonStr = ${jsonStr}`);
          canvas.loadFromJSON(jsonStr, canvas.renderAll.bind(canvas));
          this.model.localPaintMgr.curProj = curProj;
          setTimeout(() => {
            this.model.localPaintMgr.state.saved = true;
          });
        }
      });
    },
    startPrint() {
      // console.log(`start print = ${this.state.mode}`);
      // const sendStrategy = {
      //   outline() {
      //     return this.playground.toSVG();
      //   },
      //   greyscale() {
      //     return this.playground.toDataURL('png');
      //   },
      // };
      // const work = sendStrategy[this.state.mode].bind(this);
      // const setting = {
      //   zero: this.state.zero,
      //   speed: this.state.speed,
      // };
      // console.log(work(), setting);
    },
    creatProj() {
      console.log('create proj');
      this.closeDialog();
      window.CommandsPaintSocket.createProj(this.model.localPaintMgr.curDialogProjInputText, () => {
        this.model.localPaintMgr.state.saved = false;
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
      });
      this.playground.on({
        'object:modified': () => {
          this.fabricModified();
        },
        'object:added': (options) => {
          options.target.bringToFront();
          this.fabricModified();
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
          const edge = (this.model.localPaintMgr.state.mode === 'outline');
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
      this.model.localPaintMgr.state.buffer.push(JSON.stringify(this.playground));
      this.model.localPaintMgr.state.saved = false;
      // fabric.log(myjson);
      this.model.localPaintMgr.state.empty = this.playground.isEmpty();
      // console.log(this.state.buffer.length, this.state.backStep);
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
      if (checkValid) {
        canvas.clear().renderAll();
        this.model.localPaintMgr.state.backStep = nextStep;
        const loadJsonStr = this.model.localPaintMgr.state.buffer[size - nextStep - 1];
        canvas.loadFromJSON(loadJsonStr, canvas.renderAll.bind(canvas));
      }
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
  },
  components: {
    CommonTopMenu,
    BottomTools,
    DialogNewProj,
    DialogProjs,
    DialogIcons,
    DialogFontSelect,
    DialogTeachAlert,
  },
};
</script>
<style scoped lang="scss">
#paint-wrapper {
  #fabric {
    background: white;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
}
.fabric-container {
  margin: auto;
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
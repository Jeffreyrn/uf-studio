<template>
  <div class="main-wrapper" id="paint-wrapper">
    <div class="menu-bar">
      <div class="paint-mode">
        {{$t('paintApp.dailog.setting.mode')}}: 
        <span v-if="state.mode === 'greyscale'" v-text="$t('paintApp.dailog.addImage.option1')"></span>
        <span v-else-if="state.mode === 'outline'" v-text="$t('paintApp.dailog.addImage.option2')"></span>
      </div>
      <el-button @click="newProject()" type="info" round>
        <img src="../assets/img/icon_new_project.svg" alt="New Project">
      </el-button>
      <el-button @click="visible.setting = true" type="info" round>
        <img src="../assets/img/icon_start.svg" alt="start print">
      </el-button>
    </div>
    <div class="fabric-container">
      <canvas id="fabric" tabindex='1' width="800" height="400"></canvas>
    </div>
    
    <el-button @click="undoEvent()">
      <img src="../assets/img/tool-undo.svg" alt="undo">
    </el-button>
    <el-button @click="undoEvent('redo')">
      <img src="../assets/img/tool-redo.svg" alt="redo">
    </el-button>
    <el-button @click="visible.text = true">
      <img src="../assets/img/tool-text.svg" alt="text">
    </el-button>
    <el-button @click="$refs.addFile.click()">
      <img src="../assets/img/tool-image.svg" alt="image">
    </el-button>
    <el-button @click="visible.pattern = true" icon="el-icon-plus">
    </el-button>
    <el-button @click="duplicate()">
      <img src="../assets/img/tool-copy.svg" alt="copy">
    </el-button>
    <el-button @click="removeSelected()">
      <img src="../assets/img/tool-delete.svg" alt="delete">
    </el-button>
    <el-button @click="removeAll()" :disabled="state.empty">
      <img src="../assets/img/tool-clear.svg" alt="clear">
    </el-button>
    <el-dialog
      :title="$t('paintApp.sidebar.picture_name')"
      :visible.sync="visible.pattern"
      width="80%">
      <div class="emotion-wrapper">
        <img v-for="(src, index) in emotions" :src="src" :key="index" :alt="index" @click="addEmotion(index)"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="visible.text = false">Cancel</el-button> -->
        <!-- <el-button type="primary" >Confirm</el-button> -->
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('paintApp.dailog.addText.title')"
      :visible.sync="visible.text"
      width="30%"
      @close="dialog.textInput=''">
      <span>
        <el-input type="textarea" :rows="2" placeholder="Please input" v-model="dialog.textInput" :autofocus="true"></el-input>
        <el-select v-model="dialog.fontSelect" placeholder="Select">
          <el-option
            v-for="(item, index) in FONT_LIST"
            :key="index"
            :label="item.name"
            :value="index">
          </el-option>
        </el-select>
      </span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="visible.text = false">Cancel</el-button> -->
        <el-button type="primary" @click="addTextAsPath(dialog.textInput)">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('paintApp.dailog.setting.title')"
      :visible.sync="visible.setting"
      width="80%">
      <div class="setting-wrapper">
        <span class="set-item">{{$t('paintApp.dailog.setting.adjustzero')}}</span>
        <el-slider
          v-model="state.zero"
          show-input>
        </el-slider>
        <span class="set-item">{{$t('paintApp.dailog.setting.speed')}}</span>
        <el-slider v-model="state.speed"></el-slider>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible.setting = false">{{$t('paintApp.dailog.cancelBtn')}}</el-button>
        <el-button type="primary" @click="startPrint()">{{$t('paintApp.dailog.setting.startButton')}}</el-button>
      </span>
    </el-dialog>
    <input type="file" v-show="false" ref="addFile" @change="addImage()"/>​​​​​​​​​​​​​​
  </div>
</template>
<script>
import { fabric } from 'fabric-webpack';
import opentype from 'opentype.js';
import Potrace from '../assets/lib/potrace';
// import robot from '../assets/lib/robot';

const SVG_LIST2 = require.context('../assets/svg/shapes2', false, /\.svg$/);
const SVG_LIST1 = require.context('../assets/svg/shapes1', false, /\.svg$/);
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
      playground: null,
      state: {
        buffer: [],
        saved: true,
        empty: true,
        backStep: 0,
        mode: 'outline',
        zero: 50,
        speed: 200,
      },
      visible: {
        text: false,
        setting: false,
        pattern: false,
      },
      dialog: {
        textInput: '', // text value
        fontSelect: 0, // select font
      },
      FONT_LIST: [
        {
          name: this.$t('paintApp.fontNameList.blacklight'),
          src: require('../assets/fonts/blackLight.ttf'),
        },
        {
          name: this.$t('paintApp.fontNameList.xingkai'),
          src: require('../assets/fonts/STXingkai-SC-Bold.ttf'),
        },
        {
          name: this.$t('paintApp.fontNameList.lanting'),
          src: require('../assets/fonts/lanting.ttf'),
        },
        {
          name: this.$t('paintApp.fontNameList.kaiti'),
          src: require('../assets/fonts/kanti.ttf'),
        },
      ],
      emotions: {},
    };
  },
  mounted() {
    this.initFabric();
    this.fabricModified();
    this.loadEmotions();
    console.log(this.playground.toSVG());
  },
  methods: {
    startPrint() {
      const sendStrategy = {
        outline() {
          return this.playground.toSVG();
        },
        greyscale() {
          return this.playground.toDataURL('png');
        },
      };
      const work = sendStrategy[this.state.mode].bind(this);
      const setting = {
        zero: this.state.zero,
        speed: this.state.speed,
      };
      console.log(work(), setting);
      // robot.printing.startPrinting(work(), setting);
    },
    newProject() {
      this.playground.clear().renderAll();
      this.state.buffer = [];
      this.$confirm(this.$t('selectMode.title'), {
        confirmButtonText: this.$t('selectMode.outline'),
        cancelButtonText: this.$t('selectMode.grayscale'),
        type: 'info',
        showClose: false,
        closeOnClickModal: false,
      }).then(() => {
        this.state.mode = 'outline';
      }).catch(() => {
        this.state.mode = 'greyscale';
      });
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
    addEmotion(index) {
      fabric.loadSVGFromURL(this.emotions[index], (objects, options) => {
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
          const edge = (this.state.mode === 'outline');
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
    addTextAsPath(text) {
      if (text.trim()) {
        opentype.load(this.FONT_LIST[this.dialog.fontSelect].src, (err, font) => {
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
            this.visible.text = false; // close dialog
          }
          // console.log(font);
        });
      }
      else {
        this.$message(this.$t('recordApp.dialog.name.emptyAlert'));
      }
    },
    fabricModified() {
      this.state.buffer.push(JSON.stringify(this.playground));
      this.state.saved = false;
      // fabric.log(myjson);
      this.state.empty = this.playground.isEmpty();
      // console.log(this.state.buffer.length, this.state.backStep);
    },
    undoEvent(reverse = false) { // do redo when reverse is true
      const canvas = this.playground;
      const size = this.state.buffer.length;
      let checkValid;
      let nextStep;
      if (reverse) { // redo
        checkValid = this.state.backStep > 0;
        nextStep = this.state.backStep - 1;
      }
      else { // undo
        checkValid = this.state.backStep < (size - 1);
        nextStep = this.state.backStep + 1;
      }
      if (checkValid) {
        canvas.clear().renderAll();
        this.state.backStep = nextStep;
        const loadJsonStr = this.state.buffer[size - nextStep - 1];
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
      this.$confirm(this.$t('paintApp.dailog.deleteall.msg'), {
        confirmButtonText: this.$t('paintApp.dailog.okBtn'),
        cancelButtonText: this.$t('paintApp.dailog.cancelBtn'),
        type: 'warning',
        dangerouslyUseHTMLString: true,
      }).then(() => {
        this.playground.clear().renderAll();
        this.fabricModified();
      }).catch(() => {});
    },
    loadEmotions() {
      SVG_LIST2.keys().forEach(key => this.emotions[key] = SVG_LIST2(key));
      SVG_LIST1.keys().forEach(key => this.emotions[key] = SVG_LIST1(key));
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
</style>



<template>
  <div class="main-wrapper" id="paint-wrapper">
    <canvas id="fabric" tabindex='1' width="800" height="400"></canvas>
    <el-button @click="undoEvent()">
      <img src="../assets/img/tool-undo.svg" alt="undo">
    </el-button>
    <el-button @click="undoEvent('redo')">
      <img src="../assets/img/tool-redo.svg" alt="redo">
    </el-button>
    <el-button @click="visible.text = true;">
      <img src="../assets/img/tool-text.svg" alt="text">
    </el-button>
    <el-button>
      <img src="../assets/img/tool-image.svg" alt="image">
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
      :title="$t('paintApp.dailog.addText.title')"
      :visible.sync="visible.text"
      width="30%"
      @close="dialog.textInput=''">
      <span>
        <el-input type="textarea" :rows="2" placeholder="Please input" v-model="dialog.textInput"></el-input>
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
  </div>
</template>
<script>
// import robot from '../assets/lib/robot';
import { fabric } from 'fabric-webpack';
import opentype from 'opentype.js';
// import Potrace from 'potrace';
const CONFIG = {
  addPosition: {
    left: 350,
    top: 70,
    width: 100,
    fontSize: 20,
  },
};
export default {
  data() {
    return {
      playground: null,
      state: {
        buffer: [],
        saved: true,
        empty: true,
        backStep: 0,
      },
      visible: {
        text: false,
        setting: false,
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
    };
  },
  mounted() {
    this.playground = new fabric.Canvas('fabric', {
      fireRightClick: true,
    });
    this.updateModifications();
  },
  methods: {
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
            this.updateModifications();
            this.visible.text = false; // close dialog
          }
          // console.log(font);
        });
      }
      else {
        this.$message(this.$t('recordApp.dialog.name.emptyAlert'));
      }
    },
    updateModifications() {
      this.state.buffer.push(JSON.stringify(this.playground));
      this.state.saved = false;
      // fabric.log(myjson);
      this.state.empty = this.playground.isEmpty();
      console.log(this.state.buffer.length, this.state.backStep);
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
      if (activeObject === null) {
        const activeGroup = this.playground.getActiveGroup();
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
      }
      else {
        activeObject.clone((obj) => {
          obj.set('left', obj.left + 8);
          obj.set('top', obj.top + 8);
          this.playground.add(obj);
        });
      }
      this.updateModifications();
    },
    removeSelected() {
      let deleteObj = this.playground.getActiveObject();
      if (!deleteObj) {
        deleteObj = this.playground.getActiveGroup();
      }
      this.playground.remove(deleteObj);
      this.updateModifications();
    },
    removeAll() {
      this.$confirm(this.$t('paintApp.dailog.deleteall.msg'), {
        confirmButtonText: this.$t('paintApp.dailog.okBtn'),
        cancelButtonText: this.$t('paintApp.dailog.cancelBtn'),
        type: 'warning',
        dangerouslyUseHTMLString: true,
      }).then(() => {
        this.playground.clear().renderAll();
        this.updateModifications();
      });
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
  background: #ccc;
  #fabric {
    background: white;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
}
a {
  color: white;
}
</style>



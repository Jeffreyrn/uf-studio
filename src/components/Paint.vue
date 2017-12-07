<template>
  <div class="main-wrapper" id="paint-wrapper">
    <canvas id="fabric" tabindex='1' width="800" height="400"></canvas>
    <el-button>
      <img src="../assets/img/tool-undo.svg" alt="undo">
    </el-button>
    <el-button>
      <img src="../assets/img/tool-redo.svg" alt="redo">
    </el-button>
    <el-button @click="addTextClick()">
      <img src="../assets/img/tool-text.svg" alt="text">
    </el-button>
    <el-button>
      <img src="../assets/img/tool-image.svg" alt="image">
    </el-button>
    <el-button>
      <img src="../assets/img/tool-copy.svg" alt="copy">
    </el-button>
    <el-button>
      <img src="../assets/img/tool-delete.svg" alt="delete">
    </el-button>
    <el-dialog
      title="addText"
      :visible.sync="visible.text"
      width="30%">
      <span>
        <el-input type="textarea" :rows="2" placeholder="Please input" v-model="dialog.text"></el-input>
        <el-select v-model="dialog.select" placeholder="Select">
          <el-option
            v-for="item in FONT_LIST"
            :key="item.name"
            :label="item.name"
            :value="item.src">
          </el-option>
        </el-select>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible.text = false">Cancel</el-button>
        <el-button type="primary" @click="visible.text = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import robot from '../assets/lib/robot';
import { fabric } from 'fabric-webpack';
// import opentype from 'opentype.js';
// import Potrace from 'potrace';

export default {
  data() {
    return {
      playground: null,
      visible: {
        text: false,
        setting: false,
      },
      dialog: {
        text: '', // text value
        select: '2', // select font
      },
      FONT_LIST: [
        {
          name: 'blackLight',
          src: require('../assets/fonts/blackLight.ttf'),
        },
        {
          name: 'STXingkai',
          src: require('../assets/fonts/STXingkai-SC-Bold.ttf'),
        },
        {
          name: 'lanting',
          src: require('../assets/fonts/lanting.ttf'),
        },
        {
          name: 'kaiti',
          src: require('../assets/fonts/kanti.ttf'),
        },
      ],
    };
  },
  mounted() {
    this.playground = new fabric.Canvas('fabric', {
      fireRightClick: true,
    });
  },
  methods: {
    addTextClick() {
      this.visible.text = true;
    },
  },
  beforeDestroy() {
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



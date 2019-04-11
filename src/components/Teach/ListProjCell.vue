<template lang="html">
  <div class="line-block-wrapper" :id="'cell_id_' + index" >
    <!-- button -->
    <div style="margin-top:130px;">
      <!--
      <div style="width:60px;height:30px;font-size:15px;margin-top:100px;">
        <div v-for='index in [0,1,2,3,4,5,6,7,8,9]'>
          <span v-if="index===0" class="rule-style" style="height:20px;margin-left:0px;"></span>
          <span v-else class="rule-style"></span>
        </div>
      </div>
      -->
      <!-- isContinus true -->
      <div v-if="model.localTeach.curProj.type==='continuous'" class="line-block line-block-color">
        <div v-if="index % 10 === 0" style="background:#52BF53;">
          <div class="line-block-text-left"> {{ parseInt(index / 10) }}.0s </div>
          <ListProjCellLastText :index="index" :file='file'></ListProjCellLastText>
        </div>
        <div v-else>
          <div v-if="model.localTeach.curEditingFileUUID===''">
            <div v-if="index < model.localTeach.fileDatas['temp'].length">
              <div class="line-block-text-left"> .{{ index % 10 }} </div>
              <ListProjCellLastText :index="index" :file='file'></ListProjCellLastText>
            </div>
          </div>
          <div v-else>
            <div v-if="index < model.localTeach.fileDatas[file.uuid].length">
              <div class="line-block-text-left"> .{{ index % 10 }} </div>
              <ListProjCellLastText :index="index" :file='file'></ListProjCellLastText>
            </div>
          </div>
        </div>
      </div>
      <!-- isContinus true end -->

      <!-- isContinus false -->
      <div v-else class="line-block-single">

        <div v-if="index!==0" class="line-single" style="background: #4A90E2;">
        </div>
        <div v-else class="line-single" style="">
        </div>
        <!--<div class="line-single-ball">-->
        <!--</div>-->
        <div v-if="model.localTeach.visible.starRecording===true">
          <div v-if="index===model.localTeach.showArr.length-1">
            <div class="line-single-ball-recording">
              <img class="line-logo" src="../../assets/img/edit/recording/logo_st.svg">
              <span class="line-number" style="color:white;">{{index+1}}</span>
            </div>
          </div>
          <div v-else>
            <div class="line-single-ball" style="position:relative;">
              <!-- <span class="line-number">{{index+1}}</span> -->
              <span class="line-number"></span>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="index===model.localTeach.curSelectedIndex">
            <div @click='onSelect($event, index)' class="line-single-ball-selected cursor-pointer" style="position: relative">
              <span class="line-number-selected">{{index+1}}</span>
            </div>
          </div>
          <div v-else-if="index===model.localTeach.showArr.length-1">
            <div @click='onSelect($event, index)' class="line-single-ball-end cursor-pointer" style="position:relative;">
              <span class="line-number" style="color:white;">{{index+1}}</span>
            </div>
          </div>
          <div v-else>
            <div @click='onSelect($event, index)' class="line-single-ball cursor-pointer" style="position:relative;">
              <span class="line-number">{{index+1}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- button end -->
  </div>
</template>
<script>

import * as types from './../../store/mutation-types';
import ListProjCellLastText from './ListProjCellLastText';

export default {
  props: ['file', 'index', 'editState'],
  data() {
    return {
      model: window.GlobalUtil.model,
    };
  },
  mounted() {
    // console.log(`cell mounted index = ${this.index}`);
    // const cell = document.getElementById(`cell_id_${this.index}`);
    // cell.style.left = `${250 + 60 * this.index}px`;
  },
  methods: {
    onSelect(e, index) {
      // console.log(`onSelect index = ${index}, type= ${GlobalUtil.model.localTeach.curProj.type}`);
      if (window.GlobalUtil.model.localTeach.curProj.type === 'discontinuous') {
        if (window.GlobalUtil.model.localTeach.hasChange === true) {
          window.GlobalUtil.model.localTeach.willOnSelectIndex = index;
          window.GlobalUtil.model.localTeach.changeSelectedShow = true;
        }
        else {
          window.GlobalUtil.model.localTeach.onSelect(e, index);
          this.$store.commit(types.ROBOT_MOVE_JOINT, window.GlobalUtil.model.localTeach.curPoint);
          window.GlobalUtil.model.localTeach.hasChange = false;
        }
      }
    },
  },
  beforeDestroy() {
  },
  components: {
    ListProjCellLastText,
  },
  computed: {
    // classObject: () => ({
    //   'bgcolor0': !window.GlobalUtil.model.localProjTree.hasOpenFileInCurPro,
    //   'bgcolor1': window.GlobalUtil.model.localProjTree.hasOpenFileInCurPro,
    // }),
    lineBlockColor: () => ({
      'line-block-color': this.index % 10 !== 0,
      'line-block-color-selected': this.index % 10 === 0,
    }),
  },
};

</script>
<style lang="scss" scoped>
.line-block-wrapper {
  /*border:1px solid lightgray;*/
  // position: absolute;
  width:60px;
  height:30px;
}
.rule-style {
  width:1px;
  height:10px;
  background:white;
  float:left;
  margin-left:5px;
}
.line-block {
  width:60px;
  height:30px;
  border-right: 1px solid #444;
  color: #fff;
  line-height: 30px;
  // overflow: hidden;
}
.line-block-color {
  background:rgba(74,144,226,0.50);
}
.line-block-color-selected {
  background:#52BF53;
}
.line-block-text-left {
  width:60px;
  height:30px;
  font-family: 'Gotham-Book';
  font-size: 14px;
  color: #FFFFFF;
  text-align: right;
  margin-left: -65px;
}
// .line-block-text-right {
//   width:60px;
//   height:30px;
//   font-family: 'Gotham-Book';
//   font-size: 14px;
//   color: #FFFFFF;
//   text-align: right;
//   margin-left: -2px;
//   margin-top: -30px;
// }
.line-block-single {
  // position: absolute;
  width:60px;
  height:30px;
  padding-top: 14px;
  font-size: 15px;
  // cursor: pointer;
  // line-height: 30px;
  // background-color: yellow;
}
.line-single {
  width: 100%;
  height: 2px;
  // position: absolute;
  top: 15px;
  // transform: translateY(-50%);
  /*border-radius:4px;*/
  // border: 1px solid #4A90E2;
}
.line-single-ball, .line-single-ball-recording, .line-single-ball-end {
  margin-left:50px;
  margin-top:-40px;
  width:20px;
  height:20px;
  border-radius: 50%;
  position: relative;
  transform: scale(1,1);
  // border-radius:3px;
}
.line-single-ball:after, .line-single-ball-recording:after, .line-single-ball-end:after {
  content: '';
  width: 0;
  height: 0;
  border-top: 14px solid;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  transform: scale(1.3,0.7);
  position: absolute;
  bottom: -8px;
  left: 4px;
}
.line-single-ball {
  background:white;
  color: #444;
  font-size: 10px;
  // text-align: center;
  padding-top: 3px;
  z-index: 9;
  // cursor: pointer;
}
.line-single-ball:after {
  border-top-color: #fff;
}
.line-single-ball-recording {
  background:#E27347;
}
.line-single-ball-recording:after {
  border-top-color: #E27347;
}
.line-single-ball-end {
  // background:#FF5469 ;
  background: #E24D4A;
}
.line-single-ball-end:after {
  // border-top-color: #FF5469 ;
  border-top-color: #E24D4A;
}
.line-single-ball-selected {
  // margin-left:50px;
  margin-left:48px;
  margin-top:-42px;
  width:24px;
  position: relative;
  // cursor: pointer;
}
.line-number {
  position: absolute;
  width: 20px;
  top: 3px;
  font-size: 10px;
  text-align: center;
  // color: #fff;
  color: black;
  padding-top: 2px;
  font-family: 'Gotham-Book';
}
.line-number-selected {
  position: absolute;
  font-size: 10px;
  width: 24px;
  height: 30px;
  line-height: 26px;
  color: #444;
  text-align: center;
  /*left: 6px;*/
  /*top: 2px;*/
  z-index: 999;
  background: url('../../assets/img/edit/recording/shape_selected.svg') no-repeat center;
}
.line-logo {
  position: absolute;
  bottom: 30px;
  left: -4px;
  width: 26px;
}
</style>

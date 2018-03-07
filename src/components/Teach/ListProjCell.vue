<template lang="html">
  <div class="line-block-wrapper" :id="'cell_id_' + index" >
    <!-- button -->
    <div style="margin-top:130px;">
      <!-- <div style="width:60px;height:30px;font-size:15px;margin-top:100px;">
        <div v-for='index in [0,1,2,3,4,5,6,7,8,9]'>
          <span v-if="index===0" class="rule-style" style="height:20px;margin-left:0px;"></span>
          <span v-else class="rule-style"></span>
        </div>
      </div> -->
      <!-- isContinus true -->
      <div v-if="model.localTeach.curProj.type==='continuous'" class="line-block">
        <div v-if="index % 10 === 0" style="background:#52BF53;">
          {{ parseInt(index / 10) }}.0s
        </div>
        <div v-else>
          <div v-if="model.localTeach.curEditingFileUUID===''">
            <div v-if="index < model.localTeach.fileDatas['temp'].length">
              .{{ index % 10 }}
            </div>
          </div>
          <div v-else>
            <div v-if="index < model.localTeach.fileDatas[file.uuid].length">
              .{{ index % 10 }}
            </div>
          </div>
        </div>
        <!-- <div v-if="index===model.localTeach.fileDatas[file.uuid].length-1" style="float:left;">
          {{ parseInt((index + 1) / 10) }}.0s
        </div> -->
      </div>
      <!-- <div v-if="model.localTeach.curProj.type==='continuous' && index===model.localTeach.fileDatas[file.uuid].length-1" class="line-block">
      </div> -->
      <!-- isContinus true end -->

      <!-- isContinus false -->
      <div v-else class="line-block-single">
        <div class="line-single" style="">
        </div>
        <!--<div class="line-single-ball">-->
        <!--</div>-->
        <div v-if="model.localTeach.visible.starRecording===true">
          <div v-if="index===model.localTeach.showArr.length-1">
            <div class="line-single-ball-recording" style="">
              <img class="line-logo" src="../../assets/img/edit/recording/logo_st.svg">
              <span class="line-number">{{index+1}}</span>
            </div>
          </div>
          <div v-else>
            <div class="line-single-ball" style="">
            </div>
          </div>
        </div>
        <div v-else-if="editState"  @click='onSelect($event, index)' style="cursor:pointer;">
          <div v-if="index===model.localTeach.curSelectedIndex">
            <div class="line-single-ball-selected" style="position: relative">
              <span class="line-number-selected">{{index+1}}</span>
            </div>
          </div>
          <div v-else>
            <div class="line-single-ball" style="">
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="index===model.localTeach.showArr.length-1">
            <div class="line-single-ball-end" style="position: relative">
              <span class="line-number">{{index+1}}</span>
            </div>
          </div>
          <div v-else>
            <div class="line-single-ball" style="">
            </div>
          </div>
        </div>
      </div>
      <!-- isContinus false end -->
      <!-- <div v-if="model.localTeach.curProj.type==='discontinuous' && index === model.localTeach.curSelectedIndex" style="width:60px;height:1px;background-color:red;"></div> -->
    </div>
    <!-- button end -->
  </div>
</template>
<script>

import * as types from './../../store/mutation-types';

export default {
  props: ['file', 'index','editState'],
  data() {
    return {
      model: GlobalUtil.model,
    };
  },
  mounted() {
    // console.log(`cell mounted index = ${this.index}`);
    const cell = document.getElementById(`cell_id_${this.index}`);
    // cell.style.left = `${250 + 60 * this.index}px`;
  },
  methods: {
    onSelect(e, index) {
      console.log(`onSelect index = ${index}, type= ${GlobalUtil.model.localTeach.curProj.type}`);
      if (GlobalUtil.model.localTeach.curProj.type==='discontinuous') {
        GlobalUtil.model.localTeach.onSelect(e, index);
        this.$store.commit(types.ROBOT_MOVE_JOINT, GlobalUtil.model.localTeach.curPoint);
      }
    },
  },
  beforeDestroy() {
  },
  components: {
  },
  computed: {
    classObject: () => {
      return {
        'bgcolor0': !GlobalUtil.model.localProjTree.hasOpenFileInCurPro,
        'bgcolor1': GlobalUtil.model.localProjTree.hasOpenFileInCurPro,
      }
    },
    // classObject: () => {
      // return {
        // 'heightLength': GlobalUtil.model.localProjTree.curSelectedFileUUID!==this.data.uuid,
        // 'opacity1': GlobalUtil.model.localProjTree.curSelectedFileUUID===this.data.uuid,
      // }
    // },
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
  background-color:rgba(74,144,226,0.50);
  border-right: 1px solid #444;
  color: #fff;
  line-height: 30px;
  font-family: Gotham-Book;
  font-size: 14px;
  color: #FFFFFF;
}
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
  background: #4A90E2;
  /*border-radius:4px;*/
  // border: 1px solid #4A90E2;
}
.line-single-ball, .line-single-ball-recording, .line-single-ball-end {
  margin-left:20px;
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
  background:#FF5469 ;
}
.line-single-ball-end:after {
  border-top-color: #FF5469 ;
}
.line-single-ball-selected {
  // margin-left:50px;
  margin-left:18px;
  margin-top:-42px;
  width:24px;
  position: relative;
}
.line-number {
  position: absolute;
  width: 20px;
  top: 3px;
  font-size: 10px;
  text-align: center;
  color: #fff;
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

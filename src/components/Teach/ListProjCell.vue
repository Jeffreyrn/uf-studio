<template lang="html">
  <div class="line-block-wrapper" :id="'cell_id_' + index" @click='onSelect($event, index)'>
    <!-- button -->
    <div class="">
      <!-- isContinus true -->
      <div v-if="model.localTeach.curProj.type==='continuous'" class="line-block">
        <div v-if="index % 10 === 0" style="background-color:lightpink;">
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
      </div>
      <!-- isContinus true end -->

      <!-- isContinus false -->
      <div v-else class="line-block-single">
        <div class="line-single" style="">
        </div>
        <div v-if="index===model.localTeach.curSelectedIndex">
          <div class="line-single-ball-selected" style="">
          </div>
        </div>
        <div v-else>
          <div class="line-single-ball" style="">
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
  props: ['file', 'index'],
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
.line-block {
  width:60px;
  height:30px;
  background-color:rgba(74,144,226,0.50);
  border-right: 1px solid #444;
  color: #fff;
  line-height: 30px;
}
.line-block-single {
  // position: absolute;
  width:60px;
  height:30px;
  padding-top: 14px;
  cursor: pointer;
  // line-height: 30px;
  // background-color: yellow;
}
.line-single {
  width: 60px;
  height: 2px;
  // position: absolute;
  top: 15px;
  // transform: translateY(-50%);
  background-color: #50E3C2;
}
.line-single-ball {
  margin-left:25px;
  margin-top:-4px;
  width:6px;
  height:6px;
  background:white;
  border-radius:3px
}
.line-single-ball-selected {
  margin-left:23px;
  margin-top:-6px;
  width:10px;
  height:10px;
  background:white;
  border: 1px solid blue;
  border-radius:5px
}
</style>

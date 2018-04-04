
<template>
  <div id="root-delete" class="noselected">
    <div class="dialog-wrap">
      <div class="dialog-cover" @click="oncancel"></div>
      <div class="dialog-content">
        <span class="top-title">System Notice</span>
        <span class="top-tips">{{ title }}</span>
        <div class="bottom-btns">
          <div class="float-left btn-cancel font-style cursor-pointer" @click="oncancel">
            {{ cancel }}
          </div>
          <div id='bottom-ok-btn' class="float-left btn-ok font-style cursor-pointer" @click="onok">
            {{ ok }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import * as types from './../store/mutation-types';
// const path = require('path');
export default {
  props: ['onok', 'oncancel', 'title', 'cancel', 'ok', 'isdelete'],
  data() {
    return {
      model: window.GlobalUtil.model,
    }
  },
  methods: {
    // closeMyself() {
    //   GlobalUtil.model.localTeach.changeSelectedShow = false;
    //   GlobalUtil.model.localTeach.hasChange = false;
    //   GlobalUtil.model.localTeach.onSelect(null, GlobalUtil.model.localTeach.willOnSelectIndex);
    //   this.$store.commit(types.ROBOT_MOVE_JOINT, GlobalUtil.model.localTeach.curPoint);
    // },
    // onsave() {
    //   GlobalUtil.model.localTeach.onSaveChange(() => {
    //     GlobalUtil.model.localTeach.changeSelectedShow = false;
    //     GlobalUtil.model.localTeach.hasChange = false;
    //     GlobalUtil.model.localTeach.onSelect(null, GlobalUtil.model.localTeach.willOnSelectIndex);
    //     this.$store.commit(types.ROBOT_MOVE_JOINT, GlobalUtil.model.localTeach.curPoint);
    //   });
    // },
  },
  components: {
  },
  mounted() {
    if (this.isdelete !== undefined && this.isdelete === true) {
      const bottomBtn = document.getElementById('bottom-ok-btn');
      if (bottomBtn !== null && bottomBtn !== undefined) {
        bottomBtn.style.background = '#E24D4A';
      }
    }
  },
  computed: {
  },
}
</script>

<style scoped>
.top-title {
  position: absolute;
  width: 100px;
  left: 20px;
  top: 40px;
  font-family: 'Gotham-Medium';
  font-size: 16px;
  color: #575C62;
  letter-spacing: -0.57px;
  text-align: center;
}
.top-tips {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 126px;
  margin: auto;
  font-family: 'Gotham-Medium';
  font-size: 16px;
  color: #555555;
  letter-spacing: -0.57px;
  text-align: center;
}
.bottom-btns {
  position: absolute;
  bottom: 0px;
}
.dialog-content {
  width: 470px;
  position: fixed;
  height: 264px;
  top: 20%;
  left: 0px;
  right: 0px;
  margin-left:auto;
  margin-right:auto;
  z-index: 10;
  background: #FFFFFF;
  overflow: hidden;
}
.dialog-close:hover {
  color: #4fc08d;
}
.dialog-add {
  width: 100%;
  height: 100px;
  /* background-color: yellow; */
}
.btn-cancel {
  width: 235px;
  height: 40px;
  /* margin-top: 230px; */
  /* background-color: yellow; */
  background: #9D9D9D;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.font-style {
  font-family: 'Gotham-Book';
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: -0.44px;
  text-align: center;
}
.btn-ok {
  width: 235px;
  height: 40px;
  /* margin-top: 230px; */
  /* margin-left: 178px; */
  /* background-color: green; */
  background: #52BF53;
  line-height: 40px;
  /* cursor: pointer; */
}
</style>

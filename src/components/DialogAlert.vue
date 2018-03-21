
<template>
  <div id="root-delete" class="noselected">
    <div class="dialog-wrap">
      <div class="dialog-cover" @click="closeMyself"></div>
      <div class="dialog-content">
        <span class="top-title">System Notice</span>
        <div class="save-dialog-text">
          <p>{{ title }}</p>
          <span>{{ subtitle }}</span>
        </div>
        <!-- <div style="height:100%;">
        </div> -->
        <div class="btn-ok font-style cursor-pointer" @click="onok">
          OK
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const path = require('path');
// import * as types from './../store/mutation-types';
export default {
  props: ['onok', 'title', 'subtitle'],
  data() {
    return {
      model: window.GlobalUtil.model,
    }
  },
  mounted() {
  },
  methods: {
    closeMyself() {
      window.GlobalUtil.model.localTeach.saveDialogShow = false;
    },
    // onsave() {
    //   GlobalUtil.model.localTeach.onSaveChange(() => {
    //     GlobalUtil.model.localTeach.saveDialogShow = false;
    //   });
    // },
  },
  components: {
  },
  computed: {
  },
}
</script>

<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .3s ease;
}
.drop-enter {
  transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
}
.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.dialog-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.top-title {
  position: absolute;
  left: 10px;
  top: 20px;
  width: 100px;
  font-family: 'Gotham-Medium';
  font-size: 16px;
  color: #575C62;
  letter-spacing: -0.57px;
  text-align: center;
}
/* .top-tips {
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
} */
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
.font-style {
  font-family: 'Gotham-Book';
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: -0.44px;
  text-align: center;
}
.btn-ok {
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0px;
  background: #52BF53;
  line-height: 40px;
}
.save-dialog-text {
  text-align: center;
  margin-top:115px;
}
.save-dialog-text p{
  font-size: 16px;
  color: #555;
  letter-spacing: -0.57px;
  font-family: 'Gotham-Medium';
}
.save-dialog-text span {
  font-size: 12px;
  letter-spacing: -0.38px;
  font-family: 'Gotham-Book';
}
</style>

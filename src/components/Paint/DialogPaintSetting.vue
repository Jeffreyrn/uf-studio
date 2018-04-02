
<template>
  <div id="root-list" class="noselected">
    <div class="dialog-wrap">
      <div class="dialog-cover" @click="onclose"></div>
      <div class="dialog-content">
        <div class="dialog-top">
          <span class="top-title">
            Setting
          </span>
          <!-- <div class="dialog-close" @click="onclose">
          </div> -->
        </div>

        <div class="adjust-tips">
          Please adjust the <span style="color:rgba(191,71,61,1)">zero point</span> before start the project
        </div>

        <!-- <input v-model="joystick.step.position.z" type="range" min="-5" max="5" value="0" id="zero-control"
                @mousedown="setPositionZ" @touchstart="setPositionZ" @touchend="resetPositionZ" @mouseup="resetPositionZ"> -->

        <span class="left-title">
          Adjust Zero Point
        </span>

        <input
          v-model="curZeroHeight"
          type="range"
          min="-50"
          max="50"
          value="0"
          @mouseup="onZeroUp"
          id="zero-control">

        <input
          v-model="curZeroHeight"
          class="show-input" />

        <div class="btn-ok cursor-pointer" @click="onok">
          Print
        </div>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  props: ['onok', 'onclose'],
  name: 'dialog-paint-setting',
  data() {
    return {
      model: window.GlobalUtil.model,
    };
  },
  mounted() {
  },
  computed: {
    curZeroHeight: {
      get() {
        const projType = window.GlobalUtil.model.localPaintMgr.curProj.projType;
        const end_type = 'pen'; // 0: 'pen', 1: 'laser',
        const zeroHeightDict = projType === 'outline' ? window.GlobalUtil.model.localPaintMgr.state.zero.outline : window.GlobalUtil.model.localPaintMgr.state.zero.grayscale;
        const zeropoint_height = end_type === 'pen' ? zeroHeightDict.pen : zeroHeightDict.laser;
        return zeropoint_height;
      },
      set(value) {
        const projType = window.GlobalUtil.model.localPaintMgr.curProj.projType;
        const end_type = 'pen'; // 0: 'pen', 1: 'laser',
        const zeroHeightDict = projType === 'outline' ? window.GlobalUtil.model.localPaintMgr.state.zero.outline : window.GlobalUtil.model.localPaintMgr.state.zero.grayscale;
        switch (end_type) {
          case 'pen':
            zeroHeightDict.pen = value;
            break;
          case 'laser':
            zeroHeightDict.laser = value;
            break;
          default:
            break;
        }
      },
    },
  },
  methods: {
    onZeroUp() {
      console.log(`on Zero Up on Zero Up = ${this.curZeroHeight}`);
      window.CommandsPaintSocket.setZeroHeight(this.curZeroHeight, (dict) => {
        console.log(`on Zero Up on Zero Up = ${JSON.stringify(dict)}`);
      });
    },
  },
  // activated: function() {
  //   console.log(`activated model.localPaintMgr.state.zero = ${this.model.localPaintMgr.state.zero}`);
  // },
}
</script>

<style lang="scss" scoped>

.dialog-top {
  width: 100%;
  height: 67px;
  background: #484848;
}
.dialog-close {
  position: absolute;
  right: 10px;
  top: 25px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
  background-position: center;
  background-image: url('./../../assets/img/pop/icon_close.svg');
  background-size: 10px 11px;
  background-repeat: no-repeat;
}
.top-title {
  position: absolute;
  left: 24px;
  top: 30px;
  font-family: 'Gotham-Medium';
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: -1px;
}
.dialog-content {
  width: 580px;
  height: 330px;
  position: fixed;
  top: 20%;
  left: 0px;
  right: 0px;
  margin-left:auto;
  margin-right:auto;
  z-index: 10;
  background: white;
  overflow: hidden;
}
.adjust-tips {
  position: absolute;
  font-family: Gotham-Medium;
  font-size: 16px;
  color: #444444;
  letter-spacing: -1px;
  width: 100%;
  top: 140px;
  text-align: center;
}
.btn-cancel {
  position: absolute;
  width: 290px;
  height: 40px;
  background: #EBEBEB;
  line-height: 40px;
  bottom: 0px;
  left: 0;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Gotham-Book';
  color: #BABABA;
  letter-spacing: -0.88px;
  text-align: center;
}
.btn-ok {
  position: absolute;
  // width: 290px;
  width: 100%;
  height: 40px;
  bottom: 0px;
  right: 0;
  background: #52BF53;
  text-align: center;
  letter-spacing: -0.88px;
  line-height: 40px;
  font-family: 'Gotham-Book';
  font-size: 12px;
  color: #FFFFFF;
  letter-spacing: -0.5px;
  /* cursor: pointer; */
}

input[type=range] {
  cursor: pointer;
}
input:disabled {
  cursor:not-allowed;
}
input[type=range]:focus {
  outline: none;
}

.left-title {
  position: absolute;
  width: 140px;
  height: 24px;
  line-height: 24px;
  top: 190px;
  font-family: 'Gotham-Medium';
  font-size: 12px;
  color: #555555;
  letter-spacing: -0.43px;
  text-align: right;
}

.show-input {
  position: absolute;
  width: 35px;
  height: 30px;
  top: 185px;
  right: 50px;
  background: #FDFDFD;
  border: 1px solid #D7D7D7;
  border-radius: 2px;
  font-family: 'Gotham-Medium';
  font-size: 12px;
  text-align: center;
  color: #4B4B4B;
  outline: none;
}

#zero-control {
  position: absolute;
  // appearance: slider-vertical; // abandoned, can not set width with css
  /* width: 120%; */
  left: 165px;
  // right: 0px;
  // margin: auto;
  top: 190px;
  width: 300px;
  height: 24px;
  background: #F2F4F7;
  opacity: 1;
  // transform: rotate(-90deg);
  border-radius: 100px;
  // border: #5A93D7 solid 1px;
  cursor: default;
}
#zero-control::-webkit-slider-thumb {
  width: 49px;
  height: 49px;
  background-image: url('./../../assets/img/control/btn_slide.svg');
  background-size: 49px 49px;
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-appearance: none;
  border: none;
  border-radius: 50%;
//  background: #5A93D7;
  // box-shadow: 0 0 2px 0 rgba(45,73,67,0.17);
}

</style>

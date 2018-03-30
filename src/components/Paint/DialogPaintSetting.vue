
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

        <input type="range" min="-5" max="5" value="0" id="zero-control">

        <!-- <div class="btn-ok cursor-pointer" @click="onok">
          Open
        </div> -->
        <div class="btn-cancel cursor-pointer" @click="onclose">
          Cancel
        </div>
        <div class="btn-ok cursor-pointer" @click="onok">
          Open
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
  },
  methods: {
  },
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
  /* margin-top: 230px; */
  /* background-color: yellow; */
  background: #484848;
  text-align: center;
  font-family: 'Gotham-Book';
  font-size: 14px;
  background: #EBEBEB;
  letter-spacing: -0.88px;
  line-height: 40px;
  bottom: 0px;
  left: 0;
  cursor: pointer;
}
.btn-ok {
  position: absolute;
  width: 290px;
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

#zero-control {
  // appearance: slider-vertical; // abandoned, can not set width with css
  /*width: 120%;*/
  height: 18px;
  background: #fff;
  opacity: 1;
  transform: rotate(-90deg);
  border-radius: 100px;
  border: #5A93D7 solid 1px;
  cursor: default;
}
#zero-control::-webkit-slider-thumb {
  width: 25px;
  height: 25px;
  background-image: url('./../../assets/img/control/btn_slide02.svg');
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-appearance: none;
  border: none;
  border-radius: 50%;
//  background: #5A93D7;
  box-shadow: 0 0 2px 0 rgba(45,73,67,0.17);
}

</style>

<template>
  <el-container class="hello emulator-container">
    <el-header height="50px">
      <el-row :gutter="20" class="header-wrapper">
        <el-col :span="19">
          <router-link :to="{ name: 'Home'}">
            <img src="./../assets/img/control/icon_back.svg" alt="back home">
          </router-link>
          <span class="title-ide">Control</span>
        </el-col>
        <el-col :span="5">
          <div class="title-online">Live Control</div>
          <toggle-button v-model="state.online" :color="{checked: '#52BF53', unchecked: '#D3D5DB'}" :sync="true" 
            :labels="{checked: 'ON', unchecked: 'OFF'}" @change="setOnline"
            :width="71" :height="36"/>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main-wrapper">
      <el-row :gutter="20" class="main-view">
        <el-col :span="19" class="model-container">
          <!-- <keep-alive><xarm-model :size="emulatorSize"></xarm-model></keep-alive> -->
        </el-col>
        <el-col :span="5" class="end-container">
          <div class="container-title">TCP</div>
          <ul class="position-set">
            <li><div>X</div><input v-model.number="state.position.x" type="number"><span>mm</span></li>
            <li><div>Y</div><input v-model.number="state.position.y" type="number"><span>mm</span></li>
            <li><div>Z</div><input v-model.number="state.position.z" type="number"><span>mm</span></li>
            <li><div>Roll</div><input v-model.number="state.orientation.roll" type="number"><span>&deg;</span></li>
            <li><div>Yaw</div><input v-model.number="state.orientation.yaw" type="number"><span>&deg;</span></li>
            <li><div>Pitch</div><input v-model.number="state.orientation.pitch" type="number"><span>&deg;</span></li>
            <!-- test data "X":172,"Y":5.091591617724031e-14,"Z":45.93000030517578,"A":-180.00000500895632,"B":0,"C":0 -->
          </ul>
          <div class="set-button">
            <button class="confirm" @click="setEnd">Apply</button>
            <button class="cancel" @click="resetEnd">Reset</button>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="control-wrapper dark-backgroud">
          <div class="control-header">
            <div class="header-text">Position Control</div>
            <div class="header-text">Orientation Control</div>
          </div>
          <div class="control-body">
            <div class="control-left">
              <div class="height-wrapper">
                <!-- <el-button @click="setPositionZ(true)">Up</el-button>
                <el-button @click="setPositionZ(false)">Down</el-button> -->
                <input v-model="joystick.step.position.z" type="range" min="-5" max="5" value="0" id="z-control" 
                  @mousedown="setPositionZ" @touchstart="setPositionZ" @touchend="resetPositionZ" @mouseup="resetPositionZ">
              </div>
              <div id="position-joystick" class="joystick-wrapper"></div>
            </div>
            <div class="control-right">
              <div class="yaw-wrapper">
                <!-- <el-button @click="setYaw(true)">Left</el-button>
                <el-button @click="setYaw(false)">Right</el-button> -->
                <!-- <input v-model="joystick.step.orientation.z" type="range" min="-5" max="5" value="0" id="yaw-control" 
                  @mousedown="setYaw" @touchstart="setYaw" @touchend="resetYaw" @mouseup="resetYaw"> -->
                  <canvas id="angle-canvas" width="200" height="50"></canvas>
                  <div class="data-display" v-text="radianAngle"></div>
              </div>
              <div id="orientation-joystick" class="joystick-wrapper"></div>
            </div>
          </div>
        </div>
        <div class="config-wrapper dark-backgroud">
          <div>
            <span>Speed</span><input type="range" v-model="state.speed" :step="config.step" :max="config.jointMax" :min="config.jointMin">
          </div>
          <div>
            <span>Acceleration</span><input type="range" v-model="state.acceleration" :step="config.step" :max="config.jointMax" :min="config.jointMin">
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="dark-backgroud joint-control">
          <div class="header-text" id="testtest">Joints Control</div>
          <div class="block joint-range" v-for="j in 7" :key="j">
            <span class="text">J{{j}}</span>
            <div class="range-wrapper">
              <input :id="'joint' + j" v-model.number="state.joint[j-1]" type="range" :step="config.step" :max="config.joint.max[j-1]" :min="config.joint.min[j-1]" 
              @input="setJoint(j-1)" @change="setJointOnline(j-1)">
              <p :id="'mask' + j" class="mask-bar"></p>
            </div>
            <input :id="'joint-input' + j" type="number" v-model="state.joint[j-1]">
            <!-- <el-slider v-model="state.joint[j-1]" :step="config.step" :max="config.joint.max[j-1]" :min="config.joint.min[j-1]" show-input :show-input-controls="false" @change="setJoint(j-1, $event)"></el-slider> -->
          </div>
        </div>
      </el-col>
    </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import Vue from 'vue';
import Nipple from 'nipplejs';
import ToggleButton from 'vue-js-toggle-button';
import * as types from '../store/mutation-types';
import XarmModel from './common/XarmModel';

Vue.use(ToggleButton);
export default {
  name: 'Emulator',
  data() {
    return {
      testindex: 6,
      radianAngle: -(Math.PI / 2),
      test: null,
      testtest: [],
      config: {
        debugMax: 10,
        debugMin: -10,
        jointMax: 180,
        jointMin: -180,
        step: 0.01,
        joint: {
          max: [179.9, 30, 34.8, 7.2, 50.4, 102.1, 179.9],
          min: [-179.9, -120, -179.9, -220, -118.6, -99.9, -179.9],
        },
      },
      joystick: {
        step: {
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          orientation: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
      },
      state: {
        speed: 50,
        acceleration: 50,
        online: false,
        joint: {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        orientation: {
          roll: 0,
          yaw: 0,
          pitch: 0,
        },
        rott: 5,
        test: {
          x: 0,
          y: 0,
          z: 0,
          jx: 0,
          jy: 0,
          jz: 0,
        },
      },
      emulatorSize: {
        width: 1452 / 1872,
        height: 530 / 1030,
      },
      msg: 'Emulator',
      interval: null,
      intervalYaw: null,
    };
  },
  mounted() {
    this.createJoyStick();
    // console.log(document.getElementById('joint1'));
    // console.log(document.getElementById('joint1').parentNode);
    for (let i = 1; i < 8; i += 1) {
      this.rangeColor(`${i}`);
    }
    // angle canvas start, define values for angle canva;
    const self = this;
    const sCanvas = document.getElementById('angle-canvas');
    const sCtx = sCanvas.getContext('2d');
    let isDown = false;
    const cx = 100;
    const cy = 140;
    const sRadius = 120;
    const strokewidth = 15;
    // const thumbAngle = Math.PI / 100;
    const value_from = (Math.PI * 4) / 3;
    const value_to = (Math.PI * 5) / 3;
    let mouseX;
    let mouseY;
    const indicatorSize = 25;
    // default value
    // self.cData.r = self.radiansToDegrees(self.radianAngle); // default r value
    sCtx.lineCap = 'round';
    sCtx.font = '24px arial';
    sCtx.lineWidth = 3;

    const indicator = new Image();
    indicator.src = '../src/assets/img/control/btn_slide02.svg';
    function drawAngle() { // draw uarm angle select
      // clear
      sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);

      sCtx.save();
      // circle
      sCtx.beginPath();
      sCtx.arc(cx, cy, sRadius, value_from, value_to);
      sCtx.strokeStyle = '#ffffff';
      sCtx.lineWidth = strokewidth;
      sCtx.stroke();
      let x;
      let y;
      if (self.radianAngle >= ((-2 * Math.PI) / 3) && self.radianAngle <= (Math.PI / -2)) {
        const thelta = self.radianAngle + Math.PI;
        x = cx - (sRadius * Math.cos(thelta));
        y = cy - (sRadius * Math.sin(thelta));
      }
      else if (self.radianAngle <= (Math.PI / -3) && self.radianAngle > (Math.PI / -2)) {
        const thelta = -self.radianAngle;
        x = cx + (sRadius * Math.cos(thelta));
        y = cy - (sRadius * Math.sin(thelta));
      }
      x -= (indicatorSize / 2);
      y -= (indicatorSize / 2);
      sCtx.drawImage(indicator, x, y, indicatorSize, indicatorSize);
      window.requestAnimationFrame(drawAngle); // real time change when let changes
    }

    if (indicator.complete) {
      drawAngle();
    }
    else {
      indicator.onload = () => {
        drawAngle();
      };
    }

    function handleMouseDown(e) {
      e.preventDefault();
      // Put your mousedown stuff here
      isDown = true;
    }

    function handleMouseUp(e) {
      e.preventDefault();
      // Put your mouseup stuff here
      isDown = false;
    }

    function handleMouseOut(e) {
      e.preventDefault();
      // Put your mouseOut stuff here
      isDown = false;
    }

    function handleMouseMove(e) {
      // uncomment if you want to move slider only on drag instead of any mousemove
      if (!isDown) {
        return;
      }
      e.preventDefault();

      mouseX = parseInt(e.clientX - sCanvas.getBoundingClientRect().left);
      mouseY = parseInt(e.clientY - sCanvas.getBoundingClientRect().top);
      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const newAngle = Math.atan2(dy, dx);
      if (newAngle < ((-2 * Math.PI) / 3) || newAngle > (Math.PI / -3)) {
        return;
      }
      self.radianAngle = newAngle;
      // self.cData.r = self.radiansToDegrees(self.radianAngle);
    }
    // angle canvas end
    sCanvas.addEventListener('mousedown', handleMouseDown);
    sCanvas.addEventListener('mousemove', handleMouseMove);
    sCanvas.addEventListener('mouseup', handleMouseUp);
    sCanvas.addEventListener('mouseout', handleMouseOut);
  },
  methods: {
    createJoyStick() {
      // const NIPPLE_OPTION = {};
      const size = 110;
      const color = 'white';
      const mode = 'static';
      const restOpacity = 1;
      const positionManager = Nipple.create({
        size,
        zone: document.getElementById('position-joystick'),
        color,
        mode,
        position: {
          left: '30%',
        },
        restOpacity,
      });
      let positionInterval;
      positionManager.on('move', (evt, nipple) => {
        console.log('event type', evt.type);
        this.setJoystickStep(nipple, 'position');
        // this.state.position.z = nipple.direction.angle;
      }).on('start', () => {
        positionInterval = setInterval(() => {
          // console.log(typeof this.joystick.step.position.x, typeof this.state.position.x);
          const nextX = Number((this.joystick.step.position.x).toFixed(2));
          const nextY = Number((this.joystick.step.position.y).toFixed(2));
          this.$store.commit(types.MOVE_END_XY, [nextX, nextY]);
          console.log('interval 500 commit', types.MOVE_END_XY, [nextX, nextY]);
          // this.state.position.x = Number(nextX.toFixed(2));
          // this.state.position.y = Number(nextY.toFixed(2));
        }, 500);
      }).on('end', () => {
        clearInterval(positionInterval);
      });
      const orientationManager = Nipple.create({
        size,
        zone: document.getElementById('orientation-joystick'),
        color,
        mode,
        position: {
          right: '25%',
        },
        restOpacity,
      });
      let orientationInterval;
      orientationManager.on('move', (evt, nipple) => {
        console.log('event type', evt.type);
        this.setJoystickStep(nipple, 'orientation');
      }).on('start', () => {
        orientationInterval = setInterval(() => {
          console.log(typeof this.joystick.step.orientation.x, typeof this.joystick.step.orientation.y);
          // const nextX = this.joystick.step.orientation.x + this.state.orientation.yaw;
          // const nextY = this.joystick.step.orientation.y + this.state.orientation.pitch;
          const nextX = Number((this.joystick.step.orientation.x).toFixed(2));
          const nextY = Number((this.joystick.step.orientation.y).toFixed(2));
          this.$store.commit(types.MOVE_YAW_PITCH, [nextX, nextY]);
          // this.state.orientation.yaw = Number(nextX.toFixed(2));
          // this.state.orientation.pitch = Number(nextY.toFixed(2));
        }, 500);
      }).on('end', () => {
        clearInterval(orientationInterval);
      });
    },
    setJoystickStep(nipple, type) {
      if (nipple.direction) {
        const speed = nipple.force * 0.5;
        let stepX = speed;
        let stepY = speed;
        if (nipple.direction.angle === 'up' || nipple.direction.angle === 'down') {
          stepY = 2 * speed;
        }
        else if (nipple.direction.angle === 'right' || nipple.direction.angle === 'left') {
          stepX = 2 * speed;
        }
        // stepX = Number(stepX.toFixed(2));
        // stepY = Number(stepY.toFixed(2));
        if (nipple.direction.x === 'right') {
          this.joystick.step[type].x = stepX;
        }
        else if (nipple.direction.x === 'left') {
          this.joystick.step[type].x = 0 - stepX;
        }
        else {
          this.joystick.step[type].x = 0;
        }
        if (nipple.direction.y === 'up') {
          this.joystick.step[type].y = stepY;
        }
        else if (nipple.direction.y === 'down') {
          this.joystick.step[type].y = 0 - stepY;
        }
        else {
          this.joystick.step[type].y = 0;
        }
      }
    },
    setSpeed(value) {
      this.setRobotState('speed', value);
    },
    setAcceleration(value) {
      this.setRobotState('acceleration', value);
    },
    setOnline(value) {
      const data = Object.prototype.hasOwnProperty.call(value, 'value') ? value.value : value;
      this.setRobotState('online', data);
    },
    setRobotState(index, value) {
      const data = {
        index,
        value,
      };
      this.$store.commit(types.SET_ROBOT_STATE, data);
    },
    setJoint(index) {
      // console.log('test', index, value);
      if (!this.state.online) {
        this.$store.commit(types.MOVE_ONE_JOINT, {
          index,
          value: this.state.joint[index],
        });
      }
    },
    setJointOnline(index) {
      if (this.state.online) {
        this.$store.commit(types.MOVE_ONE_JOINT, {
          index,
          value: this.state.joint[index],
        });
      }
    },
    setYaw() {
      this.intervalYaw = setInterval(() => {
        this.$store.commit(types.MOVE_END_ROLL, Number(this.joystick.step.orientation.z));
      }, 500);
    },
    resetYaw() {
      this.joystick.step.orientation.z = 0;
      clearInterval(this.intervalYaw);
    },
    setPositionZ() {
      this.interval = setInterval(() => {
        this.$store.commit(types.MOVE_END_Z, Number(this.joystick.step.position.z));
      }, 500);
    },
    resetPositionZ() {
      this.joystick.step.position.z = 0;
      clearInterval(this.interval);
    },
    resetEnd() {
      Object.keys(this.state.position).forEach((index) => {
        this.state.position[index] = 0;
      });
      Object.keys(this.state.orientation).forEach((index) => {
        this.state.orientation[index] = 0;
      });
    },
    setEnd() {
      this.$store.commit(types.MOVE_END, {
        position: this.state.position,
        orientation: this.state.orientation,
      });
    },
    setMask(e) {
      const dom = e.target;
      const maskBar = dom.nextElementSibling;

      const inputWidth = Number(dom.clientWidth);
      const rangeLength = Number(dom.max) - Number(dom.min);
      const getWidth = inputWidth * (Math.abs(Number(dom.value)) / rangeLength);

      if (dom.value > 0) {
        maskBar.style.transform = 'none';
      }
      else {
        maskBar.style.transform = 'rotate(180deg)';
      }
      maskBar.style.width = `${getWidth}px`;
    },
    setMaskInput(e) {
      const dom = e.target.previousElementSibling.childNodes[0];
      const maskBar = dom.nextElementSibling;

      const inputWidth = Number(dom.clientWidth);
      const rangeLength = Number(dom.max) - Number(dom.min);
      const getWidth = inputWidth * (Math.abs(Number(dom.value)) / rangeLength);

      if (dom.value > 0) {
        maskBar.style.transform = 'none';
      }
      else {
        maskBar.style.transform = 'rotate(180deg)';
      }
      maskBar.style.width = `${getWidth}px`;
    },
    rangeColor(index) {
      // TODO: use $refs instead of getElementById
      const dom = document.getElementById(`joint${index}`);
      const domInput = document.getElementById(`joint-input${index}`);
      const maskBar = document.getElementById(`mask${index}`);
      const rangeLength = Number(dom.max) - Number(dom.min);
      maskBar.style.left = `${((-Number(dom.min) * 100) / rangeLength)}%`;
      dom.addEventListener('input', this.setMask);
      domInput.addEventListener('input', this.setMaskInput);
      domInput.addEventListener('keyup', this.setMaskInput);
    },
    removeRangeColor(index) {
      const dom = document.getElementById(`joint${index}`);
      const domInput = document.getElementById(`joint-input${index}`);
      console.log('remove', dom, domInput);
      if (dom || domInput) {
        dom.removeEventListener('input', this.setMask);
        domInput.removeEventListener('input', this.setMaskInput);
        domInput.removeEventListener('keyup', this.setMaskInput);
      }
    },
  },
  beforeDestroy() {
    for (let i = 1; i < 8; i += 1) {
      this.removeRangeColor(i);
    }
  },
  watch: {
    'state.joints': (newValue) => {
      console.log('watch posi print:');
      console.table(newValue);
    },
    // robotJointsAngle() {
    //   this.$set(this.robotJointsAngle, 0, this.robotJointsAngle[0]);
    // },
  },
  computed: {
    end: {
      get() {
        return this.$store.getters.end;
      },
      set(value) {
        console.log('SET');
        console.table(value);
        // this.$store.commit();
      },
    },
    // testtest: {
    //   get() {
    //     return this.$store.state.robot.info.test;
    //   },
    //   set(value) {
    //     this.$store.commit('test', value);
    //   },
    // },
  },
  components: {
    XarmModel,
  },
};
</script>

<style scoped lang="scss">
$liDivWidth : 17%;
$liInputWidth : 70%;
.hello {
  font-family:'Gotham-Medium';
  display: flex;
  flex-direction: column;
}
input[type=range] {
  cursor: pointer;
}
input[type=range]:focus {
  outline: none;
}
.emulator-container {
  background-color: #F8F8F8;
  .header-wrapper{
    display: flex;
    align-items: center;
    height: 100%;
    & > div {
      display: flex;
      align-items: center;
    }
  }
  .main-wrapper{
    padding: 10px 20px;
    .main-view {
      display: flex;
      align-items: flex-start;
      overflow: hidden;
      .model-container{
        border-radius: 0px;
      }
      .end-container {
        background: white;
        border-radius: 8px;
        .container-title {
          padding: 2vw 1vw;
          font-size: 1.5rem;
          color: #444444;
          letter-spacing: -1px;
        }
        .set-button {
          margin-left: $liDivWidth;
          width: $liInputWidth;
          padding-bottom: 6vw;
          button {
            border: none;
            background: #E9E9E9;
            box-shadow: inset 0 0 1px 0 rgba(177,177,177,0.50);
            border-radius: 100px;
            cursor: pointer;
            height: 3vw;
            width: 45%;
            margin: 5% 1%;
            color: #6C6A6A;
            letter-spacing: -0.75px;
            font-family: "Gotham-Book";
          }
          button.cancel {
            color: #BEBEBE;
            background: #F2F3F5;
          }
        }
        
      }
      ul.position-set li{
        margin-bottom: 4%;
        div {
          width: $liDivWidth;
          font-family: "Gotham-Book";
          font-size: 1rem;
          color: #909293;
          letter-spacing: -0.67px;
          display: inline-block;
          padding: 4% 0;
          text-align: center;
        }
        input[type=number] {
          height: 2.5vw;
          width: $liInputWidth;
          background: #F2F3F5;
          border: none;
          box-shadow: inset 0 0 2px 0 rgba(152,152,152,0.50);
          border-radius: 100px;
          text-align: center;
        }
        span {
          font-size: 0.8rem;
          color: #666;
          margin-left: 0.3vw;
        }
      }
    }
  }
}
.hello-row {
  display: inline-block;
}
.block {
  padding: 0.2vw 1vw;
}
span.text {
  display: block;
  float: left;
}
.control-wrapper {
  margin-bottom: 1%;
  display: flex;
  position: relative;
  justify-content: space-around;
  flex-direction: column;
  .control-header {
    display: flex;
    flex-direction: row;
    .header-text {
      width: 50%;
    }
  }
  .control-body {
    display: flex;
    position: relative;
    justify-content: space-around;
    & > div {
      margin: 2.5% 0;
      .joystick-wrapper {
        padding: 20% 0;
        margin: 0;
      }
    }
    .control-left {
      width: 50%;
      display: flex;
      align-items: center;
      border-right: solid 1px white;
      .height-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        #z-control {
          // appearance: slider-vertical; // abandoned, can not set width with css
          width: 120%;
          height: 18px;
          background: #fff;
          opacity: 1;
          transform: rotate(-90deg);
          border-radius: 100px;
          border: none;
        }
        #z-control::-webkit-slider-thumb {
          width: 25px;
          height: 25px;
          background-image: url('~/src/assets/img/control/btn_slide02.svg');
          background-repeat: no-repeat;
          background-position: center center;
          -webkit-appearance: none;
          border: none;
          border-radius: 50%;
        //  background: #5A93D7;
          box-shadow: 0 0 2px 0 rgba(45,73,67,0.17);
        }
      }
      // .el-slider {
      //   padding-bottom: 0;
      //   margin-left: 15%;
      // }

    }
    .control-right {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      align-items: center;
      .joystick-wrapper {
        position: absolute;
        left: 50%;
        right: 50%;
      }
      // .el-slider {
      //   padding: 0 10%;
      //   position: absolute;
      //   width: 80%;
      //   top: 0;
      //   left: 10%;
      // }
      .yaw-wrapper {
        padding-bottom: 50%;
        input {
          // appearance: slider-vertical; // abandoned, can not set width with css
          width: 100%;
          height: 18px;
          background: #fff;
          opacity: 1;
          border-radius: 100px;
          border: none;
        }
        input::-webkit-slider-thumb {
          width: 25px;
          height: 25px;
          background-image: gradient(right, #222, #eee);
          -webkit-appearance: none;
          border: none;
          border-radius: 50%;
          background: #5A93D7;
          box-shadow: 0 0 2px 0 rgba(45,73,67,0.17);
        }
      }
    }
  }
  
}
.config-wrapper {
  display: flex;
  justify-content: space-around;
  & > div {
    width: 50%;
    padding: 1% 5%;
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    input[type=range] {
      height: 8px;
      width: 100%;
      margin-left: 7%;
      border-radius: 100px;
      background-image: linear-gradient(90deg, #8FFF94 0%, #FF6868 100%);
    }
    input[type=range]::-webkit-slider-thumb {
      width: 22px;
      height: 22px;
      -webkit-appearance: none;
      border: none;
      border-radius: 50%;
      background: #FEFEFE;
      box-shadow: 0 0 8px 0 rgba(214,214,214,0.50);
    }
  }
}
.dark-backgroud {
  background: #434343;
  border-radius: 8px;
}
.title-ide {
  font-family: 'Gotham-Bold';
  font-size: 36px;
  color: #444;
  letter-spacing: -1px;
  padding-left: 2%;
}
.title-online {
  margin-right: 5%;
  font-size: 1.2rem;
  color: #434343;
  letter-spacing: -0.75px;
}
.header-text {
  font-size: 1.6rem;
  color: white;
  width: 50%;
  padding: 1% 2% 0;
  letter-spacing: -1px;
}
.joint-control {
  padding-bottom: 1vw;
  .joint-range {
    color: white;
    padding: 0.8vw 1vw;
    display: flex;
    align-items: center;
    span {
      width: 2vw;
      font-size: 1.2rem;
      font-family: "Gotham-Book";
    }
    .range-wrapper {
      position: relative;
      width: 20vw;
      margin-right: 0.5vw;
      background: white;
      height: 2px;
      input[type=range] {
        height: 2px;
        background: transparent;
        width: 100%;
        vertical-align: middle;
        z-index: 5;
        padding: 0;
        margin: 0;
        position: absolute;
      }
      input[type=range]::-webkit-slider-thumb {
        width: 24px;
        height: 24px;
        -webkit-appearance: none;
        border: none;
        border-radius: 50%;
        background: #fff;
      }
      .mask-bar {
        position: absolute;
        background-color: #E27347;
        height: 2px;
        line-height: 2px;
        z-index: 200;
        border-radius: 3px;
        padding: 0;
        margin: 0;
        pointer-events: none;
        transform-origin: left;
        z-index: 2;
      }
    }
    
    input[type=number] {
      width: 5.5vw;
      border: none;
      border-radius: 100px;
      text-align: center;
      color: #666;
      letter-spacing: -0.67px;
      font-size: 1rem;
    }
  }
}
.data-display {
  background: blue;
  color: yellow;
}

</style>

<template>
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
                <!-- <div class="data-display" v-text="joystick.step.orientation.z"></div> -->
            </div>
            <div id="orientation-joystick" class="joystick-wrapper"></div>
          </div>
        </div>
      </div>
      <div class="config-wrapper dark-backgroud">
        <div>
          <span class="config-title">Speed</span>
          <img src="./../../assets/img/control/icon_speed.svg" alt="">
          <input type="range" v-model="state.speed" @change="setSpeed" :step="1" :max="100" :min="5">
          <img src="./../../assets/img/control/icon_speed2.svg" alt="">
          <span class="config-value" v-text="state.speed"></span>
        </div>
        <div>
          <span class="config-title">Acceleration</span>
          <img src="./../../assets/img/control/icon_speed.svg" alt="">
          <input type="range" v-model="state.acceleration" @change="setAcceleration" :step="1" :max="1000" :min="100">
          <img src="./../../assets/img/control/icon_speed2.svg" alt="">
          <span class="config-value" v-text="state.acceleration"></span>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="dark-backgroud joint-control">
        <div class="header-text" id="testtest">Joints Control</div>
        <div class="degree-text">Degree</div>
        <div class="block joint-range" v-for="j in 7" :key="j">
          <span class="text">J{{j}}</span>
          <div class="range-wrapper">
            <input :id="'joint' + j" v-model.number="state.joint[j-1]" type="range" :step="config.step" :max="config.joint.max[j-1]" :min="config.joint.min[j-1]" 
            @input="setJoint(j-1)" @change="setJointOnline(j-1)">
            <p :id="'mask' + j" class="mask-bar"></p>
          </div>
          <input :id="'joint-input' + j" type="number" v-model.number="state.joint[j-1]" @input="setJoint(j-1)" @change="setJointOnline(j-1)">
          <!-- <el-slider v-model="state.joint[j-1]" :step="config.step" :max="config.joint.max[j-1]" :min="config.joint.min[j-1]" show-input :show-input-controls="false" @change="setJoint(j-1, $event)"></el-slider> -->
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Nipple from 'nipplejs';
import * as types from '../../store/mutation-types';

export default {
  name: 'EmulatorControl',
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
        acceleration: 500,
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
        height: 525 / 1030,
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
      self.setYaw();
    }

    function handleMouseUp(e) {
      e.preventDefault();
      // Put your mouseup stuff here
      isDown = false;
      self.resetYaw();
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
      const size = 120;
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
    setSpeed(evt) {
      console.log(evt.target.value);
      this.setRobotState('speed', Number(evt.target.value));
    },
    setAcceleration(evt) {
      this.setRobotState('acceleration', Number(evt.target.value));
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
        this.setJointCmd(index);
      }
    },
    setJointOnline(index) {
      if (this.state.online) {
        this.setJointCmd(index);
      }
    },
    setJointCmd(index) {
      this.$store.commit(types.MOVE_ONE_JOINT, {
        index,
        value: this.state.joint[index],
      });
    },
    setYaw() {
      this.intervalYaw = setInterval(() => {
        this.joystick.step.orientation.z = (this.radianAngle + (Math.PI / 2)) * 10;
        this.$store.commit(types.MOVE_END_ROLL, Number(this.joystick.step.orientation.z));
      }, 500);
    },
    resetYaw() {
      this.joystick.step.orientation.z = 0;
      this.radianAngle = Math.PI / -2;
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
        const end = this.$store.getters.end;
        Object.keys(end.position).forEach((key) => {
          this.state.position[key] = Number(end.position[key].toFixed(2));
        });
        Object.keys(end.orientation).forEach((key) => {
          this.state.orientation[key] = Number(end.orientation[key].toFixed(2));
        });
        return end;
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
};
</script>

<style scoped lang="scss">
input[type=range] {
  cursor: pointer;
}
input[type=range]:focus {
  outline: none;
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
      margin: 3.8% 0;
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
          cursor: default;
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
        padding-bottom: 40%;
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
    padding: 1% 4%;
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      padding: 0 3%;
      height: 80%;
    }
    input[type=range] {
      height: 8px;
      width: 100%;
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
    .config-value {
      padding: 2%;
      background: #565656;
      border-radius: 6px;
      font-family: Gotham-Book;
      font-size: 13px;
      color: #FFFFFF;
      letter-spacing: -0.75px;
      width: 6vw;
      text-align: center;
    }
  }
}
.dark-backgroud {
  background: #434343;
  border-radius: 8px;
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
  .degree-text {
    color: white;
    padding: 0 3vw;
    padding-top: 1vw;
    text-align: right;
    font-size: 14px;
  }
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
      padding: 0.2vw 0;
    }
  }
}
.data-display {
  background: blue;
  color: yellow;
}

</style>

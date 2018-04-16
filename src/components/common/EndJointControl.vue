<template>
  <div style="display: flex; justify-content: space-between">
    <div :style="{width: leftControlWidth + 'px'}" class="left-control">
      <div class="control-wrapper dark-backgroud">
        <div class="control-header">
          <div class="header-text" style="width: 38%">Attitude Control</div>
          <div class="header-text" style="width: 38%">Position Control</div>
          <div class="header-text" style="width: 24%">Speed Control</div>
        </div>
        <div class="control-body">
          <div class="control-right">
            <div class="yaw-wrapper">
              <!-- <el-button @click="setYaw(true)">Left</el-button>
              <el-button @click="setYaw(false)">Right</el-button> -->
              <!-- <input v-model="joystick.step.orientation.z" type="range" min="-5" max="5" value="0" id="yaw-control"
                @mousedown="setYaw" @touchstart="setYaw" @touchend="resetYaw" @mouseup="resetYaw"> -->
              <canvas id="angle-canvas" width="250" height="80"></canvas>
              <!-- <div class="data-display" v-text="joystick.step.orientation.z"></div> -->
            </div>
            <div id="orientation-joystick" class="joystick-wrapper"></div>
          </div>
          <div class="control-left">
            <div class="height-wrapper">
              <!-- <el-button @click="setPositionZ(true)">Up</el-button>
              <el-button @click="setPositionZ(false)">Down</el-button> -->
              <input v-model="joystick.step.position.z" type="range" min="-5" max="5" value="0" id="z-control"
                @mousedown="setPositionZ" @touchstart="setPositionZ" @touchend="resetPositionZ" @mouseup="resetPositionZ">
            </div>
            <div id="position-joystick" class="joystick-wrapper"></div>
          </div>
          <div class="config-wrapper">
            <div class="range-right">
              <span class="config-value" v-text="stateSpeed"></span>
              <input type="range" v-model="stateSpeed" @change="setSpeed" :step="1" :max="50" :min="1">
              <span class="config-title">Speed</span>
            </div>
            <div class="img-middle">
              <img class="img2" src="./../../assets/img/control/icon_speed2.svg" alt="">
              <img class="img1" src="./../../assets/img/control/icon_speed.svg" alt="">
            </div>
            <div class="range-left">
              <span class="config-value" v-text="stateAcceleration"></span>
              <input type="range" v-model="stateAcceleration" @change="setAcceleration" :step="1" :max="1000" :min="100">
              <span class="config-title">Acceleration</span>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="config-wrapper dark-backgroud">-->
        <!--<div>-->
          <!--<span class="config-title">Speed</span>-->
          <!--<img src="./../../assets/img/control/icon_speed.svg" alt="">-->
          <!--<input type="range" v-model="stateSpeed" @change="setSpeed" :step="1" :max="100" :min="5">-->
          <!--<img src="./../../assets/img/control/icon_speed2.svg" alt="">-->
          <!--<span class="config-value" v-text="stateSpeed"></span>-->
        <!--</div>-->
        <!--<div>-->
          <!--<span class="config-title">Acceleration</span>-->
          <!--<img src="./../../assets/img/control/icon_speed.svg" alt="">-->
          <!--<input type="range" v-model="stateAcceleration" @change="setAcceleration" :step="1" :max="1000" :min="100">-->
          <!--<img src="./../../assets/img/control/icon_speed2.svg" alt="">-->
          <!--<span class="config-value" v-text="stateAcceleration"></span>-->
        <!--</div>-->
      <!--</div>-->
    </div>

    <div class="dark-backgroud joint-control">
      <div class="header-text " id="testtest">Joints Control</div>
      <div class="degree-text">Degree</div>
      <div class="joint-range-wrapper">
        <div class="block joint-range" v-for="j in 7" :key="j">
          <span class="text j-text">J{{j}}</span>
          <div class="range-wrapper">
            <input :id="'joint' + j" v-model.number="joints[j-1]" type="range" :step="config.step"
            :max="config.jointMax" :min="config.jointMin"
            @input="setJointOffline(j-1)" @change="setJointOnline(j-1)" :disabled="rangeDisable">
            <p :id="'mask' + j" class="mask-bar"></p>
          </div>
          <span class="joints-number">
            <input :id="'joint-input' + j" type="number" v-model.number="joints[j-1]"
            @input="setJointOffline(j-1)" @change="setJointOnline(j-1)" :disabled="rangeDisable"
            :max="config.jointMax" :min="config.jointMin">
          </span>
          <!-- <el-slider v-model="state.joint[j-1]" :step="config.step" :max="config.joint.max[j-1]" :min="config.joint.min[j-1]" show-input :show-input-controls="false" @change="setJoint(j-1, $event)"></el-slider> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Nipple from 'nipplejs';
import * as types from '../../store/mutation-types';

export default {
  name: 'EmulatorAppControl',
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
        joints: [],
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
      jointRangeMoved: {
        state: false,
        index: null,
        value: null,
      },
      rangeMask: {
        dom: [],
        maskBar: [],
        inputWidth: [],
        rangeLength: [],
      },
      currentMoveIndex: null,
      leftControlWidth: '',
    };
  },
  mounted() {
    this.createJoyStick();
    // console.log(document.getElementById('joint1'));
    // console.log(document.getElementById('joint1').parentNode);
    for (let i = 1; i < 8; i += 1) {
      this.initRangeMask(`${i}`);
    }
    // angle canvas start, define values for angle canva;
    const self = this;
    const sCanvas = document.getElementById('angle-canvas');
    const sCtx = sCanvas.getContext('2d');
    let isDown = false;
    const cx = 130;
    const cy = 200;
    const sRadius = 180;
    const strokewidth = 20;
    // const thumbAngle = Math.PI / 100;
    const value_from = (Math.PI * 4) / 3;
    const value_to = (Math.PI * 5) / 3;
    let mouseX;
    let mouseY;
    const indicatorSize = 40;
    // default value
    // self.cData.r = self.radiansToDegrees(self.radianAngle); // default r value
    sCtx.lineCap = 'round';
    sCtx.font = '24px arial';
    sCtx.lineWidth = 3;

    const indicator = new Image();
    indicator.src = require('../../assets/img/control/btn_slide.svg');
    function drawAngle() { // draw uarm angle select
      // clear
      sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);

      sCtx.save();
      // circle
      sCtx.beginPath();
      sCtx.arc(cx, cy, sRadius, value_from, value_to);
//      sCtx.strokeStyle = '#5A93D7';
      sCtx.lineWidth = strokewidth;
      sCtx.stroke();
      // circle border
      sCtx.beginPath();
      sCtx.arc(cx, cy, sRadius, value_from, value_to);
      sCtx.strokeStyle = '#ffffff';
      sCtx.lineWidth = strokewidth - 2;
      sCtx.stroke();
      // indicator
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
      self.resetYaw();
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
    const onWindowResize = () => {
      this.joints.forEach((value, index) => {
        this.setRangeMask(index, value);
      });
    };
    onWindowResize()
    this.getLeftControlSize();
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('resize', this.getLeftControlSize, false);
  },
  methods: {
    createJoyStick() {
      // const NIPPLE_OPTION = {};
      const size = 160;
      const color = 'white';
      const mode = 'static';
      const restOpacity = 1;
      const positionManager = Nipple.create({
        size,
        zone: document.getElementById('position-joystick'),
        color,
        mode,
        position: {
          right: '50%',
//          left: '50%',
          top: '50%',
//          bottom: '50%',
        },
        restOpacity,
      });
      let positionInterval;
      positionManager.on('move', (evt, nipple) => {
        console.log('event type---', evt.type, Number(this.joystick.step.position.x), Number(this.joystick.step.position.y));
        this.setJoystickStep(nipple, 'position');
        // this.state.position.z = nipple.direction.angle;
      }).on('start', () => {
        const nextX = Number((this.joystick.step.position.x).toFixed(2));
        const nextY = Number((this.joystick.step.position.y).toFixed(2));
        console.log(nextX, nextY, 'dd');
        // if (nextX > 800 || nextX < -800) {
        //   this.$message('X value unreachable')
        // }
        // else if (nextY > 800 || nextY < -800) {
        //   this.$message('Y value unreachable')
        // }
        positionInterval = setInterval(() => {
          // console.log(typeof this.joystick.step.position.x, typeof this.state.position.x);
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
          right: '50%',
//          left: '50%',
          top: '50%',
//          bottom: '50%',
        },
        restOpacity,
      });
      let orientationInterval;
      orientationManager.on('move', (evt, nipple) => {
        console.log('event type', evt.type);
        this.setJoystickStep(nipple, 'orientation');
      }).on('start', () => {
        const nextX = Number((this.joystick.step.orientation.x).toFixed(2));
        const nextY = Number((this.joystick.step.orientation.y).toFixed(2));
        console.log(nextX, nextY, 'ss');
        // if (nextX > 180 || nextX < -180) {
        //   this.$message('roll value unreachable')
        // }
        // else if (nextY > 180 || nextY < -180) {
        //   this.$message('pitch value unreachable')
        // }
        orientationInterval = setInterval(() => {
          console.log(typeof this.joystick.step.orientation.x, typeof this.joystick.step.orientation.y);
          // const nextX = this.joystick.step.orientation.x + this.state.orientation.yaw;
          // const nextY = this.joystick.step.orientation.y + this.state.orientation.pitch;
          this.$store.commit(types.MOVE_YAW_PITCH, [nextX, nextY]);
          // this.state.orientation.yaw = Number(nextX.toFixed(2));
          // this.state.orientation.pitch = Number(nextY.toFixed(2));
        }, 500);
      }).on('end', () => {
        clearInterval(orientationInterval);
      });
    },
    setJoystickStep(nipple, type) {
      const zoom = type === 'position' ? 7 : 2;
      if (nipple.direction) {
        const speed = nipple.force * zoom; // max 20
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
    setJointOffline(index) {
      // on input event
      // console.log('test', index, value);
      if (this.joints[index] > this.config.jointMax) {
        this.$set(this.joints, index, this.config.jointMax)
      }
      if (this.joints[index] < this.config.jointMin) {
        this.$set(this.joints, index, this.config.jointMin)
      }
      this.setRangeMask(index, this.joints[index])
      if (!this.stateOnline) {
        console.log('offline')
        this.setJointCmd(index);
      }
      // if (this.stateError < 0) {
      //   this.$set(this.joints, index, this.$store.getters.joints[index])
      //   this.$message('unable to move.')
      //   console.log('unun2', this.$store.getters.joints[index])
      // }
    },
    setJointOnline(index) {
      // on change event
      if (this.stateOnline) {
        this.currentMoveIndex = index
        let data = this.joints[index];
        console.log('online')
        console.log(this.joints[index]);
        if (!this.checkNumber(data)) {
          console.log('not nnnnn')
          const beforeValue = this.$store.getters.joints[index]
          this.$set(this.joints, index, beforeValue);
          data = beforeValue;
          this.jointRangeMoved.state = false
        }
        else {
          this.jointRangeMoved = {
            state: true,
            index,
            value: data,
          };
          // window.setTimeout(() => {
          //   this.jointRangeMoved.state = false;
          // }, 5000);
          this.setJointCmd();
        }
      }
    },
    setJointCmd() {
      // this.$store.commit(types.MOVE_ONE_JOINT, {
      //   index,
      //   value: this.joints[index],
      // });
      this.$store.commit(types.ROBOT_MOVE_JOINT, this.joints);
    },
    setYaw() {
      console.log('set yaw interval')
      let i = 0
      this.intervalYaw = setInterval(() => {
        this.joystick.step.orientation.z = (this.radianAngle + (Math.PI / 2)) * 10;
        this.$store.commit(types.MOVE_END_ROLL, Number(this.joystick.step.orientation.z));
        console.log('set yaw interval', i += 1)
      }, 500);
    },
    resetYaw() {
      this.joystick.step.orientation.z = 0;
      this.radianAngle = Math.PI / -2;
      clearInterval(this.intervalYaw);
      console.log('cleared')
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
    initRangeMask(index) {
      // TODO: use $refs instead of getElementById
      const dom = document.getElementById(`joint${index}`);
      this.rangeMask.dom[index - 1] = dom;
      this.rangeMask.maskBar[index - 1] = document.getElementById(`mask${index}`);
      this.rangeMask.rangeLength[index - 1] = Number(dom.max) - Number(dom.min);
      this.rangeMask.maskBar[index - 1].style.left = `${((-Number(dom.min) * 100) / this.rangeMask.rangeLength[index - 1])}%`;
    },
    setRangeMask(index, value) {
      // const dom = document.getElementById(`joint${index}`);
      // const maskBar = document.getElementById(`mask${index}`);
      if (this.rangeMask.maskBar.length === 0) {
        console.log('dom not get');
        return;
      }
      const inputWidth = Number(this.rangeMask.dom[index].clientWidth);
      const rangeLength = this.rangeMask.rangeLength[index];
      const getWidth = inputWidth * (Math.abs(Number(value)) / rangeLength);
      if (value > 0) {
        this.rangeMask.maskBar[index].style.transform = 'none';
      }
      else {
        this.rangeMask.maskBar[index].style.transform = 'rotate(180deg)';
      }
      this.rangeMask.maskBar[index].style.width = `${getWidth}px`;
    },
    checkNumber(num) {
      if (!/^[-]?[0-9]*\.?[0-9]+(eE?[0-9]+)?$/.test(num)) {
        return false
      }
      return true
    },
    // setMask(e) {
    //   const dom = e.target;
    //   const maskBar = dom.nextElementSibling;

    //   const inputWidth = Number(dom.clientWidth);
    //   const rangeLength = Number(dom.max) - Number(dom.min);
    //   const getWidth = inputWidth * (Math.abs(Number(dom.value)) / rangeLength);

    //   if (dom.value > 0) {
    //     maskBar.style.transform = 'none';
    //   }
    //   else {
    //     maskBar.style.transform = 'rotate(180deg)';
    //   }
    //   maskBar.style.width = `${getWidth}px`;
    // },
    // setMaskInput(e) {
    //   const dom = e.target.previousElementSibling.childNodes[0];
    //   const maskBar = dom.nextElementSibling;

    //   const inputWidth = Number(dom.clientWidth);
    //   const rangeLength = Number(dom.max) - Number(dom.min);
    //   const getWidth = inputWidth * (Math.abs(Number(dom.value)) / rangeLength);

    //   if (dom.value > 0) {
    //     maskBar.style.transform = 'none';
    //   }
    //   else {
    //     maskBar.style.transform = 'rotate(180deg)';
    //   }
    //   maskBar.style.width = `${getWidth}px`;
    // },
    // rangeColor(index) {
    //   // TODO: use $refs instead of getElementById
    //   const dom = document.getElementById(`joint${index}`);
    //   const domInput = document.getElementById(`joint-input${index}`);
    //   const maskBar = document.getElementById(`mask${index}`);
    //   const rangeLength = Number(dom.max) - Number(dom.min);
    //   maskBar.style.left = `${((-Number(dom.min) * 100) / rangeLength)}%`;
    //   dom.addEventListener('input', this.setMask);
    //   domInput.addEventListener('input', this.setMaskInput);
    //   domInput.addEventListener('keyup', this.setMaskInput);
    // },
    // removeRangeColor(index) {
    //   const dom = document.getElementById(`joint${index}`);
    //   const domInput = document.getElementById(`joint-input${index}`);
    //   if (dom || domInput) {
    //     dom.removeEventListener('input', this.setMask);
    //     domInput.removeEventListener('input', this.setMaskInput);
    //     domInput.removeEventListener('keyup', this.setMaskInput);
    //   }
    // },
    getLeftControlSize() {
      const docWidth = document.body.clientWidth;
      this.leftControlWidth = docWidth - 327;
    },
  },
  beforeDestroy() {
    // for (let i = 1; i < 8; i += 1) {
    //   this.removeRangeColor(i);
    // }
  },
  watch: {
    stateError(newValue) {
      this.jointRangeMoved.state = false;
      if (newValue === -6) {
        this.$message('unable to move.');
      }
      else if (newValue < 0) {
        this.$alert('Response Error', 'Fail to move', {
          confirmButtonText: 'OK',
          callback: (action) => {
            this.$message({
              type: 'info',
              message: `TODO: ${action}`,
            });
          },
        });
      }
      // else {
      //   this.$message('Connected.');
      // }
    },
    // 'state.joint': (newValue) => {
    //   console.log('watch posi print:');
    //   console.table(newValue);
    // },
    // robotJointsAngle() {
    //   this.$set(this.robotJointsAngle, 0, this.robotJointsAngle[0]);
    // },
    joints(newValue) {
      newValue.forEach((value, index) => {
        this.setRangeMask(index, value);
      });
    },
    stateErrorCount() {
      if (this.stateError === -6) {
        this.$set(this.joints, this.currentMoveIndex, this.$store.getters.joints[this.currentMoveIndex])
        // this.$message('unable to move.')
        console.log('unun2', this.$store.getters.joints[this.currentMoveIndex])
      }
    },
  },
  computed: {
    stateSpeed: {
      get() {
        return this.$store.state.robot.info.speed
      },
      set() {
      },
    },
    stateAcceleration: {
      get() {
        return this.$store.state.robot.info.acceleration
      },
      set() {
      },
    },
    stateErrorCount() {
      return this.$store.state.robot.status.errorCount
    },
    stateError() {
      return this.$store.state.robot.status.error;
    },
    rangeDisable() {
      return this.jointRangeMoved.state && this.stateOnline && !this.stateError;
    },
    stateOnline() {
      return this.$store.state.robot.info.online;
    },
    joints: {
      get() {
        const arr = this.$store.getters.joints;
        // console.log('get ax', arr, this.state.joints);
        const values = arr.map(str => Number(str));
        if (this.jointRangeMoved.state && this.stateOnline) {
          if (arr[this.jointRangeMoved.index] === this.jointRangeMoved.value) {
            this.jointRangeMoved.state = false;
            console.log('get final joint angle');
          }
          else {
            values[this.jointRangeMoved.index] = Number(this.jointRangeMoved.value);
          }
          return values.slice();
        }
        else if (arr && (arr.length > 0)) {
          // console.log('arr posi print:', values.length);
          // console.table(values);
          // this.test = values[1];
          return values.slice();
        }
        return [0, 0, 0, 0, 0, 0, 0];
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
.left-control {
  padding-right: 3px;
  width: 100%;
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
.block {
  /*padding: 0.2vw 1vw;*/
}
span.text {
  display: block;
  float: left;
  text-align: center;
}
.control-wrapper {
  display: flex;
  position: relative;
  justify-content: space-around;
  flex-direction: column;
  .control-header {
    display: flex;
    justify-content: space-around;
    background: #4d4d4d;
    .header-text {
      text-align: center;
    }
  }
  .control-body {
    position: relative;
    display: flex;
    justify-content: space-around;
    & > div {
      .joystick-wrapper {
        margin: 0;
        width: 169px;
        height: 169px;
        background: url("../../assets/img/control/outside_circle.svg") no-repeat center;
      }
    }
    .control-left {
      width: 38%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .joystick-wrapper {
        /*margin-left: 40px;*/
        position: absolute;
      }
      .height-wrapper {
        /*display: flex;*/
        /*flex-direction: column;*/
        /*align-items: center;*/
        margin-right: 238px;
        #z-control {
          // appearance: slider-vertical; // abandoned, can not set width with css
          width: 171px;
          height: 23px;
          background: #fff;
          opacity: 1;
          transform: rotate(-90deg);
          border-radius: 100px;
          cursor: default;
        }
        #z-control::-webkit-slider-thumb {
          width: 34px;
          height: 34px;
          background-image: url('./../../assets/img/control/btn_slide02.svg');
          background-repeat: no-repeat;
          background-position: center center;
          -webkit-appearance: none;
          border: none;
          border-radius: 50%;
          transform: rotate(-90deg);
          box-shadow: 0 0 2px 0 rgba(45,73,67,0.17);
        }
      }
      // .el-slider {
      //   padding-bottom: 0;
      //   margin-left: 15%;
      // }

    }
    .control-right {
      width: 38%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      align-items: center;
      .joystick-wrapper {
        position: absolute;
        bottom: 14px;
      }
      // .el-slider {
      //   padding: 0 10%;
      //   position: absolute;
      //   width: 80%;
      //   top: 0;
      //   left: 10%;
      // }
      .yaw-wrapper {
        padding-bottom: 142px;
        padding-right: 11px;
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
  justify-content: center;
  width: 24%;
  position: relative;
  background: #484848;
  .range-right {
    /*right: 130px;*/
  }
  .img-middle {
    padding: 40px 0;
  }
  .range-left {
    /*left: 130px;*/
  }
  & > div {
    /*width: 50%;*/
    /*padding: 2% 4%;*/
    height: 100%;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    /*position: absolute;*/
    width: 34px;
    .img1 {
      width: 8px;
    }
    .img2 {
      width: 18px
    }
    input[type=range] {
      border-radius: 100px;
      background-image: linear-gradient(90deg, #8FFF94 0%, #FF6868 100%);
      transform: rotate(-90deg);
      -webkit-appearance: none;
      height: 36px;
      width: 168px;
    }
    input[type=range]::-webkit-slider-thumb {
      width: 50px;
      height: 32px;
      -webkit-appearance: none;
      border: none;
      border-radius: 100px;
      background: #FEFEFE;
      box-shadow: 0 0 8px 0 rgba(214,214,214,0.50);
    }
    span {
      font-family: 'Gotham-Book';
      font-size: 9px;
      color: #FFF;
      text-align: center;
    }
    .config-value {
      padding-top: 10px;
    }
    .config-title {
      padding-bottom: 10px;
    }
  }
}
.dark-backgroud {
  background: #434343;
  /*height: 36vh;*/
}
.header-text {
  font-size: 1rem;
  color: white;
  letter-spacing: -1px;
  height: 39px;
  line-height: 39px;
}
.joint-control {
  width: 326px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  .header-text {
    padding-left: 12px;
  }
  .degree-text {
    color: white;
    text-align: right;
    font-size: 10px;
    position: absolute;
    top: 14px;
    right: 14px;
    font-family: 'Gotham-Medium';
  }
  .joint-range-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 233px;
  }
  .joint-range:last-child {
    padding-bottom: 18px;
  }
  .joint-range {
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    /*padding: 6px 0;*/
    span {
      font-size: 10px;
      font-family: "Gotham-Book";
    }
    .j-text {
      padding:0 12px;
    }
    .range-wrapper {
      position: relative;
      width: 218px;
      background: #353535;
      height: 4px;
      border-radius: 10px;
      input[type=range] {
        height: 4px;
        background: transparent;
        width: 100%;
        vertical-align: middle;
        z-index: 5;
        padding: 0;
        margin: 0;
        position: absolute;
      }
      input[type=range]::-webkit-slider-thumb {
        width: 15px;
        height: 15px;
        -webkit-appearance: none;
        border: none;
        border-radius: 50%;
        background: #fff;
      }
      .mask-bar {
        position: absolute;
        background-color: #E27347;
        height: 4px;
        line-height: 4px;
        /*z-index: 200;*/
        border-radius: 100px;
        padding: 0;
        margin: 0;
        pointer-events: none;
        transform-origin: left;
      }
    }
    .joints-number {
      /*width: 5vw;*/
      input[type=number] {
        border: none;
        background: #434343;
        text-align: center;
        color: #fff;
        letter-spacing: -0.5px;
        font-size: 12px;
        outline:none;
        padding-right: 1px;
        width: 56px;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button{
        -webkit-appearance: textfield;
      }
    }
  }
}
.data-display {
  background: blue;
  color: yellow;
}

</style>

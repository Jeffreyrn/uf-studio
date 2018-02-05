<template>
  <el-container class="hello emulator-container">
    <el-header height="50px">
      <el-row :gutter="20" class="header-wrapper">
        <el-col :span="20">
          <router-link :to="{ name: 'Home'}">
            <img src="./../assets/img/control/icon_back.svg" alt="back home">
          </router-link>
          <span class="title-ide">Control</span>
        </el-col>
        <el-col :span="4">
          <toggle-button v-model="state.online" color="#82C7EB" :sync="true" 
            :labels="{checked: 'online', unchecked: 'offline'}" @change="setOnline"
            :width="71" :height="36"/>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main-wrapper">
      <el-row :gutter="20">
        <el-col :span="20" class="model-container">
          <keep-alive><xarm-model :control="state.joint" :size="emulatorSize"></xarm-model></keep-alive>
        </el-col>
        <el-col :span="4">
          <ul class="position-set">
            <li><span>X</span><el-input placeholder="Please input" v-model="state.position.x"></el-input></li>
            <li><span>Y</span><el-input placeholder="Please input" v-model="state.position.y"></el-input></li>
            <li><span>Z</span><el-input placeholder="Please input" v-model="state.position.z"></el-input></li>
            <li><span>Roll</span><el-input placeholder="Please input" v-model="state.orientation.roll"></el-input></li>
            <li><span>Yaw</span><el-input placeholder="Please input" v-model="state.orientation.yaw"></el-input></li>
            <li><span>Pitch</span><el-input placeholder="Please input" v-model="state.orientation.pitch"></el-input></li>
          </ul>
          <div>
            <el-button type="primary" round size="small">Apply</el-button>
            <el-button round size="small">Cancel</el-button>
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
              <el-slider v-model="state.position.z" vertical height="200px" @change="setPositionZ"></el-slider>
              <div id="position-joystick" class="joystick-wrapper"></div>
            </div>
            <div class="control-right">
              <el-slider v-model="state.orientation.roll"></el-slider>
              <div id="orientation-joystick" class="joystick-wrapper"></div>
            </div>
          </div>
        </div>
        <div class="config-wrapper dark-backgroud">
          <div>
            <span>Speed</span><el-slider v-model="state.speed" :step="config.step" :max="config.jointMax" :min="config.jointMin"></el-slider>
          </div>
          
          <div>
            <span>Acceleration</span><el-slider v-model="state.acceleration" :step="config.step" :max="config.jointMax" :min="config.jointMin"></el-slider>
          </div>
          
        </div>
      </el-col>
      <el-col :span="8">
        <div class="dark-backgroud">
          <div class="header-text">Joints Control</div>
          <div class="block" v-for="j in 7" :key="j">
            <span class="text">J{{j-1}}:{{state.joint[j-1]}}</span>
            <el-slider v-model="state.joint[j-1]" :step="config.step" :max="config.joint.max[j-1]" :min="config.joint.min[j-1]" show-input :show-input-controls="false" @change="setJoint(j-1, $event)"></el-slider>
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
          },
          orientation: {
            x: 0,
            y: 0,
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
    };
  },
  mounted() {
    this.createJoyStick();
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
          const nextX = this.joystick.step.position.x + this.state.position.x;
          const nextY = this.joystick.step.position.y + this.state.position.y;
          this.$store.commit(types.MOVE_END_XY, [Number(nextX.toFixed(2)), Number(nextY.toFixed(2))]);
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
          console.log(typeof this.joystick.step.orientation.x, typeof this.state.orientation.yaw);
          const nextX = this.joystick.step.orientation.x + this.state.orientation.yaw;
          const nextY = this.joystick.step.orientation.y + this.state.orientation.pitch;
          this.$store.commit(types.MOVE_END_XY, [Number(nextX.toFixed(2)), Number(nextY.toFixed(2))]);
          // this.state.orientation.yaw = Number(nextX.toFixed(2));
          // this.state.orientation.pitch = Number(nextY.toFixed(2));
        }, 500);
      }).on('end', () => {
        clearInterval(orientationInterval);
      });
    },
    setJoystickStep(nipple, type) {
      const speed = nipple.force * 30;
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
    setJoint(index, value) {
      // console.log('test', index, value);
      this.$store.commit(types.MOVE_ONE_JOINT, {
        index,
        value,
      });
    },
    setPositionZ(value) {
      this.$store.commit(types.MOVE_END_Z, value);
    },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  display: flex;
  flex-direction: column;
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
    .model-container{
      border-radius: 0px;
    }
    ul.position-set li{
      & > span {
        width: 20%;
      }
      & > div {
        width: 75%;
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
      .el-slider {
        padding-bottom: 0;
        margin-left: 15%;
      }

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
      .el-slider {
        padding: 0 10%;
        position: absolute;
        width: 80%;
        top: 0;
        left: 10%;
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
    & > div {
      width: 100%;
      padding-left: 7%;
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
.header-text {
  font-size: 1.6rem;
  color: white;
  width: 50%;
  padding: 1% 2% 0;
  letter-spacing: -1px;
}
</style>

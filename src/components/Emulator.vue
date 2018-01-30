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
          <el-button @click="movediv">error</el-button>
          <div class="block">{{ msg }}-debugTest</div>
          step<input v-model="config.step"/>
          <ul>
            <li>{{state.position.x}}</li>
            <li>{{state.position.y}}</li>
            <li>{{state.position.z}}</li>
          </ul>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="control-wrapper dark-backgroud">
          <el-slider v-model="state.position.z" vertical height="200px"></el-slider>
          <div id="position-joystick" class="joystick-wrapper"></div>
          <div id="orientation-joystick" class="joystick-wrapper"></div>
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
          <div class="block" v-for="j in 7" :key="j">
            <span class="text">J{{j-1}}:{{state.joint[j-1]}}</span>
            <el-slider v-model="state.joint[j-1]" :step="config.step" :max="config.jointMax" :min="config.jointMin" show-input :show-input-controls="false"></el-slider>
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
          force: 0,
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
      const size = 150;
      const color = 'white';
      const mode = 'static';
      const restOpacity = 1;
      const step = 1;
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
      positionManager.on('move', (evt, nipple) => {
        console.log('event type', evt, nipple);
        this.state.position.force = nipple.force;
        if (nipple.direction.x === 'right') {
          this.state.position.x += step;
        }
        else if (nipple.direction.x === 'left') {
          this.state.position.x -= step;
        }
        if (nipple.direction.y === 'up') {
          this.state.position.y += step;
        }
        else if (nipple.direction.y === 'down') {
          this.state.position.y -= step;
        }
        this.state.position.z = nipple.direction.angle;
      });
      const orientationManager = Nipple.create({
        size,
        zone: document.getElementById('orientation-joystick'),
        color,
        mode: 'static',
        position: {
          right: '25%',
        },
        restOpacity,
      });
      orientationManager.on('move', (evt, nipple) => {
        console.log('event type', evt, nipple);
        this.state.position.force = nipple.force;
        this.state.orientation.roll = nipple.direction.x;
        this.state.orientation.yaw = nipple.direction.y;
        this.state.orientation.pitch = nipple.direction.angle;
      });
    },
    movediv() {
      document.getElementById('b').innerHTML = document.getElementById('a').innerHTML;
      document.getElementById('a').innerHTML = '';
    },
    setSpeed(value) {
      this.setRobotState('speed', value);
    },
    setAcceleration(value) {
      this.setRobotState('acceleration', value);
    },
    setOnline(value) {
      this.setRobotState('online', value);
    },
    setRobotState(index, value) {
      const data = {
        index,
        value,
      };
      this.$store.commit(types.SET_ROBOT_STATE, data);
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
  .joystick-wrapper {
    padding: 15% 14%;
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
  font-family: Gotham-Bold;
  font-size: 36px;
  color: #444;
  letter-spacing: -1px;
  padding-left: 2%;
}
</style>

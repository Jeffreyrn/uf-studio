<template>
  <el-container class="hello emulator-container">
    <el-header height="50px">
      <el-row :gutter="20" class="header-wrapper">
        <el-col :span="18">
          <router-link :to="{ name: 'Home'}">
            <img src="./../assets/img/control/icon_back.svg" alt="back home">
          </router-link>
          <span class="title-ide">Dev Control</span>
        </el-col>
        <el-col :span="6">
          <div class="title-online">Live Control</div>
          <toggle-button v-model="state.online" :color="{checked: '#52BF53', unchecked: '#D3D5DB'}" :sync="true" 
            :labels="{checked: 'ON', unchecked: 'OFF'}" @change="setOnline"
            :width="71" :height="36"/>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main-wrapper">
      <el-row :gutter="20" class="main-view">
        <el-col :span="18" class="model-container">
          <xarm-model></xarm-model>
        </el-col>
        <el-col :span="6" class="end-col">
          <!-- <end-set></end-set> -->
          <emulator-control></emulator-control>
        </el-col>
      </el-row>
    </el-main>
    <!-- <el-footer>
      <end-joint-control></end-joint-control>
    </el-footer> -->
  </el-container>
</template>

<script>
import Vue from 'vue';
import ToggleButton from 'vue-js-toggle-button';
import XarmModel from './common/XarmModel';
import EndSet from './common/EndSet';
import EndJointControl from './common/EndJointControl';
import EmulatorControl from './common/EmulatorControl';
import * as types from '../store/mutation-types';

Vue.use(ToggleButton);
export default {
  name: 'Emulator',
  data() {
    return {
      test: null,
      testtest: [],
      state: {
        speed: 500,
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
    };
  },
  methods: {
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
    EndSet,
    EndJointControl,
    EmulatorControl,
  },
};
</script>

<style scoped lang="scss">
.hello {
  font-family:'Gotham-Medium';
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
    .main-view {
      display: flex;
      align-items: flex-start;
      overflow: hidden;
      .model-container{
        border-radius: 0px;
      }
    }
  }
}
.block {
  padding: 0.2vw 1vw;
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

</style>

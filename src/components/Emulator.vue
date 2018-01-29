<template>
  <el-container class="hello">
    <el-header>
      <el-row :gutter="20">
        <el-col :span="20">
          <router-link :to="{ name: 'Home'}">
            <el-button >Home</el-button>
          </router-link>
        </el-col>
        <el-col :span="4">
          <el-radio-group v-model="state.online" @change="setOnline">
            <el-radio-button :label="true">online</el-radio-button>
            <el-radio-button :label="false">offline</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
    <el-row :gutter="20">
      <el-col :span="20">
        <keep-alive><xarm-model :control="state.joint"></xarm-model></keep-alive>
      </el-col>
      <el-col :span="4">
        <el-button @click="movediv">error</el-button>
        <div class="block">{{ msg }}-debugTest</div>
        step<input v-model="config.step"/>
      </el-col>
    </el-row>
    </el-main>
    <el-footer>
    <el-row :gutter="20">
      <el-col :span="16">

      </el-col>
      <el-col :span="8">
        <div class="block" v-for="j in 7" :key="j">
          <span class="text">J{{j-1}}:{{state.joint[j-1]}}</span>
          <el-slider v-model="state.joint[j-1]" :step="config.step" :max="config.jointMax" :min="config.jointMin" show-input></el-slider>
        </div>
      </el-col>
    </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import * as types from '../store/mutation-types';
import XarmModel from './common/XarmModel';

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
      msg: 'Emulator',
    };
  },
  mounted() {
  },
  methods: {
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
<style scoped>
.hello {
  display: flex;
  flex-direction: column;
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
</style>

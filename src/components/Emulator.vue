<template>
  <el-container class="hello emulator-container">
    <header height="50px">
      <el-row :gutter="20" class="header-wrapper">
        <el-col>
          <router-link :to="{ name: backStr}">
            <img src="./../assets/img/control/icon_back.svg" alt="back home">
          </router-link>
          <span class="title-ide">Control</span>
        </el-col>
        <el-col :span="10" class="control-toggle">
          <div class="title-online">Live Control</div>
          <toggle-button v-model="stateOnline" :color="{checked: '#52BF53', unchecked: '#D3D5DB'}" :sync="true"
            :labels="{checked: 'ON', unchecked: 'OFF'}"
            :width="50" :height="20"/>
        </el-col>
      </el-row>
    </header>
    <div class="main-wrapper">
      <div class="main-view">
        <div class="model-container" :style="{width: modelCotainerWidth + 'px', height: modelCotainerHeight + 'px'}">
          <!-- <xarm-model></xarm-model> -->
          <slot name="xarm"></slot>
        </div>
        <div class="end-col">
          <end-set></end-set>
        </div>
      </div>
    </div>
    <footer>
      <end-joint-control></end-joint-control>
    </footer>
  </el-container>
</template>

<script>
import Vue from 'vue';
import ToggleButton from 'vue-js-toggle-button';
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
      backStr: 'Home',
      testtest: 0,
      toggled: false,
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
      modelCotainerWidth: '',
      modelCotainerHeight: '',
    };
  },
  mounted() {
    this.getModelCotainerSize();
    window.addEventListener('resize', this.getModelCotainerSize);//
  },
  activated: function() {
    this.backStr = 'Home';
    if (this.$route.params.data !== undefined) {
      this.backStr = 'AppStore';
    }
    this.getModelCotainerSize();
  },
  methods: {
    setRobotState(index, value) {
      const data = {
        index,
        value,
      };
      this.$store.commit(types.SET_ROBOT_STATE, data);
    },
    getModelCotainerSize() {
      const docWidth = document.body.clientWidth;
      const docHieght = document.body.clientHeight;
      this.modelCotainerWidth = docWidth - 276;
      this.modelCotainerHeight = docHieght - 327;
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
    stateOnline: {
      get() {
        return this.$store.state.robot.info.online
      },
      set(value) {
        this.setRobotState('online', value);
        if (value) {
          this.$store.commit(types.GET_ROBOT_STATUS, value);
        }
        // console.log(`control xarm connected: ${this.$store.state.robot.status.connected}`);
        if (!this.$store.state.robot.status.connected) {
          setTimeout(() => {
            console.log('can not connect xArm');
            this.setRobotState('online', false);
            if (value) {
              this.$store.commit(types.GET_ROBOT_STATUS, value);
            }
          }, 500);
        }
        // this.$store.commit('test', value);
      },
    },
  },
  components: {
    EndSet,
    EndJointControl,
    EmulatorControl,
  },
};
</script>

<style scoped lang="scss">
header {
  height: 60px;
  flex: 0 0 auto;
  padding-left: 2vw;
}
footer{
  flex: 0 0 auto;
  height: 263px;
}
.hello {
  font-family:'Gotham-Medium';
  display: flex;
  flex-direction: column;
}
.emulator-container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #F8F8F8;
  .header-wrapper{
    display: flex;
    align-items: center;
    height: 100%;
    & > div {
      display: flex;
      align-items: center;
    }
    .control-toggle {
      display: flex;
      justify-content: flex-end;
      margin-right: 2vw;
    }
  }
  .main-wrapper{
    flex: 1 0 auto;
    position: relative;
    .main-view {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      overflow: hidden;
      height: 100%;
      position: absolute;
      width: 100%;
      padding-bottom: 4px;
      .end-col {
        /*width: 20vw;*/
        width: 276px;
        height: 100%;
        background: #434343;
      }
      .model-container{
        padding-right: 1vw;
        border-radius: 0px;
        /*width: 78vw;*/
        height: 100%;
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
  margin-right: 1vw;
  font-size: 1.2rem;
  font-family: Gotham-Medium;
  color: #434343;
  letter-spacing: -0.5px;
}

</style>

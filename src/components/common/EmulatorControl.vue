<template>
  <div class="control-container">
    <div class="container-title">Control Panel</div>
    <div class="control-block">
      <div class="block-title">Joints Control</div>
      <div class="control-wrapper">
        <div class="block joint-range" v-for="j in 7" :key="j">
          <span class="text">J{{j}}</span>
          <div class="range-wrapper">
            <input :id="'joint' + j" v-model.number="joints[j-1]" type="range" :step="config.step" :max="config.joint.max[j-1]" :min="config.joint.min[j-1]" 
            @input="setJointOffline(j-1)" @change="setJointOnline(j-1)">
            <p :id="'mask' + j" class="mask-bar"></p>
          </div>
          <input :id="'joint-input' + j" type="number" v-model.number="joints[j-1]" @input="setJointOffline(j-1)" @change="setJointOnline(j-1)"><sup>°</sup>
        </div>
      </div>
    </div>
    <div class="control-block">
      <div class="block-title">Position and Attitude Control</div>
      <div class="control-wrapper">
        <div class="block end-range" v-for="(value, index) in position" :key="index">
          <span class="text">{{index}}</span>
          <div class="range-wrapper">
            <input :id="'end' + index" v-model.number="position[index]" type="range" :step="config.step" :max="config.position.max" :min="config.position.min" 
            @input="setEndOffline()" @change="setEndOnline(index, 'position')">
            <p :id="'mask' + index" class="mask-bar"></p>
          </div>
          <input :id="'end-input' + index" type="number" v-model.number="position[index]" @input="setEndOffline()" @change="setEndOnline(index, 'position')"><em class="mm-unit">mm</em>
        </div>
        <div class="block end-range" v-for="(value, index) in orientation" :key="index">
          <span class="text">{{index}}</span>
          <div class="range-wrapper">
            <input :id="'end' + index" v-model.number="orientation[index]" type="range" :step="config.step" :max="config.orientation.max" :min="config.orientation.min" 
            @input="setEndOffline()" @change="setEndOnline(index, 'orientation')">
            <p :id="'mask' + index" class="mask-bar"></p>
          </div>
          <input :id="'end-input' + index" type="number" v-model.number="orientation[index]" @input="setEndOffline()" @change="setEndOnline(index, 'orientation')"><sup>°</sup>
        </div>
      </div>
    </div>
    <div class="control-block">
      <div class="control-wrapper">
        <div class="block end-range config-wrapper">
          <span class="config-title">Speed</span>
          <img src="./../../assets/img/control/icon_speed3.svg" alt="">
          <input type="range" v-model="state.speed" @change="setSpeed" :step="1" :max="100" :min="5">
          <img src="./../../assets/img/control/icon_speed2.svg" alt="">
          <span class="config-value" v-text="state.speed"></span>
        </div>
        <div class="block end-range config-wrapper">
          <span class="config-title">Acceleration</span>
          <img src="./../../assets/img/control/icon_speed3.svg" alt="">
          <input type="range" v-model="state.acceleration" @change="setAcceleration" :step="1" :max="1000" :min="100">
          <img src="./../../assets/img/control/icon_speed2.svg" alt="">
          <span class="config-value" v-text="state.acceleration"></span>
        </div>
      </div>
    </div>
    <!-- <ul class="position-set">
      <li><div>X</div><input v-model.number="position.x" type="number"><span>mm</span></li>
      <li><div>Y</div><input v-model.number="position.y" type="number"><span>mm</span></li>
      <li><div>Z</div><input v-model.number="position.z" type="number"><span>mm</span></li>
      <li><div>Roll</div><input v-model.number="orientation.roll" type="number"><span>&deg;</span></li>
      <li><div>Yaw</div><input v-model.number="orientation.yaw" type="number"><span>&deg;</span></li>
      <li><div>Pitch</div><input v-model.number="orientation.pitch" type="number"><span>&deg;</span></li>
    </ul>
    <div class="set-button">
      <button class="confirm" @click="setEnd">Apply</button>
      <button class="cancel" @click="resetEnd">Reset</button>
    </div> -->
  </div>
</template>
<script>
import * as types from '../../store/mutation-types';

export default {
  name: 'EmulatorControl',
  data() {
    return {
      testindex: 6,
      radianAngle: -(Math.PI / 2),
      test: null,
      testtest: [],
      state: {
        speed: 50,
        acceleration: 500,
      },
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
        position: {
          max: 1000,
          min: -1000,
        },
        orientation: {
          max: 180,
          min: -180,
        },
      },
      jointRangeMoved: {
        state: false,
        index: null,
        value: null,
      },
      endRangeMoved: {
        state: false,
        index: null,
        value: null,
      },
    };
  },
  methods: {
    setJointOffline(index) {
      // console.log('test', index, value);
      if (!this.stateOnline) {
        this.setJointCmd(index);
      }
    },
    setJointOnline(index) {
      if (this.stateOnline) {
        this.jointRangeMoved = {
          state: true,
          index,
          value: this.joints[index],
        };
        this.setJointCmd(index);
      }
    },
    setJointCmd(index) {
      this.$store.commit(types.MOVE_ONE_JOINT, {
        index,
        value: this.joints[index],
      });
    },
    setEndOffline() {
      // console.log('test', index, value);
      if (!this.stateOnline) {
        this.setEndCmd();
      }
    },
    setEndOnline(index, category) {
      if (this.stateOnline) {
        this.endRangeMoved = {
          category,
          state: true,
          index,
          value: this[category][index],
        };
        console.log('end end', this.endRangeMoved);
        this.setEndCmd();
      }
    },
    setEndCmd() {
      this.$store.commit(types.MOVE_END, {
        position: this.position,
        orientation: this.orientation,
      });
    },
    setSpeed(evt) {
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
  },
  computed: {
    position: {
      get() {
        const position = this.$store.getters.end.position;
        Object.keys(position).forEach((key) => {
          position[key] = position[key] ? Number(position[key].toFixed(2)) : 0;
        });
        if (this.endRangeMoved.state && this.stateOnline && this.endRangeMoved.category === 'position') {
          if (position[this.endRangeMoved.index] === this.endRangeMoved.value) {
            this.endRangeMoved.state = false;
          }
          else {
            position[this.endRangeMoved.index] = this.endRangeMoved.value;
          }
        }
        const data = {};
        Object.assign(data, position);
        return data;
      },
      set(value) {
        console.log('SET');
        console.table(value);
        // this.$store.commit(types.ROBOT_MOVE_JOINT, value.map(str => Number(str)));
      },
    },
    orientation: {
      get() {
        const orientation = this.$store.getters.end.orientation;
        Object.keys(orientation).forEach((key) => {
          orientation[key] = orientation[key] ? Number(orientation[key].toFixed(2)) : 0;
        });
        if (this.endRangeMoved.state && this.stateOnline && this.endRangeMoved.category === 'orientation') {
          if (orientation[this.endRangeMoved.index] === this.endRangeMoved.value) {
            this.endRangeMoved.state = false;
          }
          else {
            orientation[this.endRangeMoved.index] = this.endRangeMoved.value;
          }
        }
        const data = {};
        Object.assign(data, orientation);
        return data;
      },
      set(value) {
        console.log('SET');
        console.table(value);
        // this.$store.commit(types.ROBOT_MOVE_JOINT, value.map(str => Number(str)));
      },
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
            values[this.jointRangeMoved.index] = this.jointRangeMoved.value;
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
      set(value) {
        console.log('SET');
        console.table(value);
        // this.$store.commit(types.ROBOT_MOVE_JOINT, value.map(str => Number(str)));
      },
    },
    // end: {
    //   get() {
    //     const end = this.$store.getters.end;
    //     Object.keys(end.position).forEach((key) => {
    //       this.state.position[key] = Number(end.position[key].toFixed(2));
    //     });
    //     Object.keys(end.orientation).forEach((key) => {
    //       this.state.orientation[key] = Number(end.orientation[key].toFixed(2));
    //     });
    //     return end;
    //   },
    //   set(value) {
    //     console.log('SET');
    //     console.table(value);
    //     // this.$store.commit();
    //   },
    // },
  },
};
</script>
<style scoped lang="scss">

$fontColor : #444;
.control-container {
  background-color: #EDEDED;
  color: #444;
  height: 100%;
  .container-title {
    font-family: 'Gotham-Bold';
    font-size: 1.4rem;
    height: 58px;
    line-height: 58px;
    padding: 0 22px;
    letter-spacing: -1.33px;
  }
  .control-block {
    padding: 8px 0;
    background-color: #D9D9D9;
    border-radius: 10px;
    margin:0 6px 10px;
    .block-title {
      font-size: 1rem;
      color: $fontColor;
      width: 100%;
      letter-spacing: -1px;
      padding: 10px;
      text-align: left;
      font-family: "Gotham-Book";
    }
    .control-wrapper .block {
      color: $fontColor;
      padding: 8px 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        /*width: 70px;*/
        font-size: 12px;
        font-family: "Gotham-Book";
        padding-right: 6px;
      }
      .range-wrapper {
        position: relative;
        width: 20vw;
        margin-right: 0.5vw;
        background: #7b7878;
        height: 1px;
        input[type=range] {
          height: 2px;
          background: transparent;
          width: 100%;
          vertical-align: middle;
          z-index: 5;
          padding: 0;
          margin: 0;
          position: absolute;
          outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
          width: 20px;
          height: 20px;
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
        width: 60px;
        border: none;
        border-radius: 10px;
        text-align: center;
        color: #666;
        letter-spacing: -0.67px;
        font-size: 12px;
        padding: 2px 0;
        outline: none;
      }


    }
    .mm-unit,.end-range sup {
      color: $fontColor;
      font-size: 12px;
      width: 40px;
      text-align: right;
    }
    sup {
      margin-top: -12px;
      text-align: left !important;
    }
    .config-wrapper {
      .config-title {
        width: 152px !important;
        text-align: right !important;
        padding: 0 !important;
      }
      img {
        padding: 0 6px;
        width: 10%;
      }
      input[type=range] {
        height: 8px;
        width: 100%;
        border-radius: 100px;
        background-image: linear-gradient(90deg, #FFFEAD 0%, #FF6868 100%);
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
        width: 74px !important;
        padding:6px 0;
        background: #565656;
        border-radius: 2px;
        font-family: Gotham-Book;
        font-size: 12px;
        color: #FFF;
        letter-spacing: -0.75px;
        text-align: center;
      }
    }
  }
}

</style>


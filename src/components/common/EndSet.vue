<template>
  <div class="end-container">
    <div class="container-title">TCP</div>
    <ul class="position-set">
      <li v-for="li in config.position.nameArray" :key="li">
        <div>{{li}}</div><input v-model.number="position[li]" type="number" :max="config.position.max" :min="config.position.min" @input="validatePosition(li)"><span>mm</span>
      </li>
      <!-- <li><div>Y</div><input v-model.number="position.y" type="number"><span>mm</span></li>
      <li><div>Z</div><input v-model.number="position.z" type="number"><span>mm</span></li> -->
      <li v-for="li in config.orientation.nameArray" :key="li">
        <div>{{li}}</div><input v-model.number="orientation[li]" type="number" :max="config.orientation.max" :min="config.orientation.min" @input="validateOrientation(li)"><span>degree </span>
      </li>
      <!-- <li><div>Yaw</div><input v-model.number="orientation.yaw" type="number"><sup>&deg;</sup></li>
      <li><div>Pitch</div><input v-model.number="orientation.pitch" type="number"><sup>&deg;</sup></li> -->
      <!-- test data "X":172,"Y":5.091591617724031e-14,"Z":45.93000030517578,"A":-180.00000500895632,"B":0,"C":0 -->
    </ul>
    <div class="set-button">
      <button class="confirm" @click="setEnd">Apply</button>
      <button class="confirm" @click="resetEnd">Reset</button>
    </div>
  </div>
</template>
<script>
import * as types from '../../store/mutation-types';

export default {
  data() {
    return {
      config: {
        position: {
          nameArray: ['x', 'y', 'z'],
          max: 800,
          min: -800,
        },
        orientation: {
          nameArray: ['roll', 'yaw', 'pitch'],
          max: 180,
          min: -180,
        },
      },
    }
  },
  methods: {
    validatePosition(index) {
      if (this.position[index] > this.config.position.max) {
        this.$set(this.position, index, this.config.position.max)
      }
      if (this.position[index] < this.config.position.min) {
        this.$set(this.position, index, this.config.position.min)
      }
    },
    validateOrientation(index) {
      if (this.orientation[index] > this.config.orientation.max) {
        this.$set(this.orientation, index, this.config.orientation.max)
      }
      if (this.orientation[index] < this.config.orientation.min) {
        this.$set(this.orientation, index, this.config.orientation.min)
      }
    },
    resetEnd() {
      // vuex reset position&orientation
      this.$store.commit(types.GO_HOME);
      console.log('reset action');
      // Object.keys(this.state.position).forEach((index) => {
      //   this.state.position[index] = 0;
      // });
      // Object.keys(this.state.orientation).forEach((index) => {
      //   this.state.orientation[index] = 0;
      // });
    },
    setEnd() {
      this.$store.commit(types.MOVE_END, {
        position: this.position,
        orientation: this.orientation,
      });
    },
  },
  computed: {
    position() {
      const position = this.$store.getters.end.position;
      Object.keys(position).forEach((key) => {
        position[key] = position[key] ? Number(position[key].toFixed(2)) : 0;
      });
      return position;
    },
    orientation() {
      const orientation = this.$store.getters.end.orientation;
      Object.keys(orientation).forEach((key) => {
        orientation[key] = orientation[key] ? Number(orientation[key].toFixed(2)) : 0;
      });
      return orientation;
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

$liDivWidth : 25%;
$liInputWidth : 50%;

.end-container {
  background: #434343;
  height: 100%;
  position: relative;
  font-family: 'Gotham-book';
  .container-title {
    padding: 1vh 1vw .6vh;
    font-size: 14px;
    color: #fff;
    letter-spacing: -0.58px;
  }
  .position-set {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /*height: 62%;*/
  }
  .set-button {
    // margin-left: $liDivWidth;
    // width: $liInputWidth;
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
      border: none;
      background: #3E3E3E;
      cursor: pointer;
      height: 32px;
      width: 50%;
      color: #fff;
      letter-spacing: -0.42px;
      font-size: 10px;
      font-family: "Gotham-Book";
      outline: none;
      border-left: 1px solid #343232;
    }
    button.cancel {
      color: #BEBEBE;
      background: #F2F3F5;
    }
  }

}

ul.position-set li{
  margin: 0.8vh 28px;
  background: #3D3D3D;
  border-radius: 20px;
  height: 33px;
  line-height: 33px;
  div {
    width: $liDivWidth;
    font-family: "Gotham-Book";
    font-size: .9rem;
    color: #FFf;
    letter-spacing: -0.67px;
    display: inline-block;
    text-align: center;
  }
  input[type=number] {
    width: $liInputWidth;
    color: #B1B1B1;
    background: #3D3D3D;
    font-size: 10px;
    border: none;
    text-align: center;
    outline: none;
  }
  span {
    font-size: 10px;
    color: #AEAEAE;
  }
}
</style>


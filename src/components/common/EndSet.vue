<template>
  <div class="end-container">
    <div class="container-title">TCP</div>
    <ul class="position-set">
      <li><div>X</div><input v-model.number="position.x" type="number"><span>mm</span></li>
      <li><div>Y</div><input v-model.number="position.y" type="number"><span>mm</span></li>
      <li><div>Z</div><input v-model.number="position.z" type="number"><span>mm</span></li>
      <li><div>Roll</div><input v-model.number="orientation.roll" type="number"><sup>&deg;</sup></li>
      <li><div>Yaw</div><input v-model.number="orientation.yaw" type="number"><sup>&deg;</sup></li>
      <li><div>Pitch</div><input v-model.number="orientation.pitch" type="number"><sup>&deg;</sup></li>
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
  methods: {
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
  background: white;
  border-radius: 8px;
  height: 100%;
  .container-title {
    padding: 2vh 1vw;
    font-size: 1.5rem;
    color: #444444;
    letter-spacing: -1px;
  }
  .set-button {
    margin-left: $liDivWidth;
    width: $liInputWidth;
    button {
      border: none;
      background: #E9E9E9;
      box-shadow: inset 0 0 1px 0 rgba(177,177,177,0.50);
      border-radius: 100px;
      cursor: pointer;
      height: 4vh;
      width: 45%;
      margin: 1vh 1%;
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
  margin-bottom: 0.5vh;
  div {
    width: $liDivWidth;
    font-family: "Gotham-Book";
    font-size: 1rem;
    color: #909293;
    letter-spacing: -0.67px;
    display: inline-block;
    padding: 1vh 0;
    text-align: center;
  }
  input[type=number] {
    height: 3vh;
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
</style>


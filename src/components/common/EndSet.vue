<template>
  <div class="end-container">
    <div class="container-title">TCP</div>
    <ul class="position-set">
      <li><div>X</div><input v-model.number="state.position.x" type="number"><span>mm</span></li>
      <li><div>Y</div><input v-model.number="state.position.y" type="number"><span>mm</span></li>
      <li><div>Z</div><input v-model.number="state.position.z" type="number"><span>mm</span></li>
      <li><div>Roll</div><input v-model.number="state.orientation.roll" type="number"><span>&deg;</span></li>
      <li><div>Yaw</div><input v-model.number="state.orientation.yaw" type="number"><span>&deg;</span></li>
      <li><div>Pitch</div><input v-model.number="state.orientation.pitch" type="number"><span>&deg;</span></li>
      <!-- test data "X":172,"Y":5.091591617724031e-14,"Z":45.93000030517578,"A":-180.00000500895632,"B":0,"C":0 -->
    </ul>
    <div class="set-button">
      <button class="confirm" @click="setEnd">Apply</button>
      <button class="cancel" @click="resetEnd">Reset</button>
    </div>
  </div>
</template>
<script>
import * as types from '../../store/mutation-types';

export default {
  props: ['state'],
  methods: {
    resetEnd() {
      // vuex reset position&orientation
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
        position: this.state.position,
        orientation: this.state.orientation,
      });
    },
  },
};
</script>
<style scoped lang="scss">

$liDivWidth : 17%;
$liInputWidth : 70%;

.end-container {
  background: white;
  border-radius: 8px;
  height: 38vw;
  .container-title {
    padding: 2vw 1vw;
    font-size: 1.5rem;
    color: #444444;
    letter-spacing: -1px;
  }
  .set-button {
    margin-left: $liDivWidth;
    width: $liInputWidth;
    padding-bottom: 6vw;
    button {
      border: none;
      background: #E9E9E9;
      box-shadow: inset 0 0 1px 0 rgba(177,177,177,0.50);
      border-radius: 100px;
      cursor: pointer;
      height: 3vw;
      width: 45%;
      margin: 5% 1%;
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
  margin-bottom: 4%;
  div {
    width: $liDivWidth;
    font-family: "Gotham-Book";
    font-size: 1rem;
    color: #909293;
    letter-spacing: -0.67px;
    display: inline-block;
    padding: 4% 0;
    text-align: center;
  }
  input[type=number] {
    height: 2.5vw;
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


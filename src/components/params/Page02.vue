<template lang="html">

    <!-- app-container begin -->
    <div class="app-container page-01-bg">
      <div>
        Scope
      </div>

      <button class="add-btn" @click="onStop()">Stop</button>
      <button class="add-btn" @click="onStart()">Start</button>

      <!-- chart begin -->
      <div class="chart" id="echart-main-1">
      </div>
      <!-- chart end -->

      <!-- 0 div begin -->
      <div class="one-div float-left">
        <div>
          Monitor Selection
        </div>
        <div>
          <span>Sample Time:</span>
          <input type="text" @blur="onXGridBlur()" v-model="model.localParamsSetting.monitorSelectionSampleTime" style="width:50px;">
          </input>
          <span>ms</span>
        </div>
        <div>
          <span>X Grid</span>
          <input type="text" @blur="onXGridBlur()" v-model="model.localParamsSetting.monitorSelectionXGrid" style="width:50px;">
          </input>
          <span>ms</span>
        </div>
        <button class="add-btn" @click="onXGridAddOrMinus(true)">+</button>
        <button class="add-btn" @click="onXGridAddOrMinus(false)">-</button>
      </div>
      <!-- 0 div end -->

      <!-- 1 div begin -->
      <div class="one-div float-left">
        <template v-for='checkb in model.localParamsSetting.ch1.checkboxData'>
          <input
            :value="checkb.id"
            @click="onCHCheckbox('checkboxinputCH1')"
            :checked="model.localParamsSetting.ch1.checkboxModel.indexOf(checkb.id)>=0"
            type="checkbox"
            name="checkboxinputCH1"
             />
            {{ checkb.value }}
        </template>
        <input type="text" v-model="model.localParamsSetting.ch1.selectText" style="width:150px;">
        <div>
          <div class="float-left">Color</div>
          <div class="float-left" id='ch1-color-selector' style="width:30px;height:10px;">
          </div>
          <input
            @click="onCHCheckbox('checkboxinputCH1Signed')"
            :checked="model.localParamsSetting.ch1.unsigned"
            type="checkbox"
            name="checkboxinputCH1Signed"
             />
            Unsigned
            <div class="float-clear">
              <span>Move</span>
              <input type="text" v-model="model.localParamsSetting.ch1.move" style="width:50px;">
              </input>
              <button class="add-btn" @click="onAddOrMinus('CH1', 'move', true)">+</button>
              <button class="add-btn" @click="onAddOrMinus('CH1', 'move', false)">-</button>
            </div>
            <div class="float-clear">
              <span>Grid</span>
              <input type="text" v-model="model.localParamsSetting.ch1.grid" style="width:50px;">
              </input>
              <button class="add-btn" @click="onAddOrMinus('CH1', 'grid', true)">+</button>
              <button class="add-btn" @click="onAddOrMinus('CH1', 'grid', false)">-</button>
            </div>
        </div>
      </div>
      <!-- 1 div end

      <!-- 2 div begin -->
      <div class="one-div float-left">
        <template v-for='checkb in model.localParamsSetting.ch2.checkboxData'>
          <input
            :value="checkb.id"
            @click="onCHCheckbox('checkboxinputCH2')"
            :checked="model.localParamsSetting.ch2.checkboxModel.indexOf(checkb.id)>=0"
            type="checkbox"
            name="checkboxinputCH2"
             />
            {{ checkb.value }}
        </template>
        <input type="text" v-model="model.localParamsSetting.ch2.selectText" style="width:150px;">
        <div>
          <div class="float-left">Color</div>
          <div class="float-left" id='ch2-color-selector' style="width:30px;height:10px;">
          </div>
          <input
            @click="onCHCheckbox('checkboxinputCH2Signed')"
            :checked="model.localParamsSetting.ch2.unsigned"
            type="checkbox"
            name="checkboxinputCH2Signed"
             />
            Unsigned
            <div class="float-clear">
              <span>Move</span>
              <input type="text" v-model="model.localParamsSetting.ch2.move" style="width:50px;">
              </input>
              <button class="add-btn" @click="onAddOrMinus('CH2', 'move', true)">+</button>
              <button class="add-btn" @click="onAddOrMinus('CH2', 'move', false)">-</button>
            </div>
            <div class="float-clear">
              <span>Grid</span>
              <input type="text" v-model="model.localParamsSetting.ch2.grid" style="width:50px;">
              </input>
              <button class="add-btn" @click="onAddOrMinus('CH2', 'grid', true)">+</button>
              <button class="add-btn" @click="onAddOrMinus('CH2', 'grid', false)">-</button>
            </div>
        </div>
      </div>
      <!-- 2 div end -->

      <!-- 3 div begin -->
      <div class="one-div float-left">
        <template v-for='checkb in model.localParamsSetting.ch3.checkboxData'>
          <input
            :value="checkb.id"
            @click="onCHCheckbox('checkboxinputCH3')"
            :checked="model.localParamsSetting.ch3.checkboxModel.indexOf(checkb.id)>=0"
            type="checkbox"
            name="checkboxinputCH3"
             />
            {{ checkb.value }}
        </template>
        <input type="text" v-model="model.localParamsSetting.ch3.selectText" style="width:150px;">
        <div>
          <div class="float-left">Color</div>
          <div class="float-left" id='ch3-color-selector' style="width:30px;height:10px;">
          </div>
          <input
            @click="onCHCheckbox('checkboxinputCH3Signed')"
            :checked="model.localParamsSetting.ch3.unsigned"
            type="checkbox"
            name="checkboxinputCH3Signed"
             />
            Unsigned
            <div class="float-clear">
              <span>Move</span>
              <input type="text" v-model="model.localParamsSetting.ch3.move" style="width:50px;">
              </input>
              <button class="add-btn" @click="onAddOrMinus('CH3', 'move', true)">+</button>
              <button class="add-btn" @click="onAddOrMinus('CH3', 'move', false)">-</button>
            </div>
            <div class="float-clear">
              <span>Grid</span>
              <input type="text" v-model="model.localParamsSetting.ch3.grid" style="width:50px;">
              </input>
              <button class="add-btn" @click="onAddOrMinus('CH3', 'grid', true)">+</button>
              <button class="add-btn" @click="onAddOrMinus('CH3', 'grid', false)">-</button>
            </div>
        </div>
      </div>
      <!-- 3 div end -->

      <!-- 4 div begin -->
      <div class="one-div float-left">
        <template v-for='checkb in model.localParamsSetting.ch4.checkboxData'>
          <input
            :value="checkb.id"
            @click="onCHCheckbox('checkboxinputCH4')"
            :checked="model.localParamsSetting.ch4.checkboxModel.indexOf(checkb.id)>=0"
            type="checkbox"
            name="checkboxinputCH4"
             />
            {{ checkb.value }}
        </template>
        <input type="text" v-model="model.localParamsSetting.ch4.selectText" style="width:150px;">
        <div>
          <div class="float-left">Color</div>
          <div class="float-left" id='ch4-color-selector' style="width:30px;height:10px;">
          </div>
          <input
            @click="onCHCheckbox('checkboxinputCH4Signed')"
            :checked="model.localParamsSetting.ch4.unsigned"
            type="checkbox"
            name="checkboxinputCH4Signed"
             />
            Unsigned
            <div class="float-clear">
              <span>Move</span>
              <input type="text" v-model="model.localParamsSetting.ch4.move" style="width:50px;">
              </input>
              <button class="add-btn" @click="onAddOrMinus('CH4', 'move', true)">+</button>
              <button class="add-btn" @click="onAddOrMinus('CH4', 'move', false)">-</button>
            </div>
            <div class="float-clear">
              <span>Grid</span>
              <input type="text" v-model="model.localParamsSetting.ch4.grid" style="width:50px;">
              </input>
              <button class="add-btn" @click="onAddOrMinus('CH4', 'grid', true)">+</button>
              <button class="add-btn" @click="onAddOrMinus('CH4', 'grid', false)">-</button>
            </div>
        </div>
      </div>
      <!-- 4 div end -->
    </div>
    <!-- app-container end -->

</template>
<script>
console.log('Rounter = 02');
// echarts
const echarts = require('echarts');
// require('echarts/chart/pie');
// require('echarts/component/toolbox');
// require('echarts/component/tooltip');
// require('echarts/component/title');
export default {
  data() {
    return {
      model: GlobalUtil.model,
    };
  },
  methods: {
    onXGridBlur() {
      console.log(GlobalUtil.model.localParamsSetting.monitorSelectionXGrid);
      const arr = [];
      let i = 0;
      while (i <= 5000) {
        arr.push(i);
        i += GlobalUtil.model.localParamsSetting.monitorSelectionXGrid - 0;
      }
      console.log(arr);
      GlobalUtil.model.localParamsSetting.chartOption.xAxis.data = arr;
      const option = GlobalUtil.model.localParamsSetting.chartOption;
      if (option && typeof option === 'object') {
        const myChart = window.myChart;
        myChart.setOption(option, true);
      }
    },
    onStart() {
      console.log(`on start = ${JSON.stringify(GlobalUtil.model.localParamsSetting)}`);
    },
    onStop() {
      console.log(`on stop = ${JSON.stringify(GlobalUtil.model.localParamsSetting)}`);
    },
    onXGridAddOrMinus(isAdd) {
      if (isAdd) {
        GlobalUtil.model.localParamsSetting.monitorSelectionXGrid += 1;
      }
      else {
        GlobalUtil.model.localParamsSetting.monitorSelectionXGrid -= 1;
      }
      const arr = [];
      let i = 0;
      while (i <= 5000) {
        arr.push(i);
        i += GlobalUtil.model.localParamsSetting.monitorSelectionXGrid;
      }
      GlobalUtil.model.localParamsSetting.chartOption.xAxis.data = arr;
      const option = GlobalUtil.model.localParamsSetting.chartOption;
      const myChart = window.myChart;
      if (option && typeof option === 'object') {
        myChart.setOption(option, true);
      }
    },
    onAddOrMinus(ch, where, isAdd) {
      let curCH = {};
      switch (ch) {
        case 'CH1': {
          curCH = GlobalUtil.model.localParamsSetting.ch1;
          break;
        }
        case 'CH2': {
          curCH = GlobalUtil.model.localParamsSetting.ch2;
          break;
        }
        case 'CH3': {
          curCH = GlobalUtil.model.localParamsSetting.ch3;
          break;
        }
        case 'CH4': {
          curCH = GlobalUtil.model.localParamsSetting.ch4;
          break;
        }
        default:
          break;
      }

      switch (where) {
        case 'move': {
          const value = curCH.move;
          curCH.move = isAdd ? value + 1 : value - 1;
          break;
        }
        case 'grid': {
          const value = curCH.grid;
          curCH.grid = isAdd ? value + 1 : value - 1;
          break;
        }
        default:
          break;
      }
    },
    onCHCheckbox(checkboxName) {
      const selectedIDs = [];
      const cbs = document.getElementsByName(checkboxName);
      for (let i = 0; i < cbs.length; i += 1) {
        const cb = cbs[i];
        if (cb.checked) {
          selectedIDs.push(cb.value);
        }
      }
      switch (checkboxName) {
        case 'checkboxinputCH1': {
          GlobalUtil.model.localParamsSetting.ch1.checkboxModel = selectedIDs;
          break;
        }
        case 'checkboxinputCH2': {
          GlobalUtil.model.localParamsSetting.ch2.checkboxModel = selectedIDs;
          break;
        }
        case 'checkboxinputCH3': {
          GlobalUtil.model.localParamsSetting.ch3.checkboxModel = selectedIDs;
          break;
        }
        case 'checkboxinputCH4': {
          GlobalUtil.model.localParamsSetting.ch4.checkboxModel = selectedIDs;
          break;
        }
        case 'checkboxinputCH1Signed': {
          GlobalUtil.model.localParamsSetting.ch1.unsigned = selectedIDs.length > 0;
          break;
        }
        case 'checkboxinputCH2Signed': {
          GlobalUtil.model.localParamsSetting.ch2.unsigned = selectedIDs.length > 0;
          break;
        }
        case 'checkboxinputCH3Signed': {
          GlobalUtil.model.localParamsSetting.ch3.unsigned = selectedIDs.length > 0;
          break;
        }
        case 'checkboxinputCH4Signed': {
          GlobalUtil.model.localParamsSetting.ch4.unsigned = selectedIDs.length > 0;
          break;
        }
        default:
          break;
      }
    },
    resetSelectorColor() {
      document.getElementById('ch1-color-selector').style.backgroundColor = GlobalUtil.model.localParamsSetting.ch1.color;
      document.getElementById('ch2-color-selector').style.backgroundColor = GlobalUtil.model.localParamsSetting.ch2.color;
      document.getElementById('ch3-color-selector').style.backgroundColor = GlobalUtil.model.localParamsSetting.ch3.color;
      document.getElementById('ch4-color-selector').style.backgroundColor = GlobalUtil.model.localParamsSetting.ch4.color;
    },
  },
  mounted() {
    //
    const dom = document.getElementById('echart-main-1');
    const myChart = echarts.init(dom);
    window.myChart = myChart;
    const option = GlobalUtil.model.localParamsSetting.chartOption;
    if (option && typeof option === 'object') {
      myChart.setOption(option, true);
    }
    //
    this.resetSelectorColor();
  },
  beforeDestroy() {
  },
  components: {
  },
  computed: {
  },
};

</script>
<style lang="scss" scoped>
.chart {
  background-color: white;
  width: 500px;
  height: 300px;
}
.one-div {
  width: 200px;
  height: 110px;
  border:1px solid gray;
}
.float-left {
  float: left;
}
.float-clear {
  clear:both;
}
.add-btn {
  width: 30px;
  height:20px;
}

</style>

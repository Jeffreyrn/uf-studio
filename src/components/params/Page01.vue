<template lang="html">
    <div class="app-container page-01-bg">
      <div>
        Port Serial Config
      </div>
      <div>
        Set Serial Parameters
      </div>
      <div>
        <div>
          PortNames: <input type='button' disabled v-model="model.localParamsSetting.portName" ></input>
        </div>
        <div>
          BaudRate: <input type="button" disabled v-model="model.localParamsSetting.baudRate" ></input>
        </div>
        <template v-for='radioData in model.localParamsSetting.baudRateRadioData'>
          <label>
            <input v-model="model.localParamsSetting.baudRate" name='baudRateRadio' type='radio' :value="radioData.value" />
            {{ radioData.value }}
          </label>
        </template>
        <div>
          Data Bits: <input type="button" disabled v-model="model.localParamsSetting.dataBits" ></input>
        </div>
        <template v-for='radioData in model.localParamsSetting.dataBitsRadioData'>
          <label>
            <input v-model="model.localParamsSetting.dataBits" name='dataBitsRadio' type='radio' :value="radioData.value" />
            {{ radioData.value }}
          </label>
        </template>
        <div>
          Stop Bit: <input type="button" disabled v-model="model.localParamsSetting.stopBit" ></input>
        </div>
        <template v-for='radioData in model.localParamsSetting.stopBitRadioData'>
          <label>
            <input v-model="model.localParamsSetting.stopBit" name='stopBitRadio' type='radio' :value="radioData.value" />
            {{ radioData.value }}
          </label>
        </template>
        <div>
          Check Bits: <input type="button" disabled v-model="model.localParamsSetting.checkBits" ></input>
        </div>
        <template v-for='radioData in model.localParamsSetting.checkBitsRadioData'>
          <label>
            <input v-model="model.localParamsSetting.checkBits" name='checkBitsRadio' type='radio' :value="radioData.value" />
            {{ radioData.value }}
          </label>
        </template>
        <div>
          Slaver ID
        </div>
        <div>
          Slaver ID: <input type="text" v-model="model.localParamsSetting.slaverID" ></input>
        </div>
        <div>
          <button class="submit-btn" @click="submitSerial()">OK</button>
        </div>
        <div>
          Command
        </div>
        <div>
          Send:
        </div>
        <input style="width:500px;" type='text' v-model="model.localParamsSetting.sendData" />
        <!-- <textarea class="textarea-style" v-model="model.localParamsSetting.sendData" ></textarea> -->
        <button class="send-btn" @click="sendData()">Send</button>
        <div>
          Receive: {{ model.localParamsSetting.receiveData }}
        </div>
        <input style="width:500px;" type='text' v-model="model.localParamsSetting.receiveData" />
        <!-- <textarea class="textarea-style" v-model="model.localParamsSetting.receiveData"></textarea> -->
      </div>
    </div>
</template>
<script>
console.log('Rounter = 01');

// import myPicker from 'my-picker'
// import Index from './components/Index.vue'
// import 'my-picker/my-picker.css'

export default {
  data() {
    return {
      model: GlobalUtil.model,
    };
  },
  methods: {
    sendData() {
      console.log(`sendData = ${GlobalUtil.model.localParamsSetting.sendData}`);
    },
    submitSerial() {
      console.log(`submitSerial = ${GlobalUtil.model.localParamsSetting.sendData}`);
    },
  },
  mounted() {
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
.send-btn {
  width: 50px;
  height: 30px;
}
.submit-btn {
  width: 50px;
  heigth: 30px;
}
</style>

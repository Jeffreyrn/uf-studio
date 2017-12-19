<template lang="html">
    <div class="app-container page-01-bg">
      <div>
        IC MU PVL Config
      </div>
      <div>
        Set Parameters
      </div>
      <div>
        Revolute: <input type="text" v-model="model.localParamsSetting.icmupvlRevolute"></input>
      </div>
      <div>
        Master Period Count: <input type="text" v-model="model.localParamsSetting.icmupvlMasterPeriodCount"></input>
      </div>
      <div>
        Status: <span>{{ model.localParamsSetting.icmupvlStatus }}</span>
      </div>
      <div>
        Information
      </div>
      <textarea class="textarea-style" v-model="model.localParamsSetting.icmupvlInformation">
      </textarea>
      <div>
        <button class="change-btn" @click="onStartMUAndPVL()">Start MU And PVL</button>
        <button class="change-btn" @click="onStartMU()">Start MU</button>
        <button class="change-btn" @click="onStartPAL()">Start PVL</button>
        <button class="change-btn" @click="onRefresh()">Refresh</button>
      </div>
    </div>
</template>
<script>
import GlobalUtil from '../../core/global_util';

console.log('Rounter = 03');

export default {
  data() {
    return {
      model: GlobalUtil.model,
    };
  },
  methods: {
    onStartMUAndPVL() {
      console.log(`onStartMUAndPVL =  ${JSON.stringify(GlobalUtil.model.localParamsSetting)}`);
    },
    onStartMU() {
      console.log(`onStartMU =  ${JSON.stringify(GlobalUtil.model.localParamsSetting)}`);
    },
    onStartPAL() {
      console.log(`onStartPAL =  ${JSON.stringify(GlobalUtil.model.localParamsSetting)}`);
    },
    onRefresh() {
      console.log(`onRefresh =  ${JSON.stringify(GlobalUtil.model.localParamsSetting)}`);
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

</style>

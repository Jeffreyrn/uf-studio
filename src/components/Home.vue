<template>
  <div class="hello">
  <button class="change-btn" @click="onLink()">
    link/unlink
  </button>
  <span id='show'>{{ model.localDeviceStatus.socket_connected ? 'Linked' : 'Unlinked' }}</span>
    <h1>{{ msg }}</h1>
    <h2></h2>
    <router-link :to="{ name: 'Paint'}"><el-button type="success">Paint</el-button></router-link>
    <router-link :to="{ name: 'Editor'}"><el-button type="primary">Editor</el-button></router-link>
    <router-link :to="{ name: 'Control'}"><el-button type="warning">Control</el-button></router-link>
    <router-link :to="{ name: 'Emulator'}"><el-button type="warning">Emulator</el-button></router-link>
    <router-link :to="{ name: 'Blockly'}"><el-button type="warning">Blockly</el-button></router-link>
    <router-link :to="{ name: 'Params'}"><el-button type="warning">Params</el-button></router-link>
    <router-link :to="{ name: 'Teach'}"><el-button type="warning">Teach</el-button></router-link>
  </div>
</template>

<script>
import GlobalUtil from '../core/global_util';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Studio',
      model: GlobalUtil.model,
    };
  },
  methods: {
    onLink() {
      const state = GlobalUtil.model.localDeviceStatus.socket_connected;
      console.log(state);
      if (state === 1) {
        GlobalUtil.socketCom.close();
      }
      else {
        GlobalUtil.socketCom.open();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>

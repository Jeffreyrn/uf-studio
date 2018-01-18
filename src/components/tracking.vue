<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2></h2>
    <router-link :to="{ name: 'Paint'}"><el-button type="success">Paint</el-button></router-link>
    <router-link :to="{ name: 'Editor'}"><el-button type="primary">Editor</el-button></router-link>
    <router-link :to="{ name: 'Control'}"><el-button type="warning">Control</el-button></router-link>
    <router-link :to="{ name: 'Emulator'}"><el-button type="warning">Emulator</el-button></router-link>
    <router-link :to="{ name: 'Blockly'}"><el-button type="warning">Blockly</el-button></router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Studio',
    };
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

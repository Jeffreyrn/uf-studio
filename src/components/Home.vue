<template>
  <div class="home-wrapper com-text-center com-module-wrapper">
    <section style="position: absolute;left: 0; right: 0;top:0;margin: 0 auto; font-size: 1.2rem;text-align: center;">
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
    </section>
    <section class="section1-wrapper com-text-center com-gradual-middle">
      <img class="img-block" src="../assets/img/home/img_xarm.png"/>
    </section>
    <section class="section2-wrapper com-font-GB-22 com-text-center">
      <div class="box1-wrapper ">
        <router-link class="com-text-center" :to="{ name: 'AppStore'}"><img src="../assets/img/home/icon_shopping.svg" />APP STORE</router-link>
        <router-link class="com-text-center" :to="{ name: 'EditHome'}"><img src="../assets/img/home/icon_developers.svg" />EDITOR</router-link>
        <router-link class="com-text-center" :to="{ name: 'Setting'}"><img src="../assets/img/home/icon_setting.svg" />SETTING</router-link>
      </div>
    </section>
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
<style scoped lang="scss">
  .home-wrapper {
    flex-direction: column;
    .section1-wrapper {
      width: 100%;
      height: 80%;
      img {
        width: 30%;
        margin:0 auto;
      }
    }
    .section2-wrapper {
      width: 80%;
      height: 20%;
      .box1-wrapper {
        width: 100%;
        display: flex;
        justify-content: space-around;
        /*margin: 2rem 0;*/
        &>a {
          flex-direction: column;
          border-right: 1px solid #979797;
          width: 100%;
          color: #444;
          /*padding: .8rem 0;*/
          cursor: pointer;
          img {
            width: 2.6rem;
            padding-bottom: 2rem;
          }
        }
        &>a:last-child{
          border-right: none;
        }
      }
    }
  }
</style>

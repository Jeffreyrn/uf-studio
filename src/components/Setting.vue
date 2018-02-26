<template>
  <div class="setting-wrapper com-module-wrapper">
    <div class="com-back-home-wrapper com-text-center">
      <router-link :to="{name: 'Home'}"><img class="com-icon-back" src="../assets/img/common/icon_back.svg"/></router-link>
      <span class="com-font-GB-24 com-module-name">SETTING</span>
      <img class="com-module-icon" src="../assets/img/setting/icon_setting.svg" />
    </div>
    <section class="section1-wrapper com-font-GB-22 ">
      <div class="box1-wrapper com-text-center">
        <a class="com-text-center"><img src="../assets/img/home/icon_shopping.svg" />General</a>
        <router-link class="com-text-center" :to="{ name: 'Editor'}"><img src="../assets/img/home/icon_developers.svg" />Studio info</router-link>
        <a class="com-text-center "><img src="../assets/img/home/icon_setting.svg" />System Log</a>
        <a class="com-text-center "><img src="../assets/img/home/icon_setting.svg" />Software Update</a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .setting-wrapper {
    .section1-wrapper {
      height: 90%;
      .box1-wrapper {
        width: 100%;
        height: 100%;
        flex-direction: column;
        &>a {
          width: 30%;
          height: 100%;
          margin: 0 auto;
          border-bottom: 1px solid #979797;
          justify-content: center;
          color: #444;
          cursor: pointer;
          transition: all .2s;
          img {
            width: 2.6rem;
            margin-right: 2rem;
          }
        }
        &>a:last-child{
          border-bottom: none;
        }
        a:hover {
          color: #4a90e2;
        }
      }
    }

  }
</style>

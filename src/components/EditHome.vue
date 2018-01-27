<template>
  <div class="edit-home-wrapper com-module-wrapper">
    <div class="com-back-home-wrapper com-text-center">
      <router-link :to="{name: 'Home'}"><img class="com-icon-back" src="../assets/img/common/icon_back.svg"/></router-link>
      <span class="com-font-GB-24 com-module-name">EDITOR</span>
      <img class="com-icon-module" src="../assets/img/edit/edit-home/icon_developers.svg" />
    </div>
    <section class="section1-wrapper com-font-GB-22">
      <div class="box1-wrapper com-text-center">
        <a class="com-text-center"><img src="../assets/img/home/icon_shopping.svg" />RECORDING</a>
        <router-link class="com-text-center" :to="{ name: 'Editor'}"><img src="../assets/img/home/icon_developers.svg" />APP EDITOR</router-link>
        <a class="com-text-center "><img src="../assets/img/home/icon_setting.svg" />IDE</a>
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
  .edit-home-wrapper {
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
          img {
            width: 2.6rem;
            margin-right: 2rem;
          }
        }
        &>a:last-child{
          border-bottom: none;
        }
      }
    }

  }
</style>

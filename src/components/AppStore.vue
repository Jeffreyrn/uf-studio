<template>
  <div class="appStore-wrapper com-module-wrapper">
    <div class="com-back-home-wrapper com-text-center">
      <router-link :to="{name: 'Home'}"><img class="com-icon-back" src="../assets/img/common/icon_back.svg"/></router-link>
      <span class="com-font-GB-24 com-module-name">APP STORE</span>
      <img class="com-module-icon" src="../assets/img/appStore/shopping_bag.svg" />
    </div>
    <section class="section1-wrapper com-font-GM-20">
      <div class="tab-wrapper">
        <div class="tab" v-for="(item,index) in tab" @click="showTabContain(index)">
          <span class="tab-text" style="" :class="{'active':showApp === index}">{{ item }}</span>
        </div>
      </div>
      <div class="tab-contain-wrapper" v-if="showApp === 'allApp'">
        <div class="tab-contain" style="height:600px;" v-for="(item,index) in tabContain" :key="index">
          Default App  
          <DefaultApp></DefaultApp>
        </div>
        <div class="tab-contain" style="height:600px;padding-top:40px;">
          Third-Party
          <third-party></third-party>
        </div>
        <div class="tab-contain" style="height:600px;padding-top:40px;">
          My App
          <my-app></my-app>
        </div>
      </div>
      <div class="tab-contain-wrapper" v-else-if="showApp === 'thirdParty'">
        <third-party></third-party>
      </div>
      <div class="tab-contain-wrapper" v-else="showApp === 'myApp'">
        <my-app></my-app>
      </div>
    </section>
  </div>
</template>

<script>
import MyApp from './appStore/MyApp';
import ThirdParty from './appStore/ThirdParty';
import DefaultApp from './appStore/DefaultApp';

// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      model: window.GlobalUtil.model,
      showApp: 'allApp',
      tab: {
        allApp: 'All Apps',
        thirdParty: 'Third-Party',
        myApp: 'My App',
      },
      shoppingBag: require('../assets/img/appStore/shopping_bag.svg'),
      tabContain: {
        1: {
          1: {
            img: require('../assets/img/appStore/shopping_bag.svg'),
            name: 'uStudio',
          },
        },
      },
    };
  },
  mounted() {
  },
  methods: {
    showTabContain(item) {
      this.showApp = item;
    },
  },
  components: {
    MyApp,
    ThirdParty,
    DefaultApp,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .appStore-wrapper {
    .section1-wrapper {
      width: 80%;
      height: 90%;
      margin: 0 auto;
      display: flex;
      .tab-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        margin-right: 10%;
        padding-top: 5rem;
        // background: greenyellow;
        .tab {
          width: 150px;
          height: 100%;
          // background: yellow;
          cursor: pointer;
          .active {
            border-bottom: 2px solid #E27347;
          }
        }
      }
      .tab-contain-wrapper {
        display: flex;
        flex-direction: column;
        padding-top: 5rem;
      }
    }
  }

</style>
<style>
/**common css(AppStore MyApp ThirdParty)**/
.appStore-wrapper .tab-contain {
  height: 100%;
  /* overflow-y: scroll; */
}
/* .appStore-wrapper .tab-contain ul li {
  width: 136px;
  height: 136px;
  margin: 1.4rem 3.2rem 1.4rem 0;
  display: inline-block;
  text-align: center;
  background: #F3F5F7;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
} */
.app-title {
  font-family: 'Gotham-Book';
  font-size: 16px;
  color: #4A4A4A;
  letter-spacing: -0.67px;
  /* background: yellow; */
  height: 40px;
  line-height: 40px;
}
</style>
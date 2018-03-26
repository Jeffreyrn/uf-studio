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
        <div class="tab-contain" style="height:600px; font-size: 1.4rem;" v-for="(item,index) in tabContain" :key="index">
          <!-- Default App -->
          <DefaultApp></DefaultApp>
        </div>
        <!-- <div class="tab-contain" style="height:600px;padding-top:40px;font-size: 1.4rem;">
          Third-Party
          <third-party></third-party>
        </div>
        <div class="tab-contain" style="height:600px;padding-top:40px;font-size: 1.4rem;">
          My App
          <my-app></my-app>
        </div> -->
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
        allApp: 'Default App',
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
  activated: function() {
    window.CommandsAppsSocket.listApps((dict) => {
      console.log(dict);
    });
    window.CommandsAppsSocket.listLocalApps((dict) => {
      console.log(dict);
    });
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
    height: 100%;
    overflow-y: hidden;
    .section1-wrapper {
      height: 90%;
      margin: 0 auto;
      display: flex;
      .tab-wrapper {
        display: flex;
        flex-direction: column;
        height: 600px;
        padding-top: 70px;
        width: 20%;
        padding-left: 5%;
        .tab {
          height: 100%;
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
        width: 80%;
        height: 100%;
        overflow-y: auto;
        padding-bottom: 3rem;
      }
    }
  }

  /**common css(AppStore MyApp ThirdParty)**/
  .appStore-wrapper .tab-contain {
    height: 100%;
  }
</style>

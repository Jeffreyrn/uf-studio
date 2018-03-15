<template>
  <div class="app-detail-wrapper">
    <div class="app-detail-header com-text-center">
      <router-link :to="{name: 'AppStore'}"><img src="../../assets/img/common/icon_back.svg" /></router-link><span>Pick and Place</span>
    </div>
    <div class="app-datail-contain">
      <section class="section1 com-text-center">
        <div class="app-icon">
          {{ data.name }}
          <div>
            {{ data.version }}
          </div>
          <div>
            {{ data.appType }}
          </div>
          <div>
            {{ data.category }}
          </div>
        </div>
        <div class="app-text">
          <div class="">
            <!-- <p class="gray-title">Developer</p>
            <p class="black-text">Johnny</p> -->
            <p class="gray-title">Developer</p>
            <p class="black-text">{{ data.author }}</p>
          </div>
          <div class="middle-box">
            <!-- <p class="gray-title">Developer</p>
            <p class="black-text">Johnny</p> -->
          </div>
          <div class="">
            <div v-if="data.control==='install'">
              <el-button class="install-btn" @click="oninstall()">{{ data.control }}</el-button>
            </div>
            <div v-if="data.control==='run'">
              <el-button class="install-btn" @click="onrun()">run</el-button>
              <el-button class="install-btn" @click="onreinstall()">reinstall</el-button>
              <el-button class="install-btn" @click="onuninstall()">uninstall</el-button>
            </div>
          </div>
        </div>
      </section>
      <section class="section2"></section>
      <section class="section3">
        <h4>Description</h4>
        <div></div>
      </section>
      <section class="section4">
        <h4>Information</h4>
        <div></div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: {},
      };
    },
    mounted() {
    },
    activated: function () {
      this.data = this.$route.params.data;
      console.log(`app detail params = ${JSON.stringify(this.data)}`);
    },
    methods: {
      oninstall() {
        CommandsAppsSocket.appInstall(this.data.category, this.data.name, this.data.version, (dict) => {
          console.log(`CommandsAppsSocket appInstall = ${JSON.stringify(dict)}`);
          if (dict.code === 0) {
            this.data.control = 'run';
          }
        });
      },
      onrun() {

      },
      onuninstall() {
        CommandsAppsSocket.appUninstall(this.data.category, this.data.name, (dict) => {
          console.log(`CommandsAppsSocket appUninstall = ${JSON.stringify(dict)}`);
          if (dict.code === 0) {
            this.data.control = 'install';
          }
        });
      },
      onreinstall() {
        CommandsAppsSocket.appReinstall(this.data.category, this.data.name, this.data.version, (dict) => {
          console.log(`CommandsAppsSocket appReinstall = ${JSON.stringify(dict)}`);
          if (dict.code === 0) {
            this.data.control = 'run';
          }
        });
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-detail-wrapper {
  .app-detail-header {
    width: 100%;
    height: 8rem;
    background: #FAFAFB;
    img {
      width: 1.5rem;
      margin-left: 4rem;
    }
    span {
      font-family: 'Gotham-Medium';
      font-size: 1.5rem;
      color: #444;
      letter-spacing: -1.81px;
      margin-left: 3rem;
    }
  }
  .app-datail-contain {
    width: 80%;
    margin: 0 auto;
    max-width: 1200px;
    .section1 {
      margin: 4rem 0;
      .app-icon {
        width: 10rem;
        height: 10rem;
        background: #D9D9D9;
        border-radius: 2px;
        margin-right: 4rem;
      }
      .app-text {
        flex-direction: column;
        font-family: 'Gotham-Book';
        font-size: 1rem;
        letter-spacing: -1.62px;
        .middle-box {
          margin: 2rem 0;
        }
        .gray-title {
          color: #A5A5A5;
        }
        .black-text {
          color: #444;
        }
        .install-btn {
          background: #E27347;
          border-radius: 58px;
          border: none;
          padding: 4px 20px;
          color: #FFF;
          letter-spacing: -1.38px;
        }
      }
    }
    .section2 {
      background: #EEE;
      width: 60%;
      height: 425px;
      margin: 0 auto;
    }
    .section3, .section4 {
      margin-top: 4rem;
      h4 {
        width: 90%;
        border-bottom: 1px solid #EEE;
        font-family: 'Gotham-Book';
        color: #444;
        letter-spacing: -2px;
      }
    }
  }
}
</style>

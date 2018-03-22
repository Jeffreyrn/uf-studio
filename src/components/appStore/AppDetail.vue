<template>
  <div class="app-detail-wrapper">
    <div class="app-detail-header com-text-center">
      <router-link :to="{name: 'AppStore'}">
        <img src="../../assets/img/common/icon_back.svg" />
      </router-link>
      <span>
        {{ data.name }}
      </span>
      <!-- <div class="" style="width:80px;height:50px;margin-right:5%;background:yellow;">
        aaa
      </div> -->
      <div v-if="data.control==='install'">
        <div style="width:250px;margin-right:5%;">
          <el-button class="control-btn float-left install-btn" @click="oninstall()">{{ data.control }}</el-button>
        </div>
      </div>
      <div v-if="data.control==='run'">
        <div style="width:250px;margin-right:5%;">
          <el-button class="control-btn float-left run-btn" @click="onrun()">run</el-button>
          <el-button class="control-btn float-left uninstall-btn" @click="onuninstall()">uninstall</el-button>
        </div>
      </div>
    </div>
    <div class="app-datail-contain">
      <section class="section1 com-text-center">
        <div class="app-icon">
          <div style="text-align:center;margin-top:145px;">
            {{ data.version }}
          </div>
          <!-- <div>
            {{ data.appType }}
          </div>
          <div>
            {{ data.category }}
          </div> -->
        </div>
        <div class="app-text">
          <div class="middle-box">
            <p class="gray-title">Developer</p>
            <p class="black-text">{{ data.author }}</p>
          </div>
          <div class="middle-box">
            <p class="gray-title">Contributor</p>
            <p class="black-text">{{ (data.contribution || []).join(', ') }}</p>
          </div>
          <div class="middle-box">
            <p class="gray-title">Size</p>
            <p class="black-text">{{ data.size }}</p>
          </div>
        </div>
      </section>
      <!-- <section class="section2">
        {{ data. version }}
      </section> -->
      <!-- <section class="section2"></section> -->
      <section class="section3">
        <h4>Description</h4>
        <!-- <div></div> -->
        <textarea v-model="data.des" disabled>
        </textarea>
      </section>
      <!-- <section class="section4">
        <h4>Information</h4>
        <div></div>
      </section> -->
    </div>

    <DialogAlert
      title='Request fails.'
      subtitle=''
      :onok='onok'
      v-if="errorAlert">
    </DialogAlert>
  </div>
</template>

<script>

import DialogAlert from './../DialogAlert';
// import { setTimeout } from 'timers';

export default {
  data() {
    return {
      data: {},
      errorAlert: false,
    };
  },
  mounted() {
    // console.log(`mounted app detail route = ${JSON.stringify(this.$route)}`);
  },
  activated: function() {
    this.data = this.$route.params.data;
  },
  components: {
    DialogAlert,
  },
  methods: {
    oninstall() {
      window.CommandsAppsSocket.appInstall(this.data.category, this.data.name, this.data.version, (dict) => {
        console.log(`CommandsAppsSocket appInstall = ${JSON.stringify(dict)}`);
        if (dict.code === 0) {
          this.data.control = 'run';
          // this.errorAlert = true;
        }
        else {
          this.errorAlert = true;
        }
      });
    },
    onok() {
      this.errorAlert = false;
    },
    onrun() {
    },
    onuninstall() {
      window.CommandsAppsSocket.appUninstall(this.data.category, this.data.name, (dict) => {
        console.log(`CommandsAppsSocket appUninstall = ${JSON.stringify(dict)}`);
        if (dict.code === 0) {
          this.data.control = 'install';
          // this.errorAlert = true;
        }
        else {
          this.errorAlert = true;
        }
      });
    },
    // onreinstall() {
    //   CommandsAppsSocket.appReinstall(this.data.category, this.data.name, this.data.version, (dict) => {
    //     console.log(`CommandsAppsSocket appReinstall = ${JSON.stringify(dict)}`);
    //     if (dict.code === 0) {
    //       this.data.control = 'run';
    //     }
    //   });
    // }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-detail-wrapper {
  .app-detail-header {
    width: 100%;
    height: 8rem;
    // height: 168px;
    background: #FAFAFB;
    img {
      width: 1.5rem;
      // margin-left: 4rem;
      margin-left: 40px;
    }
    span {
      width: 100%;
      font-family: 'Gotham-Medium';
      font-size: 1.5rem;
      color: #444;
      letter-spacing: -1.81px;
      // margin-left: 3rem;
      margin-left: 20%;
    }
    .control-btn {
      width: 100px;
      height: 40px;
      border: none;
      font-family: 'Gotham-Book';
      font-size: 16px;
      letter-spacing: -1.23px;
      text-align: center;
      border-radius: 20px;
      color: #FFFFFF;
    }
    .install-btn {
      background: #575C62;
    }
    .uninstall-btn {
      background: #E24D4A;
    }
    .run-btn {
      background: #52BF53;
    }
  }
  .app-datail-contain {
    width: 80%;
    margin-left: 25%;
    // margin: 0 auto;
    max-width: 1000px;
    .section1 {
      // margin: 4rem 0;
      margin-top: 4rem;
      // background: green;
      .app-icon {
        // width: 10rem;
        // height: 10rem;
        width: 140px;
        height: 140px;
        background: #D9D9D9;
        border-radius: 2px;
        margin-right: 6rem;
      }
      .app-text {
        // flex-direction: column;
        // font-family: 'Gotham-Book';
        // font-size: 1rem;
        // letter-spacing: -1.62px;
        .middle-box {
          margin: 1rem 0;
          .gray-title {
            // color: #A5A5A5;
            font-family: 'Gotham-Book';
            font-size: 16px;
            color: #AEAEAE;
            letter-spacing: -1px;
            text-align: left;
          }
          .black-text {
            // color: #444;
            font-family: 'Gotham-Book';
            font-size: 16px;
            color: #444444;
            letter-spacing: -1.62px;
            text-align: left;
          }
        }
      }
    }
    .section2 {
      // margin-top: 1rem;
      // background: yellow;
      // width: 60%;
      // height: 425px;
      // margin: 0 auto;
      // margin-left: 0px;
    }
    .section3 {
      margin-top: 4rem;
      // margin-left: 0px;
      // margin-right: 0px;
      h4 {
        width: 80%;
        height:30px;
        border-bottom: 3px solid #EEE;
        font-family: 'Gotham-Medium';
        font-size: 20px;
        color: #444444;
        letter-spacing: -1px;
      }
      textarea {
        width: 80%;
        margin-top: 5px;
        border:0;
        outline: none;
        height: 200px;
        font-family: 'Gotham-Book';
        font-size: 18px;
        color: #444444;
        letter-spacing: -0.85px;
      }
    }
  }
}
</style>

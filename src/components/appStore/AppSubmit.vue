<template>
  <div class="app-submit-wrapper">
    <div class="app-submit-header com-text-center">
      <router-link :to="{name: 'AppStore'}">
        <div class="app-submit-close">
          <!-- <img src="../../assets/img/appStore/icon_close.svg" /> -->
        </div>
      </router-link>
      <span class="app-submit-top-title">
        Please fill in the application form about your upload  
      </span>
      <div class="app-submit-btn" v-bind:class="classObject" @click="onsubmit">
        {{ submitButtonValue }}
      </div>
    </div>
    <div class="app-submit-contain">
      <div class="app-submit-form-bg">
        <div style="height:30px;">
        </div>
        <div class="app-submit-des-text">
          App Name
        </div>
        <input type="text"
          @keydown="appNameClick"
          class="app-submit-name"
          v-model="name"
          :disabled="['normal','cansubmit'].indexOf(model.localAppsMgr.curUploadState)<0" />
        <div class="app-submit-num">
          {{ nameNum - name.length }}
        </div>
        <div class="app-submit-des-text" style="margin-top:30px;">
          Description
        </div>
        <textarea
          @keydown="appNameClick"
          class="app-submit-des"
          v-model="des"
          :disabled="['normal','cansubmit'].indexOf(model.localAppsMgr.curUploadState)<0">
        </textarea>
        <div class="app-submit-num">
          {{ desNum - des.length }}
        </div>
        <div style="height:50px;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      model: window.GlobalUtil.model,
      name: '',
      data: {},
      des: '',
      nameNum: 50,
      desNum: 1000,
      // state: 'normal', // normal, cansubmit, uploaded, reviewing, approve, failed
    };
  },
  mounted() {
  },
  activated: function() {
    console.log(`params = ${JSON.stringify(this.$route.params)}`);
    this.data = this.$route.params.data;
    this.name = this.data.name;
    this.des = this.data.des;
    if (this.name === undefined) {
      this.name = '';
    }
    if (this.des === undefined) {
      this.des = '';
    }
    window.GlobalUtil.model.localAppsMgr.curUploadState = 'normal';
    if (this.des.length > 0) {
      window.GlobalUtil.model.localAppsMgr.curUploadState = 'approve';
    }
  },
  methods: {
    onsubmit() {
      if (window.GlobalUtil.model.localAppsMgr.curUploadState === 'cansubmit') {
        console.log(`cansubmit cansubmit cansubmit ${this.data.name} ${this.name}`);
        const appInfo = {
          name: this.name,
          description: this.des,
        };
        window.CommandsAppsSocket.uploadFile(this.data.name, appInfo, (dict) => {
          console.log(`cansubmit dict = ${JSON.stringify(dict)}`);
          if (dict.code === 0) {
            this.data.name = this.name;
            window.GlobalUtil.model.localAppsMgr.curUploadState = 'approve';
          }
        });
      }
    },
    checkCanSubmit() {
      const isNoEmpty = this.name.length > 0 && this.des.length > 100;
      const checkFileNamePass = window.GlobalUtil.checkFileName(this.name);
      window.GlobalUtil.model.localAppsMgr.curUploadState = isNoEmpty && checkFileNamePass ? 'cansubmit' : 'normal';
    },
    appNameClick() {
      // console.log('appNameClick appNameClick appNameClickappNameClick' + this.name);
      setTimeout(() => {
        this.name = this.name.substr(0, 50);
        this.des = this.des.substr(0, 1000);
        this.checkCanSubmit();
      });
    },
  },
  computed: {
    classObject: () => ({
      'app-submit-btn-normal': window.GlobalUtil.model.localAppsMgr.curUploadState === 'normal',
      'app-submit-btn-cansubmit': window.GlobalUtil.model.localAppsMgr.curUploadState === 'cansubmit',
      'app-submit-btn-uploaded': window.GlobalUtil.model.localAppsMgr.curUploadState === 'uploaded',
      'app-submit-btn-reviewing': window.GlobalUtil.model.localAppsMgr.curUploadState === 'reviewing',
      'app-submit-btn-approve': window.GlobalUtil.model.localAppsMgr.curUploadState === 'approve',
      'app-submit-btn-failed': window.GlobalUtil.model.localAppsMgr.curUploadState === 'failed',
    }),
    submitButtonValue() {
      switch (window.GlobalUtil.model.localAppsMgr.curUploadState) {
        case 'normal':
        case 'cansubmit':
          return 'Submit';
        case 'uploaded':
          return 'Uploaded';
        case 'reviewing':
          return 'Reviewing';
        case 'approve':
          return 'Approve';
        case 'failed':
          return 'Failed';
        default:
          return '';
      }
    },
  },
  watch: {
    // 'name': () => {
    //   if (this.name === undefined) {
    //     this.name = '';
    //   }
    //   // if (this.des === undefined) {
    //   //   this.des = '';
    //   // }
    //   // checkCanSubmit();
    //   this.name = this.name.substr(0, 50);
    // },
    // 'des': () => {
    //   // if (this.name === undefined) {
    //   //   this.name = '';
    //   // }
    //   if (this.des === undefined) {
    //     this.des = '';
    //   }
    //   // checkCanSubmit();
    //   this.des = this.des.substr(0, 1000);
    // },
  },
};
</script>

<style scoped lang="scss">
.app-submit-wrapper {
  .app-submit-header {
    width: 100%;
    height: 168px;
    background: #484848;    
    .app-submit-close {
      width: 40px;
      height: 40px;
      // background: yellow;
      margin-left: 20px;
      cursor: pointer;
      background-image: url('../../assets/img/appStore/icon_back.svg');
      background-position: center;
      background-size: 28px 29px;
      background-repeat: no-repeat;
    }
    .app-submit-top-title {
      // margin-left: 210px;
      width: 100%;
      text-align: center;
      font-family: 'Gotham-Medium';
      font-size: 28px;
      color: #FFFFFF;
      letter-spacing: -1.81px;
    }
    .app-submit-btn {
      width: 160px;
      height: 50px;
      line-height: 51px;
      margin-right: 5%;
      border-radius: 100px;
      font-family: 'Gotham-Book';
      font-size: 20px;
      letter-spacing: -1.54px;
      text-align: center;
    }
    .app-submit-btn-normal {
      background: #777777;
      color: #BBBBBB;
      
    }
    .app-submit-btn-cansubmit {
      background: #52BF53;
      color: #FFFFFF;
      cursor: pointer;
    }
    .app-submit-btn-uploaded {
      background: #373737;
      color: #FFFFFF;
    }
    .app-submit-btn-reviewing {
      background: #F5C26F;
      color: #FFFFFF;
    }
    .app-submit-btn-approve {
      background: #52BF53;
      color: #FFFFFF;
    }
    .app-submit-btn-failed {
      background: #E24D4A;
      color: #FFFFFF;
    }
  }
  .app-submit-contain {
    background: #FFFFFF;
    .app-submit-form-bg {
      // background: yellow;
      margin-left:auto;
      margin-right:auto;
      // display: flex;
      // align-items: center;
      width: 580px;
      height: 100%;
      .app-submit-des-text {
        font-family: 'Gotham-Medium';
        font-size: 18px;
        // width: 100%;
        height: 46px;
        color: #444444;
        letter-spacing: -1.38px;
        text-align: left;
        display: flex;
        align-items: center;
      }
      .app-submit-name {
        width: 100%;
        height: 40px;
        background: #F6F6F6;
        border: 1px solid #DCDCDC;
        outline:none;
        font-family: 'Gotham-Book';
        font-size: 12px;
        color: #444444;
        letter-spacing: -0.75px;
        text-align: left;
        padding-left: 10px;
      }
      .app-submit-num {
        font-family: 'Gotham-Book';
        font-size: 12px;
        color: #B2B2B2;
        letter-spacing: -0.75px;
        text-align: right;
        height: 30px;
        line-height: 30px;
      }
      .app-submit-des {
        width: 580px;
        height: 300px;
        background: #F6F6F6;
        border: 1px solid #DCDCDC;
        outline:none;
        font-family: 'Gotham-Book';
        font-size: 12px;
        color: #444444;
        letter-spacing: -0.75px;
        text-align: left;
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
      }
    }
  }
}

</style>

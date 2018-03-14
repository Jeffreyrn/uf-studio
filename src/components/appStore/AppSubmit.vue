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
      <div class="app-submit-btn" v-bind:class="classObject">
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
        <input type="text" class="app-submit-name" v-model="name" />
        <div class="app-submit-num">
          {{ nameNum - name.length }}
        </div>
        <div class="app-submit-des-text" style="margin-top:30px;">
          Description
        </div>
        <textarea class="app-submit-des" v-model="des">
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
        model: GlobalUtil.model,
        name: '',
        des: '',
        nameNum: 50,
        desNum: 1000,
        // state: 'normal', // normal, cansubmit, uploaded, reviewing, approve, failed
      };
    },
    mounted() {
      GlobalUtil.model.localAppsMgr.curUploadState = 'failed';
      // GlobalUtil.model.localAppsMgr.curUploadState = 'uploaded';
      // GlobalUtil.model.localAppsMgr.curUploadState = 'cansubmit';
    },
    methods: {
    },
    computed: {
      classObject: () => {
        return {
          'app-submit-btn-normal': GlobalUtil.model.localAppsMgr.curUploadState==='normal',
          'app-submit-btn-cansubmit': GlobalUtil.model.localAppsMgr.curUploadState==='cansubmit',
          'app-submit-btn-uploaded': GlobalUtil.model.localAppsMgr.curUploadState==='uploaded',
          'app-submit-btn-reviewing': GlobalUtil.model.localAppsMgr.curUploadState==='reviewing',
          'app-submit-btn-approve': GlobalUtil.model.localAppsMgr.curUploadState==='approve',
          'app-submit-btn-failed': GlobalUtil.model.localAppsMgr.curUploadState==='failed',
        }
      },
      submitButtonValue() {
        switch (GlobalUtil.model.localAppsMgr.curUploadState) {
          case 'normal':
          case 'cansubmit':
            return 'Summit';
          case 'uploaded':
            return 'Uploaded';
          case 'reviewing':
            return 'Reviewing';
          case 'approve':
            return 'Approve';
          case 'failed':
            return "Failed";
        }
      },
    },
    watch:{
      "name": function() {
        this.name = this.name.substr(0,50);
      },
      "des": function() {
        this.des = this.des.substr(0,1000);
      },
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
      background-image: url('../../assets/img/appStore/icon_close.svg');
      background-position: center;
      background-size: 14px 15px;
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
        width: 100%;
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

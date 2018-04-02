<template>
  <div class="log-wrapper com-module-wrapper">
    <div class="com-back-home-wrapper com-text-center" style="position: relative">
      <a @click="goBack()"><img class="com-icon-back" src="../../assets/img/common/icon_back.svg"/></a>
      <span class="com-font-GB-24 com-module-name">Studio Log</span>
      <el-button type="primary" icon="el-icon-download" style="position: absolute;right: 4vw;" @click="downloadDoc()">Download</el-button>
    </div>
    <div class="log-content" id="log-content" @scroll="scrollToBottom()">
      <ul>
        <li v-for="(item, index) in logInfo">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logInfo: '',
      number: 50,
    };
  },
  created() {
    this.getLogInfo();
  },
  mounted() {
  },
  methods: {
    goBack() {
      this.number = 50;
      this.$router.push('Setting');
    },
    getLogInfo() {
      const params = {
        data: {
          count: this.number,
        },
      };
      window.GlobalUtil.socketCom.sendCmd(window.GlobalConstant.SETTING_GET_LOG_INFO, params, (response) => {
        const logInfoData = response.data;
        if (logInfoData.length > 0) {
          this.logInfo = logInfoData.reverse();
          this.number += 50;
        }
        else {
//          console.log('logInfo2', response);
        }
      });
    },

    scrollToBottom() {
      const logContenId = document.getElementById('log-content');
      if (logContenId.scrollHeight - logContenId.scrollTop - logContenId.clientHeight < 1) {
        setTimeout(this.getLogInfo(), 2000);
      }
    },
    downloadDoc() {
      fetch(`http://${window.GlobalUtil.socketInfo.host}/handler/log/download`).then(response => response.blob().then((blob) => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        const filename = 'studio-log.tar.gz';
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      }))
    },
//    getScrollTop() {
//      let bodyScrollTop = 0;
//      let documentScrollTop = 0;
//      if (document.body) {
//        bodyScrollTop = document.body.scrollTop;
//      }
//      if (document.documentElement) {
//        documentScrollTop = document.documentElement.scrollTop;
//      }
//      return Math.max(bodyScrollTop, documentScrollTop);
//    },
//    getClientHeight() {
//      let windowHeight = 0;
//      if (document.compatMode === 'CSS1Compat') {
//        windowHeight = document.documentElement.clientHeight;
//      }
//      else {
//        windowHeight = document.body.clientHeight;
//      }
//      return windowHeight;
//    },
//    getScrollHeight() {
//      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
//    },
  },
  watch: {
    $route() {
      if (this.$route.name === 'LogInfo') {
        this.getLogInfo();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .log-wrapper {
    height: 100%;
    width:100%;
    .log-content {
      width: 100%;
      padding: 2vw 5vw;
      height: 90vh;
      margin: 0 auto;
      font-size: 14px;
      overflow-y: auto;
      ul {
        li {
          width: 100%;
          word-break: keep-all;
          overflow: hidden;
        }
      }
    }
  }
</style>

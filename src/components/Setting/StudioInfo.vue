<template>
  <div class="studio-wrapper com-module-wrapper">
    <div class="com-back-home-wrapper com-text-center update-head">
      <router-link :to="{name:'Setting'}"><img class="com-icon-back" src="../../assets/img/common/icon_back.svg"/></router-link>
      <span class="com-font-GB-24 com-module-name">Studio Info</span>
    </div>
    <div class="content-wrapper com-flex-center">
      <div v-for="(item, index) in info" class="info-wrapper com-flex-center">
        <h2 class="title">{{ item.title }}</h2>
        <div class="content" v-for="itemName in item.data">
          <div class="left">
            <span class="name">{{ itemName.name }} :</span>
          </div>
          <div class="right">
            <span class="name">{{ itemName.nameValue }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        deviceInfo: {
          title: 'Device infomation',
          data: {
            device: {
              name: 'device',
              nameValue: '',
            },
            deviceVersion: {
              name: 'Device Version',
            },
            firmwareVersion: {
              name: 'Firmware Version',
            },
            machineUnique: {
              name: 'Machine Unique',
            },
            portNumber: {
              name: 'Port Number',
            },
            serialNumber: {
              name: 'Serial Number',
            },
          },
        },
        studioInfo: {
          title: 'Studio infomation',
          data: {
            version: {
              name: 'Version',
              nameValue: '',
            },
            xArmCoreVersion: {
              name: 'xArmCore Version',
            },
            xArmJediVersion: {
              name: 'xArmJedi Version',
            },
            xArmDaemonVersion: {
              name: 'xArmDaemon Version',
            },
            xArmStudioVersion: {
              name: 'xArmStudio Version',
            },
            studioLanguage: {
              name: 'Studio Language',
            },
          },
        },
      },
    };
  },
  created() {
    this.getInfo(window.GlobalConstant.SETTING_GET_DEVICE_INFO, this.info.deviceInfo.data);
    this.getInfo(window.GlobalConstant.SETTING_GET_STUDIO_INFO, this.info.studioInfo.data);
  },
  mounted() {
  },
  methods: {
    getInfo(cmd, type) {
      const data = {};
      window.GlobalUtil.socketCom.sendCmd(cmd, data, (response) => {
        const responseData = (response.data !== undefined) ? response.data : response;
        if (responseData) {
          for (const key in responseData) {
            for (const key2 in type) {
              if (key === key2) {
                type[key2].nameValue = responseData[key];
              }
            }
          }
        }
      });
    },
  },
  watch: {
    $route() {
      if (this.$route.name === 'StudioInfo') {
        this.getInfo(window.GlobalConstant.SETTING_GET_DEVICE_INFO, this.info.deviceInfo.data);
        this.getInfo(window.GlobalConstant.SETTING_GET_STUDIO_INFO, this.info.studioInfo.data);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .studio-wrapper {
    color: #444;
    overflow-y: hidden;
    .content-wrapper {
      height: 90%;
      overflow-y: auto;
      align-items: center;
    }
    .info-wrapper {
      border-bottom:  1px solid #979797;
      height: 50%;
      width: 90%;
    }
    .info-wrapper:last-child {
      border: none;
    }
    .title {
      font-family: 'Gotham-Bold';
      font-size: 1.8rem;
      letter-spacing: -1.67px;
      padding-bottom: 2%;
      text-align: center;
    }
    .content {
      display: flex;
      justify-content: center;
      font-size: 1.3rem;
      .left {
        width: 40%;
        display: flex;
        flex-direction: column;
        padding-right: 4%;
        text-align: right;
        span {
          font-family: 'Gotham-Book';
          letter-spacing: -1.33px;
          padding: 1% 0;
        }
      }
      .right {
        width: 40%;
        display: flex;
        flex-direction: column;
        text-align: left;
        padding-left: 4%;
        span {
          font-family: 'Gotham-Medium';
          letter-spacing: -1.33px;
          padding: 1% 0;
        }
      }
    }
  }
  .com-flex-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>

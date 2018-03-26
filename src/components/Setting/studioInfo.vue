<template>
  <div class="studio-wrapper com-module-wrapper">
    <div class="com-back-home-wrapper com-text-center update-head">
      <router-link :to="{name:'Setting'}"><img class="com-icon-back" src="../../assets/img/common/icon_back.svg"/></router-link>
      <span class="com-font-GB-24 com-module-name">Studio Info</span>
    </div>
    <div>
      <div v-for="(item, index) in info">
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .studio-wrapper {
    text-align: center;
    color: #444;
    .title {
      font-family: 'Gotham-Bold';
      font-size: 2.4rem;
      letter-spacing: -1.67px;
      padding: 2%;
    }
    .content {
      display: flex;
      justify-content: center;
      font-size: 1.4rem;
      .left {
        width: 40%;
        display: flex;
        flex-direction: column;
        padding-right: 4%;
        text-align: right;
        span {
          font-family: 'Gotham-Book';
          letter-spacing: -1.33px;
          padding: 6px 0;
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
          padding: 6px 0;
        }
      }
    }
  }
</style>

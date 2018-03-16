<template>
  <div class="update-wrapper com-module-wrapper">
    <div class="com-back-home-wrapper com-text-center update-head">
      <router-link :to="{name:'Setting'}"><img class="com-icon-back" src="../../assets/img/common/icon_back.svg"/></router-link>
      <span class="com-font-GB-24 com-module-name">Software Update</span>
      <div class="update-tip">
        <span v-if="countUpdates.boolean" class="have-update">{{ countUpdates.number }} updates avaliable</span>
        <span v-else>You are using the latest version, no updates available</span>
      </div>
    </div>
    <div class="conten-wrapper">
      <div class="update-content" v-for="(item, index) in haveUpdate" :key="index">
        <div class="update-info">
          <span class="name">{{ item.name }}</span>
          <span class="version">{{ item.version }}</span>
          <span class="time">Released January 1, 2018</span>
        </div>
        <div class="update-text">
          <span v-if="item.update">This Version Updates：</span>
          <span v-else>This Version Updated：</span>
          <ul>
            <li>Fix  an issue where using certain character sequences could cause apps to crash</li>
            <li>Fixes  an issue where some third-party apps could fail to connect to external accessories</li>
          </ul>
        </div>
        <div class="update-btn-wrapper">
          <el-button v-if="item.update" @click="startUpdate()">Update</el-button>
          <el-button v-else style="background:#CFCFCF;" disabled>Update</el-button>
          <p v-if="item.update">Restart Required</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      haveUpdate: [
        {
          name: 'Software',
          version: '',
          time: '',
          text: [],
          update: false,
        },
        {
          name: 'Hardware',
          version: '',
          time: '',
          text: [],
          update: true,
        },
      ],
    };
  },
  created() {
    this.checkUpdate();
    this.getVersion();
  },
  mounted() {
  },
  methods: {
    checkUpdate() {
      const data = {};
      window.GlobalUtil.socketCom.sendCmd(window.GlobalConstant.SETTING_CHECK_UPDATE, data, (response) => {
        const checkUpdate = response.data;
        if (checkUpdate) {
          this.haveUpdate[0].update = checkUpdate.xArmStudioUpdate;
          this.haveUpdate[1].update = checkUpdate.xArmCoreUpdate;
        }
      });
    },
    getVersion() {
      const data = {};
      window.GlobalUtil.socketCom.sendCmd(window.GlobalConstant.SETTING_GET_SOFTWARE_VERSION, data, (response) => {
        const softwareVersion = response.data;
        if (softwareVersion) {
          this.haveUpdate[0].version = `xArm Studio ${softwareVersion.xArmStudioVersion}`;
          this.haveUpdate[1].version = `ROS ${softwareVersion.xArmCoreVersion}`;
        }
      });
    },
    startUpdate() {
      const data = {};
      window.GlobalUtil.socketCom.sendCmd(window.GlobalConstant.SETTING_START_UPDATE, data, (response) => {
        const installPackage = response.data;
        if (installPackage) {
//          console.log('installPackage', installPackage);
        }
      });
    },
  },
  computed: {
    countUpdates() {
      const softWare = this.haveUpdate[0].update;
      const hardware = this.haveUpdate[1].update;
      if (softWare && hardware) {
        return {
          number: 2,
          boolean: true,
        }
      }
      else if (softWare || hardware) {
        return {
          number: 1,
          boolean: true,
        }
      }
      return {
        boolean: false,
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .update-wrapper {
    height: 100%;
    width:100%;
    .update-head {
      position: relative;
      .update-tip {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 40px;
        display: flex;
        align-items: center;
        span {
          font-family: 'Gotham-Bold';
          font-size: 1.4rem;
          letter-spacing: -1.33px;
          color: #444;
        }
        .have-update {
          color: #E24D4A;
        }
      }
    }
    .conten-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      width: 100%;
      height: 80%;
    }
    .update-content:last-child {
      border: none;
    }
    .update-content {
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50%;
      border-bottom:  1px solid #979797;
      .update-info {
        display: flex;
        flex-direction: column;
        color: #444;
        .name {
          font-family: 'Gotham-Bold';
          font-size: 1.6rem;
          letter-spacing: -2px;
        }
        .version {
          font-family: 'Gotham-Medium';
          font-size: 1.4rem;
          letter-spacing: -0.8px;
        }
        .time {
          font-family: 'Gotham-Book';
          font-size: 1.4rem;
          letter-spacing: -1.67px;
        }
      }
      .update-text {
        font-family: 'Gotham-Book';
        font-size: 1.2rem;
        color: #444;
        letter-spacing: -1.67px;
        padding-left: 2vw;
        span {
          font-family: 'Gotham-Medium';
        }
        li {
          list-style: disc;
          padding-top: 10px;
        }
      }
      .update-btn-wrapper {
        button {
          width: 142px;
          height: 51px;
          border-radius: 100px;
          color: #fff;
          background: #52BF53;
          outline: none;
        }
        p {
          font-family: 'Gotham-Book';
          font-size: 1.2rem;
          color: #555;
          letter-spacing: -1.67px;
          padding-top: 10px;
          padding-left: 4px;
        }
      }
    }
  }
</style>

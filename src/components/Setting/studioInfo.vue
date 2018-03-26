<template>
  <div class="studio-wrapper com-module-wrapper">
    <div class="com-back-home-wrapper com-text-center update-head">
      <router-link :to="{name:'Setting'}"><img class="com-icon-back" src="../../assets/img/common/icon_back.svg"/></router-link>
      <span class="com-font-GB-24 com-module-name">Studio Info</span>
    </div>
    <div>
      <div v-for="(item, index) in info">
        <h2 class="title">{{ item.title }}</h2>
        <div class="content">
          <div class="left">
            <span class="name" v-for="(itemArr, indexArr) in item.name">{{ itemArr }} :</span>
          </div>
          <div class="right">
            <span class="name" v-for="(itemArr, indexArr) in item.nameValue">{{ itemArr }}</span>
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
          name: ['device', 'Port Number', 'Firmware Version:', 'Serial Number', 'Device Version', 'Machine Unique'],
          nameValue: ['123', '345', '123', '345', '123', '345'],
        },
        studioInfo: {
          title: 'Studio infomation',
          name: ['Version', 'xArmCore Version', 'Firmware Version:', 'xArmJedi Version', 'xArmDaemon Version', 'xArmStudio Version', 'Studio Language'],
          nameValue: [],
        },
      },
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {},
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
      align-items: center;
      font-size: 1.4rem;
      text-align: left;
      .left {
        width: 20%;
        display: flex;
        flex-direction: column;
        span {
          font-family: 'Gotham-Book';
          letter-spacing: -1.33px;
          padding: 6px 0;
        }
      }
      .right {
        width: 24%;
        display: flex;
        flex-direction: column;
        span {
          font-family: 'Gotham-Medium';
          letter-spacing: -1.33px;
          text-align: center;
          padding: 6px 0;
        }
      }
    }
  }
</style>

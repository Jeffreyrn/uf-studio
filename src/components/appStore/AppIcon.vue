<template>
  <div>
    <router-link :to="{name: 'AppDetail', params:{data: data}}">
      <span v-if="data.control ==='run'" class="icon-btn icon-run"></span>
      <span v-if="data.control ==='install'" class="icon-btn icon-download"></span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      dataIcon: '',
    };
  },
  mounted() {
  },
  methods: {
    oninstall() {
      window.CommandsAppsSocket.appInstall(this.data.category, this.data.name, this.data.version, (dict) => {
//        console.log(`CommandsAppsSocket appInstall = ${JSON.stringify(dict)}`);
        if (dict.code === 0) {
          this.data.control = 'run';
        }
        else {
          this.errorAlert = true;
        }
      });
    },
  },
  components: {
  },
};
</script>

<style scoped lang="scss">
  .icon-btn {
    position: absolute;
    right: 4px;
    bottom: 4px;
    display: block;
    width: 22px;
    height: 22px;
    margin-left: 0.5rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 22px 22px;
    cursor: pointer;
  }
  .icon-download {
    background-image: url('./../../assets/img/appStore/btn_undownload.svg');
  }
  .icon-run {
    background-image: url('./../../assets/img/appStore/btn_info.svg');
  }

</style>

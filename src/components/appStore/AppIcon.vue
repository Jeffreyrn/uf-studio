<template>
  <div>
    <span v-if="dataIcon ==='run'" class="icon-btn icon-run"></span>
    <span v-if="dataIcon ==='install'" class="icon-btn icon-download"></span>
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
    if (this.data !== undefined && this.data !== '') {
      this.dataIcon = this.data;
    }
  },
  methods: {
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
    background-image: url('./../../assets/img/appStore/btn_play.svg');
  }

</style>

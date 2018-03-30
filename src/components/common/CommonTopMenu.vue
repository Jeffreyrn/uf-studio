<template>
  <div class="com-header-wrapper">
    <div class="back-wrapper">
      <span @click='onback' class="btn">
        <img src="./../../assets/img/ide/icon_back.svg" alt="back"/>
      </span>
      <span>
        {{ title }}
      </span>
    </div>
    <div class="file-name" v-text="curFileName"></div>
    <div class="menu-wrapper">
      <div class="cursor-pointer" v-if="issaved===false" @click='onsave'>
        <img src="./../../assets/img/blockly/btn_save.svg"/>
        <span>save</span>
      </div>
      <div v-else style="opacity: 0.3">
        <img src="./../../assets/img/blockly/btn_save.svg"/>
        <span>save</span>
      </div>
      <div class="cursor-pointer" @click='onnew'>
        <img src="./../../assets/img/blockly/btn_addfile.svg"/>
        <span>new</span>
      </div>
      <div class="cursor-pointer" v-if="type==='paint'" @click='onlist'>
        <img src="./../../assets/img/blockly/btn_list.svg"/>
        <span>list</span>
      </div>
      <div v-if="isRunning===false" @click="onstart" class="run-btn cursor-pointer">
        <img src="./../../assets/img/blockly/icon_start.svg" style="width:30px;height:30px;"/>
      </div>
      <div v-else @click="onstop" class="stop-btn cursor-pointer">
        <div style="width:10px;height:10px;background:white;"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['type', 'title', 'onback', 'onsave', 'onnew', 'onstart', 'onstop', 'onlist', 'curFileName', 'issaved', 'isRunning'],
  name: 'common-top-menu',
  data() {
    return {
      model: window.GlobalUtil.model,
    };
  },
  mounted() {
  },
  activated: function() {
  },
  methods: {
  },
  beforeDestroy() {
  },
  watch: {
  },
  computed: {
  },
  components: {
  },
};
</script>
<style scoped lang="scss">

.com-header-wrapper {
  height: 60px;
  line-height: 60px;
  background: #575C62;
  display: flex;
  justify-content: space-between;
  img {
    width: 1.6rem;
  }
  span {
    margin-left: 1rem;
    font-family: 'Gotham-Bold';
    font-size: 2rem;
    color: #fff;
    letter-spacing: -1px;
  }
  .file-name {
    color: white;
    font-family: 'Gotham-Bold';
  }
}
.back-wrapper {
  .btn {
    cursor: pointer;
  }
  padding-left: 1vw;
}
.menu-wrapper {
  display: flex;
  & > div {
    padding: 0 1vw;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      font-size: 0.7em;
      padding: 0;
      margin: 0;
      line-height: 1.2vw;
      text-transform: capitalize;
    }
  }
  .run-btn {
    background-color: #52BF53;
    width: 60px;
    height: 60px;
    border: 0;
    // line-height: 0.2;
    // // padding: 1.2vw;
    // img{
    //   width: 120%;
    // }
  }
  .stop-btn {
    width: 60px;
    height: 60px;
    border: 0;
    background: rgba(224,78,77,1);
  }
}

</style>
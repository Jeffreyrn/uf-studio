<template>
  <div>
    <div class="tab-contain" v-for="(item,index) in tabContain" :key="index">
      <ul>
        <li v-for="(icon ,index) in model.localAppsMgr.allApps.my.data">
          <!--<a><img :src="icon.img"/><span>{{ icon.name }}</span></a>-->
          {{ icon.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: GlobalUtil.model,
        tabContain: {
          1: {
            1: {
              img: require('../../assets/img/appStore/shopping_bag.svg'),
              name: 'myapp',
            },
            2: {
              img: require('../../assets/img/appStore/shopping_bag.svg'),
              name: 'myapp',
            },
          },
        },
      };
    },
    mounted() {
    },
    methods: {
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>

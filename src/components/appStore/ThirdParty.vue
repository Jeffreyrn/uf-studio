<template>
  <div>
    <div class="tab-contain" v-for="(item,index) in tabContain" :key="index">
      <ul>
        <li v-for="(icon ,index) in model.localAppsMgr.allApps.thirdparty.data">
          <router-link :to="{name: 'AppDetail'}">
            <div style="width:100%;height:100%;">
              <span>{{ icon.name }}</span>
            </div>
          </router-link>
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
              name: 'thirdparty',
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

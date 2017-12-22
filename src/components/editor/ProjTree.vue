<template>
  <div>
    <el-row class="tac">
      <el-col>
        <h5>工程名称</h5>
        <el-menu
          default-active="1"
          background-color="transparent"
          text-color="blue"
          active-text-color="red"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <span slot="title">文件夹1</span>
            </template>
            <el-menu-item index="1-1">aa.py</el-menu-item>
            <el-menu-item index="1-2">bb.py</el-menu-item>
            <el-menu-item index="1-3">cc.py</el-menu-item>
            <el-submenu index="1-4" >
              <template slot="title">文件夹102</template>
              <el-menu-item index="1-4-1">dd.py</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <template slot="title">
              <span slot="title">文件夹2</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3">
            <template slot="title">
              <span slot="title">文件夹3</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleTitleMouseenter() {
    },
    handleTitleMouseleave() {
    },
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

<style scoped>
.background-color-transparent {
  background-color:transparent;
}
el-menu {
  background-color:transparent;
}
a:hover {
  background-color:transparent;
}
</style>

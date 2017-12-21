<template>
  <div>
    <el-row class="tac" style="background-color:transparent;">
      <el-col :span="20">
        <h5>工程名称</h5>
        <el-menu
          style="background-color:transparent;"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <!-- <i class="el-icon-location"></i> -->
              <span>文件夹1</span>
            </template>
            <el-menu-item index="1-1">aa.py</el-menu-item>
            <el-menu-item index="1-2">bb.py</el-menu-item>
            <el-menu-item index="1-3">cc.py</el-menu-item>
            <el-submenu index="1-4">
              <template slot="title">文件夹102</template>
              <el-menu-item index="1-4-1">dd.py</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <!-- <i class="el-icon-menu"></i> -->
            <span slot="title">文件夹2</span>
          </el-menu-item>
          <el-menu-item index="3">
            <!-- <i class="el-icon-setting"></i> -->
            <span slot="title">文件夹3</span>
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
    handleClose() {

    },
    handleOpen() {

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

</style>

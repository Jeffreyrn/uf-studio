<!-- <template>
  <div id="pro-tree">
    <h5>{{ model.localProjTree.curProj.name }}</h5>
    <el-menu
      id='pro-menu'
      background-color="transparent"
      hover-background=""
      class="el-menu-vertical-demo"
      text-color="blue"
      @open="handleOpen"
      @close="handleClose">
      <ProjTreeListFolder superid=''></ProjTreeListFolder>
    </el-menu>
  </div>
</template>

<script>
import ProjTreeListFolder from './ProjTreeListFolder';
import Vue from 'vue';

Vue.component('Folder', {
  // 声明 props
  props: ['message'],
  // 同样也可以在 vm 实例中像 "this.message" 这样使用
  template: '<span>{{ message }}</span>'
})

export default {
  data() {
    return {
      model: GlobalUtil.model,
    };
  },
  mounted() {
    // const curProj = GlobalUtil.model.localProjTree.curProj;
    // const files = GlobalUtil.model.localProjTree.getAllFilesByFolder(curProj);
    // this.filesList = files;
    // console.log('files');
    // console.log(files);
    GlobalUtil.rootMenu = document.getElementById('pro-menu');
    const proTree = document.getElementById('pro-tree');
    proTree.style.backgroundColor = GlobalUtil.model.localProjTree.treeBgColor;
  },
  methods: {
    filesList(superid) {
      const files = GlobalUtil.model.localProjTree.getAllFilesByFolder(superid);
      return files;
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
      GlobalUtil.model.localProjTree.setSelectedFileUUID(key);
      GlobalUtil.model.localProjTree.resetFileBackground();
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
      GlobalUtil.model.localProjTree.setSelectedFileUUID(key);
      GlobalUtil.model.localProjTree.resetFileBackground();
    },
    mouseenter() {
      console.log(`handleTitleMouseenter`);
    },
    mouseleave() {
      console.log(`handleTitleMouseleave`);
    },
    onClickItem(e) {
      console.log(e);
    },
  },
  beforeDestroy() {
  },
  watch: {
  },
  computed: {
  },
  components: {
    ProjTreeListFolder,
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
</style> -->

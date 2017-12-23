<template>
  <div>
    <template v-for='(data,index) in filesList(superid)'>
      <div v-if="data.type === model.localProjTree.PROJ_TREE_TYPE.FOLDER">
        <el-submenu :index="data.uuid" name="submenu">
          <template slot="title">
            <span name="file-name"> {{ data.name }} </span>
          </template>
          <items :superid='data.uuid'></items>
        </el-submenu>
      </div>
      <div v-if="data.type === model.localProjTree.PROJ_TREE_TYPE.FILE">
        <el-menu-item :index="Math.random()" @click="onClick(data.uuid)">
          <span :id="genFileId(data.uuid)" name="file-name">{{ data.name }} </span>
        </el-menu-item>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'items',
  props: ['superid'],
  data() {
    return {
      model: GlobalUtil.model,
    };
  },
  mounted() {
    document.getElementById('pro-menu').hoverBackground = 'red';
    const submenus = document.getElementsByClassName('el-submenu__title');
    const fileDivsCount = submenus.length;
    console.log(`submenus 1 count = ${fileDivsCount}`);
    for (let i = 0; i < submenus.length; i++) {
      let submenu = submenus[i];
      // submenu.hoverBackground = 'red';
      // submenu.style.backgroundColor = 'yellow';
      // submenu.onmouseenter = null;
      // const title = submenu.$refs['submenu-title'];
      // title.style.backgroundColor = 'red';

      // submenu.removeEventListener('mouseenter', document.getElementById('pro-menu').handleTitleMouseenter);
      // submenu.removeEventListener('click', 'handleClick');
      // submenu.$off('mouseenter');
    }

    const items = document.getElementsByClassName('el-menu-item');
    const itemsCount = items.length;
    console.log(`items 1 count = ${itemsCount}`);
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      // submenu.hoverBackground = 'red';
      // submenu.style.backgroundColor = 'yellow';
      // submenu.onmouseenter = null;
      // const title = submenu.$refs['submenu-title'];
      // title.style.backgroundColor = 'red';
      // submenu.removeEventListener('mouseenter', 'handleTitleMouseenter');
      // item.removeEventListener('click', this.onClick);
    }
  },
  methods: {
    genFileId(uid) {
      return `file-id-${uid}`;
    },
    onClick(uuid) {
      GlobalUtil.model.localProjTree.setSelectedFileUUID(uuid);
      console.log(`folder uuid = ${GlobalUtil.model.localProjTree.curSelectedFolderUUID}`);
      this.setSelected(uuid);
      // const promenu = document.getElementById('pro-menu');
      // console.log(`promenu = ${promenu.innerHTML}`);
    },
    setSelected(uuid) {
      const fileNames = document.getElementsByName('file-name');
      for (let i = 0; i < fileNames.length; i++) {
        const fileName = fileNames[i];
        fileName.style.color = 'blue';
      }
      if (uuid !== null) {
        const fileName = document.getElementById(`file-id-${uuid}`);
        fileName.style.color = 'red';
      }
    },
    filesList(superid) {
      const files = GlobalUtil.model.localProjTree.getAllFilesByFolder(superid);
      return files;
    },
  },
  beforeDestroy() {
  },
  watch: {
  },
  computed: {
  },
  components: {
    // ProjTreeListFolder,
  },
};
</script>

<style scoped>

</style>

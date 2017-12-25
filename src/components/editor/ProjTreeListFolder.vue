<template>
  <div>
    <template v-for='(data,index) in filesList(superid)'>
      <div v-if="data.type === model.localProjTree.PROJ_TREE_TYPE.FOLDER">
        <el-submenu :index="data.uuid" name="submenu" :id="genMenuId(data.uuid)">
          <template slot="title">
            <!-- <div style="width:100%;height:100%;background-color:pink;"> -->
            <span name="file-name" :id="genFileId(data.uuid)"> {{ data.name }} </span>
            <!-- </div> -->
          </template>
          <!-- <span slot="title" name="file-name"> {{ data.name }} </span> -->
          <items :superid='data.uuid'></items>
        </el-submenu>
      </div>
      <div v-if="data.type === model.localProjTree.PROJ_TREE_TYPE.FILE">
        <div :id="genMenuId(data.uuid)">
          <el-menu-item :index="Math.random()" @click="onClick(data.uuid)">
            <span :id="genFileId(data.uuid)" name="file-name">{{ data.name }} </span>
          </el-menu-item>
        </div>
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
      submenu.onmouseenter = (e) => {
        // console.log(`onmouseenter onmouseenter`);
        e.currentTarget.style.backgroundColor = 'pink';
      };
      submenu.onclick = (e) => {
        console.log(`onclick onclick`);
        e.currentTarget.style.backgroundColor = 'pink';
      };
      submenu.onfocus = (e) => {
        // console.log(`onclick onclick`);
        e.currentTarget.style.backgroundColor = 'pink';
      };
    }

    const items = document.getElementsByClassName('el-menu-item');
    const itemsCount = items.length;
    console.log(`items 1 count = ${itemsCount}`);
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      item.onmouseenter = (e) => {
        // console.log(`onmouseenter onmouseenter`);
        e.currentTarget.style.backgroundColor = 'pink';
      };
      item.onclick = (e) => {
        // console.log(`onclick onclick`);
        e.currentTarget.style.backgroundColor = 'pink';
      };
      item.focus = (e) => {
        // console.log(`onclick onclick`);
        e.currentTarget.style.backgroundColor = 'pink';
      };
      item.onblur = (e) => {
        // console.log(`onblur onblur`);
        e.currentTarget.style.backgroundColor = 'transparent';
      };
      item.onmouseleave = (e) => {
        // console.log(`onmouseleave onmouseleave`);
        e.currentTarget.style.backgroundColor = 'transparent';
      };
    }
  },
  methods: {
    genMenuId(uid) {
      return `menu-id-${uid}`;
    },
    genFileId(uid) {
      return `file-id-${uid}`;
    },
    onClick(uuid) {
      GlobalUtil.model.localProjTree.setSelectedFileUUID(uuid);
      // GlobalUtil.model.localProjTree.curSelectedFileUUID = uuid;
      GlobalUtil.model.localProjTree.curSelectedFolderUUID = '';
      console.log(`folder uuid = ${GlobalUtil.model.localProjTree.curSelectedFolderUUID}`);
      this.setSelected(uuid);
      // const promenu = document.getElementById('pro-menu');
      // console.log(`promenu = ${promenu.innerHTML}`);
    },
    setSelected(uuid) {
      // GlobalUtil.model.localProjTree.resetFolderBackground();
      GlobalUtil.model.localProjTree.resetFileBackground(true);
      if (uuid !== null) {
        const fileName = document.getElementById(`file-id-${uuid}`);
        fileName.style.color = 'red';
        const menuName = document.getElementById(`menu-id-${uuid}`);
        menuName.style.backgroundColor = 'pink';
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

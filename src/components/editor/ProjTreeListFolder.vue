<template>
  <div>
    <template v-for='(data,index) in filesList(superid)'>
      <div v-if="data.type === model.localProjTree.PROJ_TREE_TYPE.FOLDER">
        <el-submenu :index="data.uuid" name="submenu">
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
      submenu.onmouseenter = (e) => {
        // console.log(`onmouseenter onmouseenter`);
        e.currentTarget.style.backgroundColor = 'pink';
      };
      // submenu.onclick = (e) => {
      //   console.log(`onclick onclick`);
      //   e.currentTarget.style.backgroundColor = 'pink';
      // };
      // submenu.onfocus = (e) => {
      //   // console.log(`onclick onclick`);
      //   e.currentTarget.style.backgroundColor = 'pink';
      // };
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
      // item.onclick = (e) => {
      //   // console.log(`onclick onclick`);
      //   e.currentTarget.style.backgroundColor = 'pink';
      // };
      // item.focus = (e) => {
      //   // console.log(`onclick onclick`);
      //   e.currentTarget.style.backgroundColor = 'pink';
      // };
      // item.onblur = (e) => {
      //   // console.log(`onblur onblur`);
      //   e.currentTarget.style.backgroundColor = 'transparent';
      // };
      // item.onmouseleave = (e) => {
      //   // console.log(`onmouseleave onmouseleave`);
      //   e.currentTarget.style.backgroundColor = 'transparent';
      // };
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
        fileName.style.backgroundColor = 'transparent';
      }
      if (uuid !== null) {
        const fileName = document.getElementById(`file-id-${uuid}`);
        fileName.style.color = 'red';
        fileName.style.backgroundColor = 'pink';
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

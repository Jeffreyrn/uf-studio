<template>
  <div>
    <template v-for='(data,index) in filesList(superid)'>
      <div v-if="data.type === model.localProjTree.PROJ_TREE_TYPE.FOLDER">
        <el-submenu :index="data.uuid">
          <template slot="title">
            <span name="file-name"> {{ data.name }} -- {{ data.uuid }} </span>
          </template>
          <items :superid='data.uuid'></items>
        </el-submenu>
      </div>
      <div v-if="data.type === model.localProjTree.PROJ_TREE_TYPE.FILE">
        <el-menu-item :index="Math.random()" @click="onClick(data.uuid)">
          <span :id="genFileId(data.uuid)" name="file-name">{{ data.name }} -- {{ data.uuid }}</span>
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
  },
  methods: {
    genFileId(uid) {
      return `file-id-${uid}`;
    },
    onClick(uuid) {
      GlobalUtil.model.localProjTree.setSelectedFileUUID(uuid);
      console.log(`folder uuid = ${GlobalUtil.model.localProjTree.curSelectedFolderUUID}`);
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

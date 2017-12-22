<template>
  <div>
    <template v-for='(data,index) in filesList(superid)'>
      <div v-if="data.type === model.localProjTree.PROJ_TREE_TYPE.FOLDER">
        <el-submenu :index="data.uuid">
          <template slot="title">
            <div> {{ data.name }} -- {{ data.uuid }} </div>
          </template>
          <items :superid='data.uuid'></items>
        </el-submenu>
      </div>
      <div v-if="data.type === model.localProjTree.PROJ_TREE_TYPE.FILE">
        <el-menu-item :index="Math.random()" @click="onClick($event, data.uuid)">
          {{ data.name }} -- {{ data.uuid }}
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
    onClick(e, uuid) {
      console.log(e);
      GlobalUtil.model.localProjTree.setSelectedFileUUID(uuid);
      console.log(`folder uuid = ${GlobalUtil.model.localProjTree.curSelectedFolderUUID}`);
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

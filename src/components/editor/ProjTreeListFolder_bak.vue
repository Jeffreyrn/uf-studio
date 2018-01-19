<!-- <template>
  <div>
    <template v-for='(data,index) in filesList(superid)'>
      <div v-if="data.type === model.localProjTree.PROJ_TREE_TYPE.FOLDER">
        <el-submenu :index="data.uuid" name="submenu" :id="genMenuId(data.uuid)">
          <template slot="title">
            <span name="file-name" :id="genFileId(data.uuid)"> {{ data.name }} </span>
          </template>
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
      console.log(`folder uuid = ${GlobalUtil.model.localProjTree.curFile.uuid}`);
      GlobalUtil.model.localProjTree.resetFileBackground(true);
      // GlobalUtil.model.localProjTree.setSelectedFileStyle(uuid, true);
      GlobalUtil.model.localProjTree.addOpenFile(uuid);
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

</style> -->

<template>
  <el-tree
    id="tree-root"
    style="padding-left:10px;"
    class="ide-project-list noselected"
    :data="model.localProjTree.curProTreeDatas"
    node-key="uuid"
    :indent=12
    :render-content="renderContent"
    :default-expanded-keys="model.localProjTree.curProjExpandedKeys"
    @node-click="handleNodeClick">
  </el-tree>
</template>

<script>

export default {
  data() {
    return {
      model: GlobalUtil.model,
      // curProTreeDatas: GlobalUtil.model.localProjTree.curProTreeDatas,
      defaultProps: {
        children: 'children',
        label: 'label',
        uuid: 'uuid',
      },
      fileIcon: {
        py: require('./../../assets/img/ide/language_python.svg'),
        doc: require('./../../assets/img/ide/icon_documents.svg'),
        folder: require('./../../assets/img/ide/icon_folder.svg'),
        openfolder: require('./../../assets/img/ide/icon_openfolder.svg'),
      },
    };
  },
  mounted() {
    console.log(`el tree mounted`);
  },
  created() {
    console.log(`el tree created`);
  },
  methods: {
    handleNodeClick(data) {
      GlobalUtil.model.localProjTree.onTreeNodeClick(data.uuid, true);
      // console.log(data.__ob__);
      // const treeRoot = document.getElementById('left-frame');
      // console.log(`treeRoot = ${treeRoot.innerHTML}`);
      // const uuid = data.uuid;
      // // const isFile = GlobalUtil.model.localProjTree.isFile(uuid);
      // // console.log(`isFile = ${isFile}`);

      // GlobalUtil.model.localProjTree.curProjAddOrRemoveExpandedKeys(uuid);
      // GlobalUtil.model.localProjTree.addOpenTab(uuid);
      // GlobalUtil.model.localProjTree.setSelectedUUID(uuid);
      // GlobalUtil.model.localProjTree.curSelectedFileUUID = uuid;

      // if (GlobalUtil.model.localProjTree.allCodeEditorVue[uuid] !== undefined) {
      // }
    },
    renderContent(h, { node, data, store }) {
      // console.log(`renderContent data uuid = ${data.uuid}`);
      const curUUID = GlobalUtil.model.localProjTree.curSelectedFileUUID;
      const fileInfo = GlobalUtil.model.localProjTree.getFileInfo(data.uuid);
      let textColorStyle = fileInfo !== null && data.uuid === curUUID && fileInfo.type === 'file' ? 'color:#4F7597;' : 'color:#A6A6A6;';
      textColorStyle = `${textColorStyle}font-family:'Gotham-Book';letter-spacing:-0.8px;padding-left:20px;`;
      let url = '';
      if (data.uuid.indexOf('.py') >= 0) {
        url = this.fileIcon.py;
      }
      if (data.uuid.indexOf('.txt') >= 0 || data.uuid.indexOf('.md') >= 0) {
        url = this.fileIcon.doc;
      }
      if (data.type === 'folder') {
        url = this.fileIcon.folder;
        const keys = GlobalUtil.model.localProjTree.curProjExpandedKeys;
        if (keys.join('####').indexOf(data.uuid) >= 0) {
          url = this.fileIcon.openfolder;
        }
      }
      const urlstyle = `background:url('${url}') no-repeat center left;${textColorStyle}`;
      return (
          <span class="">
            <span style={urlstyle}>
              { data.label }
            </span>
          </span>
        );
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

.ide-project-list {
  /* background: #fff; */
}
.ide-project-list .el-tree-node__content {
  height: 36px;
}
.ide-project-list .el-tree-node.is-expanded>.el-tree-node__children {
  /* background: #E8E8E8; */
}
.ide-project-list .el-tree-node.is-current>.el-tree-node__content {
  /* background-color: #575C62;
  color: #fff; */
}
.ide-project-list .el-tree-node.is-current>.el-tree-node__content .display-none {
  display: inline-block;
}

</style>

<template>
  <!-- :default-expanded-keys="model.localProjTree.curProjExpandedKeys" -->
  <!-- :render-content="renderContent" -->
  <Tree
    id="tree-root"
    style="padding-left:10px;"
    :data="model.localProjTree.curProTreeDatas"
    node-key="uuid"
    :indent=12
    :render-content="renderContent"
    :default-expanded-keys="model.localProjTree.curProjExpandedKeys"
    @node-click="handleNodeClick">
  </Tree>
</template>

<script>

// import ELTreeNode from './ELTreeNode';
// import { setTimeout } from 'timers';
import Tree from './../../lib/tree/src/tree';

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
      // console.log(data.__ob__);
      const treeRoot = document.getElementById('left-frame');
      // console.log(`treeRoot = ${treeRoot.innerHTML}`);
      const uuid = data.uuid;
      const isFile = GlobalUtil.model.localProjTree.isFile(uuid);
      // console.log(`isFile = ${isFile}`);

      GlobalUtil.model.localProjTree.curProjAddOrRemoveExpandedKeys(uuid);
      // GlobalUtil.model.localProjTree.addOpenFile(uuid);
      GlobalUtil.model.localProjTree.addOpenTab(uuid);
      GlobalUtil.model.localProjTree.setSelectedUUID(uuid);
      GlobalUtil.model.localProjTree.curSelectedFileUUID = uuid;

      if (GlobalUtil.model.localProjTree.allCodeEditorVue[uuid] !== undefined) {
        // const inputText = GlobalUtil.model.localProjTree.allCodeEditorVue[uuid].inputText;
        // console.log(`inputText 2 = ${inputText}`);
        // GlobalUtil.model.localProjTree.allCodeEditorVue[uuid].inputText = inputText;

        // GlobalUtil.model.localProjTree.editors[uuid].setValue(inputText);
      }
    },
    renderContent(h, { node, data, store }) {
      // console.log(`renderContent data uuid = ${data.uuid}`);
      const curUUID = GlobalUtil.model.localProjTree.curSelectedFileUUID;
      const fileInfo = GlobalUtil.model.localProjTree.getFileInfo(data.uuid);
      if (fileInfo !== null && data.uuid === curUUID && fileInfo.type === 'file') {
        return (
          <span class="el-tree-node__label" style="color:#4F7597;">
            { data.label }
          </span>
        );  
      }
      return (
        <span class="">
          <span class="el-tree-node__label" style="color:#A6A6A6;">
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
    // curProjTreeData() {
    //   return GlobalUtil.model.localProjTree.curProTreeDatas;
    // },
  },
  components: {
    Tree,
  },
};
</script>

<style scoped>
/* .file-left-icon {
  width: 12px;
  height: 12px;
  background-image: url('./../../assets/img/ide/language_python.svg');
  background-size: 12px 12px;
  background-repeat: no-repeat;
  background-position: center;
} */
</style>

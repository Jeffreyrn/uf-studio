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
      // console.log(`data uuid = ${uuid}`);

      const isFile = GlobalUtil.model.localProjTree.isFile(uuid);
      // console.log(`isFile = ${isFile}`);

      GlobalUtil.model.localProjTree.curProjAddOrRemoveExpandedKeys(uuid);
      // GlobalUtil.model.localProjTree.addOpenFile(uuid);
      GlobalUtil.model.localProjTree.addOpenTab(uuid);
      GlobalUtil.model.localProjTree.setSelectedUUID(uuid);
    },
    renderContent(h, { node, data, store }) {
      if (node !== null && node !== undefined) {
        // console.log(`renderContent node = ${JSON.stringify(node)}`);
        // <img src="./../../assets/img/ide/language_python.svg" />
      }
      return (
        <span class="">
          <span class="el-tree-node__label">
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

<template>
  <!-- :default-expanded-keys="model.localProjTree.curProjExpandedKeys" -->
  <!-- :render-content="renderContent" -->
  <Tree
    id="tree-root"
    style="padding-left:10px;"
    :data="model.localProjTree.curProTreeDatas"
    node-key="uuid"
    :indent=8
    :render-content="renderContent"
    :default-expanded-keys="model.localProjTree.curProjExpandedKeys"
    @node-click="handleNodeClick">
  </Tree>
</template>

<script>

// import ELTreeNode from './ELTreeNode';
import { setTimeout } from 'timers';
import Tree from './../../lib/tree/src/tree';

export default {
  data() {
    return {
      model: GlobalUtil.model,
      // curProTreeDatas: GlobalUtil.model.localProjTree.curProTreeDatas,
      defaultProps: {
        children: 'children',
        label: 'label'
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
        console.log(`renderContent node = ${JSON.stringify(data)}`);
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
    // renderContent(h, { node, data, store }) {
    //   return (
    //     <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
    //       <span>
    //         <span>{node.label}</span>
    //       </span>
    //       <span>
    //         <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>Append</el-button>
    //         <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
    //       </span>
    //     </span>);
    // }
    // renderContent(h, { node, data, store }) {
    //   return (
    //       <span style="flex:1;display:flex;align-items:center;justify-content:space-between;font-size:14px;padding-right:8px;">
    //         <span>
    //           <span>{node.label}</span>
    //         </span>
    //         <span>
    //           <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>Append</el-button>
    //           <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
    //         </span>
    //     </span>
    //   );
    // },
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
    // ELTreeNode,
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

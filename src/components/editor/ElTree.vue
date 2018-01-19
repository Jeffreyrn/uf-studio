<template>
  <!-- :default-expanded-keys="model.localProjTree.curProjExpandedKeys" -->
  <!-- :render-content="renderContent" -->
  <el-tree
    id="tree-root"
    :data="model.localProjTree.curProTreeDatas"
    node-key="uuid"
    :default-expanded-keys="model.localProjTree.curProjExpandedKeys"
    @node-click="handleNodeClick">
  </el-tree>
</template>

<script>

import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import ELTreeNode from './ELTreeNode';

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
    const nodes = document.getElementsByClassName('el-tree-node__label');
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      node.style.color = 'gray';
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data.__ob__);
      const treeRoot = document.getElementById('left-frame');
      console.log(`treeRoot = ${treeRoot.innerHTML}`);
      const uuid = data.uuid;
      console.log(`data uuid = ${uuid}`);

      const isFile = GlobalUtil.model.localProjTree.isFile(uuid);
      console.log(`isFile = ${isFile}`);

      GlobalUtil.model.localProjTree.curProjAddOrRemoveExpandedKeys(uuid);

      GlobalUtil.model.localProjTree.setSelectedUUID(uuid);
      // GlobalUtil.model.localProjTree.addOpenFile(uuid);
      GlobalUtil.model.localProjTree.addOpenTab(uuid);
    },
    renderContent(h, { node, data, store }) {
      return ( '<div>1234567<div/>' );
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
    ELTreeNode,
  },
};
</script>

<style scoped>

</style>

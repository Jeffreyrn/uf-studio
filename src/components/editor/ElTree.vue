<template>
  <!-- :default-expanded-keys="model.localProjTree.curProjExpandedKeys" -->
  <!-- :render-content="renderContent" -->
  <el-tree
    id="tree-root"
    :data="curProjTreeData"
    node-key="uuid"
    :default-expanded-keys="model.localProjTree.curProjExpandedKeys"
    @node-click="handleNodeClick">
  </el-tree>
</template>

<script>

import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
  data() {
    return {
      model: GlobalUtil.model,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    };
  },
  mounted() {
  },
  methods: {
    handleNodeClick(data) {
      console.log(data.__ob__);
      const treeRoot = document.getElementById('tree-root');
      // console.log(`treeRoot = ${treeRoot.innerHTML}`);
      const uuid = data.uuid;
      console.log(`data uuid = ${uuid}`);

      const isFile = GlobalUtil.model.localProjTree.isFile(uuid);
      console.log(`isFile = ${isFile}`);

      GlobalUtil.model.localProjTree.curProjAddOrRemoveExpandedKeys(uuid);

      GlobalUtil.model.localProjTree.setSelectedFileUUID(uuid);
      // console.log(`folder uuid = ${GlobalUtil.model.localProjTree.curFile.uuid}`);
      // GlobalUtil.model.localProjTree.resetFileBackground(true);
      // GlobalUtil.model.localProjTree.setSelectedFileStyle(uuid, true);
      GlobalUtil.model.localProjTree.addOpenFile(uuid);
      setTimeout(() => {
        if (isFile) {
          GlobalUtil.model.localProjTree.resetSelectedTab();
          GlobalUtil.model.localProjTree.setSelectedTab(uuid);
        }
      }, 100);
    },
    renderContent(h, { node, data, store }) {
      return("<span>aabb</span>");
    },

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
    curProjTreeData() {
      return GlobalUtil.model.localProjTree.curPro2Tree();
    },
  },
  components: {
  },
};
</script>

<style scoped>

</style>

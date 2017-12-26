<template>
  <!-- :default-expanded-keys="model.localProjTree.curProjExpandedKeys" -->
  <el-tree
    :data="model.localProjTree.curProjTreeData"
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
      data: [{
        label: '一级 1',
        uuid: 'uuid_00',
        children: [{
          label: '二级 1-1',
          uuid: 'uuid_01',
          children: [{
            label: '三级 1-1-1',
            uuid: 'uuid_02',
          }]
        }]
      }, {
        label: '一级 2',
        uuid: 'uuid_03',
        children: [{
          label: '二级 2-1',
          uuid: 'uuid_04',
          children: [{
            label: '三级 2-1-1',
            uuid: 'uuid_05',
          }]
        }, {
          label: '二级 2-2',
          uuid: 'uuid_06',
          children: [{
            label: '三级 2-2-1',
            uuid: 'uuid_07',
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  mounted() {
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
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

</style>

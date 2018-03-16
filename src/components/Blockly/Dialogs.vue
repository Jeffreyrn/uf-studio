
<template>
  <div id="root-list" class="noselected">
    <div class="dialog-wrap">
      <div class="dialog-cover" @click="closeMyself"></div>
      <div class="dialog-content">
        <div class="dialog-top">
          <span class="top-title">{{ model.localAppsMgr.curDialogTitle }}</span>
          <div class="dialog-close" @click="closeMyself">
          </div>
        </div>
<!-- 
  :render-content="renderContent"
  @node-click="handleNodeClick" 
-->
        <el-tree
          id="app-tree-root"
          style="padding-left:10px;"
          class="recording-project-list noselected"
          :data="model.localAppsMgr.curProTreeDatas"
          node-key="uuid"
          :indent=12
          
          :default-expanded-keys="[]"
          >
        </el-tree>

        <div class="btn-ok cursor-pointer">
          Open
        </div>
      </div>
    </div>
  </div>

  <!-- <div>
    @click="onok"
    <el-dialog title="ide project list" :visible.sync="dialog.ide_app">
      <table>
        <tr>
          <th class="dialog-table-head">Project name</th>
          <th class="dialog-table-head">Date</th>
          <th class="dialog-table-head">Option</th>
        </tr>
        <template>
          <tr  v-for="(data, index) in model.localProjTree.curProjList" :key="index">
            <td>{{ data.name }}</td>
            <td>{{ data.ctime }}</td>
            <td>
              
              <div class="float-left proj-open" @click="insertIde(data.name)">Open</div>
              
            </td>
          </tr>
        </template>
      </table>
    </el-dialog>
    <el-dialog title="teach project list" :visible.sync="dialog.record_app">
      <table>
        <tr>
          <th class="dialog-table-head">Project name</th>
          <th class="dialog-table-head">Date</th>
          <th class="dialog-table-head">Option</th>
        </tr>
        <template>
          <tr  v-for="(data, index) in model.localTeach.curProjList" :key="index">
            <td>{{ data.name }}</td>
            <td>{{ data.ctime }}</td>
            <td>
              
              <div class="float-left proj-open" @click="insertIde(data.name)">select</div>
              
            </td>
          </tr>
        </template>
      </table>
    </el-dialog>
    <el-dialog title="build in app list" :visible.sync="dialog.other_app">
      <table>
        <tr>
          <th class="dialog-table-head">Project name</th>
          <th class="dialog-table-head">Date</th>
          <th class="dialog-table-head">Option</th>
        </tr>
        <template>
          <tr  v-for="i in 7" :key="i">
            <td>{{ i }}</td>
            <td>{{ i + 1 }}</td>
            <td>
              <div class="float-left proj-open" @click="insertIde(i)">Open</div>
              
            </td>
          </tr>
        </template>
      </table>
    </el-dialog>
  </div> -->
  
</template>
<script>
// import eventBus from './eventBus'

export default {
  mounted() {
    // this.model.localAppsMgr.curDialogTitle = 'Select an Application';
    // eventBus.$on('show', (block) => {
    //   if (Object.prototype.hasOwnProperty.call(this.dialog, block.type)) {
    //     this.block = block
    //     this.dialog[block.type] = true
    //     console.log('has property', this.block)
    //   }
    // })
  },
  methods: {
    closeMyself() {
      this.model.localAppsMgr.isProjListDialogShow = false;
    },
    insertIde(name) {
      // this.block.setFieldValue(111) // set block name
      const children = this.block.childBlocks_// this.block.getChildren()
      console.log(0, children)
      const inputField = children[0].inputList[0]
      console.log(111, inputField)
      // inputField.connection.targetBlock().setFieldValue('3', 'NUM')
      this.plus += 1
      inputField.fieldRow[1].setText(`a${name}`)
      this.dialog[this.block.type] = false
    },
  },
  data() {
    return {
      model: window.GlobalUtil.model,
      curProTreeDatas: [],
      block: null,
      dialog: {
        ide_app: false,
        record_app: false,
        other_app: false,
      },
      plus: 0,
    };
  },
}
</script>

<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .3s ease;
}
.drop-enter {
  transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
}
.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.dialog-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-top {
  width: 100%;
  height: 67px;
  background: #484848;
}
.dialog-close {
  position: absolute;
  right: 10px;
  top: 25px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
  background-position: center;
  background-image: url('./../../assets/img/pop/icon_close.svg');
  background-size: 10px 11px;
  background-repeat: no-repeat;
}
.top-title {
  position: absolute;
  left: 24px;
  top: 30px;
  font-family: 'Gotham-Medium';
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: -1px;
}
.dialog-content {
  width: 580px;
  height: 330px;
  position: fixed;
  top: 20%;
  left: 0px;
  right: 0px;
  margin-left:auto;
  margin-right:auto;
  z-index: 10;
  background: white;
  overflow: hidden;
}
.btn-ok {
  /* position: absolute; */
  width: 100%;
  height: 40px;
  /* bottom: 0px; */
  margin-top: 0px;
  /* margin-left: 178px; */
  /* background-color: green; */
  /* margin-bottom: 0px; */
  background: #52BF53;
  text-align: center;
  letter-spacing: -0.88px;
  line-height: 40px;
  font-family: 'Gotham-Book';
  font-size: 12px;
  color: #FFFFFF;
  letter-spacing: -0.5px;
  /* cursor: pointer; */
}

.recording-project-list {
  width: 100%;
  height: 225px;
  /* background: yellow; */
  overflow-y: scroll;
}
.recording-project-list .el-tree-node__content {
  height: 36px;
}
/*.recording-project-list .el-tree-node.is-expanded>.el-tree-node__children {*/
  /*background: #E8E8E8;*/
/*}*/
/*.recording-project-list .el-tree-node__expand-icon.is-leaf:before{*/
  /*background: url("../assets/img/edit/recording/icon_pathfile_grey.svg") no-repeat center left;*/
  /*padding: 10px;*/
/*}*/
/*.recording-project-list .el-tree-node.is-current >.el-tree-node__content .el-tree-node__expand-icon.is-leaf:before{*/
  /*background: url("../assets/img/edit/recording/icon_pathfile_white.svg") no-repeat center left;*/
/*}*/
.recording-project-list .el-tree-node.is-current>.el-tree-node__content {
  background-color: #575C62;
  color: #fff;
}
.recording-project-list .el-tree-node.is-current>.el-tree-node__content .display-none {
  display: inline-block;
}

</style>

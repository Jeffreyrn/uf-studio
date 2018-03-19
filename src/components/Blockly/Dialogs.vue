
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

        <el-tree
          id="app-tree-root"
          style="padding-left:10px;"
          class="recording-project-list noselected"
          :data="model.localAppsMgr.curProTreeDatas"
          node-key="uuid"
          :indent=12
          :render-content="renderContent"
          :default-expanded-keys="[]"
          @node-click="handleNodeClick">
        </el-tree>

        <div v-if="curSelectedFileUUID.length>0&&curSelectedFileUUID.indexOf('.py')>0" class="btn-ok cursor-pointer" @click="onopen">
          Open
        </div>
        <div v-else class="btn-ok" style="background:#ECECEC;color: #BABABA;">
          Open
        </div>
      </div>
    </div>
  </div>

</template>
<script>
// import eventBus from './eventBus'

export default {
  // props: ['onok'],
  data() {
    return {
      model: window.GlobalUtil.model,
      curSelectedFileUUID: '',
      curProTreeDatas: [],
      block: null,
      dialog: {
        ide_app: false,
        record_app: false,
        other_app: false,
      },
      plus: 0,
      fileIcon: {
        py: require('./../../assets/img/blockly/dialog/language_python_dark.svg'),
        proj: require('./../../assets/img/blockly/dialog/icon_project_dark.svg'),
      },
    };
  },
  mounted() {
    classObject: () => {
      return {
        'point-selected-selected0': GlobalUtil.model.localTeach.projTypeSelected !== '1',
        'point-selected-selected1': GlobalUtil.model.localTeach.projTypeSelected === '1',
      }
    }
  },
  methods: {
    closeMyself() {
      this.curSelectedFileUUID = '';
      this.model.localAppsMgr.isProjListDialogShow = false;
    },
    onopen() {
      this.closeMyself();
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
    handleNodeClick(data) {
      this.curSelectedFileUUID = data.uuid;
    },
    renderContent(h, { node, data, store }) {
      const flag = data.uuid === this.curSelectedFileUUID; 
      console.log(`renderContent data uuid = ${data.uuid}, flag = ${flag}`);
      const curUUID = this.curSelectedFileUUID; // GlobalUtil.model.localProjTree.curSelectedFileUUID;
      const fileInfo = GlobalUtil.model.localProjTree.getFileInfo(data.uuid);
      let textColorStyle = data.uuid === curUUID && data.uuid.indexOf('.py') > 0 ? 'color:#4F7597;' : 'color:#A6A6A6;';
      textColorStyle = `${textColorStyle}font-family:'Gotham-Book';letter-spacing:-0.8px;padding-left:20px;`;
      let url = '';
      if (data.uuid.indexOf('.py') >= 0) {
        url = this.fileIcon.py;
      }
      if (data.type === 'proj') {
        url = this.fileIcon.proj;
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

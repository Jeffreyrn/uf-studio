
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
        <div class="list-head">
          <div class="list-head-title">
            Project name
          </div>
          <div class="list-head-title" v-if="model.localAppsMgr.projListDialogType !== 'app'">
            Date
          </div>
          <div class="list-head-title" v-if="model.localAppsMgr.projListDialogType === 'teach'">
            Type
          </div>
        </div>
        <el-tree
          id="app-tree-root"
          style="padding-left:10px;"
          class="blockly-project-list noselected"
          :data="model.localAppsMgr.curProTreeDatas"
          node-key="uuid"
          :expand-on-click-node="false"
          :indent=12
          :render-content="renderContent"
          :default-expanded-keys="[]"
          @node-click="handleNodeClick">
        </el-tree>

        <div v-if="isSelectedApp()" class="btn-ok cursor-pointer" @click="onopen">
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
      curSelectedUUID: '',
      curProTreeDatas: [],
      block: null,
      // dialog: {
      //   studio_run_python: false,
      //   studio_play_recording: false,
      //   studio_run_app: false,
      // },
      plus: 0,
      fileIcon: {
        py: require('./../../assets/img/blockly/dialog/language_python_dark.svg'),
        proj: require('./../../assets/img/blockly/dialog/icon_project_dark.svg'),
        discontinuous: require('./../../assets/img/blockly/dialog/icon_singlepoint_dark.svg'),
        continuous: require('./../../assets/img/blockly/dialog/icon_pathfile_dark.svg'),
      },
    };
  },
  mounted() {
    // classObject: () => {
    //   return {
    //     'point-selected-selected0': GlobalUtil.model.localTeach.projTypeSelected !== '1',
    //     'point-selected-selected1': GlobalUtil.model.localTeach.projTypeSelected === '1',
    //   }
    // }
  },
  methods: {
    isSelectedApp() {
      switch (this.model.localAppsMgr.projListDialogType) {
        case 'app': {
          if (this.curSelectedFileUUID.length > 0) {
            return true;
          }
          break;
        }
        case 'ide': {
          if (this.curSelectedFileUUID.indexOf('.py') > 0) {
            return true;
          }
          break;
        }
        case 'teach': {
          if (this.curSelectedUUID.length > 0) {
            return true;
          }
          break;
        }
        default:
          break;
      }
      return false;
    },
    closeMyself() {
      this.curSelectedUUID = '';
      this.curSelectedFileUUID = '';
      this.model.localAppsMgr.isProjListDialogShow = false;
    },
    onopen() {
      console.log(`onopen onopen curSelectedFileUUID = ${this.curSelectedFileUUID}`);
      this.$emit('insertProject', this.curSelectedFileUUID)
      // switch (this.model.localAppsMgr.projListDialogType) {
      //   case 'app': {
      //     break;
      //   }
      //   case 'ide': {
      //     break;
      //   }
      //   case 'teach': {
      //     break;
      //   }
      //   default:
      //     break;
      // }
      this.closeMyself();
    },
    handleNodeClick(data) {
      this.curSelectedUUID = data.uuid;
      if (data.type !== 'proj') {
        this.curSelectedFileUUID = data.uuid;
      }
      if (this.model.localAppsMgr.projListDialogType === 'teach') {
        this.curSelectedFileUUID = data.uuid;
      }
    },
    renderContent(h, { node, data, store }) {
      console.log(node);
      console.log(store);
      // const flag = data.uuid === this.curSelectedFileUUID;
      // console.log(`renderContent data uuid = ${data.uuid}, flag = ${flag}`);
      const curUUID = this.curSelectedFileUUID;
      // const fileInfo = GlobalUtil.model.localProjTree.getFileInfo(data.uuid);
      let isSelected = curUUID.length > 0 && data.uuid === curUUID && (data.uuid.indexOf('.py') > 0 || data.uuid.indexOf('.json') > 0 || this.model.localAppsMgr.projListDialogType === 'app');
      if (this.model.localAppsMgr.projListDialogType === 'teach' && data.uuid === this.curSelectedUUID) {
        isSelected = true;
      }
      let textColorStyle = isSelected ? 'color:#4F7597;' : 'color:#A6A6A6;';
      textColorStyle = `${textColorStyle}font-family:'Gotham-Book';letter-spacing:-0.8px;padding-left:20px;`;
      let url = '';
      if (data.uuid !== undefined && data.uuid.indexOf('.py') >= 0) {
        url = this.fileIcon.py;
      }
      if (data.uuid !== undefined && data.uuid.indexOf('.json') >= 0) {
        // url = this.fileIcon.json;
      }
      if (data.type === 'proj') {
        url = this.fileIcon.proj;
        if (data.proType === 'continuous') {
          url = this.fileIcon.continuous;
        }
        else if (data.proType === 'discontinuous') {
          url = this.fileIcon.discontinuous;
        }
      }
      let ctime = data.ctime;
      if (data.type !== 'proj') {
        ctime = '';
      }
      let proType = data.proType;
      if (data.type === 'proj') {
        if (proType === 'discontinuous') {
          proType = 'Singlepoint';
        }
        else if (proType === 'continuous') {
          proType = 'Waypoint';
        }
      }
      else {
        proType = '';
      }
      const urlstyle = `background:url('${url}') no-repeat center left;${textColorStyle};width:200px;height:36px;line-height:36px;float:left;`;
      const label = window.GlobalUtil.model.localTeach.getRealProjFileName(data.label);
      return (
        <div class="" style="">
          <div style={urlstyle}>
            { label }
          </div>
          <div style="float:left;width:220px;line-height:36px;">
            { ctime }
          </div>
          <div style="float:left;line-height:36px;">
            { proType }
          </div>
        </div>
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
.blockly-project-list {
  width: 100%;
  /* height: 225px; */
  height: 185px;
  /* background: yellow; */
  overflow-y: scroll;
}
.blockly-project-list .el-tree-node__content {
  height: 36px;
}
.blockly-project-list .el-tree-node.is-current>.el-tree-node__content {
  background-color: #575C62;
  color: #fff;
}
.blockly-project-list .el-tree-node.is-current>.el-tree-node__content .display-none {
  display: inline-block;
}
.list-head {
  width:100%;
  height:40px;
}
.list-head-title {
  float:left;
  width:33%;
  font-family: 'Gotham-Medium';
  font-size: 16px;
  color: #3C3C3C;
  letter-spacing: -1px;
  text-align: center;
  line-height: 40px;
}
</style>

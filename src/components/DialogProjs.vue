
import { setTimeout } from 'timers';
<template>
  <div class="noselected">
    <div class="dialog-wrap">
      <div class="dialog-cover" @click="closeMyself"></div>
      <div class="dialog-content">
        <div class="dialog-top">
          <span class="proj-top-title">Select a Project</span>
          <div class="dialog-close" @click="closeMyself">
          </div>
        </div>
        <table>
          <tr>
            <th class="dialog-table-head">Project name</th>
            <th class="dialog-table-head">Date</th>
            <th class="dialog-table-head">Option</th>
          </tr>
        </table>
        <div class="dialog-table">
          <table>
            <template v-for='(data,index) in model.localProjTree.curProjList'>
              <tr>
                <td>{{ data.name }}</td>
                <td>{{ data.ctime }}</td>
                <td>
                  <div class="float-left proj-selected" v-if="model.localProjTree.curProj.uuid===data.uuid"></div>
                  <div class="float-left proj-open" v-if="model.localProjTree.curProj.uuid!==data.uuid" @click="onSelect(data.uuid)">Open</div>
                  <!-- btn_trash.svg -->
                  <div class="proj-icon-trash float-left" v-if="model.localProjTree.curProj.uuid!==data.uuid" @click="onDelete(data.uuid)"></div>
                </td>
              </tr>
            </template>
          </table>
        </div>
        <div class="dialog-add">
          <div class="dialog-add-content" @click="addProj()">
            <span>+</span>
            <span>New Project</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const path = require('path');

export default {
  data() {
    return {
      model: window.GlobalUtil.model,
    }
  },
  methods: {
    closeMyself() {
      // this.$emit('on-close')
      this.model.localProjTree.projsDialogShow = false;
    },
    addProj() {
      this.model.localProjTree.folderOrFile = 'proj';
      this.model.localProjTree.curDialogTitle = 'new project name';
      window.GlobalUtil.model.localProjTree.dialogErrorTips = '';
      this.model.localProjTree.fileDialogShow = true;
      // setTimeout(() => {
      //   document.getElementById('input-text').focus();
      // });
      window.GlobalUtil.setInputFocus();
    },
    onSelect(uuid) {
      console.log(uuid);
      this.model.localProjTree.changeProj(uuid);
      this.model.localProjTree.projsDialogShow = false;
    },
    onDelete(uuid) {
      const name = path.basename(uuid);
      window.GlobalUtil.model.localProjTree.curDialogTitle = `Delete project '${name}' ?`;
      window.GlobalUtil.model.localProjTree.dialogErrorTips = '';
      window.GlobalUtil.model.localProjTree.deleteDialogShow = true;
      window.GlobalUtil.model.localProjTree.onDeleteDialog = () => {
        window.CommandsEditorSocket.delProj(uuid, (dict) => {
          // GlobalUtil.model.localProjTree.deleteDialogShow = false;
          console.log(`localTeach.delProj = ${uuid}, dict = ${JSON.stringify(dict)}`);
        });
      };
    },
  },
}
</script>

<style scoped>
.proj-top-title {
  position: absolute;
  left: 24px;
  top: 25px;
  /* height: 67px; */
  font-family: 'Gotham-Medium';
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: -1px;
  /* background-color: yellow; */
  /* line-height: 16px; */
}
.dialog-content {
  width: 580px;
  position: fixed;
  height: 340px;
  top: 20%;
  left: 0px;
  right: 0px;
  margin-left:auto;
  margin-right:auto;
  z-index: 10;
  background: #303030;
  overflow: hidden;
}
.dialog-top {
  width: 100%;
  height: 67px;
  background: #3F4955;
}
.dialog-table {
  /* width: 100%; */
  width: 600px;
  height: 160px;
  overflow-y: scroll;
}
.dialog-table-head {
  width: 194px;
  height: 66px;
  font-family: 'Gotham-Medium';
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: -1px;
  text-align: center;
  line-height: 16px;
}
.dialog-table td {
  width: 194px;
  height: 40px;
  font-family: 'Gotham-Book';
  font-size: 12px;
  color: #FFFFFF;
  padding-left: 50px;
  letter-spacing: -0.38px;
  /* text-align: center; */
  line-height: 12px;
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
  background-image: url('./../assets/img/pop/icon_close.svg');
  background-size: 10px 11px;
  background-repeat: no-repeat;
}
.dialog-close:hover {
  color: #4fc08d;
}
.dialog-add {
  width: 100%;
  height: 100px;
  /* background-color: yellow; */

}
.dialog-add-content {
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  margin: auto;
  /* background-color: yellow; */
  width: 496px;
  height: 26px;
  font-family: 'Gotham-Book';
  text-align: center;
  line-height: 10px; 
  letter-spacing: -0.5px;
  color: #FFFFFF;
  padding-top: 8px;
  border:1px dashed #5C5C5C;
  cursor: pointer;
}
.proj-icon-trash {
  margin-left: 20px;
  width: 30px;
  height: 30px;
  background-image: url('./../assets/img/pop/btn_trash.svg');
  background-size: 8px 10px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
.proj-open {
  font-family: 'Gotham-Book';
  font-size: 12px;
  color: #FFFFFF;
  letter-spacing: -0.38px;
  line-height: 26px;
  height: 26px;
  margin-left: 10px;
  cursor: pointer;
}
.proj-selected {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  background-image: url('./../assets/img/pop/icon_select.svg');
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center;
}
</style>

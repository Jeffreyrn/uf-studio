
<template>
  <div id="root-dialog" class="noselected">
    <div class="dialog-wrap">
      <div class="dialog-cover" @click="closeMyself"></div>
      <div class="dialog-content" @click="contentClick">
        <span class="top-title">{{ model.localProjTree.curDialogTitle }}</span>
        <!-- <div class="dialog-top">
          <span class="top-title">{{ model.localProjTree.curDialogTitle }}</span>
          <div class="dialog-close" @click="closeMyself">
          </div>
        </div> -->
        <div>
          <input id="input-text" v-model="inputName" type="text" autofocus="autofocus" class="position-absolute dialog-input" />
        </div>
        <div class="position-absolute dialog-error"> {{errorTip}}</div>
        <!-- {{ model.localProjTree.dialogErrorTips }} -->
        <div class="position-absolute" style="bottom:0px;">
          <div class="float-left btn-cancel" @click="closeMyself">
            Cancel
          </div>
          <span v-if="isFileNameCorrect">
            <div class="float-left btn-create cursor-pointer" @click="oncreate">
              OK
            </div>
          </span>
          <span v-else>
            <div class="float-left btn-create btn-create-opacity">
              OK
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const path = require('path')

export default {
  data() {
    return {
      model: window.GlobalUtil.model,
      inputName: '',
      errorTip: '',
    }
  },
  mounted() {
    document.getElementById('input-text').focus()
  },
  methods: {
    contentClick() {
      // console.log(`contentClick contentClick`);
      const Option = document.getElementsByClassName('option')[0];
      if (Option !== undefined) {
        Option.style.display = 'none';
      }
    },
    closeMyself() {
      this.$emit('hideInput')
      this.model.localAppsMgr.curProName = ''
      // this.model.localProjTree.fileDialogShow = false;
    },
    validateInput() {

    },
    oncreate() {
      // const text = this.model.localProjTree.curDialogInputText;
      // TODO regex check input name
      // const inputName = this.model.localAppsMgr.curProName
      this.model.localAppsMgr.curProName = this.inputName
      this.$emit('saveProject') // this.$message('valid')
      // this.$emit('saveProject')
      // // console.log(`cur = ${GlobalUtil.model.localProjTree.curSelectedUUID}`);
      // // console.log(`text = ${text}, selected = ${this.model.localProjTree.fileSelected} , folderOrFile = ${this.model.localProjTree.folderOrFile}`);
      // if (this.model.localProjTree.folderOrFile === 'folder') {
      //   window.CommandsEditorSocket.createFile(text, false);
      //   // const folder = GlobalUtil.model.localProjTree.createFolder(text);
      //   // GlobalUtil.model.localProjTree.curProj.files.push(folder);
      // }
      // if (this.model.localProjTree.folderOrFile === 'file') {
      //   window.CommandsEditorSocket.createFile(`${text}${this.model.localProjTree.fileSelected}`, true);
      //   // const file = GlobalUtil.model.localProjTree.createSimpleFile(text);
      //   // GlobalUtil.model.localProjTree.curProj.files.push(file);
      //   // GlobalUtil.model.localProjTree.setSelectedUUID(file.uuid);
      // }
      // if (this.model.localProjTree.folderOrFile === 'proj') {
      //   window.CommandsEditorSocket.createProj(text);
      //   // const proj = GlobalUtil.model.localProjTree.createProj(text);
      //   // GlobalUtil.model.localProjTree.changeProj(proj.uuid);
      // }
      // if (this.model.localProjTree.folderOrFile === 'rename') {
      //   // GlobalUtil.model.localProjTree.renameFile(text);
      //   const curUUID = window.GlobalUtil.model.localProjTree.curSelectedUUID;
      //   window.CommandsEditorSocket.renameFile(curUUID, `${text}${this.model.localProjTree.fileSelected}`)
      // }
      // if (this.model.localProjTree.folderOrFile === 'renameproj') {
      //   // GlobalUtil.model.localProjTree.renameProj(text);
      //   window.CommandsEditorSocket.renameProj(text);
      // }
      // this.model.localProjTree.projsDialogShow = false;
      // this.model.localProjTree.fileDialogShow = false;
      // this.model.localProjTree.deleteDialogShow = false;
    },
  },
  components: {
  },
  computed: {
    isFileNameCorrect() {
      // const isFileStr = window.GlobalUtil.isFileStr(this.model.localProjTree.curDialogInputText);
      // const text = this.inputName;
      const rs = window.GlobalUtil.checkFileName(this.inputName)
      // TODO: check duplicate name
      const listData = this.model.localAppsMgr.appTreeDatas[2].children
      const duplicate = Object.keys(listData).some((key) => {
        return listData[key].label === this.inputName
      })
      if (duplicate) {
        this.errorTip = 'Input name existed'
        return false
      }
      else if (!rs) {
        if (this.inputName !== '') {
          this.errorTip = 'Input name format is not valid'
        }
        return false
      }
      this.errorTip = ''
      return true
      // const folderOrFile = this.model.localProjTree.folderOrFile;

      // if (folderOrFile === 'proj' || folderOrFile === 'renameproj') {
      //   const isHasProj = window.GlobalUtil.model.localProjTree.isHasProj(text);
      //   return isFileStr && !isHasProj;
      // }
      // if (folderOrFile === 'file' || folderOrFile === 'rename' || folderOrFile === 'folder') {
      //   const ext = this.model.localProjTree.fileSelected;
      //   let getFileSuperid = this.model.localProjTree.getFileSuperid();
      //   if (getFileSuperid === '') {
      //     getFileSuperid = this.model.localProjTree.curProj.uuid;
      //   }
      //   let toAddFile = path.join(getFileSuperid, `${text}${ext}`);
      //   if (folderOrFile === 'folder') {
      //     toAddFile = path.join(getFileSuperid, `${text}`);
      //   }
      //   const isRepeatFile = this.model.localProjTree.isRepeatFile(toAddFile);
      //   console.log(`getFileSuperid = ${getFileSuperid}, toAddFile = ${toAddFile}, isRepeatFile = ${isRepeatFile}`);
      //   if (text === null || text === '') {
      //     window.GlobalUtil.model.localProjTree.dialogErrorTips = '';
      //   }
      //   return isFileStr && !isRepeatFile;
      // }
      // TODO Validate
      // if (text === null || text === '') {
      //   // window.GlobalUtil.model.localProjTree.dialogErrorTips = '';
      //   return false
      // }
      // return true
    },
    isExtInput() {
      if (this.model.localProjTree.curDialogIsExtend === false) {
        return false;
      }
      return this.model.localProjTree.folderOrFile === 'file' || this.model.localProjTree.folderOrFile === 'rename';
    },
  },
}
</script>

<style scoped>
.top-title {
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
  width: 356px;
  position: fixed;
  height: 269px;
  top: 20%;
  left: 0px;
  right: 0px;
  margin-left:auto;
  margin-right:auto;
  z-index: 10;
  background: #303030;
  overflow: hidden;
}
.dialog-close:hover {
  color: #4fc08d;
}
.dialog-input {
  width:288px;
  height:34px;
  top:113px;
  left:34px;
  padding-left: 15px;
  /* background: #2C2C2C; */
  /* background: yellow; */
  color: white;
  border: 0;
  outline:none;
  /* border: 0.02 solid #4E4C4C; */
  background-image: url('./../../assets/img/pop/frame01.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 288px 34px;
}
.dialog-error {
  left:35px;
  top:155px;
  width: 288px;
  font-size: 10px;
  color: #878787;
  font-family: 'Gotham-Book';
}
.dialog-input-ext {
  width:252px;
  /* background: green; */
  background-image: url('./../../assets/img/pop/frame02.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 252px 34px;
}
.dialog-select {
  top:113px;
  left:284px;
  width: 46px;
  height: 34px;
  color: white;
  font-family: 'Gotham-Book';
  font-size: 12px;
  color: #FFFFFF;
  letter-spacing: -0.75px;
  padding-left: 5px;
  padding-top: 10px;
  /* opacity: 0; */
  background-image: url('./../../assets/img/pop/frame03_fileselection.svg');
  background-position: center;
  background-repeat: no-repeat;
}
.dialog-select-origin {
  top:113px;
  left:284px;
}
.dialog-select-bg {
  background-image: url('./../../assets/img/pop/frame03_fileselection.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 46px 34px;
}
.dialog-select-size {
  background-size: 46px 34px;
}
/* .select-toparrow {
  top:10px;
  left:32px;
  width: 7px;
  height: 5px;
  background-image: url('./../assets/img/pop/toparrowbtns.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 7px 5px
}
.select-bottomarrow {
  top:20px;
  left:32px;
  width: 7px;
  height: 5px;
  background-image: url('./../assets/img/pop/bottomarrowbtns.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 7px 5px
} */
.select-option {
  background: yellow;
}
.opacity0 {
  opacity: 0;
}
.btn-create-opacity {
  opacity: 0.5;
}
.dialog-add {
  width: 100%;
  height: 100px;
  /* background-color: yellow; */
}
.btn-cancel {
  width: 178px;
  height: 40px;
  background: #484848;
  text-align: center;
  font-family: 'Gotham-Book';
  font-size: 14px;
  color: #7B7B7B;
  letter-spacing: -0.88px;
  line-height: 40px;
  cursor: pointer;
}
.btn-create {
  width: 178px;
  height: 40px;
  background: #52BF53;
  text-align: center;
  font-family: 'Gotham-Book';
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: -0.88px;
  line-height: 40px;
  /* cursor: pointer; */
}
</style>

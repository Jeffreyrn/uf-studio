
<template>
  <div id="root-dialog1" class="noselected">
    <div class="dialog-wrap">
      <div class="dialog-cover" @click="closeMyself"></div>

      <div class="dialog-content" @click="contentClick">
        <div class="position-absolute top-bar">
          <div class="position-absolute dialog-close" @click="closeMyself">
            X
          </div>
        </div>
        <span class="top-title">Please choose the way you want to record with xArm in this project</span>
        <input id="input-text" v-model="model.localProjTree.curDialogInputText" type="text" class="position-absolute dialog-input" />
        <div class="position-absolute dialog-error"> {{ model.localProjTree.dialogErrorTips }} </div>
        <div style="margin-top:230px;">
          <span v-if="isFileNameCorrect">
            <div class="position-absolute btn-create cursor-pointer" @click="oncreate">
              OK
            </div>
          </span>
          <span v-if="!isFileNameCorrect">
            <div class="position-absolute btn-create btn-create-opacity">
              OK
            </div>
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

const path = require('path')
  
import CustomSelect from './CustomSelect';

export default {
  data () {
    return {
      model: GlobalUtil.model,
      // inputText: '',
      // selected: '.py',
      options: [
          { text: 'py', value: '.py' },
          { text: 'txt', value: '.txt' },
          { text: 'md', value: '.md' },
          { text: 'none', value: '' },
      ],
    }
  },
  methods: {
    contentClick() {
      console.log(`contentClick contentClick`);
      const Option = document.getElementsByClassName('option')[0];
      Option.style.display = 'none';
    },
    closeMyself() {
      // this.$emit('on-close')
      // this.model.localProjTree.projsDialogShow = false;
      this.model.localProjTree.fileDialogShow = false;
    },
  //   addProj() {
  //     GlobalUtil.model.localProjTree.dialogVisible = true;
  //   },
    oncreate() {
      const text = this.model.localProjTree.curDialogInputText;
      console.log(`cur = ${GlobalUtil.model.localProjTree.curSelectedUUID}`);
      console.log(`text = ${text}, selected = ${this.model.localProjTree.fileSelected} , folderOrFile = ${this.model.localProjTree.folderOrFile}`);
      if (this.model.localProjTree.folderOrFile === 'folder') {
        CommandsEditorSocket.createFile(text, false);
        // const folder = GlobalUtil.model.localProjTree.createFolder(text);
        // GlobalUtil.model.localProjTree.curProj.files.push(folder);
      }
      if (this.model.localProjTree.folderOrFile === 'file') {
        CommandsEditorSocket.createFile(`${text}${this.model.localProjTree.fileSelected}`, true);
        // const file = GlobalUtil.model.localProjTree.createSimpleFile(text);
        // GlobalUtil.model.localProjTree.curProj.files.push(file);
        // GlobalUtil.model.localProjTree.setSelectedUUID(file.uuid);
      }
      if (this.model.localProjTree.folderOrFile === 'proj') {
        CommandsEditorSocket.createProj(text);
        // const proj = GlobalUtil.model.localProjTree.createProj(text);
        // GlobalUtil.model.localProjTree.changeProj(proj.uuid);
      }
      if (this.model.localProjTree.folderOrFile === 'rename') {
        // GlobalUtil.model.localProjTree.renameFile(text);
        const curUUID = GlobalUtil.model.localProjTree.curSelectedUUID;
        CommandsEditorSocket.renameFile(curUUID, `${text}${this.model.localProjTree.fileSelected}`)
      }
      if (this.model.localProjTree.folderOrFile === 'renameproj') {
        // GlobalUtil.model.localProjTree.renameProj(text);
        CommandsEditorSocket.renameProj(text);
      }
      this.model.localProjTree.projsDialogShow = false;
      this.model.localProjTree.fileDialogShow = false;
      this.model.localProjTree.deleteDialogShow = false;
    },
  },
  components: {
    CustomSelect,
  },
  computed: {
    isFileNameCorrect() {
      const isFileStr = GlobalUtil.isFileStr(this.model.localProjTree.curDialogInputText);
      const text = this.model.localProjTree.curDialogInputText;

      if (this.model.localProjTree.folderOrFile === 'proj'
        || this.model.localProjTree.folderOrFile === 'renameproj'
        ) {
        const isHasProj = GlobalUtil.model.localProjTree.isHasProj(text);
        return isFileStr && !isHasProj;
      }
      if (this.model.localProjTree.folderOrFile === 'file'
        || this.model.localProjTree.folderOrFile === 'rename'
        || this.model.localProjTree.folderOrFile === 'folder') {
        
        const ext = this.model.localProjTree.fileSelected;
        const getFileSuperid = this.model.localProjTree.getFileSuperid();
        let toAddFile = path.join(getFileSuperid, `${text}${ext}`);
        if (this.model.localProjTree.folderOrFile === 'folder') {
          toAddFile = path.join(getFileSuperid, `${text}`);
        }
        const isRepeatFile = this.model.localProjTree.isRepeatFile(toAddFile);
        console.log(`getFileSuperid = ${getFileSuperid}, toAddFile = ${toAddFile}, isRepeatFile = ${isRepeatFile}`);
        if (text === null || text === '') {
          GlobalUtil.model.localProjTree.dialogErrorTips = '';
        }
        return isFileStr && !isRepeatFile;
      }

      if (text === null || text === '') {
        GlobalUtil.model.localProjTree.dialogErrorTips = '';
      }

      return isFileStr;
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
    width: 580px;
    height: 400px;
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
  .top-bar {
    background: black;
    width: 100%;
    height: 68px;
  }
  .dialog-close {
    top: 15px;
    right: 0px;
    width: 40px;
    height: 40px;
    color: white;
    text-align:center;
    line-height: 40px;
    cursor: pointer;
  }
  .dialog-input {
    width:350px;
    height:40px;
    top:285px;
    left:118px;
    padding-left: 15px;
    /* background: #2C2C2C; */
    /* background: yellow; */
    /* color: white; */
    /* border: 0; */
    /* outline:none; */
    border: 1 solid #4E4C4C;
    /* background-image: url('./../assets/img/pop/frame01.svg'); */
    /* background-position: center; */
    /* background-repeat: no-repeat; */
    /* background-size: 288px 34px; */
  }
  .dialog-error {
    left:35px;
    top:155px;
    width: 288px;
    font-size: 7.8px;
    color: #878787;
    font-family: 'Gotham-Book';
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
  .btn-create {
    width: 100%;
    height: 40px;
    bottom: 0px;
    /* margin-top: 230px; */
    /* margin-left: 178px; */
    /* background-color: green; */
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

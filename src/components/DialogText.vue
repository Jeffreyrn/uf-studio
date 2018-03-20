
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
        <div v-if="isExtInput">
          <input id="input-text" v-model="model.localProjTree.curDialogInputText" type="text" class="position-absolute dialog-input dialog-input-ext" />
          <custom-select class="position-absolute dialog-select-origin dialog-select-bg dialog-select-size" style=""></custom-select>
        </div>
        <div v-if="!isExtInput">
          <input id="input-text" v-model="model.localProjTree.curDialogInputText" type="text" class="position-absolute dialog-input" />
        </div>
        <div class="position-absolute dialog-error"> {{ model.localProjTree.dialogErrorTips }} </div>
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
        let getFileSuperid = this.model.localProjTree.getFileSuperid();
        if (getFileSuperid === '') {
          getFileSuperid = this.model.localProjTree.curProj.uuid;
        }
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
    background-image: url('./../assets/img/pop/frame01.svg');
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
    background-image: url('./../assets/img/pop/frame02.svg');
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
    background-image: url('./../assets/img/pop/frame03_fileselection.svg');
    background-position: center;
    background-repeat: no-repeat;
  }
  .dialog-select-origin {
    top:113px;
    left:284px;
  }
  .dialog-select-bg {
    background-image: url('./../assets/img/pop/frame03_fileselection.svg');
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

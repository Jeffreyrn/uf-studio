
<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover" @click="closeMyself"></div>
      <div class="dialog-content">
        <span class="top-title">{{ model.localProjTree.curDialogTitle }}</span>
        <!-- <div class="dialog-top">
          <span class="top-title">{{ model.localProjTree.curDialogTitle }}</span>
          <div class="dialog-close" @click="closeMyself">
          </div>
        </div> -->
        <input id="input-text" v-model="model.localProjTree.curDialogInputText" type="text" class="position-absolute dialog-input" />
        <select class="position-absolute dialog-select" v-model="model.localProjTree.fileSelected" v-if="model.localProjTree.curDialogIsExtend">
          <option v-for="option in options" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
        <div style="margin-top:230px;">
          <div class="float-left btn-cancel" @click="closeMyself">
            Cancel
          </div>
          <span v-if="isFileNameCorrect">
            <div class="float-left btn-create dialog-input cursor-pointer" @click="oncreate"r>
              Create
            </div>
          </span>
          <span v-if="!isFileNameCorrect">
            <div class="float-left btn-create dialog-input dialog-input-opacity">
              Create
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      },
    },
    computed: {
      isFileNameCorrect() {
        const isFileStr = GlobalUtil.isFileStr(this.model.localProjTree.curDialogInputText);
        const isHasProj = GlobalUtil.model.localProjTree.isHasProj(this.model.localProjTree.curDialogInputText);
        if (this.model.localProjTree.folderOrFile === 'proj') {
          return isFileStr && !isHasProj;
        }
        return isFileStr;
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
    width:250px;
    height:34px;
    top:113px;
    left:34px;
    padding-left: 5px;
    background: #2C2C2C;
    color: white;
    border: 0.02 solid #4E4C4C;
  }
  .dialog-select {
    top:113px;
    left:284px;
  }
  .dialog-input-opacity {
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
    /* margin-top: 230px; */
    /* background-color: yellow; */
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

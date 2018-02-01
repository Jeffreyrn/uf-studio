
import { setTimeout } from 'timers';
<template>
  <div>
    <!-- <form id='f_form' v-show='false'>
      <input id='f_input' type='file' @change="didImport()"/>
    </form>
    <form id='f_form_out' v-show='false'>
      <input id='f_output' type='path' @change="didOutput()"/>
    </form> -->
    <!-- <el-button class="top-btn" @click="newProj()">
      New
    </el-button> -->
    <!-- <el-button class="top-btn" @click="importPro()">
      Import
    </el-button> -->
    <!-- <el-button class="top-btn" @click="exportPro()">
      Export
    </el-button> -->
    <!-- <el-button class="top-btn" @click="allProjs()">
      Projs
    </el-button> -->
    <div class="proj-icon float-left" @click="allProjs()" title='Projects'>
    </div>
    <div class="folder-icon float-left" @click="addFolder()" title='Add folder'>
    </div>
    <div class="file-icon float-left" @click="addFile()" title='Add file'>
    </div>
    <div class="rename-icon float-left" @click="rename()" title='Rename'>
    </div>
    <div class="del-icon float-left" @click="delFile()" title='Delete file'>
    </div>
    <span v-if="model.localProjTree.isCmdRunning===true">
      <div class="stop-icon float-right" @click="stop()" title='Stop'>
      </div>
    </span>
    <span v-if="model.localProjTree.isCmdRunning===false">
      <div class="run-icon float-right" @click="run()" title='Run'>
      </div>
    </span>

    <el-dialog
      :title="title"
      :visible.sync="model.localProjTree.dialogVisible"
      width="300px"
      :before-close="handleClose"
      center>
      <input name="inputText" v-model="inputText" auto-complete="off"></input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="model.localProjTree.dialogVisible=false">取 消</el-button>
        <span v-if="isFileNameCorrect">
          <el-button type="primary" @click="add()">确 定</el-button>
        </span>
        <span v-if="!isFileNameCorrect">
          <el-button type="primary" @click="add()" disabled>确 定</el-button>
        </span>
      </span>
    </el-dialog>

    <el-dialog
      :title="title"
      :visible.sync="model.localProjTree.fileDialogVisible"
      width="300px"
      :before-close="handleClose"
      center>
      <input name="inputText" v-model="inputText" auto-complete="off" style="width:150px;height:20px;" />
      <select v-model="selected">
        <option v-for="option in options" v-bind:value="option.value">
          {{ option.text }}
        </option>
      </select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="model.localProjTree.fileDialogVisible=false">取 消</el-button>
        <span v-if="isFileNameCorrect">
          <el-button type="primary" @click="add()">确 定</el-button>
        </span>
        <span v-if="!isFileNameCorrect">
          <el-button type="primary" @click="add()" disabled>确 定</el-button>
        </span>
      </span>
    </el-dialog>

    <!-- <el-dialog
      width="900px"
      height="500px"
      :show-close="false"
      :fullscreen="false"
      :visible.sync="projSelectDialog">
      <div style="margin:0px;padding:0px;width:900px;height:500px;background-color:yellow;">
      </div>
    </el-dialog> -->

            <!-- width="900px"
        height="500px"
        :show-close="false"
        :fullscreen="false"
        :custom-class="proj-list-style"
        :visible.sync="projSelectDialog" -->
    
    <!-- <div style="position:absolute;width:100%;height:100%;background-color:rgba(255,255,255,0.2);z-index:500px;">
      <div style="position:absolute;left:50%;width:900px;height:500px;vertical-align:middle;">
        <div style="width:100%;height:100px;background-color:yellow;">
          <el-button class="top-btn" @click="newProj()">
            New
          </el-button>
        </div>
        <div style="width:100%;height:400px;background-color:green">
          <el-table
            max-height="250"
            :row-class-name="tableRowClassName"
            :data="proListData">
            <el-table-column property="name" label="pro name" width="200"></el-table-column>
            <el-table-column property="time" label="date" width="200"></el-table-column>
            <el-table-column property="state" label="state" width="100"></el-table-column>
            <el-table-column property="operate" label="Operate" width="150">
              <template slot-scope="scope">
                <el-button @click="onSelect(scope.row)" type="text" size="small">Select</el-button>
                <el-button v-if="model.localProjTree.curProj.uuid!==scope.row.uuid" @click="onDelete(scope.row)" type="text" size="small">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>

export default {
  data() {
    return {
      model: GlobalUtil.model,
      store: GlobalUtil.store,
      // dialogVisible: false,
      // fileDialogVisible: false,
      // projSelectDialog: false,
      inputText: '',
      folderOrFile: '',
      title: '',
      selected: '.py',
      options: [
        { text: 'py', value: '.py' },
        { text: 'txt', value: '.txt' },
        { text: 'md', value: '.md' },
        { text: 'none', value: '' },
      ],
    };
  },
  mounted() {
  },
  methods: {
    run() {
      const curFile = GlobalUtil.model.localProjTree.curFile; //this.getCurFile();
      if (curFile === null) {
        return;
      }
      GlobalUtil.model.localProjTree.isResultFrameDisplay = true;
      GlobalUtil.model.localProjTree.onwinresize();
      CommandsEditorSocket.stopPythonScript(() => {
        GlobalUtil.model.localProjTree.runningCmdResult = '';
        CommandsEditorSocket.runPythonScript(curFile.uuid, (dict) => {
          // GlobalUtil.model.localProjTree.isCmdRunning = true;
          GlobalUtil.model.localProjTree.remoteCmdResult2Local(dict);
        });
      });
    },
    stop() {
      CommandsEditorSocket.stopPythonScript((dict) => {

      });
    },
    saveFile() {
      const curFile = this.getCurFile();
      if (curFile === null) {
        return;
      }
      const uuid = curFile.uuid;
      const text = curFile.localContent;
      CommandsEditorSocket.saveOrUpdateFile(uuid, text, (dict) => {
        if (dict.data === 'success') {
          curFile.remoteContent = text;
          GlobalUtil.model.localProjTree.curOpenedFilesList = GlobalUtil.model.localProjTree.curOpenedFilesList;
        }
        console.log(`update content success`);
      });
    },
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
      GlobalUtil.model.localProjTree.dialogVisible = false;
      GlobalUtil.model.localProjTree.fileDialogVisible = false;
    },
    importPro() {
      document.getElementById('f_input').click();
    },
    didImport() {
      console.log(`didImport`);
      document.getElementById('f_input').value = null;
      document.getElementById('f_input').files = null;
    },
    exportPro() {
      let csv = 'data:application/json;charset=utf-8,';
      csv += JSON.stringify('aabbcc', null, 2);
      const data = encodeURI(csv);
      const link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', 'report.json');
      link.click();
    },
    allProjs() {
      // CommandsEditorSocket.listProjs((dict) => {
      //   // console.log(`listProjs dict = ${JSON.stringify(dict)}`);
      // });
      // this.projSelectDialog = true;
      GlobalUtil.model.localProjTree.projsDialogShow = true;
    },
    getCurFile() {
      const curSelectedUUID = GlobalUtil.model.localProjTree.curSelectedUUID;
      return GlobalUtil.model.localProjTree.getFileInfo(curSelectedUUID);
    },
    delFile() {
      // CommandsEditorSocket.delFiles(this.getCurFile().uuid);
      // return;
      console.log('del folder');
      const curFile = this.getCurFile();
      if (curFile === null) {
        return;
      }
      this.$confirm(`Delete ${curFile.name}?`, {
        confirmButtonText: 'OK',
        cancelButtonText: 'CANCEL',
        type: 'info',
        showClose: false,
        closeOnClickModal: false,
      }).then(() => {
        CommandsEditorSocket.delFiles(this.getCurFile().uuid);
      }).catch(() => {
      });
    },
    add(file) {
      const text = this.inputText;
      console.log(`text = ${text}`);
      if (this.folderOrFile === 'folder') {
        CommandsEditorSocket.createFile(text, false);
        // const folder = GlobalUtil.model.localProjTree.createFolder(text);
        // GlobalUtil.model.localProjTree.curProj.files.push(folder);
      }
      if (this.folderOrFile === 'file') {
        CommandsEditorSocket.createFile(`${text}${this.selected}`, true);
        // const file = GlobalUtil.model.localProjTree.createSimpleFile(text);
        // GlobalUtil.model.localProjTree.curProj.files.push(file);
        // GlobalUtil.model.localProjTree.setSelectedUUID(file.uuid);
      }
      if (this.folderOrFile === 'proj') {
        CommandsEditorSocket.createProj(text);
        // const proj = GlobalUtil.model.localProjTree.createProj(text);
        // GlobalUtil.model.localProjTree.changeProj(proj.uuid);
      }
      if (this.folderOrFile === 'rename') {
        // GlobalUtil.model.localProjTree.renameFile(text);
        const curUUID = GlobalUtil.model.localProjTree.curSelectedUUID;
        CommandsEditorSocket.renameFile(curUUID, `${text}${this.selected}`)
      }
      if (this.folderOrFile === 'renameproj') {
        // GlobalUtil.model.localProjTree.renameProj(text);
        CommandsEditorSocket.renameProj(text);
      }
      GlobalUtil.model.localProjTree.dialogVisible = false;
      GlobalUtil.model.localProjTree.fileDialogVisible = false;
    },
    textFocus() {
      setTimeout(() => {
        const elements = document.getElementsByName('inputText');
        for (let i = 0; i < elements.length; i += 1) {
          const element = elements[i];
          element.focus();
        }
      });
    },
    newProj() {
      this.folderOrFile = 'proj';
      this.title = 'new project name';
      this.inputText = '';
      GlobalUtil.model.localProjTree.dialogVisible = true;
      
      this.textFocus();
    },
    addFolder() {
      console.log('add folder');
      this.folderOrFile = 'folder';
      this.title = 'add folder';
      this.inputText = '';
      GlobalUtil.model.localProjTree.dialogVisible = true;
      this.textFocus();
    },
    addFile() {
      console.log('add file');
      this.folderOrFile = 'file';
      this.title = 'add file';
      this.inputText = '';
      // this.dialogVisible = true;
      GlobalUtil.model.localProjTree.fileDialogVisible = true;
      this.textFocus();
    },
    rename() {
      console.log(`Rename`);
      if (GlobalUtil.model.localProjTree.curSelectedUUID === GlobalUtil.model.localProjTree.curProj.uuid) {
        console.log(`Rename proj`);
        this.folderOrFile = 'renameproj';
        this.title = `Rename project ${GlobalUtil.model.localProjTree.curProj.name}`;
        this.inputText = `${GlobalUtil.model.localProjTree.curProj.name}`;
        this.selected = '';
        GlobalUtil.model.localProjTree.dialogVisible = true;
        this.textFocus();
        return;
      }
      const curFile = this.getCurFile();
      if (curFile === null) {
        return;
      }
      if (curFile.type === 'folder') {
        this.title = `Rename ${curFile.name}`;
        this.inputText = curFile.name;
        GlobalUtil.model.localProjTree.dialogVisible = true;
        this.selected = '';
        this.textFocus();
        return;
      }
      this.folderOrFile = 'rename';
      this.title = `Rename ${curFile.name}`;
      this.inputText = `${curFile.name}`.split('.')[0];
      GlobalUtil.model.localProjTree.fileDialogVisible = true;
      this.selected = '.' + `${curFile.name}`.split('.')[1];
      if (`${curFile.name}`.split('.')[1] === undefined ) {
        this.selected = '';
      }
      this.textFocus();
    },
    tableRowClassName({row, rowIndex}) {
      // console.log(`tableRowClassName = ${JSON.stringify(row)}, ${rowIndex}`);
      const uuid = row.uuid;
      // if (rowIndex === 1) {
      //   return 'warning-row';
      // } else if (rowIndex === 3) {
      //   return 'success-row';
      // }
      return '';
    },
    onSelect(row) {
      console.log(row.uuid);
      GlobalUtil.model.localProjTree.changeProj(row.uuid);
      this.projSelectDialog = false;
    },
    onDelete(row) {
      this.projSelectDialog = false;
      this.$confirm(`Delete project?`, {
        confirmButtonText: 'OK',
        cancelButtonText: 'CANCEL',
        type: 'info',
        showClose: false,
        closeOnClickModal: false,
      }).then(() => {
        CommandsEditorSocket.delProj(row.uuid, (dict) => {
          console.log(`localTeach.delProj = ${row.uuid}, dict = ${JSON.stringify(dict)}`);
        });
      }).catch(() => {
      });
    },
  },
  beforeDestroy() {
  },
  watch: {
  },
  computed: {
    proListData() {
      const proList = GlobalUtil.model.localProjTree.curProjList;
      const tmpList = [];
      for (let i = 0; i < proList.length; i += 1) {
        const pro = proList[i];
        const onePro = {
          name: pro.name,
          time: pro.ctime, // '2017-12-12 12:12:12',
          state: GlobalUtil.model.localProjTree.curProj.uuid === pro.uuid ? 'Selected' : '',
          uuid: pro.uuid,
        };
        tmpList.push(onePro);
      }
      return tmpList;
    },
    isFileNameCorrect() {
      return GlobalUtil.isFileStr(this.inputText);
    },
  },
  components: {
  },
};
</script>

<style scoped>

.proj-list-style {
  background: green;
}

.top-btn {
  /*width: 50px;
  height: 20px;*/
  padding: 10px;
}

.proj-icon {
  margin-left: 15px;
  margin-top: 6px;
  width: 24px;
  height: 24px;
  background-image: url('./../../assets/img/ide/btn_addproject.svg');
  cursor: pointer;
}

.folder-icon {
  margin-left: 15px;
  margin-top: 6px;
  width: 24px;
  height: 24px;
  background-image: url('./../../assets/img/ide/btn_addfolder.svg');
  cursor: pointer;
}

.file-icon {
  margin-left: 15px;
  margin-top: 5px;
  width: 24px;
  height: 24px;
  background-image: url('./../../assets/img/ide/btn_addfile.svg');
  cursor: pointer;
}

.rename-icon {
  margin-left: 15px;
  margin-top: 6px;
  width: 24px;
  height: 24px;
  background-image: url('./../../assets/img/ide/btn_rename.svg');
  cursor: pointer;
}

.del-icon {
  margin-left: 15px;
  margin-top: 6px;
  width: 24px;
  height: 24px;
  background-image: url('./../../assets/img/ide/btn_trash.svg');
  cursor: pointer;
}

.stop-icon {
  margin-right: 60px;
  margin-top: 10px;
  width: 16px;
  height: 16px;
  background-image: url('./../../assets/img/ide/icon_stop.svg');
  cursor: pointer;
}

.run-icon {
  margin-right: 60px;
  margin-top: 8px;
  width: 16px;
  height: 16px;
  background-image: url('./../../assets/img/ide/icon_running.svg');
  cursor: pointer;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

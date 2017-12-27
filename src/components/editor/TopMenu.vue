<template>
  <div>
    <div>
      <el-button class="top-btn" @click="newProj()">
        New
      </el-button>
      <el-button class="top-btn" @click="allProjs()">
        Projs
      </el-button>
      <el-button class="top-btn" @click="addFolder()">
        +Folder
      </el-button>
      <el-button class="top-btn" @click="addFile()">
        +File
      </el-button>
      <el-button class="top-btn" @click="rename()">
        Rename
      </el-button>
      <el-button class="top-btn" @click="delFile()">
        Delete
      </el-button>
      <!-- <span> Selected: root / {{ model.localProjTree.curSelectedFolderUUID }} / {{ model.localProjTree.curSelectedFile.uuid }} </span> -->

      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="300px"
        :before-close="handleClose"
        center>
        <el-input v-model="inputText" auto-complete="off"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="add()">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="Select a project"
        :visible.sync="projSelectDialog">
        <el-table
          border
          width="800px"
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
      </el-dialog>

    </div>
  </div>
</template>

<script>

import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
  data() {
    return {
      model: GlobalUtil.model,
      dialogVisible: false,
      projSelectDialog: false,
      inputText: '',
      folderOrFile: '',
      title: '',
    };
  },
  mounted() {
  },
  methods: {
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    allProjs() {
      this.projSelectDialog = true;
    },
    getCurFile() {
      const curSelectedUUID = GlobalUtil.model.localProjTree.curSelectedUUID;
      return GlobalUtil.model.localProjTree.getFileInfo(curSelectedUUID);
    },
    delFile() {
      console.log('del folder');
      const curFile = this.getCurFile();
      if (curFile === null) {
        return;
      }
      swal({
        text: `Delete ${curFile.name}?`,
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'CANCEL',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        reverseButtons: true,
        width: '300px',
        preConfirm: text => new Promise((resolve, reject) => {
          GlobalUtil.model.localProjTree.delFiles();
          resolve();
        }),
      }).then((text) => {

      });
    },
    add(file) {
      const text = this.inputText;
      if (this.folderOrFile === 'folder') {
        console.log(`text = ${text}`);
        const folder = GlobalUtil.model.localProjTree.createFolder(text);
        GlobalUtil.model.localProjTree.curProj.files.push(folder);
      }
      if (this.folderOrFile === 'file') {
        const file = GlobalUtil.model.localProjTree.createSimpleFile(text);
        GlobalUtil.model.localProjTree.curProj.files.push(file);
        GlobalUtil.model.localProjTree.setSelectedUUID(file.uuid);
      }
      if (this.folderOrFile === 'proj') {
        const proj = GlobalUtil.model.localProjTree.createProj(text);
        // GlobalUtil.model.localProjTree.changeProj(proj.uuid);
      }
      if (this.folderOrFile === 'rename') {
        GlobalUtil.model.localProjTree.renameFile(text);
      }
      if (this.folderOrFile === 'renameproj') {
        GlobalUtil.model.localProjTree.renameProj(text);
      }
      this.dialogVisible = false;
    },
    newProj() {
      this.folderOrFile = 'proj';
      this.title = 'new project name';
      this.inputText = '';
      this.dialogVisible = true;
    },
    addFolder() {
      console.log('add folder');
      this.folderOrFile = 'folder';
      this.title = 'add folder';
      this.inputText = '';
      this.dialogVisible = true;
    },
    addFile() {
      console.log('add file');
      this.folderOrFile = 'file';
      this.title = 'add file';
      this.inputText = '';
      this.dialogVisible = true;
    },
    rename() {
      console.log(`Rename`);
      if (GlobalUtil.model.localProjTree.curSelectedUUID === GlobalUtil.model.localProjTree.curProj.uuid) {
        console.log(`Rename proj`);
        this.folderOrFile = 'renameproj';
        this.title = `Rename project ${GlobalUtil.model.localProjTree.curProj.name}`;
        this.inputText = `${GlobalUtil.model.localProjTree.curProj.name}`;
        this.dialogVisible = true;
        return;
      }
      const curFile = this.getCurFile();
      if (curFile === null) {
        return;
      }
      this.folderOrFile = 'rename';
      this.title = `Rename ${curFile.name}`;
      this.inputText = `${curFile.name}`;
      this.dialogVisible = true;
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
      swal({
        text: `Delete project?`,
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'CANCEL',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        reverseButtons: true,
        width: '300px',
        preConfirm: text => new Promise((resolve, reject) => {

          resolve();
        }),
      }).then((text) => {
        GlobalUtil.model.localProjTree.delProj(row.uuid);
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
          time: '2017-12-12 12:12:12',
          state: GlobalUtil.model.localProjTree.curProj.uuid === pro.uuid ? 'Selected' : '',
          uuid: pro.uuid,
        };
        tmpList.push(onePro);
      }
      return tmpList;
    },
  },
  components: {
  },
};
</script>

<style scoped>
.top-btn {
  /*width: 50px;
  height: 20px;*/
  padding: 10px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

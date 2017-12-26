<template>
  <div>
    <div>
      <el-button class="top-btn" @click="allProjs()">
        Projs
      </el-button>
      <el-button class="top-btn" @click="addFolder()">
        +Folder
      </el-button>
      <el-button class="top-btn" @click="addFile()">
        +File
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

      <el-dialog title="Select a project" :visible.sync="projSelectDialog">
        <el-table :data="gridData">
          <el-table-column property="name" label="pro name" width="150"></el-table-column>
          <el-table-column property="time" label="date" width="150"></el-table-column>
          <el-table-column property="state" label="state" width="150"></el-table-column>
          <el-table-column property="done" label="done" width="150"></el-table-column>
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
      // gridData: [{
      //   time: '2016-05-02',
      //   name: '王小虎',
      //   state: 'selected',
      //   done: 'select',
      // }],
    };
  },
  mounted() {
  },
  methods: {
    methods: {
      handleClose(done) {
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
      }
    },
    allProjs() {
      this.projSelectDialog = true;
    },
    delFile() {
      console.log('del folder');
      const curSelectedUUID = GlobalUtil.model.localProjTree.curSelectedUUID;
      let tempFiles = [];
      let curFile = null;
      for (var i = 0; i < GlobalUtil.model.localProjTree.curProj.files.length; i++) {
        const file = GlobalUtil.model.localProjTree.curProj.files[i];
        if (file.uuid === curSelectedUUID) {
          curFile = file;
        }
      }
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
        GlobalUtil.model.localProjTree.resetFileBackground(true);
        console.log(`text = ${text}`);
        const folder = GlobalUtil.model.localProjTree.createFolder(text);
        GlobalUtil.model.localProjTree.curProj.files.push(folder);
      }
      if (this.folderOrFile === 'file') {
        const file = GlobalUtil.model.localProjTree.createSimpleFile(text);
        GlobalUtil.model.localProjTree.curProj.files.push(file);
        GlobalUtil.model.localProjTree.setSelectedFileUUID(file.uuid);
        GlobalUtil.model.localProjTree.resetFileBackground(true);
        GlobalUtil.model.localProjTree.resetMenuStyle();
        GlobalUtil.model.localProjTree.setSelectedFileStyle(file.uuid);
      }
      this.dialogVisible = false;
    },
    addFolder() {
      console.log('add folder');
      this.folderOrFile = 'folder';
      this.title = 'add folder';
      this.dialogVisible = true;
      // swal({
      //   text: 'Folder name',
      //   input: 'text',
      //   showCancelButton: true,
      //   confirmButtonText: 'OK',
      //   cancelButtonText: 'CANCEL',
      //   showLoaderOnConfirm: true,
      //   allowOutsideClick: false,
      //   reverseButtons: true,
      //   width: '300px',
      //   preConfirm: text => new Promise((resolve, reject) => {
      //     GlobalUtil.model.localProjTree.resetFileBackground(true);
      //     console.log(`text = ${text}`);
      //     const folder = GlobalUtil.model.localProjTree.createFolder(text);
      //     GlobalUtil.model.localProjTree.curProj.files.push(folder);
      //     resolve();
      //   }),
      // }).then((text) => {
      //
      // });
    },
    addFile() {
      console.log('add file');
      this.folderOrFile = 'file';
      this.title = 'add file';
      this.dialogVisible = true;
      // swal({
      //   text: 'File name',
      //   input: 'text',
      //   showCancelButton: true,
      //   confirmButtonText: 'OK',
      //   cancelButtonText: 'CANCEL',
      //   showLoaderOnConfirm: true,
      //   allowOutsideClick: false,
      //   reverseButtons: true,
      //   width: '300px',
      //   preConfirm: text => new Promise((resolve, reject) => {
      //
      //     console.log(`text = ${text}`);
      //     // const curSelectedFolderUUID = GlobalUtil.model.localProjTree.curSelectedFolderUUID;
      //     const file = GlobalUtil.model.localProjTree.createSimpleFile(text);
      //     GlobalUtil.model.localProjTree.curProj.files.push(file);
      //     GlobalUtil.model.localProjTree.setSelectedFileUUID(file.uuid);
      //     GlobalUtil.model.localProjTree.resetFileBackground(true);
      //     GlobalUtil.model.localProjTreelf.resetMenuStyle();
      //     GlobalUtil.model.localProjTree.setSelectedFileStyle(file.uuid);
      //     // resolve();
      //     // setTimeout(function() {
      //     //
      //     //   resolve();
      //     // }, 100);
      //   }),
      // }).then((text) => {
      //
      // });
    },
  },
  beforeDestroy() {
  },
  watch: {
  },
  computed: {
    gridData() {
      return [{
        time: '2016-05-02',
        name: '王小虎',
        state: 'selected',
        done: 'select',
      }];
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
</style>

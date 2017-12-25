<template>
  <div>
    <div>
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
    };
  },
  mounted() {
  },
  methods: {
    delFile() {
      console.log('del folder');
      swal({
        text: 'Delete?',
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

      });
    },
    addFolder() {
      console.log('add folder');
      swal({
        text: 'Folder name',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'CANCEL',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        reverseButtons: true,
        width: '300px',
        preConfirm: text => new Promise((resolve, reject) => {
          GlobalUtil.model.localProjTree.resetFileBackground(true);
          console.log(`text = ${text}`);
          // const curSelectedFolderUUID = GlobalUtil.model.localProjTree.curSelectedFolderUUID;
          // const uuid = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
          // console.log(`uuid = ${uuid}`);
          const folder = GlobalUtil.model.localProjTree.createFolder(text);
          GlobalUtil.model.localProjTree.curProj.files.push(folder);
          resolve();
        }),
      }).then((text) => {

      });
    },
    addFile() {
      console.log('add file');
      swal({
        text: 'File name',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'CANCEL',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        reverseButtons: true,
        width: '300px',
        preConfirm: text => new Promise((resolve, reject) => {

          console.log(`text = ${text}`);
          // const curSelectedFolderUUID = GlobalUtil.model.localProjTree.curSelectedFolderUUID;
          const file = GlobalUtil.model.localProjTree.createSimpleFile(text);
          GlobalUtil.model.localProjTree.curProj.files.push(file);
          GlobalUtil.model.localProjTree.setSelectedFileUUID(file.uuid);
          GlobalUtil.model.localProjTree.resetFileBackground(true);
          GlobalUtil.model.localProjTreelf.resetMenuStyle();
          GlobalUtil.model.localProjTree.setSelectedFileStyle(file.uuid);
          // resolve();
          // setTimeout(function() {
          //
          //   resolve();
          // }, 100);
        }),
      }).then((text) => {

      });
    },
  },
  beforeDestroy() {
  },
  watch: {
  },
  computed: {
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

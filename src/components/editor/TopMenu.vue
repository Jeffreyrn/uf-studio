<template>
  <div>
    <div>
      Top Menu
      <button @click="addFolder()">
        +Folder
      </button>
      <button @click="addFile()">
        +File
      </button>
      <span> Selected: root / {{ model.localProjTree.curSelectedFolderUUID }} / {{ model.localProjTree.curSelectedFileUUID }} </span>
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
          console.log(`text = ${text}`);
          const curSelectedFolderUUID = GlobalUtil.model.localProjTree.curSelectedFolderUUID;
          const uuid = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
          console.log(`uuid = ${uuid}`);
          const folder = GlobalUtil.model.localProjTree.createFolder(uuid, curSelectedFolderUUID, text);
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
          const curSelectedFolderUUID = GlobalUtil.model.localProjTree.curSelectedFolderUUID;
          const uuid = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
          console.log(`uuid = ${uuid}`);
          const folder = GlobalUtil.model.localProjTree.createSimpleFile(uuid, curSelectedFolderUUID, text);
          GlobalUtil.model.localProjTree.curProj.files.push(folder);
          resolve();
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

</style>

<template>
  <div style="height:40px;">
    <input id="app-title-text-id" class="app-title-text" v-model="titleEditingStr" type="text" v-if="titleEditing===true" @keydown="onEnter()" @blur="onblur()" />
    <div v-else class="app-title" @click="chanegEdit()">{{ data.omitname }}</div>

    <DialogAlert
      :title='alertTitle'
      subtitle=''
      :onok='onok'
      v-if="errorAlert===true">
    </DialogAlert>
  </div>
</template>

<script>

import DialogAlert from './../DialogAlert';

export default {
  props: ['data'],
  data() {
    return {
      model: window.GlobalUtil.model,
      titleEditing: false,
      titleEditingStr: '',
      errorAlert: false,
      alertTitle: '',
    };
  },
  mounted() {
  },
  methods: {
    chanegEdit() {
      if (this.data.category === 'myapp' && this.titleEditing === false) {
        this.titleEditing = !this.titleEditing;
        this.titleEditingStr = this.data.name;
        setTimeout(() => {
          document.getElementById('app-title-text-id').focus();
        });
      }
    },
    onEnter() {
      const e = window.event;
      if (e.keyCode === 13) {
        this.onblur();
      }
    },
    onblur() {
      this.titleEditing = false;
      const checkFileNamePass = window.GlobalUtil.checkFileName(this.titleEditingStr);
      if (!checkFileNamePass) {
        setTimeout(() => {
          this.alertTitle = 'New name is not correct .';
          this.errorAlert = true;
        }, 50);
        return;
      }
      if (this.data.name !== this.titleEditingStr) {
        window.CommandsAppsSocket.renameFile(this.data.name, this.titleEditingStr, (dict) => {
          if (dict.code !== 0) {
            setTimeout(() => {
              this.alertTitle = 'Rename fails .';
              this.errorAlert = true;
            }, 50);
          }
          else {
            setTimeout(() => {
              this.alertTitle = 'Rename success .';
              this.errorAlert = true;
            }, 50);
          }
        });
      }
    },
    onok() {
      this.errorAlert = false;
      this.titleEditing = false;
    },
  },
  components: {
    DialogAlert,
  },
};
</script>

<style scoped lang="scss">
.app-title {
  font-family: 'Gotham-Book';
  font-size: 1.2rem;
  color: #4A4A4A;
  letter-spacing: -0.67px;
  height: 40px;
  line-height: 40px;
  // padding-top: 5px;
}
.app-title-text {
  font-family: 'Gotham-Book';
  font-size: 1.2rem;
  color: #4A4A4A;
  letter-spacing: -0.67px;
  height: 30px;
  width: 136px;
  outline: none;
  border: 1px solid #d9d9d9;
}
</style>

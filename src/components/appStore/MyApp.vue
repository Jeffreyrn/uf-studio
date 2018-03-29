<template>
  <div>
    <div class="tab-contain">
      <ul>
        <li v-for="(data ,index) in model.localAppsMgr.allApps.my.data" class="com-app-icon">
          <!-- <router-link :to="{name: 'AppSubmit', params:{data: data}}">
          </router-link> -->
          <div class="position-absolute">
            <div class="icon-text-style" style="background:#9CC5F7;" v-if="index % 4 === 0">
              {{ data.name[0].toUpperCase() }}
            </div>
            <div class="icon-text-style" style="background:#F8C6DE;" v-if="index % 4 === 1">
              {{ data.name[0].toUpperCase() }}
            </div>
            <div class="icon-text-style" style="background:#B8E986;" v-if="index % 4 === 2">
              {{ data.name[0].toUpperCase() }}
            </div>
            <div class="icon-text-style" style="background:#D5D5D5" v-if="index % 4 === 3">
              {{ data.name[0].toUpperCase() }}
            </div>
            <div class="btn-wrapper">
              <router-link :to="{ name: 'Blockly', params:{data: data}}">
                <div class="icon-btn edit-btn" @click="onEdit()"></div>
              </router-link>
              <router-link :to="{name: 'AppSubmit', params:{data: data}}">
                <div class="icon-btn upload-btn"></div>
              </router-link>
              <div class="icon-btn delete-btn" @click="onDelete(data.name)"></div>
            </div>
            <AppTitle class="position-absolute name-style" :data='data'></AppTitle>
          </div>
        </li>
      </ul>
    </div>

    <DialogTeachAlert
      :title='deleteAppTitle'
      cancel='Cancel'
      ok='Delete'
      :onok='delApp'
      :isdelete=true
      :oncancel='closeAlert'
      v-if="isDeleteApp===true">
    </DialogTeachAlert>

  </div>
</template>

<script>

import DialogTeachAlert from './../DialogTeachAlert';
import AppTitle from './AppTitle';

export default {
  data() {
    return {
      model: window.GlobalUtil.model,
      isDeleteApp: false,
      deleteAppTitle: '',
    };
  },
  mounted() {
  },
  methods: {
    onDelete(name) {
      this.deleteAppTitle = `Delete app '${name}' ?`;
      this.deleteAppName = name;
      this.isDeleteApp = true;
    },
    closeAlert() {
      this.isDeleteApp = false;
    },
    delApp() {
      this.isDeleteApp = false;
      window.CommandsAppsSocket.delFile(this.deleteAppName, () => {
      });
    },
    onEdit() {
      // const path = this.data.name;
      // Blockly

      // window.CommandsAppsSocket.getProject(path).then((xml) => {
      //   // console.log('get xml return', xml.xmlData)
      //   Blockly.loadWorkspace(xml.xmlData, this.onChangeEvent)
      // }, (error) => {
      //   this.$message(`get xml error code${error.code}`)
      // })
    },
  },
  components: {
    DialogTeachAlert,
    AppTitle,
  },
  computed: {
    bgColor: () => ({
      'start-btn': window.GlobalUtil.model.localTeach.curProj.files.length > 0 && window.GlobalUtil.model.localTeach.visible.starRecording === false,
      'start-btn-dark': window.GlobalUtil.model.localTeach.curProj.files.length === 0 || window.GlobalUtil.model.localTeach.visible.starRecording === true,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*.app-my-icon {*/
  /*width: 136px;*/
  /*height: 136px;*/
  /*border-radius: 4px;*/
  /*margin: 1.4rem 3.2rem 1.4rem 0;*/
  /*display: inline-block;*/
  /*text-align: center;*/
  /*background: #F3F5F7;*/
/*}*/
.com-app-icon:hover, .com-app-icon:focus {
  .btn-wrapper {
    transform: scale(1) ;
  }
}
.icon-text-style {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  font-family: 'Gotham-Medium';
  // font-size: 2rem;
  font-size: 35px;
  color: #FFF;
  padding-top: 25px;
  letter-spacing: -0.66px;
  text-align: center;

  // padding-top: 2.7rem;
  // padding-top: 30px;
}
.name-style {
  top: 100px;
}
.btn-wrapper {
  position: absolute;
  width:100%;
  /*height: 2.4rem;*/
  // margin-top: -2.4rem;
  top: 20px;
  transform: scale(0) ;
  transition: all .8s;
}
.icon-btn {
  float: left;
  width: 2rem;
  height: 2rem;
  float: left;
  margin-left: 0.5rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 2rem 2rem;
  cursor: pointer;
}
.edit-btn {
  background-image: url('./../../assets/img/appStore/btn_edit.svg');
}
.upload-btn {
  background-image: url('./../../assets/img/appStore/btn_upload.svg');
}
.delete-btn {
  background-image: url('./../../assets/img/appStore/btn_delete.svg');
}
</style>

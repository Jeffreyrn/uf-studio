<template>
  <div>
    <div class="tab-contain">
      <ul>
        <li v-for="(data ,index) in model.localAppsMgr.allApps.my.data" class="app-my-icon">
          <!-- <router-link :to="{name: 'AppSubmit', params:{data: data}}">
          </router-link> -->
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
          <div style="width:100%;height:36px;margin-top:-36px;">
            <router-link :to="{name: 'AppSubmit', params:{data: data}}">
              <div class="icon-btn edit-btn"></div>
            </router-link>
            <router-link :to="{name: 'AppSubmit', params:{data: data}}">
              <div class="icon-btn upload-btn"></div>
            </router-link>
            <div class="icon-btn delete-btn" @click="onDelete(data.name)"></div>
          </div>
          <div class="app-title">{{ data.omitname }}</div>
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
  },
  components: {
    DialogTeachAlert,
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
.app-my-icon {
  width: 136px;
  height: 136px;
  border-radius: 4px;
  margin: 1.4rem 3.2rem 1.4rem 0;
  display: inline-block;
  text-align: center;
  background: #F3F5F7;
}
.icon-text-style {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  // background:yellow;
  font-family: Gotham-Medium;
  font-size: 36px;
  color: #FFFFFF;
  letter-spacing: -0.66px;
  text-align: center;
  padding-top: 50px;
}
.icon-btn {
  width: 36px;
  height: 36px;
  float: left;
  margin-left: 7px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 36px 36px;
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
.app-title {
  font-family: 'Gotham-Book';
  // font-size: 16px;
  font-size: 1.2rem;
  color: #4A4A4A;
  letter-spacing: -0.67px;
  /* background: yellow; */
  height: 40px;
  // line-height: 40px;
  // line-height: 1.2rem;
}
</style>

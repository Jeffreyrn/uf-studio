
<template>
  <div class="noselected">
    <div class="dialog-wrap">
      <div class="dialog-cover1" @click="onclose"></div>
      <div class="dialog-content" id="dialog-content">
        <div class="position-absolute top-bar">
          <span class="top-title">
            Please insert an icon
          </span>
          <div class="position-absolute dialog-close" @click="onclose">
          </div>
        </div>
        <div class="icons-list">
          <template v-for='(data, index) in model.localPaintMgr.emotions'>
            <div class="icons-list-head">
              {{ data.name }}
            </div>
            <div style="margin-left:15px;">
              <template v-for='(data1, index) in data.list'>
                <div class="one-icon" @click="selectIcon(data1)">
                  <!-- {{ data1 }} -->
                  <img v-if="model.localPaintMgr.selectedIcon===data1" v-bind:src="data1" width="100%" height="100%" style="background:#EAECEE;" />
                  <img v-else v-bind:src="data1" width="100%" height="100%" />
                </div>
              </template>
            </div>
          </template>
        </div>
        <span v-if="isSelectedIcon">
          <div class="position-absolute btn-create cursor-pointer" @click="onok">
            OK
          </div>
        </span>
        <span v-else>
          <div class="position-absolute btn-create-opacity">
            OK
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['onok', 'onclose', 'listlist'],
  data() {
    return {
      model: window.GlobalUtil.model,
      showSelected: true,
      selectedIcon: null,
      list: ['list1', 'list2'],
    }
  },
  activated: function() {
  },
  mounted() {
    const dialogContent = document.getElementById('dialog-content');
    const inputText = document.getElementById('teach-input-text');
    if (this.width !== undefined) {
      dialogContent.style.width = `${this.width}px`;
    }
    if (this.height !== undefined) {
      dialogContent.style.height = `${this.height}px`;
    }
    if (this.input_top !== undefined) {
      inputText.style.top = `${this.input_top}px`;
    }
    this.showSelected = true;
    if (this.show_selected === false || this.show_selected === 'false') {
      this.showSelected = false;
    }
    console.log(`dialogContent width = ${this.width}, height = ${this.height}`);
  },
  methods: {
    selectIcon(data) {
      this.model.localPaintMgr.selectedIcon = data;
    },
  },
  components: {
  },
  computed: {
    isSelectedIcon() {
      return this.model.localPaintMgr.selectedIcon !== null;
    },
  },
}
</script>

<style lang="scss" scoped>
.top-title {
  position: absolute;
  left: 25px;
  top: 15px;
  font-family: 'Gotham-Medium';
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: -0.78px;
}
.dialog-content {
  width: 580px;
  height: 400px;
  position: fixed;
  top: 20%;
  right: 0px;
  z-index: 10;
  background: white;
  overflow: hidden;
}
.top-bar {
  background: black;
  width: 100%;
  height: 40px;
}
.icons-list {
  width:100%;
  height:320px;
  margin-top:40px;
  overflow-y: scroll;
}
.icons-list-head {
  font-family: 'Gotham-Medium';
  font-size: 12px;
  line-height: 40px;
  height: 25px;
  color: #555555;
  letter-spacing: -0.5px;
  text-align: left;
  padding-left: 20px;
  clear: left;
}
.one-icon {
  width: 30px;
  height: 30px;
  float: left;
  margin: 10px;
  cursor: pointer;
}
.dialog-cover1 {
  // background: #000;
  // opacity: .3;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
// .dialog-close {
//   top: 15px;
//   right: 0px;
//   width: 40px;
//   height: 40px;
//   color: white;
//   text-align:center;
//   line-height: 40px;
//   cursor: pointer;
//   background-image: url('./../../assets/img/edit/recording/icon_close.svg');
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: 16px 16px;
// }
.point-selected-bg {
  width: 128px;
  height: 128px;
  top: 110px;
  cursor: pointer;
}
.text-select {
  font-family: 'Gotham-Book';
  font-size: 14px;
  letter-spacing: -0.78px;
  text-align: center;
}
.btn-create-opacity {
  width: 100%;
  height: 40px;
  bottom: 0px;
  text-align: center;
  font-family: 'Gotham-Book';
  font-size: 14px;
  color: #BABABA;
  letter-spacing: -0.78px;
  line-height: 40px;
  background: #ECECEC;
}
.btn-create {
  width: 100%;
  height: 40px;
  bottom: 0px;
  background: #52BF53;
  text-align: center;
  font-family: 'Gotham-Book';
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: -0.78px;
  line-height: 40px;
}

</style>

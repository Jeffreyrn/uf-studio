
<template>
  <div id="root-list" class="noselected">
    <div class="dialog-wrap">
      <div class="dialog-cover" @click="onclose"></div>
      <div class="dialog-content">
        <div class="dialog-top">
          <span class="top-title">
            Insert Text3
          </span>
          <div class="dialog-close" @click="onclose">
          </div>
        </div>

        <textarea
          ref="fontText"
          @keydown="textChange"
          v-model="model.localPaintMgr.curDialogFontInputText"
          type="text"
          class="position-absolute dialog-input"
          placeholder="Please enter text" >
        </textarea>

        <el-select
          v-model="model.localPaintMgr.dialog.fontSelect"
          @change="onSelectChange"
          placeholder="Select"
          class="position-absolute font-selected">
          <el-option
            v-for="(item, index) in FONT_LIST"
            :key="index"
            :label="item.name"
            :value="index">
          </el-option>
        </el-select>

        <div v-if="isCorrectText" class="btn-ok cursor-pointer" @click="onopen">
          Open
        </div>
        <div v-else class="btn-ok" style="background:#ECECEC;color: #BABABA;">
          Open
        </div>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  props: ['onopen', 'onclose'],
  name: 'dialog-font-select',
  data() {
    return {
      model: window.GlobalUtil.model,
      // dialog: {
      //   textInput: '', // text value
      //   fontSelect: 0, // select font
      // },
      FONT_LIST: [
        {
          name: this.$t('paintApp.fontNameList.blacklight'),
          src: require('./../../assets/fonts/blackLight.ttf'),
          family: 'black-light',
        },
        {
          name: this.$t('paintApp.fontNameList.xingkai'),
          src: require('./../../assets/fonts/STXingkai-SC-Bold.ttf'),
          family: 'xing-kai',
        },
        {
          name: this.$t('paintApp.fontNameList.lanting'),
          src: require('./../../assets/fonts/lanting.ttf'),
          family: 'lan-ting',
        },
        {
          name: this.$t('paintApp.fontNameList.kaiti'),
          src: require('./../../assets/fonts/kanti.ttf'),
          family: 'kan-ti',
        },
      ],
    };
  },
  mounted() {
    this.model.localPaintMgr.FONT_LIST = this.FONT_LIST;
    this.onSelectChange();
  },
  computed: {
    isCorrectText() {
      return this.model.localPaintMgr.curDialogFontInputText.length > 0;
    },
  },
  methods: {
    textChange() {
      // this.$refs.fontText.style.fontFamily
    },
    onSelectChange() {
      console.log(`dialog.fontSelect = ${this.model.localPaintMgr.dialog.fontSelect}`);
      this.$refs.fontText.style.fontFamily = this.model.localPaintMgr.FONT_LIST[this.model.localPaintMgr.dialog.fontSelect].family;
    },
  },
  watch: {
  },
}
</script>

<style lang="scss" scoped>
.head-text {
  color: blue;
}
.dialog-top {
  width: 100%;
  height: 67px;
  background: #484848;
}
.dialog-close {
  position: absolute;
  right: 10px;
  top: 25px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
  background-position: center;
  background-image: url('./../../assets/img/pop/icon_close.svg');
  background-size: 10px 11px;
  background-repeat: no-repeat;
}
.top-title {
  position: absolute;
  left: 24px;
  top: 30px;
  font-family: 'Gotham-Medium';
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: -1px;
}
.dialog-content {
  width: 580px;
  height: 330px;
  position: fixed;
  top: 20%;
  left: 0px;
  right: 0px;
  margin-left:auto;
  margin-right:auto;
  z-index: 10;
  background: white;
  overflow: hidden;
}
.dialog-input {
  width: 350px;
  height: 120px;
  top: 90px;
  /* left:118px; */
  left: 0px;
  right: 0px;
  margin: auto;
  padding-left: 15px;
  padding-right: 15px;
  background: rgba(223, 224, 227, 1);
  font-size: 20px;
  // border: 1px solid #575C62;
  border: 0px;
  outline:none;
}
.font-selected {
  left: 115px;
  top: 220px;
  width: 350px;
}
.btn-ok {
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0px;
  background: #52BF53;
  text-align: center;
  letter-spacing: -0.88px;
  line-height: 40px;
  font-family: 'Gotham-Book';
  font-size: 12px;
  color: #FFFFFF;
  letter-spacing: -0.5px;
}

</style>

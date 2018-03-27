
<template>
  <div id="root-dialog1" class="noselected">
    <div class="dialog-wrap">
      <div class="dialog-cover" @click="onclose"></div>
      <div class="dialog-content" id="dialog-content">
        <div class="position-absolute top-bar">
          <span class="top-title">
            <!-- {{ title }} -->
            Please choose the way you want the pattern to be <span style="color:lightgreen;">Drawn/Engraved</span>
          </span>
          <div class="position-absolute dialog-close" @click="onclose">
          </div>
        </div>
        <!-- <span v-if="showSelected===true">
        </span> -->
        <div class="position-absolute point-selected-bg text-select" v-bind:class="bgColor2" style="left:110px;" @click="typeSelect('outline')">
          <div class="text-a-com text-a-outline">
            A
          </div>
          <span class="text-bottom" style="">Outline</span>
          <div v-if="model.localPaintMgr.projTypeSelected==='outline'" class="mode-selected-icon"></div>
        </div>

        <div class="position-absolute point-selected-bg text-select" v-bind:class="bgColor1" style="right:110px;" @click="typeSelect('gray')">
          <div class="text-a-com text-a-gray">
            A
          </div>
          <div class="text-bottom" style="">Grayscale</div>
          <div v-if="model.localPaintMgr.projTypeSelected==='gray'" class="mode-selected-icon"></div>
        </div>

        <input
          id="teach-input-text"
          v-model="model.localPaintMgr.curDialogProjInputText"
          type="text" class="position-absolute dialog-input"
          placeholder="Please enter a project name"/>
        <div class="position-absolute dialog-error"> {{ model.localPaintMgr.dialogErrorTips }} </div>
        <span v-if="isFileNameCorrect">
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
  props: ['width', 'height', 'title', 'show_selected', 'input_top', 'onok', 'onclose'],
  data() {
    return {
      model: window.GlobalUtil.model,
      showSelected: true,
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
    typeSelect(type) {
      this.model.localPaintMgr.projTypeSelected = type;
    },
  },
  components: {
  },
  computed: {
    isFileNameCorrect() {
      const text = this.model.localPaintMgr.curDialogProjInputText;
      if (text === null || text === '') {
        this.model.localPaintMgr.dialogErrorTips = '';
      }
      const isFileStr = window.GlobalUtil.isFileStr(this.model.localPaintMgr.curDialogProjInputText);
      if (!isFileStr) {
        return false;
      }
      return isFileStr;
    },
    bgColor1: () => ({
      'selected-bg-color': window.GlobalUtil.model.localPaintMgr.projTypeSelected === 'gray',
      'unselected-bg-color': window.GlobalUtil.model.localPaintMgr.projTypeSelected === 'outline',
    }),
    bgColor2: () => ({
      'selected-bg-color': window.GlobalUtil.model.localPaintMgr.projTypeSelected === 'outline',
      'unselected-bg-color': window.GlobalUtil.model.localPaintMgr.projTypeSelected === 'gray',
    }),
  },
}
</script>

<style lang="scss" scoped>
.top-title {
  position: absolute;
  left: 25px;
  top: 30px;
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
  left: 0px;
  right: 0px;
  margin-left:auto;
  margin-right:auto;
  z-index: 10;
  background: white;
  overflow: hidden;
}
.top-bar {
  background: black;
  width: 100%;
  height: 68px;
}
.dialog-close {
  top: 15px;
  right: 0px;
  width: 40px;
  height: 40px;
  color: white;
  text-align:center;
  line-height: 40px;
  cursor: pointer;
  background-image: url('./../../assets/img/edit/recording/icon_close.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 16px 16px;
}
.dialog-input {
  width:350px;
  height:40px;
  top:285px;
  /* left:118px; */
  left: 0px;
  right: 0px;
  margin: auto;
  padding-left: 15px;
  border: 1px solid #575C62;
  outline:none;
}
.dialog-error {
  left:120px;
  /* top:335px; */
  bottom: 50px;
  width: 400px;
  font-family: 'Gotham-Book';
  font-size: 9px;
  color: #B2B2B2;
  letter-spacing: -0.56px;
}
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
input::-webkit-input-placeholder{ /*WebKit browsers*/
  font-family: Gotham-Book;
  font-size: 12px;
  color: #D4D4D4;
  letter-spacing: -0.5px;
  text-align: center;
}
input::-moz-input-placeholder{ /*Mozilla Firefox*/
  font-family: Gotham-Book;
  font-size: 12px;
  color: #D4D4D4;
  letter-spacing: -0.5px;
  text-align: center;
}
input::-ms-input-placeholder{ /*Internet Explorer*/ 
  font-family: Gotham-Book;
  font-size: 12px;
  color: #D4D4D4;
  letter-spacing: -0.5px;
  text-align: center;
}
.mode-selected-icon {
  position: absolute;
  width: 30px;
  height: 30px;
  background-image: url('./../../assets/img/pop/icon_select.svg');
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center;
  left: 0;
  right: 0;
  top: 130px;
  margin: auto;
}
.text-a-com {
  font-family: 'Gotham-Book';
  font-size: 80px;
  text-align: center;
  padding-top: 5px;
}
.unselected-bg-color {
  background:#EFF3F5;
  .text-a-gray {
    color:#555555;
  }
  .text-a-outline {  
    color: transparent;  
    -webkit-text-stroke: 1px #444444;  
  }
  .text-bottom {
    color:#444444;
  }
}
.selected-bg-color {
  background:#61656F;
  .text-a-gray {
    color: white;
  }
  .text-a-outline {  
    color: transparent;  
    -webkit-text-stroke: 1px white;  
  }  
  .text-bottom {
    color:#ffffff;
  }
}
</style>

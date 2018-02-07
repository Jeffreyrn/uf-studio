
<template>
  <div>
    <div class="dialog-wrap">
      <!-- <div class="dialog-cover" @click="closeMyself"></div> -->
      <div class="dialog-content">
        <span class="top-title">{{ model.localProjTree.curDialogTitle }}</span>
        <div style="margin-top:156px;">
          <div class="float-left btn-cancel" @click="closeMyself">
            Cancel
          </div>
          <div class="float-left btn-delete cursor-pointer" @click="ondelete">
            Delete
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const path = require('path')
  
import CustomSelect from './CustomSelect';

export default {
  data () {
    return {
      model: GlobalUtil.model,
      // inputText: '',
      // selected: '.py',
      options: [
          { text: 'py', value: '.py' },
          { text: 'txt', value: '.txt' },
          { text: 'md', value: '.md' },
          { text: 'none', value: '' },
      ],
    }
  },
  methods: {
    closeMyself() {
      this.model.localProjTree.deleteDialogShow = false;
    },
    ondelete() {
      this.model.localProjTree.deleteDialogShow = false;
      GlobalUtil.model.localProjTree.onDeleteDialog();
    },
  },
  components: {
    CustomSelect,
  },
  computed: {
  },
}
</script>

<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .3s ease;
}
.drop-enter {
  transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
}
.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.dialog-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.top-title {
  position: absolute;
  left: 130px;
  top: 70px;
  /* height: 67px; */
  font-family: 'Gotham-Medium';
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: -1px;
  /* background-color: yellow; */
  /* line-height: 16px; */
}
.dialog-content {
  width: 356px;
  position: fixed;
  height: 196px;
  top: 20%;
  left: 0px;
  right: 0px;
  margin-left:auto;
  margin-right:auto;
  z-index: 10;
  background: #303030;
  overflow: hidden;
}
.dialog-close:hover {
  color: #4fc08d;
}
.dialog-add {
  width: 100%;
  height: 100px;
  /* background-color: yellow; */
}
.btn-cancel {
  width: 178px;
  height: 40px;
  /* margin-top: 230px; */
  /* background-color: yellow; */
  background: #484848;
  text-align: center;
  font-family: 'Gotham-Book';
  font-size: 14px;
  color: #7B7B7B;
  letter-spacing: -0.88px;
  line-height: 40px;
  cursor: pointer;
}
.btn-delete {
  width: 178px;
  height: 40px;
  /* margin-top: 230px; */
  /* margin-left: 178px; */
  /* background-color: green; */
  background: #E24D4A;
  text-align: center;
  font-family: 'Gotham-Book';
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: -0.88px;
  line-height: 40px;
  /* cursor: pointer; */
}
</style>


<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover" @click="closeMyself"></div>
      <div class="dialog-content">
        <div class="dialog-top">
          <span class="proj-top-title">Select a Project</span>
          <div class="dialog-close" @click="closeMyself">
          </div>
        </div>
        <table>
            <tr>
              <th class="dialog-table-head">Project name</th>
              <th class="dialog-table-head">Date</th>
              <th class="dialog-table-head">Option</th>
            </tr>
        </table>
        <div class="dialog-table">
          <table>
            <template v-for='(data,index) in model.localProjTree.curProjList'>
              <tr>
                <td>{{ data.name }}</td>
                <td>{{ data.ctime }}</td>
                <td>Option</td>
              </tr>
            </template>
          </table>
        </div>
        <div class="dialog-add">
          <div class="dialog-add-content" @click="addProj()">
            <span>+</span>
            <span>New Project</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        model: GlobalUtil.model,
      }
    },
    methods: {
      closeMyself() {
        // this.$emit('on-close')
        this.model.localProjTree.projsDialogShow = false;
      },
      addProj() {
        GlobalUtil.model.localProjTree.dialogVisible = true;
      }
    }
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
    z-index: 500;
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
  .proj-top-title {
    position: absolute;
    left: 24px;
    top: 25px;
    /* height: 67px; */
    font-family: Gotham-Medium;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: -1px;
    /* background-color: yellow; */
    /* line-height: 16px; */
  }
  .dialog-content {
    width: 580px;
    position: fixed;
    height: 330px;
    top: 20%;
    left: 0px;
    right: 0px;
    margin-left:auto;
    margin-right:auto;
    z-index: 10;
    background: #303030;
    overflow: hidden;
  }
  .dialog-top {
    width: 100%;
    height: 67px;
    background: #3F4955;
  }
  .dialog-table {
    /* width: 100%; */
    width: 600px;
    height: 140px;
    overflow-y: scroll;
  }
  .dialog-table-head {
    width: 194px;
    height: 66px;
    font-family: Gotham-Medium;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: -1px;
    text-align: center;
    line-height: 16px;
  }
  .dialog-table td {
    width: 194px;
    height: 40px;
    font-family: Gotham-Book;
    font-size: 12px;
    color: #FFFFFF;
    padding-left: 50px;
    letter-spacing: -0.38px;
    /* text-align: center; */
    line-height: 12px;
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
    background-image: url('./../assets/img/pop/icon_close.svg');
    background-size: 10px 11px;
    background-repeat: no-repeat;
  }
  .dialog-close:hover {
    color: #4fc08d;
  }
  .dialog-add {
    width: 100%;
    height: 100px;
    /* background-color: yellow; */

  }
  .dialog-add-content {
    position: absolute;
    bottom: 16px;
    left: 0;
    right: 0;
    margin: auto;
    /* background-color: yellow; */
    width: 496px;
    height: 26px;
    font-family: Gotham-Book;
    text-align: center;
    line-height: 10px; 
    letter-spacing: -0.5px;
    color: #FFFFFF;
    padding-top: 8px;
    border:1px dashed #5C5C5C;
    cursor: pointer;
  }
</style>

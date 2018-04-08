
<template>
  <div id="root-list" class="noselected">
    <div class="dialog-wrap">
      <div class="dialog-cover" @click="onclose"></div>
      <div class="dialog-content">
        <div class="dialog-top">
          <span class="top-title">
            Select a Project
          </span>
          <div class="dialog-close" @click="onclose">
          </div>
        </div>
        <!-- @current-change="handleCurrentChange" -->
        <el-table
          id="proj-id"
          height="223"
          ref='singleTable'
          :data="model.localPaintMgr.projList"
          highlight-current-row
          @current-change="handleCurrentChange"
          @cell-mouse-enter="cellMouse"
          @cell-mouse-leave="cellMouse"
          :row-class-name="tableRowClassName"
          style="width:100%;border:0;">
          <el-table-column
            style=""
            prop="name"
            label="Project name"
            width="150">
            <template slot-scope="scope">
              <div class="proj-selected"
                v-if="model.localPaintMgr.curProj===model.localPaintMgr.projList[scope.$index]">
              </div>
              <div class="table-td">
                {{ model.localPaintMgr.projList[scope.$index].name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="created"
            label="Date"
            width="180">
            <template slot-scope="scope">
              <div class="table-td">
                {{ model.localPaintMgr.projList[scope.$index].created }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="Type"
            width="150">
            <template slot-scope="scope">
              <div class="table-td">
                {{ model.localPaintMgr.projList[scope.$index].projType }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="Done">
            <template slot-scope="scope">
              <div class="proj-icon-trash float-left" @click="onDelete(scope.$index)"></div>
            </template>
          </el-table-column>
        </el-table>

        <div v-if="isSelectedApp" class="btn-ok cursor-pointer" @click="onopen(currentRow)">
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
  data() {
    return {
      model: window.GlobalUtil.model,
      currentRow: -1,
    };
  },
  mounted() {
    setTimeout(() => {
      // const html = document.getElementById('proj-id').innerHTML;
      // console.log(`html = ${html}`);
      // const trs = document.getElementsByTag("tr"); // .onmouseover = null;
      // for (let i = 0; i < trs.length; i += 1) {
      //   const tr = trs[i];
      //   tr.onmouseover = null;
      // }
    });
  },
  computed: {
    isSelectedApp() {
      return this.currentRow >= 0;
    },
  },
  methods: {
    onDelete(index) {
      const curProj = this.model.localPaintMgr.projList[index];
      this.model.localPaintMgr.curToDelProj = curProj;
      this.model.localPaintMgr.curToDelProjTitle = `Delete project ${curProj.name} ?`;
      this.model.localPaintMgr.visible.del = true;
    },
    tableRowClassName({ row, rowIndex }) {
      console.log(`row = ${row}, rowIndex = ${rowIndex}`);
      return rowIndex === this.currentRow ? 'selected' : 'normal';
    },
    // setCurrent(row) {
    //   this.$refs.singleTable.setCurrentRow(row);
    // },
    handleCurrentChange(val) {
      if (val !== null && val !== undefined) {
        this.currentRow = val;
        this.currentRow = val.index;
        console.log(`set Current this.currentRow = ${this.currentRow}`);
        // this.model.localPaintMgr.curProj = val;
      }
    },
    cellMouse(row, column, cell, event) {
      console.log(`row = ${row}, column = ${column}, cell = ${cell}, event = ${event}`)
      cell.style.backgroundColor = '';
    },
  },
}
</script>

<style lang="scss" scoped>
// .head-text {
//   color: blue;
// }
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
  /* cursor: pointer; */
}
// .table-td1{
//   font-family: 'Gotham-Book';
//   font-size: 12px;
//   // color: #3C3C3C;
//   letter-spacing: -0.38px;
//   text-align: center;
// }
.table-head {
  font-family: 'Gotham-Medium';
  font-size: 12px;
  color: #3C3C3C;
  letter-spacing: -1px;
  text-align: center;
}
.proj-icon-trash {
  margin-left: 20px;
  width: 30px;
  height: 30px;
  background-image: url('./../../assets/img/pop/btn_trash.svg');
  background-size: 8px 10px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
.proj-selected {
  position: absolute;
  width: 10px;
  height: 10px;
  top: 10px;
  left: 30px;
  background-image: url('./../../assets/img/pop/icon_select.svg');
  background-size: 10px 10px;
  background-repeat: no-repeat;
  background-position: center;
}
</style>

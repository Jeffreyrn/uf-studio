<template lang="html">
  <div>
    <el-button @click='addRecord()'>addRecord</el-button>
    <div class="float-clear"></div>
    <template v-for='(file,index) in model.localTeach.curProj.files'>
      <div>{{ index }} -- {{ file.uuid }} </div>
      <el-button value='delete' @click='onClick($event, file.uuid)'>Delete</el-button>
      <!-- scroll timer  -->
      <div id="scroll-timer" style="font-size:5px;margin-left:50px;width:900px;background-color:lightgray;overflow-x:scroll;" @scroll="checkscroll()">
        <div style="width:81100px;">
          <template v-for='index in showArr'>
            <div class="float-left" style="border:1px solid lightgray;width:40px;height:50px;background-color:#fffae2;" @click='onSelect($event, index)'>
              <!-- button -->
              <div style="width:40px;height:20px;background-color:yellow;">
                <div class="float-left" v-if="index % 10 === 0" style="background-color:lightpink;">
                  {{ parseInt(index / 10) }}.0
                </div>
                <div class="float-left" v-if="index % 10 !== 0">
                  <div style="background-color:lightgreen" v-if="index <= model.localTeach.curDuration">
                    .{{ index % 10 }}
                  </div>
                  <div style="" v-if="index > model.localTeach.curDuration">
                    .{{ index % 10 }}
                  </div>
                </div>
                <div class="float-left" v-if="index === curSelectedIndex" style="width:40px;height:1px;background-color:red;"></div>
              </div>
              <!-- button end -->
            </div>
          </template>
        </div>
      </div>
      <!-- scroll timer end -->
    </template>

  </div>
</template>
<script>

import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
  data() {
    return {
      model: GlobalUtil.model,
      showArr: [],
    };
  },
  mounted() {
    this.showArr = [];
    for (let i = GlobalUtil.model.localTeach.msMin; i <= GlobalUtil.model.localTeach.msMax; i += 1) {
      this.showArr.push(i);
    }
    // GlobalUtil.model.localTeach.chartOption.xAxis.data = this.showArr;
  },
  methods: {
    onClick(e, uuid) {
      const attr = e.currentTarget.value;
      console.log(`attr = ${attr}, uuid = ${uuid}`);
      const file = GlobalUtil.model.localTeach.getFileInfo(uuid);
      switch (attr) {
        case 'delete':
          {
            swal({
              text: `Delete ${file.name}?`,
              showCancelButton: true,
              confirmButtonText: 'OK',
              cancelButtonText: 'CANCEL',
              showLoaderOnConfirm: true,
              allowOutsideClick: false,
              reverseButtons: true,
              width: '300px',
              preConfirm: text => new Promise((resolve, reject) => {
                resolve();
              }),
            }).then((text) => {
              CommandsTeachSocket.delFiles(uuid, (dict) => {
                const proj = GlobalUtil.model.localTeach.getProjInfo(GlobalUtil.model.localTeach.curProj.uuid);
                GlobalUtil.model.localTeach.curProj = proj;
              });
            });
            break;
          }
        default:

      }
    },
    checkscroll() {
      // console.log(`check scroll = ${document.getElementById("scroll-timer").scrollLeft}`);
    },
    addRecord() {
      const dateStr = GlobalUtil.getTimeString();
      CommandsTeachSocket.createFile(dateStr, (dict) => {
        console.log(`dict = ${JSON.stringify(dict)}`);
        const proj = GlobalUtil.model.localTeach.getProjInfo(GlobalUtil.model.localTeach.curProj.uuid);
        GlobalUtil.model.localTeach.curProj = proj;
      });
    },
    onSelect(e, index) {
      console.log(`onSelect = ${index}`);
      this.curSelectedIndex = index;
      const point = GlobalUtil.model.localTeach.getPoint(index);
      GlobalUtil.model.localTeach.curPoint.a0 = point[0];
      GlobalUtil.model.localTeach.curPoint.a1 = point[1];
      GlobalUtil.model.localTeach.curPoint.a2 = point[2];
      GlobalUtil.model.localTeach.curPoint.a3 = point[3];
      GlobalUtil.model.localTeach.curPoint.a4 = point[4];
      GlobalUtil.model.localTeach.curPoint.a5 = point[5];
      GlobalUtil.model.localTeach.curPoint.a6 = point[6];
    },
  },
  beforeDestroy() {
  },
  components: {
  },
  computed: {
  },
};

</script>
<style lang="scss" scoped>

</style>

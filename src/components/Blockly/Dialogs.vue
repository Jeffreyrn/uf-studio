<template>
<div>

  <el-dialog title="ide project list" :visible.sync="dialog.ide_app">
    <table>
      <tr>
        <th class="dialog-table-head">Project name</th>
        <th class="dialog-table-head">Date</th>
        <th class="dialog-table-head">Option</th>
      </tr>
      <template>
        <tr  v-for="(data, index) in model.localProjTree.curProjList" :key="index">
          <td>{{ data.name }}</td>
          <td>{{ data.ctime }}</td>
          <td>
            <!-- <div class="float-left proj-selected" v-if="model.localProjTree.curProj.uuid===data.uuid"></div> -->
            <div class="float-left proj-open" @click="insertIde(data.name)">Open</div>
            <!-- btn_trash.svg -->
          </td>
        </tr>
      </template>
    </table>
  </el-dialog>
  <el-dialog title="teach project list" :visible.sync="dialog.record_app">
    <table>
      <tr>
        <th class="dialog-table-head">Project name</th>
        <th class="dialog-table-head">Date</th>
        <th class="dialog-table-head">Option</th>
      </tr>
      <template>
        <tr  v-for="(data, index) in model.localTeach.curProjList" :key="index">
          <td>{{ data.name }}</td>
          <td>{{ data.ctime }}</td>
          <td>
            <!-- <div class="float-left proj-selected" v-if="model.localTeach.curProj.uuid===data.uuid"></div> -->
            <div class="float-left proj-open" @click="insertIde(data.name)">select</div>
            <!-- btn_trash.svg -->
          </td>
        </tr>
      </template>
    </table>
  </el-dialog>
  <el-dialog title="build in app list" :visible.sync="dialog.other_app">
    <table>
      <tr>
        <th class="dialog-table-head">Project name</th>
        <th class="dialog-table-head">Date</th>
        <th class="dialog-table-head">Option</th>
      </tr>
      <template>
        <tr  v-for="i in 7" :key="i">
          <td>{{ i }}</td>
          <td>{{ i + 1 }}</td>
          <td>
            <div class="float-left proj-open" @click="insertIde(i)">Open</div>
            <!-- btn_trash.svg -->
          </td>
        </tr>
      </template>
    </table>
  </el-dialog>
</div>
  
</template>
<script>
import eventBus from './eventBus'

export default {
  mounted() {
    eventBus.$on('show', (block) => {
      if (Object.prototype.hasOwnProperty.call(this.dialog, block.type)) {
        this.block = block
        this.dialog[block.type] = true
        console.log('has property', this.block)
      }
    })
  },
  methods: {
    insertIde(name) {
      // this.block.setFieldValue(111) // set block name
      const children = this.block.childBlocks_// this.block.getChildren()
      console.log(0, children)
      const inputField = children[0].inputList[0]
      console.log(111, inputField)
      // inputField.connection.targetBlock().setFieldValue('3', 'NUM')
      this.plus += 1
      inputField.fieldRow[1].setText(`a${name}`)
      this.dialog[this.block.type] = false
    },
  },
  data() {
    return {
      model: window.GlobalUtil.model,
      block: null,
      dialog: {
        ide_app: false,
        record_app: false,
        other_app: false,
      },
      plus: 0,
    };
  },
}
</script>

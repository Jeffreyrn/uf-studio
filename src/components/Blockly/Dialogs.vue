<template>
  <el-dialog title="app list" :visible.sync="dialog.ide_app">
    <!-- <el-table :data="gridData">
      <el-table-column property="date" label="Date" width="150"></el-table-column>
      <el-table-column property="name" label="Name" width="200"></el-table-column>
      <el-table-column label="Address">
        <template slot-scope="scope">
        <el-button @click="insertIde" type="text" size="small">Add</el-button>
        </template>
      </el-table-column>
    </el-table> -->
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
            <div class="float-left proj-selected" v-if="model.localProjTree.curProj.uuid===data.uuid"></div>
            <div class="float-left proj-open" v-if="model.localProjTree.curProj.uuid!==data.uuid" @click="insertIde(data.uuid)">Open</div>
            <!-- btn_trash.svg -->
          </td>
        </tr>
      </template>
    </table>
  </el-dialog>
</template>
<script>
import eventBus from './eventBus'

export default {
  mounted() {
    eventBus.$on('show', (block) => {
      this.block = block
      this.dialog[block.type] = true
      console.log(this.block)
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
    },
  },
  data() {
    return {
      model: window.GlobalUtil.model,
      block: null,
      dialog: {
        ide_app: false,
      },
      plus: 0,
      gridData: [{
        date: '2016-05-02',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
      }, {
        date: '2016-05-04',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
      }, {
        date: '2016-05-01',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
      }, {
        date: '2016-05-03',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
      }],
    };
  },
}
</script>

<template>
  <el-dialog title="app list" :visible.sync="dialog.ide_app">
    <el-table :data="gridData">
      <el-table-column property="date" label="Date" width="150"></el-table-column>
      <el-table-column property="name" label="Name" width="200"></el-table-column>
      <el-table-column label="Address">
        <template slot-scope="scope">
        <el-button @click="insertIde" type="text" size="small">Add</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import eventBus from './eventBus'

export default {
  mounted() {
    eventBus.$on('show', (block) => {
      this.block = block
      this.dialog[block.type] = true
    })
  },
  methods: {
    insertIde() {
      // this.block.setFieldValue(111) // set block name
      const children = this.block.getChildren()
      console.log(0, children)
      const inputField = children[0].inputList[0]
      console.log(111, inputField)
      // inputField.connection.targetBlock().setFieldValue('3', 'NUM')
      inputField.fieldRow[0].setText('23s3')
    },
  },
  data() {
    return {
      block: null,
      dialog: {
        ide_app: false,
      },
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

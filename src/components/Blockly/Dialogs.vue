<template>
  <el-dialog title="app list" :visible.sync="dialog.ide_app">
    <el-table :data="gridData">
      <el-table-column property="date" label="Date" width="150"></el-table-column>
      <el-table-column property="name" label="Name" width="200"></el-table-column>
      <el-table-column property="address" label="Address"></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
module.exports = {
  props: ['dialog'],
  data() {
    return {
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

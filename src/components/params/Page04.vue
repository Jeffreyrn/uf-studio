<template lang="html">
    <div class="app-container">
      Parameter Set
      <div>
        <template v-for='(group,index) in model.localParamsSetting.groups'>
          <button :id='genTabId(index+1)' class='tb-tab-btn' @click='onSelectedPage($event, index+1)'>
            {{ group }}
          </button>
        </template>
        <div id="people">
          <table class="table">
            <tr>
              <th style='width:50px;'>Index</th>
              <th style='width:50px;'>Group</th>
              <th style='width:190px;'>Name</th>
              <th style='width:50px;'>CurrentValue</th>
              <th style='width:50px;'>DefaultValue</th>
              <th style='width:50px;'>Unit</th>
              <th style='width:50px;'>Max</th>
              <th style='width:50px;'>Min</th>
            </tr>
            <template v-for='(data,index) in tableList'>
              <tr>
                <td>{{ index+1 }}</td>
                <td>{{ data.group }}</td>
                <td>{{ data.name }}</td>
                <td>
                  <input @blur="onCurValueBlur($event, index)" type='text' :value='data.current_value'>
                  </input>
                </td>
                <td>{{ data.default_value }}</td>
                <td>{{ data.unit }}</td>
                <td>{{ data.max }}</td>
                <td>{{ data.min }}</td>
              </tr>
            </template>
          </table>
        </div>
      </div>
    </div>
</template>
<script>
// console.log('Rounter = 04');

export default {
  data() {
    return {
      model: GlobalUtil.model,
      tableList: [],
    };
  },
  mounted() {
    this.onSelectedPage(null, GlobalUtil.model.localParamsSetting.curGroup);
  },
  methods: {
    onCurValueBlur(e, index) {
      this.tableList[index].current_values = e.currentTarget.value;
      // console.log('e value = ' + e.currentTarget.value);
      // console.log('tableList = ' + JSON.stringify(this.tableList));
      // console.log('tableList = ' + JSON.stringify(GlobalUtil.model.localParamsSetting.filterGroups(1)));
    },
    onSelectedPage(e, index) {
      const tabs = document.getElementsByClassName('tb-tab-btn');
      for (let i = 0; i < tabs.length; i += 1) {
        const tab = tabs[i];
        tab.style.backgroundColor = 'transparent';
      }
      if (!e) {
        tabs[GlobalUtil.model.localParamsSetting.curGroup - 1].style.backgroundColor = 'yellow';
      }
      else {
        e.currentTarget.style.backgroundColor = 'yellow';
      }
      GlobalUtil.model.localParamsSetting.curGroup = index;
      this.tableList = GlobalUtil.model.localParamsSetting.filterGroups(index);
    },
    genTabId(index) {
      return `tb-tab-btn-${index}`;
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

.tb-tab-btn {
  width: 50px;
  height: 20px;
}

.table {
	font-family: verdana,arial,sans-serif;
	font-size:11px;
	color:#333333;
	border-width: 1px;
	border-color: #666666;
	border-collapse: collapse;
}
.table th {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #dedede;
}
.table td {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #ffffff;
}

</style>

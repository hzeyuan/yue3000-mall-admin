<template>
  <div class="OptionsTable">
    <el-table :data="OptionsTableData"
              border style="width: 100%">
      <el-table-column label="规格">
        <template slot-scope="scope">
          {{scope.row.name | name }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "OptionsTable",
  props:{
    OptionsTable: Array
  },
  computed: {
    OptionsTableData () {
      let tableData = []
      this.OptionsTable.forEach((item) => {
        item.options.forEach((iteming,)=>{
          tableData.push({name: iteming.name})
        })
      })
      return tableData
    },
    OptionsTableLabel () {
      // let tableTitle = []
      // this.OptionsTable.forEach((item) => {
      //   tableTitle.push(item.title)
      // })
      return ''
    }
  },
  methods: {
  },
  mounted() {
  },
  filters: {
    name(value) {
      if (value === '') {
        return '规格';
      } else {
        return value;
      }
    },
    title() {
      if (value === '') {
        return '规格名称';
      } else {
        return value;
      }
    }
  }
}
</script>

<style scoped>

</style>

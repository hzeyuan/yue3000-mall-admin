<template>
  <div class="OptionsTable">
    <el-table
      :data="OptionsTable"
      :span-method="objectSpanMethod"
      border
      style="width: 100%"
    >
      <el-table-column
        v-for="(item, index) in OptionsTitle"
        :key="index"
        :label="item.specification ? item.specification : '商品规格'"
      >
        <template slot-scope="scope">
          {{ scope.row.specifications[index] | specifications }}
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          <el-input
            v-model.number="scope.row.price"
            size="mini"
            oninput="value=Number(value.replace(/[^0-9.]/g,''))"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="库存">
        <template slot-scope="scope">
          <el-input
            v-model.number="scope.row.number"
            size="mini"
            oninput="value=Number(value.replace(/[^0-9.]/g,''))"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'OptionsTable',
    filters: {
      specifications(value) {
        if (value === '') {
          return '规格'
        } else {
          return value
        }
      },
      title() {
        if (value === '') {
          return '规格名称'
        } else {
          return value
        }
      },
    },
    props: {
      OptionsTable: Array,
      OptionsTitle: Array, // [{},{key:'颜色'：value:['红’,'黑']}]
    },
    computed: {},
    methods: {
      //
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (this.OptionsTitle.length === 2) {
            let rowspan = this.OptionsTitle[1].value.length
            if (rowIndex % rowspan === 0) {
              return {
                rowspan,
                colspan: 1,
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0,
              }
            }
          }
        }
      },
    },
  }
</script>

<style scoped>
  .el-table tbody tr:hover > td {
    background-color: transparent !important;
  }

  .el-table .el-input__inner {
    border: none;
  }
</style>

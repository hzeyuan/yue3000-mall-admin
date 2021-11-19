<template>
  <div class="OptionsTable">
    <el-table :data="OptionsTable" :span-method="objectSpanMethod"
              border style="width: 100%">
      <el-table-column :label="item.specification? item.specification:'商品规格'"
                       v-for="(item, index) in OptionsTitle" :key="index">
        <template slot-scope="scope">
          {{scope.row.specifications[index] | specifications }}
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          <el-input v-model="scope.row.price" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="库存">
        <template slot-scope="scope">
          <el-input v-model="scope.row.number" size="mini"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: "OptionsTable",
  props:{
    OptionsTable: Array,
    OptionsTitle: Array, // [{},{key:'颜色'：value:['红’,'黑']}] 
  },
  methods: {
    //
    objectSpanMethod({ row, column, rowIndex, columnIndex }){
      if (columnIndex === 0) {
        if (this.OptionsTitle.length  === 2) {
          let rowspan = this.OptionsTitle[1].value.length
          if (rowIndex % rowspan === 0) {
            return {
              rowspan,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
  },
  computed: {
  },
  filters: {
    specifications(value) {
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

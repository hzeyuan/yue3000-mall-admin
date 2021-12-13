<template>
  <el-select
    :clearable="true"
    @input="handleChange"
    placeholder="请选择"
    size="small"
    v-bind="attrs"
    v-model="newValue"
  >
    <el-option
      :key="item.value"
      :label="item.text"
      :value="item.value"
      v-for="item in options"
    ></el-option>
  </el-select>
</template>

<script>
  import EleEditableMixin from '../EleEditableMixin'

  export default {
    name: 'EleEditableSelect',
    mixins: [EleEditableMixin],
    // data() {
    //   return {
    //     newValue: Boolean(this.computedValue),
    //   }
    // },

    methods: {
      // setNewValue() {
      //   if (this.attrs.multiple) {
      //     this.newValue.push()
      //   } else {
      //     this.newValue = this.value
      //   }
      // },
    },
  }
</script>

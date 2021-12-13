<template>
  <el-select
    :clearable="true"
    value-key="value"
    @input="handleChange"
    placeholder="请选择"
    size="small"
    v-bind="attrs"
    v-model="arrValue"
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
    data() {
      return {
        arrValue: '',
      }
    },
    methods: {
      setNewValue() {
        this.arrValue = this.value
      },
    },
  }
</script>

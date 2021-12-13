!
<template>
  <el-date-picker
    size="small"
    style="max-width: 220px"
    :clearable="true"
    :format="format"
    type="datetimerange"
    @input="handleChange"
    v-bind="attrs"
    v-model="newValue"
    class="date-style"
  ></el-date-picker>
</template>

<script>
  import EleEditableMixin from 'vue-ele-editable/src/EleEditableMixin'
  export default {
    name: 'EleEditableDatetimeRange',
    mixins: [EleEditableMixin],

    data() {
      return {
        // defaultAttrs: {
        //   format: 'yyyy-MM-dd HH:mm',
        // },
      }
    },
    computed: {},
    methods: {},
  }
</script>

<style lang="scss">
  .date-style {
    .el-range-input {
      width: 70px !important;
    }
    .el-range-separator {
      width: 20px !important;
    }
  }
</style>

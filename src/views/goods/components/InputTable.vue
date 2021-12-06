<template>
  <div class="InputTable">
    <el-form
      label-position="right"
      label-width="80px"
      style="overflow: hidden; margin: auto"
      :model="optionsData"
    >
      <el-form-item label="名称">
        <el-input
          v-model="optionsData.specification"
          placeholder="输入规格名称；例如：颜色、尺寸等。"
          style="width: 310px"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in optionsData.value"
        :key="index"
        :label="'选项' + (index + 1) + ':'"
      >
        <el-input
          v-model="optionsData.value[index]"
          placeholder="输入规格选项；例如：红色、白色等。"
          style="width: 310px"
        ></el-input>
        <i
          v-if="optionsData.value.length > 1"
          class="el-icon-delete"
          @click.prevent="onDelete(index)"
        ></i>
      </el-form-item>
      <el-form-item label="">
        <div style="width: 310px" class="InputButton" @click="addOptions">
          <span>添加选项</span>
        </div>
        <!-- <InputButton
          span="添加选项"
          style="width: 310px"
          @click.native="addOptions"
        ></InputButton> -->
      </el-form-item>
    </el-form>
    <div class="close">
      <!--      插槽 用于放置右上角删除该规格项的图标-->
      <slot></slot>
    </div>
  </div>
</template>

<script>
  // import InputButton from './InputButton'

  export default {
    name: 'InputTable',
    components: {
      // InputButton,
    },
    props: {
      optionsData: Object,
    },
    data() {
      return {}
    },
    methods: {
      // 添加规格项
      addOptions() {
        this.optionsData.value.push('')
        // console.log(this.optionsData.value)
      },
      // 删除第index个规格项
      onDelete(index) {
        this.optionsData.value.splice(index, 1)
      },
    },
  }
</script>

<style scoped>
  .InputTable {
    background-color: #fafafa;
    position: relative;
    padding: 24px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-icon-delete {
    margin-left: 10px;
    cursor: pointer;
  }
  .close {
    width: 14px;
    height: 14px;
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 13px;
  }
  .close:hover {
    color: #91bbe9;
  }
</style>

<template>
  <div class="InputTable">
    <el-form label-position="right" label-width="80px"
             style="overflow: hidden; margin: auto"
             :model="optionsData">
      <el-form-item label="名称">
        <el-input v-model="optionsData.title" placeholder="输入规格名称；例如：颜色、尺寸等。"
                  style="width: 310px">
        </el-input>
      </el-form-item>
      <el-form-item :label="'选项' + (index + 1) "
        v-for="(item, index) in optionsData.options" :key="index">
        <el-input v-model="item.name" placeholder="输入规格选项；例如：红色、白色等。"
                  style="width: 310px">
        </el-input>
        <i class="el-icon-delete" @click.prevent="onDelete(index)"
           v-if="optionsData.options.length > 1" >
        </i>
      </el-form-item>
      <el-form-item label="">
        <InputButton span="添加选项" style="width: 310px"
                     @click.native="addOptions">
        </InputButton>
      </el-form-item>
    </el-form>
    <div class="close">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
import InputButton from "./InputButton";

export default {
  name: "InputTable",
  components: {
    InputButton
  },
  props: {
    optionsData: Object
  },
  data () {
    return {}
  },
  methods: {
    // 添加规格
    addOptions () {
      this.optionsData.options.push({name:''})
    },
    // 删除第index个规格
    onDelete (index) {
      this.optionsData.options.splice(index,1)
    }
  }
}
</script>

<style scoped>
.InputTable{
  background-color: #fafafa;
  position: relative;
  padding: 24px;
}
.el-form-item{
margin-bottom: 10px;
}
.el-icon-delete{
  margin-left: 10px;
  cursor: pointer;
}
.close{
  width: 14px;
  height: 14px;
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 13px;
}
.close:hover{
  color: #91bbe9;
}
</style>

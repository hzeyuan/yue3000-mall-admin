<template>
  <div class="InputButton">
    <slot>
      <i class="el-icon-circle-plus-outline"></i>
      <span>{{span}}</span>
    </slot>
  </div>
</template>
el-icon-circle-plus-outline

<script>
export default {
  name: "InputButton",
  props:{
    span: {
      type: String,
      default: ''
    }
  },
}
</script>

<style scoped>
.InputButton{
  border-radius: 4px;
  border: 1px dashed #1791f2;
  text-align: center;
  color: #1791f2;
  cursor: pointer;
}

.InputButton:hover{
  background-color: #fafafa;
}
.InputButton:active{
  opacity: 90%;
}
</style>

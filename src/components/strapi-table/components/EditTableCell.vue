<template>
  <div @click="onFieldClick" class="edit-cell">
    <el-tooltip
      v-if="!editMode && !showInput"
      :placement="toolTipPlacement"
      :open-delay="toolTipDelay"
      :content="toolTipContent"
    >
      <!-- @keyup.enter="onFieldClick" -->
      <div tabindex="0">
        <slot name="content"></slot>
      </div>
    </el-tooltip>
    <!--  @focus="onFieldClick" -->
    <component
      :is="editableComponent"
      v-if="editMode || showInput"
      ref="input"
      @keyup.enter.native="onInputExit"
      v-on="listeners"
      v-bind="$attrs"
      v-model="model"
    >
      <slot name="edit-component-slot"></slot>
    </component>
  </div>
</template>
<script>
  export default {
    name: 'editable-cell',
    inheritAttrs: false,
    props: {
      value: {
        type: [String, Number],
        default: '',
      },
      editable: {
        type: Boolean,
        default: true,
      },
      toolTipContent: {
        type: String,
        default: '点击编辑',
      },
      toolTipDelay: {
        type: Number,
        default: 500,
      },
      toolTipPlacement: {
        type: String,
        default: 'top-start',
      },
      showInput: {
        type: Boolean,
        default: false,
      },
      editableComponent: {
        type: String,
        default: 'el-input',
      },
      closeEvent: {
        type: String,
        default: 'blur',
      },
    },
    data() {
      return {
        editMode: false,
      }
    },
    computed: {
      model: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        },
      },
      listeners() {
        return {
          [this.closeEvent]: this.onInputExit,
          ...this.$listeners,
        }
      },
    },
    methods: {
      onFieldClick() {
        if (!this.editable) return
        this.editMode = true
        this.$nextTick(() => {
          let inputRef = this.$refs.input
          if (inputRef) {
            inputRef.focus()
          }
        })
      },
      onInputExit() {
        this.editMode = false
      },
      onInputChange(val) {
        this.$emit('input', val)
      },
    },
  }
</script>
<style></style>

<template>
  <div class="add">
    <app-my :is-edge='false'></app-my>
  </div>
</template>

<script>
import appMy from "./components/appMy";

export default {
  name: "add",
  components: {
    appMy
  }
}
</script>

<style scoped>

</style>

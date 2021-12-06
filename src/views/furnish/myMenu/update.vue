<template>
<div class="update">
  <app-my :is-edge='true'></app-my>
</div>
</template>

<script>
import appMy from "./components/menuDetails";

export default {
  name: "update",
  components: {
    appMy
  },
}
</script>

<style scoped>

</style>

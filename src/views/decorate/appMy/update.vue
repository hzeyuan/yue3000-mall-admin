<template>
<div class="update">
  <app-my :is-edge='true'></app-my>
</div>
</template>

<script>
import appMy from "./components/appMy";

export default {
  name: "update",
  components: {
    appMy
  },
}
</script>

<style scoped>

</style>

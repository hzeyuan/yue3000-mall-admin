<template>
  <div class="add">
    <menu-details :is-edge='false'></menu-details>
  </div>
</template>

<script>
import menuDetails from "./components/menuDetails";

export default {
  name: "add",
  components: {
    menuDetails
  }
}
</script>

<style scoped>

</style>

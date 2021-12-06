<template>
   
  <product-cate-detail :is-edit="false"></product-cate-detail>
</template>
<script>
  import ProductCateDetail from '../components/ProductCateDetail'
  export default {
    name: 'AddProductCate',
    components: { ProductCateDetail },
  }
</script>
<style></style>

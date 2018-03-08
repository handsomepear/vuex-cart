<template>
  <div id="app">
    <h1>购物车例子</h1>
    <hr>
    <h2>Products</h2>
    <hr>
    <ProductList />
    <hr>
    <ShoppingCart/>
  </div>
</template>

<script>
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
export default {
  name: 'app',
  data () {
    return {
     
    }
  },
  components: {ProductList, ShoppingCart}
}
</script>

<style>
 
</style>

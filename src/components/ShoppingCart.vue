<template>
  <div class="cart">
    <p><i>Please add some products to cart.</i></p>
    <ul>
      <li v-for="product in products">
        {{product.title}} - {{product.price | currency}} x {{product.quantity}}
      </li>
    </ul>
    <p>Total: {{total | currency}}</p>
    <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}</p>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters({
        products: 'cartProducts',
        checkoutStatus: 'checkoutStatus',
        total: 'cartTotalPrice'
      })
    },
    methods: {
      checkout(products){
        this.$store.dispatch('checkout', products);
      }
    }
  }
</script>

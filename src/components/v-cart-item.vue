<template>
  <div class="v-cart-item">
    <img class="v-cart-item__img" :src="require('../assets/image/' + cart_item_data.image)" alt="">
    <div class="v-cart-item__info">
      <p>{{cart_item_data.name}}</p>
      <p>{{cart_item_data.price}}</p>
      <p>{{cart_item_data.article}}</p>
    </div>
    <div class="v-cart-item__qty">
      <p>Qty:</p>      
      {{cart_item_data.quantity}}</div>
    <button @click="deleteFromCart">Delete</button>
  </div>    
</template>

<script>
export default {
  name: 'v-cart-item',
  components: {},
  props: {
    cart_item_data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  },    
  computed: {},
  methods: {
    deleteFromCart() {
      this.$emit('deleteFromCart')
    }
  },
  mounted() {
    this.$set(this.cart_item_data, 'quantity', 1)
  }     
}
</script>

<style lang="scss">
  .v-cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    box-shadow: 0 0 8px rgb(75, 83, 75);
    padding: 0 20px;
    margin-bottom: 15px;
    &__img {
      max-width: 70px;
    }   
  }
</style>
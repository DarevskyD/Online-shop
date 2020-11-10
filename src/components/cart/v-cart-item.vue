<template>
  <div class="v-cart-item">
    <img class="v-cart-item__img" :src="require('@/assets/image/' + cart_item_data.image)">
    <div class="v-cart-item__info">
      <p>{{cart_item_data.name}}</p>
      <p>{{cart_item_data.price}} p.</p>
      <p>{{cart_item_data.article}}</p>
    </div>
    <div class="v-cart-item__qty">
      <p class="v-cart-item__qty_title">Qty:</p>
      <span>
        <span class="v-cart-item__qty_btn" @click="decrementItem">-</span>
        {{cart_item_data.quantity}}
        <span class="v-cart-item__qty_btn" @click="incrementItem">+</span>        
      </span>      
    </div>
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
    },
    decrementItem() {
      this.$emit('decrement')
    },
    incrementItem() {
      this.$emit('increment')
    }
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

    &__qty_title {
      margin: 10px;
    }

    &__qty {
      font-size: 20px;
    }
    
    &__qty_btn {      
      cursor: pointer;
    }
  }
</style>
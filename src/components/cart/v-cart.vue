<template>  
    <div class="v-cart">
      <router-link :to="{name:'catalog'}">
      <div class="v-catalog__counter_card_link">Back to Catalog</div>
    </router-link>
      <h1>Cart</h1>
      <p v-if="!cart_data.length">Cart is empty...</p>
      <v-cart-item 
        v-for="(item, index) in cart_data"
        :key="item.article"
        :cart_item_data="item"
        @deleteFromCart="deleteFromCart(index)"
        @increment="increment(index)"
        @decrement="decrement(index)"
      />
      <div class="v-cart-total">
        <p class="v-cart-total__name">Total:</p>
        <p class="v-cart-total__price">{{cartTotalCost}} p.</p>
      </div>
    </div>  
</template>

<script>
  import vCartItem from './v-cart-item'
  import {mapActions} from 'vuex'

  export default {
    name: 'v-cart',
    components: {
      vCartItem
    },
    props: {
      cart_data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return{

      }
    },
    computed: {
      cartTotalCost() {
        let result = [];

        if (this.cart_data.length) {
            for (let item of this.cart_data) {
            result.push(item.price * item.quantity);
          }
          result = result.reduce((sum,el) => {
            return sum + el;
          })
          return result;  
        } else {
          return 0;
        }      
      }
    },
    methods: {
      ...mapActions([
        'DELETE_FROM_CART',
        'INCREMENT_CART_ITEM',
        'DECREMENT_CART_ITEM'
      ]),
      increment(index) {
        this.INCREMENT_CART_ITEM(index)
      },
      decrement(index) {
        this.DECREMENT_CART_ITEM(index)
      },
      deleteFromCart(index) {
        this.DELETE_FROM_CART(index);
      }
    }        
  }
</script>

<style lang="scss">
  @import './src/assets/styles/variables.scss';

  .v-cart {
    .v-cart-total {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      padding: $padding $padding*2;
      display: flex;
      justify-content: center;
      background: $btn-bg;
      color: #fff;

      &__name {
        margin-right: $margin*2;
        font-size: 20px;
      }

      &__price {        
        font-size: 20px;
      }
    }
  }


</style>
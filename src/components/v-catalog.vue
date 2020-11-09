<template>  
  <div class="v-catalog">
    <router-link :to="{name:'cart', params: {cart_data: CART}}">
      <div class="v-catalog__counter_card_link">Cart: {{CART.length}}</div>
    </router-link>
    
    <h1>Catalog</h1>
    <div class="v-catalog__list">
  <!-- v-for="product in this.$store.state.products" -->
      <v-catalog-item 
      v-for="product in PRODUCTS"
      :key="product.article" 
      :product_data = "product" 
      @addToCart = "addToCart"
      />        
    </div>      
  </div>  
</template>

<script>
  import vCatalogItem from './v-catalog-item'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'v-catalog',
    components: {
      vCatalogItem
    },
    props: {},
    data () {
      return{      
      }
    },
    computed: {
      ...mapGetters([
        'PRODUCTS',
        'CART'
      ])
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'ADD_TO_CART'
      ]),
      addToCart(data) {
        this.ADD_TO_CART(data);
      }
    },
    mounted() {
      this.GET_PRODUCTS_FROM_API() 
      .then((response) => {
        if (response.data) {
          console.log('data arrived')
        }
      })
    }      
  }
</script>

<style lang="scss">
  .v-catalog {
   
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;      
    }
    
    &__counter_card_link {
      position: absolute;
      top: 20px;
      right: 25px;
      padding: 16px;
      border: 1px solid rgb(75, 83, 75);      
    }
  } 
  
</style>
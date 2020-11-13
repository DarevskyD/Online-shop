<template>  
  <div class="v-catalog">    
    <router-link :to="{name:'cart', params: {cart_data: CART}}">
      <div class="v-catalog__counter_card_link">Cart: {{CART.length}}</div>
    </router-link>
        
    <h1>Catalog</h1>    
    <v-select
        :options = "categories"
        @select = "sortCategories"
        :selected = "selected" 
    />
    <div class="v-catalog__list">
    <!-- v-for="product in this.$store.state.products" -->
      <v-catalog-item 
        v-for="product in filterProducts"
        :key="product.article" 
        :product_data = "product" 
        @addToCart = "addToCart"
      />        
    </div>           
  </div>  
</template>

<script>
  import vCatalogItem from './v-catalog-item'
  import vSelect from '../v-select'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'v-catalog',
    components: {
      vCatalogItem,
      vSelect
    },
    props: {},
    data () {
      return{
        categories: [
          {name: 'All', value: 'all'},
          {name: 'Men', value: 'men'},
          {name: 'Women', value: 'women'},
          {name: 'Kids', value: 'kids'}         
        ],
        selected: 'All',
        sortProducts: []      
      }
    },
    computed: {
      ...mapGetters([
        'PRODUCTS',
        'CART'
      ]),      
      filterProducts() {
        if(this.sortProducts.length) {
          return this.sortProducts;
        } else {
          return this.PRODUCTS;
        }
      }
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'ADD_TO_CART'
      ]),
      addToCart(data) {
        this.ADD_TO_CART(data);
      },
      sortCategories(category) {
        this.sortProducts = [];        
        this.PRODUCTS.filter((item) => {
          if(item.category === category.value) {
            this.sortProducts.push(item);
          }
        })
        this.selected = category.name;             
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
  @import './src/assets/styles/variables.scss';

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
      padding: $padding;
      border: 1px solid rgb(75, 83, 75);      
    }
  } 
  
</style>
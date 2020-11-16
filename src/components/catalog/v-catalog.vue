<template>  
  <div class="v-catalog">    
    <router-link :to="{name:'cart', params: {cart_data: CART}}">
      <div class="v-catalog__counter_card_link">Cart: {{CART.length}}</div>
    </router-link>
        
    <h1>Catalog</h1> 
    <div class="filters">
      <v-select
        :options = "categories"
        @select = "sortCategories"
        :selected = "selected" 
    />
    <div class="range-slider">
      <input 
        type="range" 
        min="0" 
        max="1000" 
        step="10"
        v-model.number="minPrice"
        @change="setRangeSlider"
      >
      <input 
      type="range" 
      min="0" 
      max="1000" 
      step="10"
      v-model.number="maxPrice"
      @change="setRangeSlider"
      >     
    </div>

     <div class="range-values">
        <p class="range-values__min">min: {{minPrice}}</p>
        <p class="range-values__max">max: {{maxPrice}}</p>
    </div>
    
    </div>    
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
        sortProducts: [],
        minPrice: 0,
        maxPrice: 1000      
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
      setRangeSlider()  {
        if(this.minPrice > this.maxPrice) {
          let tmp = this.maxPrice;
          this.maxPrice = this.minPrice;
          this.minPrice = tmp;
        }
        this.sortCategories();
      },
      sortCategories(category) {
        let vm = this;
        this.sortProducts = [...this.PRODUCTS]
        this.sortProducts = this.sortProducts.filter(function (item) {
          return item.price >= vm.minPrice && item.price <= vm.maxPrice
        })
        if (category) {
          this.sortProducts = this.sortProducts.filter(function (e) {
            vm.selected = category.name;
            return e.category === category.value
          })
        }      
      }
    },    
    mounted() {
      this.GET_PRODUCTS_FROM_API() 
      .then((response) => {
        if (response.data) {
          console.log('data arrived');
          this.sortCategories();
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

  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }

  .range-slider input[type=range] {
       position: absolute;
       right: 10px;
       top: 0;       
    }
    ::-webkit-slider-thumb {
        z-index: 2;
        position: relative;
        top: 1px;
        margin-top: -7px;     
    }
    input[type=range]{
        -webkit-appearance: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 300px;
        height: 5px;
        background: #ddd;
        border: none;
        border-radius: 3px;
    }
    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 1.5px solid #C1C1C1;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #EDEDED;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        box-shadow: 1px 1px 1px #C6C6C6, 0px 0px 1px #787878;
        border-radius: 2px;
        border: 0.2px solid #787878;
    }

  .range-values {
    display: flex;
    justify-content: space-between;    
    width: 150px;   
  }  
  
</style>
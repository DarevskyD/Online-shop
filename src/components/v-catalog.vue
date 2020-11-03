<template>
  <div>
    <div class="v-catalog">
      <h1>Catalog</h1>
      <div class="v-catalog__list">        
        <v-catalog-item 
        v-for="product in products"
        :key="product.article" 
        :product_data = "product" 
        @sendArticle = "showChildArticle"
        />        
      </div>      
    </div>
  </div>
</template>

<script>
  import vCatalogItem from './v-catalog-item'

  export default {
    name: 'v-catalog',
    components: {
      vCatalogItem
    },
    props: {},
    data () {
      return{
        products: [
      {
        image: "ouch1.png",
        name: "T-shirt 1",
        price: 2100,
        article: "T1",
        available: true,
        category: "Мужские"
      },
      {
        image: "ouch2.png",
        name: "T-shirt 2",
        price: 3150,
        article: "T2",
        available: true,
        category: "Женские"
      },
      {
        image: "ouch3.png",
        name: "T-shirt 3",
        price: 4200,
        article: "T3",
        available: false,
        category: "Женские"
      },
      {
        image: "ouch4.png",
        name: "T-shirt 4",
        price: 5300,
        article: "T4",
        available: true,
        category: "Мужские"
      },
      {
      image: "ouch5.png",
        name: "T-shirt 5",
        price: 6500,
        article: "T5",
        available: false,
        category: "Женские"
      },
      {
        image: "ouch6.png",
        name: "T-shirt 6",
        price: 8700,
        article: "T6",
        available: true,
        category: "Женские"
      }
    ]
      }
    },
    computed: {},
    methods: {
      showChildArticle(data) {
        console.log(data)
      }
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
  } 
  
</style>
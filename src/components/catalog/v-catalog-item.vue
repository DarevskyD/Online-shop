<template>  
  <div class="v-catalog-item">
    <img class="v-catalog-item__image" :src="require('@/assets/image/' + product_data.image)">
    <div class="v-catalog-content-box  ">
      <p class="v-catalog-item__name">{{product_data.name}}</p>
      <p class="v-catalog-item__price">Price: {{product_data.price}} p.</p>
      <button class="v-catalog-item__add_btn btn" 
              @click="addToCart">
       Add to cart
      </button>
    </div>
  </div>  
</template>

<script>
  export default {
    name: 'v-catalog-item',
    props: {
      product_data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data () {
      return{}
    },
    computed: {},
    methods: {
      addToCart() {
        this.$emit('addToCart', this.product_data);
      }     
    },
    mounted() {
      this.$set(this.product_data, 'quantity', 1);
    }         
  }
</script>

<style lang="scss">
  @import './src/assets/styles/variables.scss';

  .v-catalog-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-basis: 27%;
    box-shadow: 0 0 8px rgb(75, 83, 75);
    padding: $padding*2;
    margin-bottom: $margin*2;
    border-radius: $radius;
    height: 350px;
    &__image {
      width: 150px;
    }   
  }  

</style>
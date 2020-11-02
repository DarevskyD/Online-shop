<template>
  <div>
    <div class="v-catalog">
      <h1>Catalog</h1>
      <v-catalog-item />
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

      }
    },
    computed: {}        
  }
</script>

<style lang="scss">

</style>
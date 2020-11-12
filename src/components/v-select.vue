<template>
  <div class="v-select">
    <p 
      class="v-select__title"
      @click="areOptionsVisible = !areOptionsVisible"      
      >{{selected}}</p>
    <div 
      class="v-select__options"
      v-if="areOptionsVisible"    
    >
      <p class="options__item"
        v-for="option in options" 
        :key="option.value"
        @click="selectOption(option)"
        >
        {{ option.name }}
        </p>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'v-select',
  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    },
    selected: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      areOptionsVisible: false
    }
  },
  methods: {
    selectOption(option) {
      this.$emit('select', option);      
    },
    hideSelect() {
      this.areOptionsVisible = false;
    }
  },
  mounted() {
    document.addEventListener('click', this.hideSelect.bind(this), true);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideSelect);
  }  
}
</script>

<style lang="scss">
  @import './src/assets/styles/variables.scss';

  .v-select {   
    position: relative;
    width: 200px;

    &__title {
      border: 1px solid rgb(170, 170, 170);
      cursor: pointer;
    }

    &__options {
      box-sizing: border-box;
      border: 1px solid rgb(170, 170, 170);
      position: absolute;
      top: 30px;
      right: 0;
      width: 100%;

      .options__item {
      margin: 0;
      cursor: pointer;

      &:hover {
        background: $btn-bg;
      }
      } 
    }
  }
 
</style>
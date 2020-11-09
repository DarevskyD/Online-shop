import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    products: [],
    cart: []
  },
  mutations: {
    //3. прокидываем products.data    
    //4. проносим products(products.data), который получили в state   
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products;
    },
    SET_CART: (state, product) => {
      if(state.cart.length) {
        let isProductExist = false;
        state.cart.filter((item) => {
          if(item.article === product.article) {
            isProductExist = true;
            item.quantity++;
          }
        })
        if(!isProductExist) {
          state.cart.push(product);
        }
      } else {
        state.cart.push(product);
      }            
    },
    REMOVE_FROM_CART_ITEM: (state, index) => {
      state.cart.splice(index, 1);
    } 
  },
  actions: {
    //1.axios - через API получаем данные
    GET_PRODUCTS_FROM_API({commit}) {
      return axios('http://localhost:3000/products', {
        method: 'GET'
      })
      //2. вызывае мутацию SET_PRODUCTS_TO_STATE и прокидываем туда
      // products.data
      .then((products) => {        
        commit('SET_PRODUCTS_TO_STATE', products.data);
        return products;
      })
      .catch((error) => {
        console.log(error)
        return error;
      })
    },
    ADD_TO_CART({commit}, product) {
      commit('SET_CART', product);
    },
    DELETE_FROM_CART({commit}, index) {
      commit('REMOVE_FROM_CART_ITEM', index);
    }    
  },
  
  // 5.получаем данные в компонент, возвращает то, что в state
  // под названием PRODUCTS
  getters: {
    PRODUCTS(state) {
      return state.products;
    },
    CART(state) {
      return state.cart;
    }
  }
});

export default store;
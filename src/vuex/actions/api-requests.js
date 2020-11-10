import axios from 'axios';

export default {
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
      console.log(error);
      return error;
    })
  }
}
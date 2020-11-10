export default {
  // получаем данные в компонент, возвращает то, что в state  
  PRODUCTS(state) {
    return state.products;
  },
  CART(state) {
    return state.cart;
  }
}
export default {
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
  },
  INCREMENT: (state, index) => {
    state.cart[index].quantity++;
  },
  DECREMENT: (state, index) => {         
    --state.cart[index].quantity < 1 && state.cart.splice(index, 1);
  } 
}
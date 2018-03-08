import shop from '../../api/shop';

const state = {
  added: [],
  checkoutStatus: null
}


const getters = {
  checkoutStatus: state => state.checkoutStatus,
  cartProducts: (state, getters, rootState) => {
    return state.added.map(({id, quantity}) => {
      const product = rootState.products.all.find(product => product.id === id);
      return {
        title: product.title,
        price: product.price,
        quantity
      }
    })
  },

  cartTotalPrice:(state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }
}


// mutations
const mutations = {
  pushProductToCart(state, { id }) {
    state.added.push({
      id,
      quantity: 1
    })
  },

  incrementItemQuantity(state, { id }) {
    const cartItem = state.added.find(item => item.id === id);
  },

  setCartItems (state, { items }) {
    state.added = items
  },

  setCheckoutStatus(state, status) {
    state.checkoutStatus = status;
  }
}


// actions

const actions = {
  checkout({commit, state}, products) {
    const savedCartItems = [...state.added];
    commit('setCheckoutStatus', null);

    commit('setCartItems', {items: []})
    shop.buyProducts(
      products,
      () => commit('setCheckoutStatus', 'successful'),
      () => {
        commit('setCheckoutStatus', 'failed');
        commit('setCartItems', {items: savedCartItems});
      }
    )
  },
  addProductToCart({state, commit}, product){
    commit('setCheckoutStatus', null);
    if(product.inventory > 0) {
      const cartItem = state.added.find(item => item.id === product.id);

      if(!cartItem){
        commit('pushProductToCart', { id: product.id });
      }else {
        commit('incrementItemQuantity', cartItem);
      }
      commit('decrementProductInventory', { id: product.id });
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
import { productData } from "../pages/clients/restauration/data-products";

export const state = () => ({
  cartItems: new Map()
});

export const mutations = {
  LIKE_PRODUCT(state, itemId) {
    const product = productData.find(item => item.id === itemId);
    if (product) {
      product.liked = !product.liked;
    }
  },
  ADD_TO_CART(state, product) {
    state.cartItems = Object.assign(new Map([[product.product.id, product]]));
  },
  UPDATE_CART(state, product) {
    state.cartItems = Object.assign(
      new Map([...state.cartItems, [product.product.id, product]])
    );
  },
  CLEAR_CART(state) {
    state.cartItems = new Map();
  },
  INCREASE_QUANTITY(state) {},
  DECREASE_QUANTITY(state) {}
};

export const actions = {
  likeProduct({ commit }, itemId) {
    commit("LIKE_PRODUCT", itemId);
  },
  addToCart({ state, commit }, product) {
    if (state.cartItems.size) {
      commit("UPDATE_CART", product);
    } else {
      commit("ADD_TO_CART", product);
    }
  },
  clearCart({ state, commit }) {
    if (state.cartItems.size) {
      commit("CLEAR_CART");
    }
  },
  updateCartQuantity({ commit }, type) {
    if (type === 'increase') {
      commit('INCREASE_QUANTITY')
    } else if (type === 'decrease') {
      commit('DECREASE_QUANTITY')
    }
  }
};

export const getters = {
  cartCount: state => state.cartItems.size,
  itemsInCart: (state, getters) => {
    const items = [];
    if (getters.cartCount) {
      for (const value of state.cartItems.values()) {
        items.push(value);
      }
    }
    return items;
  },
  fetchOneProduct: (state, getters) => id => {
    if (getters.cartCount) {
      return getters.itemsInCart.find(i => i.product.id === id)
    }
  },
  isProductInCart: (state, getters) => id => {
    if (getters.cartCount && state.cartItems.has(id)) {
      return true;
    }
    return false;
  }
};

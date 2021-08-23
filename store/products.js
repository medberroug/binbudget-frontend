import { productData } from "../pages/clients/restauration/data-products";

export const state = () => ({});

export const mutations = {
  LIKE_PRODUCT(state, itemId) {
      const product = productData.find(item => item.id === itemId)
      if (product) {
          product.liked = !product.liked
      }
  }
};

export const actions = {
  likeProduct({ commit }, itemId) {
      commit('LIKE_PRODUCT', itemId)
  }
};

export const getters = {};

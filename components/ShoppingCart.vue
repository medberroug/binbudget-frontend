<template>
  <b-dropdown
    variant="white"
    class="dropdown d-inline-block"
    toggle-class="header-item noti-icon"
    right
    menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
  >
    <template v-slot:button-content>
      <i class="uil-shopping-cart-alt"></i>
      <span v-if="cartCount" class="badge bg-danger rounded-pill">{{
        cartCount
      }}</span>
    </template>

    <div class="p-3">
      <div class="row align-items-center">
        <div class="col">
          <h5 class="m-0 font-size-16">
            Cart Items
          </h5>
        </div>
        <div class="col-auto" v-if="cartCount > 1">
          <button @click.prevent="clear" class="small p-0 text-danger btn">
            Remove all items
          </button>
        </div>
      </div>
    </div>
    <simplebar style="max-height: 230px;" data-simplebar>
      <template v-if="cartCount">
        <nuxt-link
          :to="{ name: 'cart' }"
          v-for="n in itemsInCart"
          :key="n"
          href
          class="text-reset notification-item"
        >
          <div class="media">
            <div class="avatar-xs me-3">
              <span class="avatar-title bg-primary rounded-circle font-size-16">
                <i class="uil-shopping-basket"></i>
              </span>
            </div>
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                {{ n.product.name }}
              </h6>
              <div class="font-size-12 text-muted">
                <p class="mb-1">Quantity: {{ n.quantity }}</p>
                <p class="mb-0">
                  <i class="mdi mdi-clock-outline"></i>
                  {{ $t("navbar.dropdown.notification.order.time") }}
                </p>
              </div>
            </div>
          </div>
        </nuxt-link>
      </template>
      <div class="media" v-else>
        <div class="media-body text-center py-4">
          No Items in cart
        </div>
      </div>
    </simplebar>
    <div class="p-2 border-top d-grid" v-if="cartCount > 3">
      <a
        class="btn btn-sm btn-link font-size-14 text-center"
        href="javascript:void(0)"
      >
        <i class="uil-arrow-circle-right me-1"></i>
        View all items
      </a>
    </div>
  </b-dropdown>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ShoppingCart",
  computed: {
    ...mapGetters("products", {
      cartCount: "cartCount",
      itemsInCart: "itemsInCart"
    })
  },
  methods: {
    ...mapActions({
      clear: "products/clearCart"
    })
  }
};
</script>

<style lang="scss" scoped></style>

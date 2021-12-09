<template>
  <b-dropdown
    variant="white"
    class="dropdown d-inline-block"
    toggle-class="header-item noti-icon"
    right
    menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
  >
    <template v-slot:button-content>
      <i class="uil-crockery"></i>
      <span v-if="myOrder" class="badge bg-danger rounded-pill">{{
        myOrder.items.length
      }}</span>
    </template>

    <div class="p-3" v-if="myOrder">
      <div class="row align-items-center">
        <div class="col">
          <h5 class="m-0 font-size-16">Articles du panier</h5>
        </div>
        <div class="col-auto" v-if="myOrder.items.length > 0">
          <button @click="cancelOrder" class="small p-0 text-danger btn">
            Vider mon panier
          </button>
        </div>
      </div>
    </div>
    <simplebar style="max-height: 230px" data-simplebar v-if="myOrder">
      <template v-if="myOrder.items.length > 0">
        <nuxt-link
          :to="
            '/clients/' +
            myOrder.type +
            '/' +
            myOrder.subType +
            '/' +
            myOrder.linkedToSPItem.spID +
            '/' +
            item.itemID
          "
          v-for="(item, index) in myOrder.items"
          :key="index"
          href
          class="text-reset notification-item"
        >
          <div class="media">
            <div class="avatar-xs me-3">
              <img
                class="rounded-circle header-profile-user"
                :src="item.firstImage"
                alt="Header Avatar"
              />
            </div>
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                {{ item.name }}
              </h6>
              <div class="font-size-12 text-muted">
                <p class="mb-1">Quantité: {{ item.quantity }}</p>
              </div>
            </div>
          </div>
        </nuxt-link>
      </template>
      <div class="media" v-if="myOrder.items.length == 0">
        <div class="media-body text-center py-4">No Items in cart</div>
      </div>
    </simplebar>
    <div v-if="myOrder">
      <div class="p-2 border-top d-grid" v-if="myOrder.items.length > 0">
        <nuxt-link to="/clients/restauration/livraison-de-repas/cart">
         <center> <div class="btn btn-sm btn-link font-size-14 text-center">
            <i class="uil-arrow-circle-right me-1"></i> View all items
          </div></center>
        </nuxt-link>
      </div>
    </div>
  </b-dropdown>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getData, removeData } from "../components/controllers/savingData";
export default {
  name: "ShoppingCart",
  async mounted() {
    this.myOrder = getData("restauration");
    console.log(this.myOrder);
  },
  data() {
    return {
      myOrder: null,
    };
  },

  computed: {
    ...mapGetters("products", {
      cartCount: "cartCount",
      itemsInCart: "itemsInCart",
    }),
  },
  methods: {
    cancelOrder() {
      removeData("restauration");
      this.$router.push("/clients/restauration/livraison-de-repas");
      this.$router.go();
    },
  },
};
</script>

<style lang="scss" scoped></style>

<script>
/**
 * Selling-product component
 */
import axios from "axios";
import { getData } from "../controllers/savingData";
export default {
  data() {
    return {
      topSoldProducts: null,
      topSoldProductsTotal: 0,
    };
  },
  async mounted() {
    let result = await axios.get(
      process.env.baseUrl + "/getDashboardData/" + getData("accountinfo").id
    );
    this.topSoldProducts = result.data.topSellingProducts;
    for (let i = 0; i < this.topSoldProducts.length; i++) {
      this.topSoldProductsTotal =
        this.topSoldProductsTotal + this.topSoldProducts[i].quantity;
    }
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="float-end">
        <!-- <b-dropdown right toggle-class="text-reset p-0" variant="white">
          <template v-slot:button-content>
            <span class="font-weight-semibold">Sort By:</span>
            <span class="text-muted">
              Yearly
              <i class="mdi mdi-chevron-down ml-1"></i>
            </span>
          </template>
          <a class="dropdown-item" href="#">Monthly</a>
          <a class="dropdown-item" href="#">Yearly</a>
          <a class="dropdown-item" href="#">Weekly</a>
        </b-dropdown> -->
      </div>

      <h4 class="card-title mb-4">Produits les plus vendus</h4>

      <div class="row align-items-center no-gutters mt-3" v-for="(article, index) in topSoldProducts" :key="index">
        <div class="col-sm-5">
          <p class="text-truncate mt-1 mb-0">
            <i class="mdi mdi-circle-medium text-primary me-2"></i> {{index+1}}: {{article.name}}
          </p>
        </div>

        <div class="col-sm-7">
          <b-progress
            :value="(article.quantity/topSoldProductsTotal)*100"
            variant="primary"
            class="mt-1"
            height="6px"
          ></b-progress>
        </div>
      </div>
      <!-- end row-->
    </div>
    <!-- end card-body-->
  </div>
  <!-- end card-->
</template>

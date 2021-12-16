<script>
/**
 * Starter page
 */
import axios from "axios";

export default {
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  async mounted() {
    try {
      this.baseUrl = process.env.baseUrl;
      let result = await axios.get(process.env.baseUrl + "/marketcategories");
      result = result.data;
      this.categories = result;
      result = await axios.get(process.env.baseUrl + "/marketitems");
      result = result.data;
      this.myItems = result;
      this.myFiltredItems = result;
      console.log(this.myFiltredItems);
    } catch (error) {}
  },
  methods: {
    filterController(value) {
      this.filterControllerValue = value;

      this.myFiltredItems = this.myItems.filter(function (product) {
        console.log(value == "All");
        if (value == "All") {
          return product;
        }
        if (product.subCategory == value) {
          return product;
        }
      });

      console.log(value);
    },
  },
  data() {
    return {
     
      title: "BinBudget Market",
      myItems: null,
      myFiltredItems: null,
      categories: null,
      baseUrl: null,
      sliderPrice: 800,
      currentPage: 1,
      filterControllerValue: "All",
      items: [
        {
          text: "Market",
          active: true,
        },
      ],
    };
  },
  middleware: "authentication",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div class="row mt-3">
      <div class="col-xl-3 col-lg-4">
        <div class="card">
          <div class="card-header bg-transparent border-bottom">
            <h5 class="mb-0">Filters</h5>
          </div>

          <div class="p-4">
            <h5 class="font-size-14 mb-3">Categories</h5>
            <p
              href="javascript: void(0);"
              role="button"
              class="mb-2"
              :class="[
                {
                  'text-primary': filterControllerValue == 'All',
                },
                '',
              ]"
              v-on:click="filterController('All')"
            >
              • ALL
            </p>
            <div
              class="custom-accordion"
              v-for="(category, index) in categories"
              :key="index"
            >
              <!-- city filter -->
              <a
                class="text-body font-weight-semibold pb-2 d-block"
                data-toggle="collapse"
                href="javascript: void(0);"
                role="button"
                aria-expanded="false"
                v-b-toggle.city-collapse2
              >
                <i
                  class="mdi mdi-chevron-up accor-down-icon text-primary mr-1"
                ></i>
                {{ category.name }}
              </a>
              <b-collapse visible id="city-collapse2">
                <div class="card p-2 border shadow-none">
                  <ul class="list-unstyled categories-list mb-0">
                    <li
                      v-for="(
                        subCategory, mysubCategoryIndex
                      ) in category.subCategories"
                      :key="mysubCategoryIndex"
                      v-on:click="filterController(subCategory.name)"
                      :class="[
                        {
                          active: subCategory.name == filterControllerValue,
                        },
                        '',
                      ]"
                    >
                      <a href="#">
                        <i class="mdi mdi-circle-medium mr-1"></i>
                        {{ subCategory.name }}
                      </a>
                    </li>
                  </ul>
                </div>
              </b-collapse>
              <!-- Speciality filter  -->
            </div>
          </div>

          <!-- <div class="p-4 border-top">
            <div>
              <h5 class="font-size-14 mb-4">Price</h5>
              <vue-slide-bar
                v-model="sliderPrice"
                :min="0"
                :max="1000"
                @dragEnd="valuechange"
              />
            </div>
          </div> -->
        </div>
      </div>

      <div class="col-xl-9 col-lg-8" v-if="myFiltredItems">
        <div class="card">
          <div class="card-body">
            <div>
              <div class="row">
                <center
                  v-if="
                    filterControllerValue != 'All' && myFiltredItems.length == 0
                  "
                >
                  <h5 class="text-muted m-5">
                    Aucun produit dans cette catégorie
                  </h5>
                </center>

                <center
                  v-if="
                    filterControllerValue == 'All' && myFiltredItems.length == 0
                  "
                >
                  <h5 class="text-muted m-5">
                    Aucun produit n'est publié pour l'instant
                  </h5>
                </center>
                <div
                  class="col-xl-4 col-sm-6"
                  v-for="(item, index) in myFiltredItems"
                  :key="index"
                >
                  <div class="product-box">
                    <div class="product-img pt-4 px-4">
                      <span
                        class="product-ribbon badge badge-danger text-red f-3"
                      >
                        <div id="discountbadgeColor" v-if="item.discount">
                          - {{ item.discount }} %
                        </div>
                      </span>

                      <img
                        :src="baseUrl + item.images[0].url"
                        alt
                        class="img-fluid mx-auto d-block"
                      />
                    </div>

                    <div class="text-center product-content p-4">
                      <h5 class="mb-1">
                        <nuxt-link
                          :to="'/clients/market/' + item.id"
                          class="text-dark"
                          >{{ item.name }}</nuxt-link
                        >
                      </h5>
                      <p class="text-muted font-size-13">
                        {{ item.subCategory }}
                      </p>

                      <h5 class="mt-3 mb-0">
                        <div
                          v-if="
                            item.discount &&
                            item.stockBalance >= item.minQuantity
                          "
                        >
                          <span class="text-muted mr-2">
                            <del>{{ item.price.toFixed(2) }} dh</del>
                          </span>
                          {{
                            (
                              item.price -
                              (item.discount * item.price) / 100
                            ).toFixed(2)
                          }}
                          dh
                        </div>
                        <div
                          v-if="
                            !item.discount &&
                            item.stockBalance >= item.minQuantity
                          "
                        >
                          {{ item.price.toFixed(2) }} dh
                        </div>
                        <div v-if="item.stockBalance < item.minQuantity">
                          <p class="text-danger font-size-14">
                            En rupture de stock
                          </p>
                        </div>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end row -->
              <div class="row mt-4">
                <div class="col-lg-12">
                  <b-pagination
                    v-if="myItems.length > 0"
                    class="justify-content-end"
                    pills
                    v-model="currentPage"
                    :total-rows="myItems.length"
                    :per-page="6"
                    aria-controls="my-table"
                  ></b-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>
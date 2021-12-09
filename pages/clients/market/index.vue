<script>
/**
 * Starter page
 */
import axios from "axios";
import { productData } from "./data-products";
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
      console.log( this.categories);
    } catch (error) {}
  },

  data() {
    return {
      productData: productData,
      title: "BinBudget Market",
      categories: null,
      baseUrl: null,
      sliderPrice: 800,
      currentPage: 1,
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
            <div class="custom-accordion" v-for="(category,index) in categories" :key="index">
              <a
                class="text-body font-weight-semibold pb-2 d-block"
                data-toggle="collapse"
                href="javascript: void(0);"
                role="button"
                aria-expanded="false"
                v-b-toggle.categories-collapse
              >
                <i
                  class="mdi mdi-chevron-up accor-down-icon text-primary mr-1"
                ></i>
                {{category.name}}
              </a>
              <b-collapse  :id="'categories-collapse'">
                <div class="card p-2 border shadow-none">
                  <ul class="list-unstyled categories-list mb-0">
                    <li>
                      <a href="#"  v-for="(subCategory,index2) in category.subCategories" :key="index2">
                        <i class="mdi mdi-circle-medium mr-1"></i> {{subCategory.name}}
                      </a>
                    </li>
                 
              
              
                  </ul>
                </div>
              </b-collapse>
            </div>


            
          </div>

          <div class="p-4 border-top">
            <div>
              <h5 class="font-size-14 mb-4">Price</h5>
              <vue-slide-bar
                v-model="sliderPrice"
                :min="0"
                :max="1000"
                @dragEnd="valuechange"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-9 col-lg-8">
        <div class="card">
          <div class="card-body">
            <div>
              

              <div class="row">
                <div
                  class="col-xl-4 col-sm-6"
                  v-for="(item, index) in productData"
                  :key="index"
                >
                  <div class="product-box">
                    <div class="product-img pt-4 px-4">
                      <div class="product-ribbon badge badge-danger">
                        - {{ item.discount }} %
                      </div>

                      <img
                        :src="item.image"
                        alt
                        class="img-fluid mx-auto d-block"
                      />
                    </div>

                    <div class="text-center product-content p-4">
                      <h5 class="mb-1">
                        <nuxt-link
                          :to="'/ecommerce/product-detail/' + item.id"
                          class="text-dark"
                          >{{ item.name }}</nuxt-link
                        >
                      </h5>
                      <p class="text-muted font-size-13">{{ item.disc }}</p>

                      <h5 class="mt-3 mb-0">
                        <span class="text-muted mr-2">
                          <del>${{ item.oldprice }}</del>
                        </span>
                        ${{ item.newprice }}
                      </h5>

                      <ul class="list-inline mb-0 text-muted product-color">
                        <li class="list-inline-item">Colors :</li>
                        <li
                          class="list-inline-item"
                          v-for="(item, index) in item.colors"
                          :key="index"
                        >
                          <i :class="`mdi mdi-circle text-${item}`"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end row -->
              <div class="row mt-4">
                <div class="col-lg-12">
                  <b-pagination
                    v-if="productData.length > 0"
                    class="justify-content-end"
                    pills
                    v-model="currentPage"
                    :total-rows="productData.length"
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
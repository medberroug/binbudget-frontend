<script>
import { productData } from "../../data-products";
import { mapActions } from "vuex";
/**
 * Products component
 */
export default {
  head() {
    return {
      title: `${this.title} |  Admin Dashboard`,
    };
  },

  /**
   * Products information
   */
  data() {
    return {
      productData: productData,
      title: "Restaurant",
      details: [
        {
          text: "Restaurant",
        },
        {
          text: "Dishes",
          active: true,
        },
      ],
      sliderPrice: 800,
      currentPage: 1,
    };
  },
  middleware: "authentication",
  methods: {
    ...mapActions({
      likeProduct: "products/likeProduct",
    }),
    valuechange(value) {
      this.productData = productData.filter(function (product) {
        return product.newprice <= value.currentValue;
      });
    },
    selected(show) {
      this.changed = !this.changed;
    },
  },
};
</script>

<template>
  <div>
    <!-- Page Header -->
    <PageHeader :title="title" :details="details" />
    <div class="row mt-4">
      <div class="col-xl-3 col-lg-4">
        <div class="card">
          <div class="card-header bg-transparent border-bottom">
            <h5 class="mb-0">Filters</h5>
          </div>
          <!-- Page Categories -->
          <div class="p-4">
            <h5 class="font-size-14 mb-3">Categories</h5>
            <div class="custom-accordion">
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
                Dishes
              </a>
              <b-collapse visible id="categories-collapse">
                <div class="card p-2 border shadow-none">
                  <ul class="list-unstyled categories-list mb-0">
                    <li>
                      <a href="#">
                        <i class="mdi mdi-circle-medium mr-1"></i> Pasta &#38;
                        Rissoto
                      </a>
                    </li>
                    <li class="active">
                      <a href="#">
                        <i class="mdi mdi-circle-medium mr-1"></i> Salad
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="mdi mdi-circle-medium mr-1"></i> Curry
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="mdi mdi-circle-medium mr-1"></i> Soup
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="mdi mdi-circle-medium mr-1"></i> Vegetable
                        Sides
                      </a>
                    </li>
                  </ul>
                </div>
              </b-collapse>
            </div>
          </div>
          <!-- Menu Price -->
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
          <!-- Page Seatings -->
          <div class="custom-accordion">
            <div class="p-4 border-top">
              <div>
                <h5 class="font-size-14 mb-0">
                  <a
                    href="javascript: void(0);"
                    class="text-dark d-block"
                    data-toggle="collapse"
                    v-b-toggle.filtersizes-collapse
                  >
                    Seatings
                    <i class="mdi mdi-chevron-up float-end accor-down-icon"></i>
                  </a>
                </h5>

                <b-collapse visible id="filtersizes-collapse">
                  <div class="mt-4">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <h5 class="font-size-15 mb-0">Select Table Sizes</h5>
                      </div>
                      <div class="w-xs">
                        <select class="custom-select">
                          <option value="1">3</option>
                          <option value="2">4</option>
                          <option value="3">5</option>
                          <option value="4">6</option>
                          <option value="5" selected>7</option>
                          <option value="6">8</option>
                          <option value="7">9</option>
                          <option value="8">10</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </b-collapse>
              </div>
            </div>
            <!-- Page Meals -->
            <div class="p-4 border-top">
              <div>
                <h5 class="font-size-14 mb-0">
                  <a
                    href="javascript: void(0);"
                    class="text-dark d-block"
                    data-toggle="collapse"
                    v-b-toggle.filterprodductcolor-collapse
                  >
                    Meals
                    <i class="mdi mdi-chevron-up float-end accor-down-icon"></i>
                  </a>
                </h5>

                <b-collapse visible id="filterprodductcolor-collapse">
                  <div class="mt-4">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <h5 class="font-size-15 mb-0">Select Meal Type</h5>
                      </div>
                      <div class="w-xs">
                        <select class="custom-select">
                          <option value="1">Breakfast</option>
                          <option value="2" selected>Lunch</option>
                          <option value="3">Brunch</option>
                          <option value="4">Dinner</option>
                          <option value="5">Drinks</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </b-collapse>
              </div>
            </div>
            <!-- Customer Ratings -->
            <div class="p-4 border-top">
              <div>
                <h5 class="font-size-14 mb-0">
                  <a
                    href="javascript: void(0);"
                    class="text-dark d-block"
                    data-toggle="collapse"
                    v-b-toggle.filterproduct-color-collapse
                  >
                    Customer Rating
                    <i class="mdi mdi-chevron-up float-end accor-down-icon"></i>
                  </a>
                </h5>

                <b-collapse visible id="filterproduct-color-collapse">
                  <div class="mt-4">
                    <div class="custom-control custom-radio mt-2">
                      <input
                        type="radio"
                        id="productratingRadio1"
                        name="productratingRadio1"
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label"
                        for="productratingRadio1"
                      >
                        4
                        <i class="mdi mdi-star text-warning"></i> & Above
                      </label>
                    </div>
                    <div class="custom-control custom-radio mt-2">
                      <input
                        type="radio"
                        id="productratingRadio2"
                        name="productratingRadio1"
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label"
                        for="productratingRadio2"
                      >
                        3
                        <i class="mdi mdi-star text-warning"></i> & Above
                      </label>
                    </div>
                    <div class="custom-control custom-radio mt-2">
                      <input
                        type="radio"
                        id="productratingRadio3"
                        name="productratingRadio1"
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label"
                        for="productratingRadio3"
                      >
                        2
                        <i class="mdi mdi-star text-warning"></i> & Above
                      </label>
                    </div>
                    <div class="custom-control custom-radio mt-2">
                      <input
                        type="radio"
                        id="productratingRadio4"
                        name="productratingRadio1"
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label"
                        for="productratingRadio4"
                      >
                        1
                        <i class="mdi mdi-star text-warning"></i>
                      </label>
                    </div>
                  </div>
                </b-collapse>
              </div>
            </div>
            <!-- Discount -->
            <div class="p-4 border-top">
              <div>
                <h5 class="font-size-14 mb-0">
                  <a
                    href="#filterproduct-discount-collapse"
                    class="text-dark d-block"
                    data-toggle="collapse"
                    v-b-toggle.filterproduct-discount-collapse
                  >
                    Discount
                    <i class="mdi mdi-chevron-up float-end accor-down-icon"></i>
                  </a>
                </h5>

                <b-collapse id="filterproduct-discount-collapse">
                  <div class="mt-4">
                    <div class="custom-control custom-radio mt-2">
                      <input
                        type="radio"
                        id="productdiscountRadio1"
                        name="productdiscountRadio"
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label"
                        for="productdiscountRadio1"
                        >50% or more</label
                      >
                    </div>
                    <div class="custom-control custom-radio mt-2">
                      <input
                        type="radio"
                        id="productdiscountRadio2"
                        name="productdiscountRadio"
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label"
                        for="productdiscountRadio2"
                        >40% or more</label
                      >
                    </div>
                    <div class="custom-control custom-radio mt-2">
                      <input
                        type="radio"
                        id="productdiscountRadio3"
                        name="productdiscountRadio"
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label"
                        for="productdiscountRadio3"
                        >30% or more</label
                      >
                    </div>
                    <div class="custom-control custom-radio mt-2">
                      <input
                        type="radio"
                        id="productdiscountRadio4"
                        name="productdiscountRadio"
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label"
                        for="productdiscountRadio4"
                        >20% or more</label
                      >
                    </div>
                    <div class="custom-control custom-radio mt-2">
                      <input
                        type="radio"
                        id="productdiscountRadio5"
                        name="productdiscountRadio"
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label"
                        for="productdiscountRadio5"
                        >10% or more</label
                      >
                    </div>
                    <div class="custom-control custom-radio mt-2">
                      <input
                        type="radio"
                        id="productdiscountRadio6"
                        name="productdiscountRadio"
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label"
                        for="productdiscountRadio6"
                        >Less than 10%</label
                      >
                    </div>
                  </div>
                </b-collapse>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-9 col-lg-8">
        <div class="card">
          <div class="hero-image">
            <div class="hero-text">
              <div class="d-flex justify-content-start align-items-center m-4">
                <div class="avatar-con">
                  <img
                    src="~/assets/images/product/shiro.png"
                    class="avatar-img img-fluid"
                    style="object-fit: cover"
                    alt="restaurant-icon"
                  />
                </div>
                <div class="margin">
                  <div class="display-6">Shiro Restaurant and Bar</div>
                  <p>Lorem ipsum dolor sit, amet consectetur...</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <div class="row">
                <div class="col-md-6">
                  <div>
                    <ol class="breadcrumb p-0 bg-transparent mb-2">
                      <li class="breadcrumb-item">
                        <a href="javascript: void(0);">Restauration</a>
                      </li>
                      <li class="breadcrumb-item">Sur Carte</li>
                      <li class="breadcrumb-item active">
                        Shiro Restaurant and Bar
                      </li>
                    </ol>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-inline float-md-end">
                    <div class="search-box ml-2">
                      <div class="position-relative">
                        <input
                          type="text"
                          class="form-control bg-light border-light rounded"
                          placeholder="Search..."
                        />
                        <i class="mdi mdi-magnify search-icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ul
                class="
                  nav nav-tabs nav-tabs-custom
                  mt-3
                  mb-2
                  ecommerce-sortby-list
                "
              >
                <li class="nav-item">
                  <a
                    class="nav-link disabled fw-medium"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                    >Sort by:</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href="#">Popularity</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Newest</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Discount</a>
                </li>
              </ul>

              <div class="row">
                <div
                  class="col-xl-4 col-sm-6"
                  v-for="(item, index) in productData"
                  :key="index"
                >
                  <div class="product-box">
                    <div class="product-img pb-6">
                      <span
                        class="product-ribbon badge badge-danger text-red f-3"
                      >
                        <div id="discountbadgeColor">
                          - {{ item.discount }} %
                        </div>
                      </span>
                      <div class="product-wishlist">
                        <i
                          role="button"
                          @click="likeProduct(item.id)"
                          :class="[
                            item.liked ? 'text-danger' : '',
                            'f-3',
                            'mdi',
                            'mdi-heart',
                          ]"
                        ></i>
                      </div>
                      <img
                        :src="item.image"
                        alt
                        class="img-fluid d-block w-100"
                        style="object-fit: cover"
                        height="200"
                      />
                    </div>

                    <div class="text-center product-content p-4">
                      <h5 class="mb-1">
                        <nuxt-link
                          :to="
                            '/clients/restauration/livraison-de-repas/product-detail/' +
                            item.id
                          "
                          class="text-dark"
                          >{{ item.name }}</nuxt-link
                        >
                      </h5>
                      <p class="text-muted font-size-13">{{ item.disc }}</p>

                      <h5 class="mt-3 mb-0">
                        <span class="text-muted mr-2">
                          <del>{{ item.oldprice }}dh</del>
                        </span>
                        {{ item.newprice }}dh
                      </h5>

                      <!-- <ul class="list-inline mb-0 text-muted product-color">
                        <li class="list-inline-item">Colors :</li>
                        <li
                          class="list-inline-item"
                          v-for="(item, index) in item.colors"
                          :key="index"
                        >
                          <i :class="`mdi mdi-circle text-${item}`"></i>
                        </li>
                      </ul> -->
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
    <!-- end row -->
  </div>
</template>

<style scoped>
.margin {
  margin-left: 1.5rem;
}
.f-3 {
  font-size: 15px;
}
#discountbadgeColor {
  color: rgb(255, 255, 255);
  font-size: 1rem;
  font-weight: 900;
  background-color: rgba(0, 0, 0, 0.404);
  border-radius: 2rem;
  padding: 0.5rem;
}
</style>

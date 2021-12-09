<script>
import { mapActions } from "vuex";
import axios from "axios";

/**
 * Products component
 */
export default {
  head() {
    return {
      title: `${this.title} |  Admin Dashboard`,
    };
  },
  computed: {
    cssVars() {
      return {
        "--bg-color": this.bgColor,
        "--height": this.height + "px",
      };
    },
  },
  async mounted() {
    console.log(this.$route.params.id);
    try {
      let result = await axios.get(
        process.env.baseUrl + "/restaurations/" + this.$route.params.id
      );
      this.restaurantDetails = result.data;

      for (let i = 0; i < this.restaurantDetails.items.length; i++) {
        let showInJudger = true;
        for (
          let j = 0;
          j < this.restaurantDetails.items[i].shownIn.length;
          j++
        ) {
          if (
            this.restaurantDetails.items[i].shownIn[j].serviceName ==
            this.details[1].text
          ) {
            showInJudger = true;
            break;
          }
        }
        if (showInJudger) {
          let myCategories = "";
          for (
            let k = 0;
            k < this.restaurantDetails.items[i].categories.length;
            k++
          ) {
            myCategories =
              myCategories +
              this.restaurantDetails.items[i].categories[k].name +
              ", ";
            if (
              !this.overallCategories.includes(
                this.restaurantDetails.items[i].categories[k].name
              )
            ) {
              this.overallCategories.push(
                this.restaurantDetails.items[i].categories[k].name
              );
            }
          }
          let newPrice = null;
          let myDiscount = null;
          if (this.restaurantDetails.items[i].disocunt != null) {
            myDiscount = this.restaurantDetails.items[i].disocunt.percentage;
            newPrice =
              this.restaurantDetails.items[i].price *
              (1 - this.restaurantDetails.items[i].disocunt.percentage / 100);
            newPrice = parseFloat(newPrice.toFixed(2));
          } else {
            newPrice = this.restaurantDetails.items[i].price;
          }
          if (this.sliderPrice < newPrice) {
            this.sliderPrice = newPrice;
          }
          this.maxInScrollPrice = this.sliderPrice+50;
          let myNewItem = {
            id: this.restaurantDetails.items[i].id,
            name: this.restaurantDetails.items[i].name,
            discount: myDiscount,
            firstImage:
              this.baseUrl + this.restaurantDetails.items[i].firstImage.url,
            oldPrice: this.restaurantDetails.items[i].price,
            newPrice: newPrice,
            categories: myCategories,
            liked: false,
          };

          this.restaurantItems.push(myNewItem);
          this.restarautnItemsFiltred.push(myNewItem);
          console.log(this.restaurantItems);
          console.log(this.overallCategories);
        }
      }
      // console.log(this.restaurantDetails);
    } catch (error) {}
  },

  /**
   * Products information
   */
  data() {
    return {
      restaurantItems: [],
      restarautnItemsFiltred: [],
      title: "Restaurant",
      restoId: this.$route.params.id,
      baseUrl: process.env.baseUrl,
      restaurantDetails: null,
      overallCategories: [],
      selectedCategory: "all",
      selectedPrice: 5000,
      selectedDiscount: 0,
      discountChange: 0,
      categoryChange: "all",
      details: [
        {
          text: "Restaurant",
        },
        {
          text: "livraison-de-repas",
          active: true,
        },
      ],
      sliderPrice: 0,
      maxInScrollPrice: 0,
      currentPage: 1,
    };
  },
  middleware: "authentication",
  methods: {
    ...mapActions({
      likeProduct: "products/likeProduct",
    }),
    valuechange() {
      // console.log(value.currentIndex);

      let sliderPrice = this.sliderPrice;
      let selectedCategory = this.selectedCategory;
      let discountChange = this.discountChange;
      this.restarautnItemsFiltred = this.restaurantItems.filter(function (
        product
      ) {
        if (product.newPrice <= sliderPrice) {
          if (!product.discount) {
            product.discount = 0;
          } else {
            product.discount = parseFloat(product.discount);
          }
        
          if (selectedCategory == "all") {
            if (product.discount >= discountChange) {
              return product;
            }
          } else {
            if (product.categories.includes(selectedCategory)) {
              if (product.discount >= discountChange) {
                return product;
              }
            }
          }
        }
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
              </a>

              <ul class="list-unstyled categories-list mb-0">
                <li :class="{ active: selectedCategory == 'all' }">
                  <a
                    href="#"
                    @click="
                      selectedCategory = 'all';
                      valuechange();
                    "
                  >
                    <i class="mdi mdi-circle-medium mr-1"></i> All Categories
                  </a>
                </li>
                <li
                  v-for="(category, index) in overallCategories"
                  :key="index"
                  :class="{ active: category == selectedCategory }"
                >
                  <a
                    href="#"
                    @click="
                      selectedCategory = category;
                      valuechange();
                    "
                  >
                    <i class="mdi mdi-circle-medium mr-1"></i> {{ category }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- Menu Price -->
          <div class="p-4 border-top">
            <div>
              <h5 class="font-size-14 mb-4">Price</h5>
              <vue-slide-bar
                v-model="sliderPrice"
                :min="0"
                :max="maxInScrollPrice"
                @dragEnd="valuechange"
              />
            </div>
          </div>
          <!-- Page Seatings -->
          <div class="custom-accordion">
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
                        @click="
                          discountChange = 50;
                          valuechange();
                        "
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
                        @click="
                          discountChange = 40;
                          valuechange();
                        "
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
                        @click="
                          discountChange = 30;
                          valuechange();
                        "
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
                        @click="
                          discountChange = 20;
                          valuechange();
                        "
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
                        @click="
                          discountChange = 10;
                          valuechange();
                        "
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
                        @click="
                          discountChange = 0;
                          valuechange();
                        "
                      />
                      <label
                        class="custom-control-label"
                        for="productdiscountRadio6"
                        >ALL</label
                      >
                    </div>
                  </div>
                </b-collapse>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-9 col-lg-8" v-if="restaurantDetails">
        <div class="card">
          <div class="hero-image">
            <img
              :src="baseUrl + restaurantDetails.topImage.url"
              :alt="restaurantDetails.knownName"
              class="hero-image"
              style="object-fit: cover"
            />
            <div class="hero-text">
              <div class="d-flex justify-content-start align-items-center m-4">
                <div class="avatar-con">
                  <img
                    :src="baseUrl + restaurantDetails.logo.url"
                    class="avatar-img img-fluid"
                    style="object-fit: cover"
                    alt="restaurant-icon"
                  />
                </div>
                <div class="margin">
                  <div class="display-6">{{ restaurantDetails.knownName }}</div>
                  <p>{{ restaurantDetails.smallDescription }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <!-- <ul
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
              </ul> -->

              <div class="row">
                <div
                  class="col-xl-4 col-sm-6"
                  v-for="(item, index) in restarautnItemsFiltred"
                  :key="index"
                >
                  <div class="product-box">
                    <div class="product-img pb-6">
                      <span
                        class="product-ribbon badge badge-danger text-red f-3"
                      >
                        <div
                          id="discountbadgeColor"
                          v-if="item.oldPrice != item.newPrice"
                        >
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
                        :src="item.firstImage"
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
                            '/clients/restauration/livraison-de-repas/' +
                            restoId +
                            '/' +
                            item.id
                          "
                          class="text-dark"
                          >{{ item.name }}</nuxt-link
                        >
                      </h5>
                      <p class="text-muted font-size-13">
                        {{ item.categories }}
                      </p>

                      <div v-if="item.oldPrice != item.newPrice">
                        <h5 class="mt-3 mb-0">
                          <span class="text-muted mr-2">
                            <del>{{ item.oldPrice }}dh</del>
                          </span>
                          <span>{{ item.newPrice }}dh</span>
                        </h5>
                      </div>
                      <div
                        v-if="
                          item.oldPrice == item.newPrice && item.newPrice > 0
                        "
                      >
                        <h5 class="mt-3 mb-0">
                          <span>{{ item.newPrice }}dh</span>
                        </h5>
                      </div>
                      <div
                        v-if="
                          item.oldPrice == item.newPrice && item.newPrice == 0
                        "
                      >
                        <h5 class="mt-3 mb-0">
                          <h5 class="mb-4 pt-2 text-success">Gratuit</h5>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end row -->
              <div class="row mt-4">
                <div class="col-lg-12">
                  <b-pagination
                    v-if="restarautnItemsFiltred.length > 0"
                    class="justify-content-end"
                    pills
                    v-model="currentPage"
                    :total-rows="restarautnItemsFiltred.length"
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
.hero-image {
  height: 30vh;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
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

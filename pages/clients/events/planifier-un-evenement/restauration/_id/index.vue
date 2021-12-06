<script>
import { mapActions } from "vuex";
import axios from "axios";
import {
  getData,
  eventStepperCalculator,
  removeData,
  eventNextStep,
} from "../../../../../../components/controllers/savingData";
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
     this.myEvent = getData("event");

    this.nextPage = eventNextStep(false);
    this.stepperTotal = eventStepperCalculator();
    this.stepperText =
      ": Services de restauration | " +
      this.myEvent.whereIam +
      "/" +
      this.stepperTotal;
    this.title = this.title + this.stepperText;
    try {
      let result = await axios.get(
        process.env.baseUrl + "/Eventserviceproviders/" + this.$route.params.id
      );
      this.restaurantDetails = result.data;
      this.restaurantItems;
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
          console.log(this.restaurantItems);
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
      title: "Planifier mon evenement ",
      restoId: this.$route.params.id,
      baseUrl: process.env.baseUrl,
      restaurantDetails: null,
      myEvent: null,
      myItems: null,
      stepperTotal: null,
      stepperText: null,
      details: [
        {
          text: "Planifier mon evenement",
        },
        {
          text: "Services de restauration",
          active: true,
        },
      ],
      sliderPrice: 800,
      currentPage: 1,
    };
  },
  middleware: "authentication",
  methods: {
    routerGo(pages) {
      this.$router.go(pages);
    },
     
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
    <b-button @click="routerGo(-1)" class="mt-3" variant="primary">
      <i class="uil-arrow-left"> </i> Page précédente</b-button
    >
    <div class="row mt-4">
      

      <div class="col-xl-12 col-lg-12" v-if="restaurantDetails">
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
                  class="col-xl-3 col-sm-6"
                  v-for="(item, index) in restaurantItems"
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
                            '/clients/events/planifier-un-evenement/restauration/' +
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
                          <span 
                            >{{ item.newPrice }}dh</span
                          >
                         
                        </h5>
                      </div>
                      <div v-if="(item.oldPrice == item.newPrice)&&(item.newPrice>0)">
                        <h5 class="mt-3 mb-0">
                          
                          <span 
                            >{{ item.newPrice }}dh</span
                          >
                         
                        </h5>
                      </div>
                      <div v-if="(item.oldPrice == item.newPrice)&&(item.newPrice==0)">
                        <h5 class="mt-3 mb-0">
                          
                          <h5 class="mb-4 pt-2 text-success">Gratuit</h5>
                         
                        </h5>
                      </div>
                      <div v-if="(item.oldPrice == item.newPrice)&&(item.newPrice<0)">
                        <h5 class="mt-3 mb-0">
                          
                          <h5 class="mb-4 pt-2 text-primary">Sur devis</h5>
                         
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
                    v-if="restaurantItems.length > 0"
                    class="justify-content-end"
                    pills
                    v-model="currentPage"
                    :total-rows="restaurantItems.length"
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

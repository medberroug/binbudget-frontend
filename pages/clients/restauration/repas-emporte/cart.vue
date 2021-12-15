<script>
import NumberInputSpinner from "vue-number-input-spinner";
import {
  getData,
  removeData,
  persistData,
} from "../../../../components/controllers/savingData";
import axios from "axios";
/**
 * Cart component
 */
export default {
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  components: {
    NumberInputSpinner,
  },
  methods: {
    myValueChanged(value, itemId) {
      for (let i = 0; i < this.myOrder.items.length; i++) {
        if (this.myOrder.items[i].itemID == itemId) {
          if (value == "add") {
            this.myOrder.items[i].quantity = this.myOrder.items[i].quantity + 1;
          } else {
            this.myOrder.items[i].quantity = this.myOrder.items[i].quantity - 1;
          }
        }
      }
      this.myOrder.subTotal = 0;
      for (let i = 0; i < this.myOrder.items.length; i++) {
        if (this.myOrder.items[i].price >= 0) {
          this.myOrder.subTotal =
            this.myOrder.subTotal +
            this.myOrder.items[i].price * this.myOrder.items[i].quantity;
        } else {
          this.isEverythingPriced = true;
          break;
        }
      }
      this.myOrder.subTotal =
        this.myOrder.subTotal + this.myOrder.deliveryPrice;
      this.myOrder.tax = (this.myOrder.subTotal * this.tvaRestauration) / 100;
      this.myOrder.total = this.myOrder.subTotal + this.myOrder.tax;
      persistData("restauration", this.myOrder);
    },
    removeItem(itemId) {
      let myNexArticles = [];
      for (let i = 0; i < this.myOrder.items.length; i++) {
        if (this.myOrder.items[i].itemID != itemId) {
          myNexArticles.push(this.myOrder.items[i]);
        }
      }
      this.myOrder.items = myNexArticles;
      this.myOrder.subTotal = 0;
      for (let i = 0; i < this.myOrder.items.length; i++) {
        if (this.myOrder.items[i].price >= 0) {
          this.myOrder.subTotal =
            this.myOrder.subTotal +
            this.myOrder.items[i].price * this.myOrder.items[i].quantity;
        } else {
          this.isEverythingPriced = true;
          break;
        }
      }
      this.myOrder.subTotal =
        this.myOrder.subTotal + this.myOrder.deliveryPrice;
      this.myOrder.tax = (this.myOrder.subTotal * this.tvaRestauration) / 100;
      this.myOrder.total = this.myOrder.subTotal + this.myOrder.tax;
      persistData("restauration", this.myOrder);
    },
  },

  async mounted() {
    if (!getData("restauration")) {
      this.$router.push("/clients/restauration/repas-emporte");
    } else {
      try {
        this.myOrder = getData("restauration");
        this.myOrder.subTotal = 0;
        for (let i = 0; i < this.myOrder.items.length; i++) {
          if (this.myOrder.items[i].price >= 0) {
            this.myOrder.subTotal =
              this.myOrder.subTotal +
              this.myOrder.items[i].price * this.myOrder.items[i].quantity;
          } else {
            this.isEverythingPriced = true;
            break;
          }
        }

        let tvaRestauration = await axios.get(
          process.env.baseUrl + "/generalsettingsdefaults"
        );

        this.tvaRestauration = tvaRestauration.data.tvaRestauration;
        this.myOrder.subTotal =
          this.myOrder.subTotal + this.myOrder.deliveryPrice;
        this.myOrder.tax = (this.myOrder.subTotal * this.tvaRestauration) / 100;
        this.myOrder.total = this.myOrder.subTotal + this.myOrder.tax;
        persistData("restauration", this.myOrder);
      } catch (error) {
        console.log(error);
      }
    }
  },
  data() {
    return {
      title: "Panier de restauration ",
      myOrder: null,
      isEverythingPriced: true,
      tvaRestauration: 0,
      items:null,
    };
  },
  middleware: "authentication",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row mt-4" v-if="myOrder">
      <div class="col-xl-8">
        <div v-for="(item, index) in myOrder.items" :key="index">
          <div class="card border shadow-none">
            <div class="card-body">
              <div class="media border-bottom pb-3">
                <div class="mx-4">
                  <img :src="item.firstImage" alt class="avatar-lg" />
                </div>
                <div class="media-body align-self-center overflow-hidden">
                  <div>
                    <h5 class="text-truncate font-size-16">
                      <nuxt-link
                        to="/ecommerce/product-detail/1"
                        class="text-dark"
                        >{{ item.name }}</nuxt-link
                      >
                    </h5>
                  </div>
                </div>
                <div class="ml-2">
                  <ul class="list-inline mb-0 font-size-16">
                    <li
                      class="list-inline-item"
                      v-b-tooltip.hover
                      title="Remove"
                      v-if="myOrder.items.length > 1"
                      @click="removeItem(item.itemID)"
                    >
                      <a href="#" class="text-muted px-2">
                        <i class="uil uil-trash-alt"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="m-4">
                      <p class="text-muted mb-2">Prix</p>
                      <h5 class="font-size-16" v-if="item.price > 0">
                        {{
                          Intl.NumberFormat("ar-MA", {
                            style: "currency",
                            currency: "MAD",
                          }).format(item.price)
                        }}
                      </h5>
                      <h5
                        class="font-size-16 text-success"
                        v-if="item.price == 0"
                      >
                        Gratuit
                      </h5>
                      <h5
                        class="font-size-16 text-primary"
                        v-if="item.price < 0"
                      >
                        Sur devis
                      </h5>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mt-4">
                      <div
                        class="d-flex justify-content-start align-items-center"
                      >
                        <b-button
                          v-if="item.quantity > 1"
                          @click.prevent="myValueChanged('sub', item.itemID)"
                          variant="outline-primary"
                          >-</b-button
                        >
                        <b-button
                          v-else
                          @click.prevent="myValueChanged('sub', item.itemID)"
                          disabled
                          variant="outline-primary"
                          >-</b-button
                        >
                        <span class="mx-2">Quantité: {{ item.quantity }}</span>
                        <b-button
                         v-if="item.quantity < 10"
                          @click.prevent="myValueChanged('add', item.itemID)"
                          variant="outline-primary"
                          >+</b-button
                        >
                        <b-button
                        v-else
                         disabled
                          @click.prevent="myValueChanged('add', item.itemID)"
                          variant="outline-primary"
                          >+</b-button
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mt-3">
                      <p class="text-muted mb-2">Total</p>
                      <h5 class="font-size-16">
                        {{
                          Intl.NumberFormat("ar-MA", {
                            style: "currency",
                            currency: "MAD",
                          }).format(item.price * item.quantity)
                        }}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- end card -->

        <!-- end row-->
      </div>

      <div class="col-xl-4">
        <div class="mt-5 mt-lg-0">
          <div class="card border shadow-none">
            <div class="card-header bg-transparent py-3 px-4">
              <h5 class="font-size-16 mb-0">
                Synthèse de la commande
                <!-- <span class="float-end">#MN0124</span> -->
              </h5>
            </div>
            <div class="card-body p-4">
              <div class="table-responsive">
                <table class="table mb-0">
                  <tbody>
                    <tr>
                      <td>Sub Total :</td>
                      <td class="text-right">
                        {{
                          Intl.NumberFormat("ar-MA", {
                            style: "currency",
                            currency: "MAD",
                          }).format(myOrder.subTotal)
                        }}
                      </td>
                    </tr>

                    <tr v-if="myOrder.deliveryPrice">
                      <td>Shipping Charge :</td>
                      <td class="text-right">
                        {{
                          Intl.NumberFormat("ar-MA", {
                            style: "currency",
                            currency: "MAD",
                          }).format(myOrder.deliveryPrice)
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td>Estimated Tax :({{ tvaRestauration }}%)</td>
                      <td class="text-right">
                        {{
                          Intl.NumberFormat("ar-MA", {
                            style: "currency",
                            currency: "MAD",
                          }).format(myOrder.tax)
                        }}
                      </td>
                    </tr>
                    <tr class="bg-light">
                      <th>Total :</th>
                      <td class="text-right">
                        <span class="font-weight-bold">
                          {{
                            Intl.NumberFormat("ar-MA", {
                              style: "currency",
                              currency: "MAD",
                            }).format(myOrder.total)
                          }}</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- end table-responsive -->
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-6">
              <nuxt-link
                to="/clients/restauration/repas-emporte"
                class="btn btn-link text-muted"
              >
                <i class="uil uil-arrow-left mr-1"></i> Continuer vos achats
              </nuxt-link>
            </div>
            <!-- end col -->
            <div class="col-sm-6">
              <div class="text-sm-right mt-2 mt-sm-0 float-end">
                <nuxt-link
                  to="/clients/restauration/repas-emporte/checkout"
                  class="btn btn-success"
                >
                  Continuer <i class="uil uil-arrow-right mr-1"></i>
                </nuxt-link>
              </div>
            </div>
            <!-- end col -->
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>

<script>
import axios from "axios";

import {
  getData,
  removeData,
} from "../../../../components/controllers/savingData";
/**
 * Checkout component
 */
export default {
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  methods: {
    async addOrder() {
      if (!this.paimentMode) {
        this.paimentMode = "invoice";
      }
      this.myOrder.paimentMode = {
        type: this.paimentMode,
      };
      if (this.isOrderSurDevis) {
        this.myOrder.status.push({
          name: "pendingQuote",
          comment: "Votre commande est en attente d'un devis du fournisseur",
          date: new Date(),
        });
      } else {
        this.myOrder.status.push({
          name: "pendingValidation",
          comment:
            "Votre commande est en attente de validation de la part du fournisseur",
          date: new Date(),
        });
      }
      try {
        let result = await axios.post(
          process.env.baseUrl + "/orders",
          this.myOrder
        );
        removeData("restauration");
        this.$router.push("/clients/restauration/repas-emporte");
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.myOrder = getData("restauration");
    for (let i = 0; i < this.myOrder.items.length; i++) {
      if (this.myOrder.items[i].price < 0) {
        this.isOrderSurDevis = true;
        this.isCODPossible = false;
      }
    }
    if (this.myOrder.total >= 20000) {
      this.isCODPossible = false;
    }
  },
  data() {
    return {
      myOrder: null,
      isCODPossible: true,
      isOrderSurDevis: false,
      paimentMode: "invoice",
      title: "Commander",

      items: [],
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
        <div class="custom-accordion">
          <div class="card">
            <a
              class="collapsed text-dark"
              data-toggle="collapse"
              href="javascript:void(0);"
              v-b-toggle.checkout-paymentinfo-collapse
            >
              <div class="p-4">
                <div class="media align-items-center">
                  <div class="me-3">
                    <i class="uil uil-bill text-primary h2"></i>
                  </div>
                  <div class="media-body overflow-hidden">
                    <h5 class="font-size-16 mb-1">Modalit??s de paiement</h5>
                    <p class="text-muted text-truncate mb-0">
                      Choisissez ici les renseignements concernant le paiement.
                    </p>
                  </div>
                  <i
                    class="mdi mdi-chevron-up accor-down-icon font-size-24"
                  ></i>
                </div>
              </div>
            </a>

            <b-collapse id="checkout-paymentinfo-collapse" visible>
              <div class="p-4 border-top">
                <div>
                  <h5 class="font-size-14 mb-3">Mode de paiement :</h5>

                  <div class="row">
                    <div class="col-lg-3 col-sm-6">
                      <div data-toggle="collapse">
                        <label class="card-radio-label">
                          <input
                            type="radio"
                            name="pay-method"
                            id="pay-methodoption1"
                            class="card-radio-input"
                            @change="paimentMode = 'invoice'"
                            checked
                          />

                          <span class="card-radio text-center text-truncate">
                            <i class="uil uil-postcard d-block h2 mb-3"></i>
                            Sur facture
                          </span>
                        </label>
                      </div>
                    </div>

                    <div class="col-lg-3 col-sm-6">
                      <div v-if="isCODPossible && !isOrderSurDevis">
                        <label class="card-radio-label">
                          <input
                            type="radio"
                            name="pay-method"
                            id="pay-methodoption3"
                            class="card-radio-input"
                            @change="paimentMode = 'cod'"
                          />
                          <span class="card-radio text-center text-truncate">
                            <i class="uil uil-money-bill d-block h2 mb-3"></i>
                            <span>Paiement ?? la livraison</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
        </div>

        <!-- end row-->
      </div>
      <div class="col-xl-4">
        <div class="card checkout-order-summary">
          <div class="card-body">
            <div class="p-3 bg-light mb-4">
              <h5 class="font-size-16 mb-0">
                Synth??se de la commande
                <!-- <span class="float-end ms-2">#MN0124</span> -->
              </h5>
            </div>
            <div class="table-responsive">
              <table class="table table-centered mb-0 table-nowrap">
                <thead>
                  <tr>
                    <th class="border-top-0" style="width: 110px" scope="col">
                      Product
                    </th>
                    <th class="border-top-0" scope="col">Product Desc</th>
                    <th class="border-top-0" scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in myOrder.items" :key="index">
                    <th scope="row">
                      <img
                        :src="item.firstImage"
                        alt="product-img"
                        title="product-img"
                        class="avatar-md"
                      />
                    </th>
                    <td>
                      <h5 class="font-size-14 text-truncate">
                        <nuxt-link
                          to="/ecommerce/product-detail/1"
                          class="text-dark"
                          >{{ item.name }}</nuxt-link
                        >
                      </h5>
                      <p class="text-muted mb-0">
                        {{
                          Intl.NumberFormat("ar-MA", {
                            style: "currency",
                            currency: "MAD",
                          }).format(item.price)
                        }}
                        x {{ item.quantity }}
                      </p>
                    </td>
                    <td>
                      {{
                        Intl.NumberFormat("ar-MA", {
                          style: "currency",
                          currency: "MAD",
                        }).format(item.price * item.quantity)
                      }}
                    </td>
                  </tr>

                  <tr>
                    <td colspan="2">
                      <h5 class="font-size-14 m-0">Montant HT :</h5>
                    </td>
                    <td>
                      {{
                        Intl.NumberFormat("ar-MA", {
                          style: "currency",
                          currency: "MAD",
                        }).format(myOrder.subTotal)
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <h5 class="font-size-14 m-0">TVA :</h5>
                    </td>
                    <td>
                      {{
                        Intl.NumberFormat("ar-MA", {
                          style: "currency",
                          currency: "MAD",
                        }).format(myOrder.tax)
                      }}
                    </td>
                  </tr>

                  <tr class="bg-light">
                    <td colspan="2">
                      <h5 class="font-size-14 m-0">Montant TTC:</h5>
                    </td>
                    <td>
                      {{
                        Intl.NumberFormat("ar-MA", {
                          style: "currency",
                          currency: "MAD",
                        }).format(myOrder.total)
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <!-- end col -->
          <div class="col-sm-12">
            <div class="text-sm-right mt-2 mt-sm-0">
              <center>
                <span @click="addOrder" class="btn btn-success">
                  Commander <i class="uil uil-shopping-cart-alt mr-1"></i>
                </span>
              </center>
            </div>
          </div>
          <!-- end col -->
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>

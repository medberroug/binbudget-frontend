<script>
import NumberInputSpinner from "vue-number-input-spinner";

/**
 * Cart component
 */
import {
  getData,
  eventStepperCalculator,
  removeData,
  eventNextStep,
  persistData,
} from "../../../../../components/controllers/savingData";
import axios from "axios";
import commandesVue from "../../../restauration/commandes.vue";
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
    beautifyPrices(price) {
      price = price + "";
    },
    getSpName(id) {
      console.log("fddddddddddddddddddddddddddd");
      console.log(this.spNames.length);
      for (let i = 0; i < this.spNames.length; i++) {
        if (this.spNames.id == id) {
          return this.spNames.name;
        }
      }
    },
    async createEvent() {
      this.eventCreatorLoader = true;
      this.myEvent.status = [
        {
          name: "created",
          comment: "Événement créé par le client",
          date: new Date(),
        },
      ];

      let result = await axios.post(
        process.env.baseUrl + "/events",
        this.myEvent
      );
      removeData('event')
      this.$router.push("/clients/events/mes-evenements");
      console.log(result);
    },
  },

  async mounted() {
    this.myEvent = getData("event");
    this.nextPage = eventNextStep(false);
    this.stepperTotal = eventStepperCalculator();
    this.stepperText =
      ": Terminer | " + this.myEvent.whereIam + "/" + this.stepperTotal;
    this.title = this.title + this.stepperText;
    this.baseUrl = process.env.baseUrl;
    try {
      let result = await axios.get(this.baseUrl + "/generalsettingsdefaults");

      this.generalSettings = result.data;
    } catch (error) {}
    console.log(this.myEvent);
    for (let i = 0; i < this.myEvent.eventOrderDetails.length; i++) {
      switch (this.myEvent.eventOrderDetails[i].type) {
        case "place":
          this.placeNoServiceController = false;
          break;
        case "hosting":
          this.hostingNoServiceController = false;
          break;
        case "restauration":
          this.restaurationNoServiceController = false;
          break;
        case "tms":
          this.tmsNoServiceController = false;
          break;
        case "service":
          this.serviceNoServiceController = false;
          break;
      }
      for (
        let j = 0;
        j < this.myEvent.eventOrderDetails[i].articles.length;
        j++
      ) {
        if (this.myEvent.eventOrderDetails[i].articles[j].price < 0) {
          this.isEverythingPriced = false;
          break;
        }
      }
      this.subTotal =
        this.subTotal + this.myEvent.eventOrderDetails[i].subTotal;
    }

    this.tva = (this.subTotal * this.generalSettings.tva) / 100;
    this.total = this.subTotal + this.tva;
  },
  data() {
    return {
      title: "Planifier mon evenement ",
      nextPage: null,
      myEvent: null,
      myItems: null,
      eventCreatorLoader: false,
      stepperTotal: null,
      stepperText: null,
      subTotal: null,
      tva: null,
      total: null,
      isEverythingPriced: true,
      placeNoServiceController: true,
      hostingNoServiceController: true,
      restaurationNoServiceController: true,
      tmsNoServiceController: true,
      serviceNoServiceController: true,
      baseUrl: null,
      generalSettings: null,
      spNames: [],
      itemImages: [],
      items: [
        {
          text: "Planifier mon evenement ",
        },
        {
          text: "Terminer",
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
    <div class="row mt-3" v-if="myEvent">
      <div class="col-xl-8">
        <div v-if="myEvent.placeCheck">
          <h3 class="text-primary">
            <i class="uil-arrow-right"></i> Salle de conférence (ou lieu)
          </h3>
          <div class="card border shadow-none" v-if="placeNoServiceController">
            <div class="card-body">
              <center>
                <h6>Vous n'avez pas ajouté d'articles liés à ce service.</h6>
                <nuxt-link to="/clients/events/planifier-un-evenement/place">
                  <b-button size="sm" variant="outline-primary" class="my-2">
                    <i class="uil uil-arrow-left mr-1"></i> Choisir
                  </b-button>
                </nuxt-link>
              </center>
            </div>
          </div>
          <div v-for="(sp, index) in myEvent.eventOrderDetails" :key="index">
            <div v-if="sp.type == 'place'">
              <h5 class="mx-4 text-secondary">
                <i class="uil-corner-down-right"></i>
                {{ sp.eventServiceProviderName }}
              </h5>
              <div v-for="(article, index2) in sp.articles" :key="index2">
                <div class="card border shadow-none">
                  <div class="card-body">
                    <div
                      class="row mt-2"
                      :class="{
                        'border-bottom':
                          sp.articles.length > 1 &&
                          index2 < sp.articles.length - 1,
                      }"
                    >
                      <div class="col-xl-6 col-lg-6 align-self-center">
                        <h5 class="text-truncate font-size-16 px-4">
                          {{ article.name }}
                        </h5>
                      </div>
                      <div class="col-xl-6 col-lg-6">
                        <div class="row">
                          <div class="col-md-4">
                            <div class="mt-3">
                              <p class="text-muted mb-2">Price</p>
                              <h5 class="font-size-16" v-if="article.price > 0">
                                {{ article.price }}
                              </h5>
                              <h5
                                class="font-size-16 text-success"
                                v-if="article.price == 0"
                              >
                                Gratuit
                              </h5>
                              <h5
                                class="font-size-16 text-primary"
                                v-if="article.price < 0"
                              >
                                Sur devis
                              </h5>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mt-3">
                              <p class="text-muted mb-2">Quantity</p>
                              <h5 class="font-size-16">
                                {{ article.quantity }}
                              </h5>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mt-3">
                              <div v-if="article.price > 0">
                                <p class="text-muted mb-2">Total</p>
                                <h5 class="font-size-16">
                                  {{ article.subTotal }}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="myEvent.hostingCheck">
          <h3 class="text-primary">
            <i class="uil-arrow-right"></i> Hotel (ou hébergement)
          </h3>
          <div
            class="card border shadow-none"
            v-if="hostingNoServiceController"
          >
            <div class="card-body">
              <center>
                <h6>Vous n'avez pas ajouté d'articles liés à ce service.</h6>
                <nuxt-link to="/clients/events/planifier-un-evenement/hosting">
                  <b-button size="sm" variant="outline-primary" class="my-2">
                    <i class="uil uil-arrow-left mr-1"></i> Choisir
                  </b-button>
                </nuxt-link>
              </center>
            </div>
          </div>
          <div v-for="(sp, index) in myEvent.eventOrderDetails" :key="index">
            <div v-if="sp.type == 'hosting'">
              <h5 class="mx-4 text-secondary">
                <i class="uil-corner-down-right"></i>
                {{ sp.eventServiceProviderName }}
              </h5>
              <div v-for="(article, index2) in sp.articles" :key="index2">
                <div class="card border shadow-none">
                  <div class="card-body">
                    <div
                      class="row mt-2"
                      :class="{
                        'border-bottom':
                          sp.articles.length > 1 &&
                          index2 < sp.articles.length - 1,
                      }"
                    >
                      <div class="col-xl-6 col-lg-6 align-self-center">
                        <h5 class="text-truncate font-size-16 px-4">
                          {{ article.name }}
                        </h5>
                      </div>
                      <div class="col-xl-6 col-lg-6">
                        <div class="row">
                          <div class="col-md-4">
                            <div class="mt-3">
                              <p class="text-muted mb-2">Price</p>
                              <h5 class="font-size-16" v-if="article.price > 0">
                                {{
                                  Intl.NumberFormat("ar-MA", {
                                    style: "currency",
                                    currency: "MAD",
                                  }).format(article.price)
                                }}
                              </h5>
                              <h5
                                class="font-size-16 text-success"
                                v-if="article.price == 0"
                              >
                                Gratuit
                              </h5>
                              <h5
                                class="font-size-16 text-primary"
                                v-if="article.price < 0"
                              >
                                Sur devis
                              </h5>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mt-3">
                              <p class="text-muted mb-2">Quantity</p>
                              <h5 class="font-size-16">
                                {{ article.quantity }}
                              </h5>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mt-3">
                              <div v-if="article.price > 0">
                                <p class="text-muted mb-2">Total</p>
                                <h5 class="font-size-16">
                                  {{
                                    Intl.NumberFormat("ar-MA", {
                                      style: "currency",
                                      currency: "MAD",
                                    }).format(article.subTotal)
                                  }}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="myEvent.restaurationCheck">
          <h3 class="text-primary">
            <i class="uil-arrow-right"></i> Services de restauration
          </h3>
          <div
            class="card border shadow-none"
            v-if="restaurationNoServiceController"
          >
            <div class="card-body">
              <center>
                <h6>Vous n'avez pas ajouté d'articles liés à ce service.</h6>
                <nuxt-link
                  to="/clients/events/planifier-un-evenement/restauration"
                >
                  <b-button size="sm" variant="outline-primary" class="my-2">
                    <i class="uil uil-arrow-left mr-1"></i> Choisir
                  </b-button>
                </nuxt-link>
              </center>
            </div>
          </div>
          <div v-for="(sp, index) in myEvent.eventOrderDetails" :key="index">
            <div v-if="sp.type == 'restauration'">
              <h5 class="mx-4 text-secondary">
                <i class="uil-corner-down-right"></i>
                {{ sp.eventServiceProviderName }}
              </h5>
              <div v-for="(article, index2) in sp.articles" :key="index2">
                <div class="card border shadow-none">
                  <div class="card-body">
                    <div
                      class="row mt-2"
                      :class="{
                        'border-bottom':
                          sp.articles.length > 1 &&
                          index2 < sp.articles.length - 1,
                      }"
                    >
                      <div class="col-xl-6 col-lg-6 align-self-center">
                        <h5 class="text-truncate font-size-16 px-4">
                          {{ article.name }}
                        </h5>
                      </div>
                      <div class="col-xl-6 col-lg-6">
                        <div class="row">
                          <div class="col-md-4">
                            <div class="mt-3">
                              <p class="text-muted mb-2">Price</p>
                              <h5 class="font-size-16" v-if="article.price > 0">
                                {{
                                  Intl.NumberFormat("ar-MA", {
                                    style: "currency",
                                    currency: "MAD",
                                  }).format(article.price)
                                }}
                              </h5>
                              <h5
                                class="font-size-16 text-success"
                                v-if="article.price == 0"
                              >
                                Gratuit
                              </h5>
                              <h5
                                class="font-size-16 text-primary"
                                v-if="article.price < 0"
                              >
                                Sur devis
                              </h5>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mt-3">
                              <p class="text-muted mb-2">Quantity</p>
                              <h5 class="font-size-16">
                                {{ article.quantity }}
                              </h5>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mt-3">
                              <div v-if="article.price > 0">
                                <p class="text-muted mb-2">Total</p>
                                <h5 class="font-size-16">
                                  {{
                                    Intl.NumberFormat("ar-MA", {
                                      style: "currency",
                                      currency: "MAD",
                                    }).format(article.subTotal)
                                  }}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="myEvent">
          <h3 class="text-primary">
            <i class="uil-arrow-right"></i> Autre service
          </h3>
          <div
            class="card border shadow-none"
            v-if="serviceNoServiceController"
          >
            <div class="card-body">
              <center>
                <h6>Vous n'avez pas ajouté d'articles liés à ce service.</h6>
                <nuxt-link to="/clients/events/planifier-un-evenement/service">
                  <b-button size="sm" variant="outline-primary" class="my-2">
                    <i class="uil uil-arrow-left mr-1"></i> Choisir
                  </b-button>
                </nuxt-link>
              </center>
            </div>
          </div>
          <div v-for="(sp, index) in myEvent.eventOrderDetails" :key="index">
            <div v-if="sp.type == 'service'">
              <h5 class="mx-4 text-secondary">
                <i class="uil-corner-down-right"></i>
                {{ sp.eventServiceProviderName }}
              </h5>
              <div v-for="(article, index2) in sp.articles" :key="index2">
                <div class="card border shadow-none">
                  <div class="card-body">
                    <div
                      class="row mt-2"
                      :class="{
                        'border-bottom':
                          sp.articles.length > 1 &&
                          index2 < sp.articles.length - 1,
                      }"
                    >
                      <div class="col-xl-6 col-lg-6 align-self-center">
                        <h5 class="text-truncate font-size-16 px-4">
                          {{ article.name }}
                        </h5>
                      </div>
                      <div class="col-xl-6 col-lg-6">
                        <div class="row">
                          <div class="col-md-4">
                            <div class="mt-3">
                              <p class="text-muted mb-2">Price</p>
                              <h5 class="font-size-16" v-if="article.price > 0">
                                {{
                                  Intl.NumberFormat("ar-MA", {
                                    style: "currency",
                                    currency: "MAD",
                                  }).format(article.price)
                                }}
                              </h5>
                              <h5
                                class="font-size-16 text-success"
                                v-if="article.price == 0"
                              >
                                Gratuit
                              </h5>
                              <h5
                                class="font-size-16 text-primary"
                                v-if="article.price < 0"
                              >
                                Sur devis
                              </h5>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mt-3">
                              <p class="text-muted mb-2">Quantity</p>
                              <h5 class="font-size-16">
                                {{ article.quantity }}
                              </h5>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mt-3">
                              <div v-if="article.price > 0">
                                <p class="text-muted mb-2">Total</p>
                                <h5 class="font-size-16">
                                  {{
                                    Intl.NumberFormat("ar-MA", {
                                      style: "currency",
                                      currency: "MAD",
                                    }).format(article.subTotal)
                                  }}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end card -->

        <!-- end card -->

        <div class="row mt-4">
          <!-- end col -->
          <div class="col-sm-6">
            <div class="text-sm-right mt-2 mt-sm-0"></div>
          </div>
          <!-- end col -->
        </div>
        <!-- end row-->
      </div>

      <div class="col-xl-4" v-if="generalSettings">
        <div class="mt-5 mt-lg-0">
          <div class="card border shadow-none">
            <div class="card-header bg-transparent py-3 px-4">
              <h5 class="font-size-16 mb-0">
                Order Summary
                <span class="float-end">#MN0124</span>
              </h5>
            </div>
            <div class="card-body p-4" v-if="isEverythingPriced">
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
                          }).format(subTotal)
                        }}
                      </td>
                    </tr>
                    <!-- <tr>
                      <td>Discount :</td>
                      <td class="text-right">- $ 78</td>
                    </tr>
                    <tr>
                      <td>Shipping Charge :</td>
                      <td class="text-right">$ 25</td>
                    </tr> -->
                    <tr>
                      <td>TVA :</td>
                      <td class="text-right">
                        {{
                          Intl.NumberFormat("ar-MA", {
                            style: "currency",
                            currency: "MAD",
                          }).format(tva)
                        }}
                        ( {{ generalSettings.tva }}%)
                      </td>
                    </tr>
                    <tr class="bg-light">
                      <th>Total :</th>
                      <td class="text-right">
                        <span class="font-weight-bold">{{
                          Intl.NumberFormat("ar-MA", {
                            style: "currency",
                            currency: "MAD",
                          }).format(total)
                        }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- end table-responsive -->
            </div>
            <div v-if="!isEverythingPriced">
              <center class="p-5">
                <h4 class="text-primary">En attente de devis</h4>
                <h6 class="text-muted">
                  Certains articles de votre commande sont encore en attente
                  d'un devis du fournisseur, nous vous informerons lorsque le
                  devis global sera prêt.
                </h6>
              </center>
            </div>
            
            <center class="pb-5">
              <div class="btn btn-success" @click="createEvent">
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  v-if="eventCreatorLoader"
                ></span>
                <span v-if="!eventCreatorLoader">Créer mon événement</span> <span  v-if="eventCreatorLoader">Chargement...</span> <i class="uil uil-arrow-to-right mr-1"  v-if="!eventCreatorLoader"></i>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>
<style scoped>
.smallImageMargin {
  margin-right: 1rem;
}
</style>
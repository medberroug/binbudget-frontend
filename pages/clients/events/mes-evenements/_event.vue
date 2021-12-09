<script>
/**
 * Cart component
 */
import {
  getData,
  eventStepperCalculator,
  removeData,
  eventNextStep,
  persistData,
} from "../../../../components/controllers/savingData";
import axios from "axios";

export default {
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },

  methods: {
    beautifyPrices(price) {
      price = price + "";
    },
    async cancelMyEvent() {
      try {
        let newStatus = {
          name: "cancelled",
          comment:
            "L'événement a été annulé par le client: " +
            this.cancelEventComment,
          date: new Date(),
        };
        let reResult = await axios.get(
          process.env.baseUrl + "/events/" + this.myEvent.id
        );
        let myEventOrderDetails = reResult.data.eventOrderDetails;
        reResult = reResult.data.status;
        for (let i = 0; i < myEventOrderDetails.length; i++) {
          myEventOrderDetails[i].status.push(newStatus);
        }

        reResult.push(newStatus);

        let result = await axios.put(
          process.env.baseUrl + "/editEventStatus/" + this.myEvent.id,
          {
            status: reResult,
            eventOrderDetails: myEventOrderDetails,
          }
        );

        this.$router.push("/clients/events/archive/"+this.myEvent.id);
      } catch (error) {
        console.log(error);
      }
    },
  },

  async mounted() {
    this.baseUrl = process.env.baseUrl;
    try {
      let result = await axios.get(
        this.baseUrl + "/events/" + this.$route.params.event
      );

      this.myEvent = result.data;
    } catch (error) {}

    this.stepperText = ": Terminer | ";

    try {
      let result = await axios.get(this.baseUrl + "/generalsettingsdefaults");

      this.generalSettings = result.data;
      for (let i = 0; i < this.myEvent.eventOrderDetails.length; i++) {
        switch (this.myEvent.eventOrderDetails[i].type) {
          case "place":
            this.placeNoServiceController = true;
            break;
          case "hosting":
            this.hostingNoServiceController = true;
            break;
          case "restauration":
            this.restaurationNoServiceController = true;
            break;
          case "tms":
            this.tmsNoServiceController = true;
            break;
          case "service":
            this.serviceNoServiceController = true;
            break;
        }
        for (
          let k = 0;
          k < this.myEvent.eventOrderDetails[i].status.length;
          k++
        ) {
          if (
            this.myEvent.eventOrderDetails[i].status[k].name == "validated" ||
            this.myEvent.eventOrderDetails[i].status[k].name == "pending" ||
            this.myEvent.eventOrderDetails[i].status[k].name == "closed"
          ) {
            this.eventCanBeCancelled = false;
            break;
          }
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
      for (let k = 0; k < this.myEvent.status.length; k++) {
        if (
          this.myEvent.status[k].name == "validated" ||
          this.myEvent.status[k].name == "pending" ||
          this.myEvent.status[k].name == "closed" ||
          this.myEvent.status[k].name == "cancelled"
        ) {
          this.eventCanBeCancelled = false;
          break;
        }
      }
      this.tva = (this.subTotal * this.generalSettings.tva) / 100;
      this.total = this.subTotal + this.tva;
      this.myEvent.status = this.myEvent.status.reverse();
    } catch (error) {}
  },
  data() {
    return {
      title: "Planifier mon evenement ",
      myEvent: null,
      stepperText: null,
      subTotal: null,
      tva: null,
      total: null,
      cancelEventComment: null,
      eventCanBeCancelled: true,
      cancelModalShow: false,
      isEverythingPriced: true,
      placeNoServiceController: false,
      hostingNoServiceController: false,
      restaurationNoServiceController: false,
      tmsNoServiceController: false,
      serviceNoServiceController: false,
      baseUrl: null,
      generalSettings: null,
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
    <b-modal v-model="cancelModalShow" centered hide-footer>
      <template #modal-title> Annuler mon événement </template>
      <p>
        L'annulation de votre événement peut nécessiter une démarche spécifique
        auprès des fournisseurs et de BinBudget, l'annulation de votre événement
        à ce niveau peut ou non être effective immédiatement en fonction de
        l'état d'avancement.
      </p>
      <p>
        Notre service clientèle vous contactera bientôt pour finaliser la
        procédure d'annulation.
      </p>
      <textarea
        class="form-control"
        rows="5"
        required
        placeholder="Pourquoi voulez-vous annuler votre événement ? "
        v-model="cancelEventComment"
      >
      </textarea>
      <center>
        <b-button class="mt-3" block variant="primary" @click="cancelMyEvent">
          Soumettre</b-button
        >
      </center></b-modal
    >
    <!-- Modals are beyond  -->

    <PageHeader :title="title" :items="items" />
    <div class="row mt-3" v-if="myEvent">
      <div class="col-xl-8">
        <div v-if="placeNoServiceController">
          <h3 class="text-primary">
            <i class="uil-arrow-right"></i> Salle de conférence (ou lieu)
          </h3>

          <div v-for="(sp, index) in myEvent.eventOrderDetails" :key="index">
            <div v-if="sp.type == 'place'">
              <h5 class="mx-4 text-secondary">
                <i class="uil-corner-down-right"></i>
                {{ sp.eventServiceProviderName }}
                <span
                  class="badge badge-pill font-size-12"
                  :class="{
                    'bg-info':
                      sp.status[sp.status.length - 1].name == 'created' ||
                      sp.status[sp.status.length - 1].name == 'quoteSent',
                    'bg-warning':
                      sp.status[sp.status.length - 1].name == 'pendingQuote' ||
                      sp.status[sp.status.length - 1].name ==
                        'pendingValidation',
                    'bg-success':
                      sp.status[sp.status.length - 1].name == 'validated' ||
                      sp.status[sp.status.length - 1].name == 'pending',
                    'bg-secondary':
                      sp.status[sp.status.length - 1].name == 'closed',
                    'bg-danger':
                      sp.status[sp.status.length - 1].name == 'cancelled',
                  }"
                >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'created'"
                  >
                    Créé</span
                  >
                  <span
                    v-if="
                      sp.status[sp.status.length - 1].name == 'pendingQuote'
                    "
                  >
                    En attente de devis</span
                  >
                  <span
                    v-if="
                      sp.status[sp.status.length - 1].name ==
                      'pendingValidation'
                    "
                  >
                    En cours de validation</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'quoteSent'"
                  >
                    Devis envoyé</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'validated'"
                  >
                    Validé</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'pending'"
                  >
                    En cours</span
                  >
                  <span v-if="sp.status[sp.status.length - 1].name == 'closed'">
                    Clôturé</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'cancelled'"
                  >
                    Annulé</span
                  >
                </span>
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
                              <h5
                                class="font-size-16"
                                v-if="article.price > 0 && article.discount"
                              >
                                {{
                                  article.price -
                                  (article.price * article.discount) / 100
                                }}
                                <span class="font-size-10 text-danger"
                                  >(-{{ article.discount }}%)</span
                                >
                              </h5>
                              <h5
                                class="font-size-16"
                                v-if="article.price > 0 && !article.discount"
                              >
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

        <div v-if="hostingNoServiceController">
          <h3 class="text-primary">
            <i class="uil-arrow-right"></i> Hotel (ou hébergement)
          </h3>

          <div v-for="(sp, index) in myEvent.eventOrderDetails" :key="index">
            <div v-if="sp.type == 'hosting'">
              <h5 class="mx-4 text-secondary">
                <i class="uil-corner-down-right"></i>
                {{ sp.eventServiceProviderName }}
                <span
                  class="badge badge-pill font-size-12"
                  :class="{
                    'bg-info':
                      sp.status[sp.status.length - 1].name == 'created' ||
                      sp.status[sp.status.length - 1].name == 'quoteSent',
                    'bg-warning':
                      sp.status[sp.status.length - 1].name == 'pendingQuote' ||
                      sp.status[sp.status.length - 1].name ==
                        'pendingValidation',
                    'bg-success':
                      sp.status[sp.status.length - 1].name == 'validated' ||
                      sp.status[sp.status.length - 1].name == 'pending',
                    'bg-secondary':
                      sp.status[sp.status.length - 1].name == 'closed',
                    'bg-danger':
                      sp.status[sp.status.length - 1].name == 'cancelled',
                  }"
                >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'created'"
                  >
                    Créé</span
                  >
                  <span
                    v-if="
                      sp.status[sp.status.length - 1].name == 'pendingQuote'
                    "
                  >
                    En attente de devis</span
                  >
                  <span
                    v-if="
                      sp.status[sp.status.length - 1].name ==
                      'pendingValidation'
                    "
                  >
                    En cours de validation</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'quoteSent'"
                  >
                    Devis envoyé</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'validated'"
                  >
                    Validé</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'pending'"
                  >
                    En cours</span
                  >
                  <span v-if="sp.status[sp.status.length - 1].name == 'closed'">
                    Clôturé</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'cancelled'"
                  >
                    Annulé</span
                  >
                </span>
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
                              <h5
                                class="font-size-16"
                                v-if="article.price > 0 && article.discount"
                              >
                                {{
                                  article.price -
                                  (article.price * article.discount) / 100
                                }}
                                <span class="font-size-10 text-danger"
                                  >(-{{ article.discount }}%)</span
                                >
                              </h5>
                              <h5
                                class="font-size-16"
                                v-if="article.price > 0 && !article.discount"
                              >
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

        <div v-if="restaurationNoServiceController">
          <h3 class="text-primary">
            <i class="uil-arrow-right"></i> Services de restauration
          </h3>

          <div v-for="(sp, index) in myEvent.eventOrderDetails" :key="index">
            <div v-if="sp.type == 'restauration'">
              <h5 class="mx-4 text-secondary">
                <i class="uil-corner-down-right"></i>
                {{ sp.eventServiceProviderName }}
                <span
                  class="badge badge-pill font-size-12"
                  :class="{
                    'bg-info':
                      sp.status[sp.status.length - 1].name == 'created' ||
                      sp.status[sp.status.length - 1].name == 'quoteSent',
                    'bg-warning':
                      sp.status[sp.status.length - 1].name == 'pendingQuote' ||
                      sp.status[sp.status.length - 1].name ==
                        'pendingValidation',
                    'bg-success':
                      sp.status[sp.status.length - 1].name == 'validated' ||
                      sp.status[sp.status.length - 1].name == 'pending',
                    'bg-secondary':
                      sp.status[sp.status.length - 1].name == 'closed',
                    'bg-danger':
                      sp.status[sp.status.length - 1].name == 'cancelled',
                  }"
                >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'created'"
                  >
                    Créé</span
                  >
                  <span
                    v-if="
                      sp.status[sp.status.length - 1].name == 'pendingQuote'
                    "
                  >
                    En attente de devis</span
                  >
                  <span
                    v-if="
                      sp.status[sp.status.length - 1].name ==
                      'pendingValidation'
                    "
                  >
                    En cours de validation</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'quoteSent'"
                  >
                    Devis envoyé</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'validated'"
                  >
                    Validé</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'pending'"
                  >
                    En cours</span
                  >
                  <span v-if="sp.status[sp.status.length - 1].name == 'closed'">
                    Clôturé</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'cancelled'"
                  >
                    Annulé</span
                  >
                </span>
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
                              <h5
                                class="font-size-16"
                                v-if="article.price > 0 && article.discount"
                              >
                                {{
                                  article.price -
                                  (article.price * article.discount) / 100
                                }}
                                <span class="font-size-10 text-danger"
                                  >(-{{ article.discount }}%)</span
                                >
                              </h5>
                              <h5
                                class="font-size-16"
                                v-if="article.price > 0 && !article.discount"
                              >
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

        <div v-if="serviceNoServiceController">
          <h3 class="text-primary">
            <i class="uil-arrow-right"></i> Autre service
          </h3>

          <div v-for="(sp, index) in myEvent.eventOrderDetails" :key="index">
            <div v-if="sp.type == 'service'">
              <h5 class="mx-4 text-secondary">
                <i class="uil-corner-down-right"></i>
                {{ sp.eventServiceProviderName }}
                <span
                  class="badge badge-pill font-size-12"
                  :class="{
                    'bg-info':
                      sp.status[sp.status.length - 1].name == 'created' ||
                      sp.status[sp.status.length - 1].name == 'quoteSent',
                    'bg-warning':
                      sp.status[sp.status.length - 1].name == 'pendingQuote' ||
                      sp.status[sp.status.length - 1].name ==
                        'pendingValidation',
                    'bg-success':
                      sp.status[sp.status.length - 1].name == 'validated' ||
                      sp.status[sp.status.length - 1].name == 'pending',
                    'bg-secondary':
                      sp.status[sp.status.length - 1].name == 'closed',
                    'bg-danger':
                      sp.status[sp.status.length - 1].name == 'cancelled',
                  }"
                >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'created'"
                  >
                    Créé</span
                  >
                  <span
                    v-if="
                      sp.status[sp.status.length - 1].name == 'pendingQuote'
                    "
                  >
                    En attente de devis</span
                  >
                  <span
                    v-if="
                      sp.status[sp.status.length - 1].name ==
                      'pendingValidation'
                    "
                  >
                    En cours de validation</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'quoteSent'"
                  >
                    Devis envoyé</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'validated'"
                  >
                    Validé</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'pending'"
                  >
                    En cours</span
                  >
                  <span v-if="sp.status[sp.status.length - 1].name == 'closed'">
                    Clôturé</span
                  >
                  <span
                    v-if="sp.status[sp.status.length - 1].name == 'cancelled'"
                  >
                    Annulé</span
                  >
                </span>
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
                              <h5
                                class="font-size-16"
                                v-if="article.price > 0 && article.discount"
                              >
                                {{
                                  article.price -
                                  (article.price * article.discount) / 100
                                }}
                                <span class="font-size-10 text-danger"
                                  >(-{{ article.discount }}%)</span
                                >
                              </h5>
                              <h5
                                class="font-size-16"
                                v-if="article.price > 0 && !article.discount"
                              >
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
                <span class="float-end text-muted"></span>
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
          </div>
        </div>

        <ActivityEvent :status="myEvent.status" />
        <div class="float-end">
          <button
            type="button"
            class="btn btn-outline-danger btn-sm"
            @click="cancelModalShow = !cancelModalShow"
            v-if="eventCanBeCancelled"
          >
            Annuler mon événement <i class="uil-trash-alt"></i>
          </button>
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
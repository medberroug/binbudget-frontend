<script>
import axios from "axios";
import { format, parseISO } from "date-fns";
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
    async updateStatus(value) {
      let myAccount = getData("accountinfo");
      let myComment = "Aucun commentaire";
      if (value == "pendingValidation")
        myComment = "Votre commande a été validée par le fournisseur";
      try {
        if (value == "validate") {
          let result = await axios.put(
            process.env.baseUrl +
              "/updateEventOrderDetail/" +
              myAccount.id +
              "/" +
              this.$route.params.order.split("++")[0] +
              "/" +
              this.$route.params.order.split("++")[1],
            {
              action: "validate",
            }
          );
          console.log(result.data);
          let result2 = await axios.put(
            process.env.baseUrl + "/events/" + result.data.id,
            result.data
          );
        }
        if (value == "close") {
          let result = await axios.put(
            process.env.baseUrl +
              "/updateEventOrderDetail/" +
              myAccount.id +
              "/" +
              this.$route.params.order.split("++")[0] +
              "/" +
              this.$route.params.order.split("++")[1],
            {
              action: "close",
            }
          );
          console.log(result.data);
          let result2 = await axios.put(
            process.env.baseUrl + "/events/" + result.data.id,
            result.data
          );
        }

        this.$router.go();
      } catch (error) {
        console.log(error);
      }
    },
    async sendQuote() {
      let myAccount = getData("accountinfo");

      try {
        for (let i = 0; i < this.myOrder.items.length; i++) {
          if (this.myOrder.items[i].price < 0) {
            this.showNegativeIssue = true;
            return false;
          }
        }
        let result = await axios.put(
          process.env.baseUrl +
            "/updateEventOrderDetail/" +
            myAccount.id +
            "/" +
            this.$route.params.order.split("++")[0] +
            "/" +
            this.$route.params.order.split("++")[1],
          {
            action: "quote",
            items: this.myOrder.items,
          }
        );
        console.log(result.data);
        let result2 = await axios.put(
          process.env.baseUrl + "/events/" + result.data.id,
          result.data
        );

        this.$router.go();
      } catch (error) {
        console.log(error);
      }
    },
    async cancelOrder() {
      this.cancelModalShow = true;
      try {
        if (!this.cancelOrderComment) {
          this.cancelOrderComment = "Aucun commentaire";
        }
        let newStatus = {
          name: "cancelled",
          comment:
            "La commande a été annulé par le fournisseur: " +
            this.cancelOrderComment,
          date: new Date(),
        };
        let reResult = await axios.get(
          process.env.baseUrl + "/orders/" + this.myOrder.id
        );

        reResult = reResult.data.status;

        reResult.push(newStatus);

        let result = await axios.put(
          process.env.baseUrl + "/cancelMyOrder/" + this.myOrder.id,
          {
            status: reResult,
          }
        );

        this.$router.push("/supplierevent/orders/archive/" + this.myOrder.id);
      } catch (error) {
        console.log(error);
      }
    },
    formatMyDate(date) {
      // return date
      return format(parseISO(date), "dd/MM/yyyy, HH:MM");
    },
  },
  async mounted() {
    try {
      let myAccount = getData("accountinfo");
      let result = await axios.get(
        process.env.baseUrl +
          "/getEventOrderOne/" +
          myAccount.id +
          "/" +
          this.$route.params.order.split("++")[0] +
          "/" +
          this.$route.params.order.split("++")[1]
      );
      let result2 = await axios.get(
        process.env.baseUrl + "/clients/" + result.data.byClient
      );
      this.client = result2.data;
      //  this.$route.params.order
      //   result.data.when=formatMyDate( result.data.when)

      this.myOrder = result.data;
      this.myOrder.when = this.formatMyDate(this.myOrder.when);
    } catch (error) {}
    for (let i = 0; i < this.myOrder.items.length; i++) {
      if (this.myOrder.items[i].price < 0) {
        this.isOrderSurDevis = true;
        this.isCODPossible = false;
        this.ItemsQuote.push(this.myOrder.items[i]);
      }
    }
    if (this.myOrder.total >= 20000) {
      this.isCODPossible = false;
    }
    this.myOrder.startDate = this.formatMyDate(this.myOrder.startDate);
    this.myOrder.endDate = this.formatMyDate(this.myOrder.endDate);
    this.myOrder.status = this.myOrder.status.reverse();
    console.log(this.myOrder);
  },
  data() {
    return {
      myOrder: null,
      isCODPossible: true,
      isOrderSurDevis: false,
      cancelOrderComment: null,
      paimentMode: "invoice",
      title: "Commander",
      ItemsQuote: [],
      checkValues: false,
      cancelModalShow: false,
      quoteModalShow: false,
      items: [],
      showNegativeIssue: false,
      client: null,
    };
  },
  middleware: "authentication",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <b-modal v-model="cancelModalShow" centered hide-footer>
      <template #modal-title> Refuser la commande </template>
      <p>
        Veuillez indiquer ci-dessous la raison pour laquelle vous refusez cette
        commande. N'oubliez pas que le refus de plusieurs commandes mettra votre
        compte en suspens.
      </p>
      <p>
        Notre service clientèle vous contactera bientôt pour finaliser la
        procédure d'annulation.
      </p>
      <textarea
        class="form-control"
        rows="5"
        required
        placeholder="Pourquoi voulez-vous refuser cette commande ? "
        v-model="cancelOrderComment"
      >
      </textarea>
      <center>
        <b-button class="mt-3" block variant="primary" @click="cancelOrder">
          Soumettre</b-button
        >
      </center></b-modal
    >
    <!-- PROPOSER UN DEVIS MODAL -->
    <b-modal v-model="quoteModalShow" centered hide-footer v-if="myOrder">
      <template #modal-title> Proposer un devis pour le client </template>
      <b-alert variant="danger" show v-if="showNegativeIssue">
        Avant d'envoyer le devis au client, veuillez vous assurer que tous les
        articles ont un prix positif.
      </b-alert>
      <p>
        Indiquez ci-dessous un devis précis, votre devis sera envoyé au client,
        si ce dernier valide le devis cela signifie que votre commande sera
        automatiquement validée.
      </p>
      <!-- myOrder.items -->
      <!-- <b-form-input v-model="discountVariable" type="number"></b-form-input> -->
      <div class="row" v-for="(item, index) in ItemsQuote" :key="index">
        <label for="productname"
          >{{ item.name }} (prix x quantité = sous total)</label
        >
        <div class="col-4">
          <b-form-input
   
            v-model="item.price"
            type="number"
          ></b-form-input>
         
        </div>

        <div class="col-1 align-self-center">
          <label for="productname"></label>
          X
        </div>
        <div class="col-3 align-self-center">
          <b>
            <center>{{ item.quantity }}</center></b
          >
        </div>
        <div class="col-1 align-self-center">
          <label for="productname"></label>
          =
        </div>
        <div
          class="col-3 align-self-center"
          v-if="item.price > -1"
        >
          <label for="productname"></label>
          {{
            Intl.NumberFormat("fr-MA", {
              style: "currency",
              currency: "MAD",
            }).format(
              item.quantity * item.price
            )
          }}
        </div>
        <div
          class="col-3 align-self-center"
          v-if="item.price <= -1"
        >
          <label for="productname"> </label>
          <span class="text-danger"><b>Prix négatif !</b></span>
        </div>
      </div>

      <center>
        <b-button class="mt-3" block variant="primary" @click="sendQuote">
          Soumettre</b-button
        >
      </center></b-modal
    >

    <div class="mt-3" v-if="myOrder">
      <div class="row">
        <div class="col">
          <nuxt-link to="/supplierevent/orders/active"
            ><button type="button" class="btn btn-primary btn-sm mb-3">
              <i class="mdi mdi-arrow-left me-1"></i> liste des commandes
            </button></nuxt-link
          >
        </div>
        <div class="col">
          <button
            type="button"
            class="btn btn-primary btn-sm mb-3 float-end"
            v-if="myOrder.status[0].name == 'pendingQuote'"
            @click="quoteModalShow = !quoteModalShow"
          >
            Proposer un devis <i class="uil uil-money-bill me-1"></i>
          </button>
          <button
            @click="updateStatus('validate')"
            type="button"
            class="btn btn-success btn-sm mb-3 mx-3 float-end"
            v-if="myOrder.status[0].name == 'pendingValidation'"
          >
            Valider <i class="mdi uil-check me-1"></i>
          </button>
          <button
            @click="updateStatus('close')"
            type="button"
            class="btn btn-success btn-sm mb-3 mx-3 float-end"
            v-if="myOrder.status[0].name == 'pending'"
          >
            Terminer <i class="mdi uil-check me-1"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="row mt-1" v-if="myOrder">
      <div class="col-xl-8">
        <div class="custom-accordion">
          <div class="card">
            <a
              href="javascript: void(0);"
              class="text-dark"
              data-toggle="collapse"
              aria-expanded="true"
              aria-controls="addproduct-billinginfo-collapse"
              v-b-toggle.accordion-1
            >
              <div class="p-4">
                <div class="media align-items-center">
                  <div class="me-3">
                    <div class="avatar-xs">
                      <div
                        class="
                          avatar-title
                          rounded-circle
                          bg-soft-primary
                          text-primary
                        "
                      >
                        01
                      </div>
                    </div>
                  </div>
                  <div class="media-body overflow-hidden">
                    <h5 class="font-size-16 mb-1">Détails de l'événement</h5>
                    <p class="text-muted text-truncate mb-0">
                      vous trouverez ci-dessous des informations sur l'événement
                      telles que communiquées par le client, à lire
                      attentivement.
                    </p>
                  </div>
                  <i
                    class="mdi mdi-chevron-up accor-down-icon font-size-24"
                  ></i>
                </div>
              </div>
            </a>

            <b-collapse
              data-parent="#addproduct-accordion"
              id="accordion-1"
              visible
              accordion="my-accordion"
            >
              <div class="p-4 border-top">
                <form>
                  <div class="row">
                    <div class="col-lg-7">
                      <div class="mb-3">
                        <label for="price">Nom de l'évènement</label>
                        <input
                          id="price"
                          name="price"
                          type="text"
                          v-model="myOrder.name"
                          disabled
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col-lg-5">
                      <div class="mb-3">
                        <label for="price">Client</label>
                        <input
                          id="price"
                          name="price"
                          type="text"
                          v-model="client.companyDetails.knowenName"
                          disabled
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="manufacturername"
                          >Ville de l'événement</label
                        >
                        <input
                          id="price"
                          name="price"
                          type="text"
                          v-model="myOrder.city"
                          disabled
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="manufacturerbrand">Date de début</label>
                        <b-form-input
                          id="date-time"
                          v-model="myOrder.startDate"
                          value=""
                          type="text"
                          disabled
                        ></b-form-input>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="manufacturerbrand">Jusqu'à</label>
                        <b-form-input
                          id="date-time"
                          v-model="myOrder.endDate"
                          disabled
                          type="text"
                        ></b-form-input>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="price">Nombre de participants</label>
                        <input
                          id="price"
                          name="price"
                          type="number"
                          disabled
                          v-model="myOrder.numberOfAttendees"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="productdesc">Description ou commentaire</label>
                    <textarea
                      class="form-control"
                      disabled
                      v-model="myOrder.description"
                      id="productdesc"
                      rows="4"
                    ></textarea>
                  </div>
                </form>
              </div>
            </b-collapse>
          </div>

          <div class="card" v-if="myOrder.withDelivery != null">
            <a
              href="javascript: void(0);"
              class="text-dark"
              data-toggle="collapse"
              v-b-toggle.checkout-billinginfo-collapse
            >
              <div class="p-4">
                <div class="media align-items-center">
                  <div class="me-3">
                    <i class="uil uil-receipt text-primary h2"></i>
                  </div>
                  <div class="media-body overflow-hidden">
                    <h5 class="font-size-16 mb-1">Informations de livraison</h5>
                    <p class="text-muted text-truncate mb-0">
                      Vos informations de livraison
                    </p>
                  </div>
                  <i
                    class="mdi mdi-chevron-up accor-down-icon font-size-24"
                  ></i>
                </div>
              </div>
            </a>

            <b-collapse id="checkout-billinginfo-collapse" visible>
              <div class="p-4 border-top">
                <form>
                  <div>
                    <div class="row">
                      <div class="col-lg-3">
                        <div class="form-group mb-4">
                          <label for="billing-name">Nom</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled
                            id="billing-name"
                            placeholder="Entrez le nom"
                            v-model="myOrder.withDelivery.fullName"
                          />
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="form-group mb-4">
                          <label for="billing-email-address">Ville</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled
                            id="billing-email-address"
                            placeholder="Ville."
                            v-model="myOrder.withDelivery.city"
                          />
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="form-group mb-4">
                          <label for="billing-phone">Téléphone</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled
                            id="billing-phone"
                            placeholder="Entrez le numéro de téléphone."
                            v-model="myOrder.withDelivery.phone"
                          />
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="form-group mb-4">
                          <label for="billing-phone">Prévu à</label>

                          <input
                            type="text"
                            class="form-control"
                            disabled
                            id="billing-phone"
                            placeholder="Entrez le numéro de téléphone."
                            v-model="myOrder.when"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="form-group mb-4">
                      <label for="billing-address">Address</label>
                      <textarea
                        class="form-control"
                        disabled
                        id="billing-address"
                        rows="3"
                        placeholder="Entrez l'adresse complète"
                        v-model="myOrder.withDelivery.street"
                      ></textarea>
                    </div>

                    <div class="row"></div>
                  </div>
                </form>
              </div>
            </b-collapse>
          </div>

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
                    <h5 class="font-size-16 mb-1">Modalités de paiement</h5>
                    <p class="text-muted text-truncate mb-0">
                      Les renseignements concernant le paiement.
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
                    <div
                      class="col-lg-3 col-sm-6"
                      v-if="myOrder.paimentMode.type == 'invoice'"
                    >
                      <div data-toggle="collapse">
                        <label class="card-radio-label">
                          <input
                            type="radio"
                            name="pay-method"
                            id="pay-methodoption1"
                            class="card-radio-input"
                            checked
                          />

                          <span class="card-radio text-center text-truncate">
                            <i class="uil uil-postcard d-block h2 mb-3"></i>
                            Sur facture
                          </span>
                        </label>
                      </div>
                    </div>

                    <div
                      class="col-lg-3 col-sm-6"
                      v-if="myOrder.paimentMode.type == 'cod'"
                    >
                      <div v-if="isCODPossible && !isOrderSurDevis">
                        <label class="card-radio-label">
                          <input
                            type="radio"
                            name="pay-method"
                            id="pay-methodoption3"
                            class="card-radio-input"
                          />
                          <span class="card-radio text-center text-truncate">
                            <i class="uil uil-money-bill d-block h2 mb-3"></i>
                            <span>Paiement à la livraison</span>
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
                Synthèse de la commande
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
                      <p class="text-muted mb-0" v-if="item.price >= 0">
                        {{
                          Intl.NumberFormat("fr-MA", {
                            style: "currency",
                            currency: "MAD",
                          }).format(item.price)
                        }}
                        x {{ item.quantity }}
                      </p>
                      <p class="text-muted mb-0" v-if="item.price < 0">
                        ? x {{ item.quantity }}
                      </p>
                    </td>
                    <td v-if="item.price >= 0">
                      {{
                        Intl.NumberFormat("fr-MA", {
                          style: "currency",
                          currency: "MAD",
                        }).format(item.price * item.quantity)
                      }}
                    </td>
                    <td v-if="item.price < 0">?</td>
                  </tr>

                  <tr>
                    <td colspan="2">
                      <h5 class="font-size-14 m-0">Frais de livraison :</h5>
                    </td>
                    <td>
                      {{
                        Intl.NumberFormat("fr-MA", {
                          style: "currency",
                          currency: "MAD",
                        }).format(myOrder.deliveryPrice)
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <h5 class="font-size-14 m-0">Montant HT :</h5>
                    </td>
                    <td>
                      {{
                        Intl.NumberFormat("fr-MA", {
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
                        Intl.NumberFormat("fr-MA", {
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
                        Intl.NumberFormat("fr-MA", {
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
          <ActivityEvent :status="myOrder.status" />
          <!-- end col -->
          <div
            class="col-sm-12"
            v-if="
              myOrder.status[0].name != 'pending' &&
              myOrder.status[0].name != 'validated'
            "
          >
            <div class="text-sm-right mt-2 mt-sm-0 float-end">
              <span
                @click="cancelModalShow = !cancelModalShow"
                class="btn btn-sm btn-outline-danger"
              >
                Rejeter la commande <i class="uil uil-trash mr-1"></i>
              </span>
            </div>
          </div>
          <!-- end col -->
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>

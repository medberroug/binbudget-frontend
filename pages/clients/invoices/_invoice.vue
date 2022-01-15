<script>
/**
 * Invoice Detail component
 */
import { format, parseISO } from "date-fns";
import axios from "axios";
export default {
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  async mounted() {
    try {
      let result = await axios.get(
        process.env.baseUrl + "/invoices/" + this.$route.params.invoice
      );
      this.myInvoice = result.data;
      let resultForPaymentsMethods = await axios.get(
        process.env.baseUrl + "/generalsettingsdefaults"
      );
      this.resultForPaymentsMethods =
        resultForPaymentsMethods.data.paimentMethodsInstructions;
    } catch (error) {}
  },
  methods: {
    formatMyDate(date) {
      // return date
      return format(parseISO(date), "yyyy-MM-dd");
    },
    getMyInstructions(method) {
      for (let i = 0; i < this.resultForPaymentsMethods.length; i++) {
        if (this.resultForPaymentsMethods[i].method == method) {
          return this.resultForPaymentsMethods[i].instructions;
        }
      }
    },
    paymentNextStep() {},
    async editInvoice(action) {
      if (action == "validate") {
        this.myInvoice.status.push({
          name: "validated",
          comment: "La facture a été validée par le client",
          date: new Date(),
        });
        let result = await axios.put(
          process.env.baseUrl + "/invoices/" + this.myInvoice.id,
          {
            status: this.myInvoice.status,
          }
        );
      }

      this.$router.go();
    },
  },
  data() {
    return {
      myInvoice: null,
      title: "Détails de la facture",
      items: [
        {
          text: "factures",
        },
        {
          text: "Détails de la facture",
          active: true,
        },
      ],
      payModal: false,
      newPaymentStep: 1,
      resultForPaymentsMethods: null,
      newPayment: {
        amount: null,
        date: new Date(),
        image: null,
        method: null,
        invoiceId: null,
        status: [
          {
            name: "created",
            comment: "Paiement initié par le client, en attente de validation.",
            date: new Date(),
          },
        ],
      },
    };
  },
  middleware: "authentication",
};
</script>

<template>
  <div>
    <b-modal
      v-model="payModal"
      centered
      hide-footer
      v-if="myInvoice && resultForPaymentsMethods"
    >
      <template #modal-title> Payer ma facture </template>
      <b-alert>dddddddd</b-alert>
      <div v-if="newPaymentStep == 1">
        <p>
          Vous initiez un paiement pour la facture numéro
          <b>{{ myInvoice.invoiceNumber }}</b
          >, le règlement apparaîtra automatiquement sur votre compte après
          validation.
        </p>

        <label for="input-live"> Choisissez votre mode de paiement:</label>
        <select class="form-control select2" v-model="newPayment.method">
          <option value="bankTransfer">Virement bancaire</option>
          <option value="cheque">Chèque bancaire</option>
          <option value="promoCode">Code promo</option>
        </select>
        <label for="input-live" class="mt-3"
          >Montant à verser (total: {{ myInvoice.total }} dh<span
            v-if="
              newPayment.amount &&
              newPayment.amount > 0 &&
              newPayment.amount <= myInvoice.total
            "
          >
            |
            {{
              ((newPayment.amount / myInvoice.total) * 100).toFixed(2)
            }}%</span
          >
          <span v-if="newPayment.amount > myInvoice.total" class="text-danger"
            >Le montant inséré dépasse le total de la facture</span
          >
          ):
        </label>

        <b-form-input v-model="newPayment.amount" type="number"></b-form-input>
      </div>
      <div v-if="newPaymentStep == 2">
        <p>{{ getMyInstructions(newPayment.method) }}</p>
      </div>
      <center>
        <b-button
          class="mt-3"
          block
          variant="primary"
          v-if="newPaymentStep == 3"
        >
          Soumettre</b-button
        >
        <b-button
          class="mt-3"
          block
          variant="primary"
          v-if="newPaymentStep == 1"
          @click="
            newPayment.amount > 0 &&
            newPayment.amount <= myInvoice.total &&
            newPayment.method
              ? (newPaymentStep = newPaymentStep + 1)
              : (newPaymentStep = newPaymentStep)
          "
        >
          Instructions de paiement <i class="mdi mdi-arrow-right me-1"></i
        ></b-button></center
    ></b-modal>
    <PageHeader :title="title" :items="items" />

    <div class="col-sm-12 col-md-12 mt-4" v-if="myInvoice">
      <div class="classname">
        <nuxt-link to="/clients/invoices"
          ><button type="button" class="btn btn-primary btn-sm">
            <i class="mdi mdi-arrow-left me-1"></i> liste des factures
          </button></nuxt-link
        >
        <button
          type="button"
          class="btn btn-success btn-sm float-end mx-1"
          v-if="myInvoice.status[myInvoice.status.length - 1].name == 'created'"
          @click="editInvoice('validate')"
        >
          Valider <i class="mdi mdi-check me-1"></i>
        </button>
        <button
          type="button"
          @click="payModal = !payModal"
          class="btn btn-success btn-sm float-end mx-1"
          v-if="
            myInvoice.status[myInvoice.status.length - 1].name != 'closed' &&
            myInvoice.status[myInvoice.status.length - 1].name != 'payed' &&
            myInvoice.status[myInvoice.status.length - 1].name != 'created' &&
            myInvoice.status[myInvoice.status.length - 1].name != 'cancelled'
          "
        >
          Payer <i class="uil uil-bill me-1"></i>
        </button>
        <button
          type="button"
          class="btn btn-primary btn-sm float-end mx-1"
          v-if="myInvoice.status[myInvoice.status.length - 1].name == 'created'"
        >
          Séparé <i class="uil uil-arrows-h-alt me-1"></i>
        </button>
      </div>
    </div>

    <div class="row mt-4" v-if="myInvoice">
      <div class="col-lg-12">
        <div class="card shadow-none">
          <div class="card-body">
            <div class="invoice-title">
              <h4
                class="float-end font-size-20"
                v-if="
                  myInvoice.status[myInvoice.status.length - 1].name !=
                    'created' &&
                  myInvoice.status[myInvoice.status.length - 1].name !=
                    'cancelled'
                "
              >
                <p>Facture de vente</p>
                N° {{ myInvoice.invoiceNumber }}
                <!-- <span class="badge badge-success font-size-12 ml-2">Paid</span> -->
              </h4>
              <div class="mb-4">
                <img
                  src="~/assets/images/logo-large.png"
                  alt="logo"
                  height="50"
                />
              </div>
              <div class="text-muted">
                <h6 class="mb-1 font-size-16 font-weight-600">
                  {{ myInvoice.fromAddress.legalName }}
                </h6>
                <p class="mb-1">{{ myInvoice.fromAddress.street }}</p>
                <p class="mb-1">
                  {{ myInvoice.fromAddress.city }},
                  {{ myInvoice.fromAddress.country }}
                </p>
              </div>
            </div>

            <hr class="my-4" />

            <div class="row mb-4">
              <div class="col-sm-6">
                <div class="text-muted">
                  <h5 class="font-size-16 mb-3">Facturé à:</h5>
                  <h5 class="font-size-15 mb-2">
                    {{ myInvoice.toAddress.legalName }}
                  </h5>
                  <p class="mb-1">{{ myInvoice.toAddress.street }}</p>
                  <p class="mb-1">
                    {{ myInvoice.toAddress.city }},
                    {{ myInvoice.toAddress.country }}
                  </p>
                  <p class="mb-1">ICE: {{ myInvoice.toAddress.ICE }}</p>
                  <h5 class="font-size-16 my-3">Statut:</h5>
                  <div
                    class="badge badge-pill font-size-12"
                    :class="{
                      'bg-info':
                        myInvoice.status[myInvoice.status.length - 1].name ===
                          'created' ||
                        myInvoice.status[myInvoice.status.length - 1].name ===
                          'validated',
                      'bg-warning':
                        myInvoice.status[myInvoice.status.length - 1].name ===
                        'pseudoPaid',
                      'bg-success':
                        myInvoice.status[myInvoice.status.length - 1].name ===
                        'payed',
                      'bg-secondary':
                        myInvoice.status[myInvoice.status.length - 1].name ===
                          'cancelled' ||
                        myInvoice.status[myInvoice.status.length - 1].name ===
                          'closed',
                      'bg-danger':
                        myInvoice.status[myInvoice.status.length - 1].name ===
                        'overDueDate',
                    }"
                  >
                    <span
                      v-if="
                        myInvoice.status[myInvoice.status.length - 1].name ==
                        'created'
                      "
                    >
                      Créé</span
                    >

                    <span
                      v-if="
                        myInvoice.status[myInvoice.status.length - 1].name ==
                        'overDueDate'
                      "
                    >
                      Expiration du délai</span
                    >
                    <span
                      v-if="
                        myInvoice.status[myInvoice.status.length - 1].name ==
                        'pseudoPaid'
                      "
                    >
                      Partiellement payé
                    </span>
                    <span
                      v-if="
                        myInvoice.status[myInvoice.status.length - 1].name ==
                        'validated'
                      "
                    >
                      Validé</span
                    >
                    <span
                      v-if="
                        myInvoice.status[myInvoice.status.length - 1].name ==
                        'paid'
                      "
                    >
                      Payé</span
                    >
                    <span
                      v-if="
                        myInvoice.status[myInvoice.status.length - 1].name ==
                        'closed'
                      "
                    >
                      Clôturé</span
                    >
                    <span
                      v-if="
                        myInvoice.status[myInvoice.status.length - 1].name ==
                        'cancelled'
                      "
                    >
                      Annulé</span
                    >
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="text-muted text-sm-right">
                  <div
                    v-if="
                      myInvoice.status[myInvoice.status.length - 1].name !=
                        'created' &&
                      myInvoice.status[myInvoice.status.length - 1].name !=
                        'cancelled'
                    "
                  >
                    <h5 class="font-size-16 mb-1">N° de facture:</h5>
                    <p>{{ myInvoice.invoiceNumber }}</p>
                  </div>
                  <div class="mt-4">
                    <h5 class="font-size-16 mb-1">Date de la facture:</h5>
                    <p>{{ formatMyDate(myInvoice.createdAt) }}</p>
                  </div>
                  <div class="mt-4">
                    <h5 class="font-size-16 mb-1">Date d'échéance:</h5>
                    <p>{{ myInvoice.DueDate }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="py-2">
              <h5 class="font-size-15">Synthèse de la facture</h5>

              <div class="table-responsive">
                <table class="table table-nowrap table-centered mb-0">
                  <thead>
                    <tr>
                      <th style="width: 70px">No.</th>
                      <th>Article</th>
                      <th>Prix unitaire</th>
                      <th>Quantité</th>
                      <th class="text-right" style="width: 120px">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="(article, index) in myInvoice.items"
                      :key="index"
                    >
                      <th scope="row">{{ index + 1 }}</th>
                      <td>
                        <h5 class="font-size-15 mb-1">
                          {{ article.name }}
                        </h5>
                      </td>
                      <td>
                        {{
                          Intl.NumberFormat("ar-MA", {
                            style: "currency",
                            currency: "MAD",
                          }).format(article.price)
                        }}
                      </td>
                      <td>
                        {{ article.quantity }}
                      </td>
                      <td class="text-right">
                        {{
                          Intl.NumberFormat("ar-MA", {
                            style: "currency",
                            currency: "MAD",
                          }).format(article.total)
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3" rowspan="3">
                        <p v-if="myInvoice.ref">
                          Référence: {{ myInvoice.ref }}
                        </p>
                      </td>
                      <td class="text-right font-size-16">Total HT</td>
                      <td>
                        {{
                          Intl.NumberFormat("ar-MA", {
                            style: "currency",
                            currency: "MAD",
                          }).format(myInvoice.subTotal)
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-right font-size-16">TVA</td>
                      <td>
                        {{
                          Intl.NumberFormat("ar-MA", {
                            style: "currency",
                            currency: "MAD",
                          }).format(myInvoice.tax)
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-right"><h5>Total TTC</h5></td>
                      <td>
                        <h5>
                          {{
                            Intl.NumberFormat("ar-MA", {
                              style: "currency",
                              currency: "MAD",
                            }).format(myInvoice.total)
                          }}
                        </h5>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p v-if="myInvoice.comment" class="col-8">
                  {{ myInvoice.comment }}
                </p>
              </div>
              <div class="d-print-none mt-4">
                <div class="float-end">
                  <a
                    href="javascript:window.print()"
                    class="btn btn-success waves-effect waves-light mr-1"
                  >
                    <i class="fa fa-print"></i>
                  </a>
                  <a
                    href="#"
                    class="btn btn-primary w-md waves-effect waves-light"
                    >Envoyé</a
                  >
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

<style>
@media print {
  div.classname {
    display: none;
  }
}
.mmm {
  margin-right: 10rem;
}
</style>
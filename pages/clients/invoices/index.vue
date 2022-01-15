

<template>
  <div>
    <PageHeader :title="title" :details="items" />

    <div class="row mt-3" v-if="myInvoices.length > 0">
      <div class="col-sm-12 col-md-2"></div>

      <!-- Search -->
      <div class="col-sm-12 col-md-10">
        <div id="tickets-table_filter" class="dataTables_filter text-md-end">
          <label class="d-inline-flex align-items-center">
            Recherchez:
            <b-form-input
              v-model="filter"
              type="search"
              placeholder="Recherchez..."
              class="form-control form-control-sm ms-2"
            ></b-form-input>
          </label>
        </div>
      </div>
      <!-- End search -->
    </div>
    <!-- Table -->
    <center v-if="myInvoices.length == 0">
      <h5 class="text-muted m-5">
        Vous n'avez pas d'ordre actif pour le moment
      </h5>
    </center>
    <div class="table-responsive mb-0" v-if="myInvoices.length > 0">
      <b-table
        table-class="table table-centered datatable table-card-list"
        thead-tr-class="bg-transparent"
        :items="myInvoices"
        :fields="fields"
        responsive="sm"
        :per-page="perPage"
        :current-page="currentPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
      >
        <template v-slot:cell(status)="data">
          <div
            class="badge badge-pill font-size-12"
            :class="{
              'bg-info':
                data.item.status[data.item.status.length - 1].name ===
                  'created' ||
                data.item.status[data.item.status.length - 1].name ===
                  'validated',
              'bg-warning':
                data.item.status[data.item.status.length - 1].name ===
                'pseudoPaid',
              'bg-success':
                data.item.status[data.item.status.length - 1].name === 'payed',
              'bg-secondary':
                data.item.status[data.item.status.length - 1].name ===
                  'cancelled' ||
                data.item.status[data.item.status.length - 1].name === 'closed',
              'bg-danger':
                data.item.status[data.item.status.length - 1].name ===
                'overDueDate',
            }"
          >
            <span
              v-if="
                data.item.status[data.item.status.length - 1].name == 'created'
              "
            >
              Créé</span
            >

            <span
              v-if="
                data.item.status[data.item.status.length - 1].name ==
                'overDueDate'
              "
            >
              Expiration du délai</span
            >
            <span
              v-if="
                data.item.status[data.item.status.length - 1].name ==
                'pseudoPaid'
              "
            >
              Partiellement payé (%{{getMyPaimentsPercentage(data.item)}})
            </span>
            <span
              v-if="
                data.item.status[data.item.status.length - 1].name ==
                'validated'
              "
            >
              Validé</span
            >
            <span
              v-if="
                data.item.status[data.item.status.length - 1].name == 'paid'
              "
            >
              Payé</span
            >
            <span
              v-if="
                data.item.status[data.item.status.length - 1].name == 'closed'
              "
            >
              Clôturé</span
            >
            <span
              v-if="
                data.item.status[data.item.status.length - 1].name ==
                'cancelled'
              "
            >
              Annulé</span
            >
          </div>
        </template>

        <template v-slot:cell(invoiceNumber)="data">
          <div class="font-size-12">
            <span 
              v-if="
                data.item.status[data.item.status.length - 1].name !=
                  'created' &&
                data.item.status[data.item.status.length - 1].name !=
                  'cancelled'
              "
            >
              <h5>{{ data.item.invoiceNumber }}</h5>
            </span>
            <!-- <span v-else><p class="text-muted"> Pas encore renseigné </p></span> -->

            <span v-else class="badge badge-pill font-size-10 bg-secondary"> Pas encore renseigné </span>
          </div>
        </template>

        <template v-slot:cell(withDelivery)="data">
          <div class="mx-4">
            <i
              class="uil-check font-size-24 text-success"
              v-if="data.item.withDelivery != null"
            ></i>
            <i class="uil-multiply font-size-24 text-secondary" v-else></i>
          </div>
        </template>

        <template v-slot:cell(total)="data">
          <div class="font-size-16">
            {{
              Intl.NumberFormat("ar-MA", {
                style: "currency",
                currency: "MAD",
              }).format(data.item.total)
            }}
          </div>
        </template>

        <template v-slot:cell(createdAt)="data">
          <a href="#" class="text-body">{{
            formatMyDate(data.item.createdAt)
          }}</a>
        </template>

        <template v-slot:cell(id)="data">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <a
                href="javascript:void(0);"
                class="px-2 text-primary"
                v-b-tooltip.hover
                title="Consulter"
              >
                <nuxt-link :to="'/clients/invoices/' + data.item.id">
                  <i class="uil uil-eye font-size-18"></i>
                </nuxt-link>
              </a>
            </li>
            <!-- <li class="list-inline-item">
              <a
                href="javascript:void(0);"
                class="px-2 text-danger"
                v-b-tooltip.hover
                title="Delete"
              >
                <i class="uil uil-trash-alt font-size-18"></i>
              </a>
            </li> -->
          </ul>
        </template>
      </b-table>
    </div>
    <div class="row" v-if="myInvoices.length > 0">
      <div class="col-sm-12 col-lg-4">
        <div id="tickets-table_length" class="dataTables_length">
          <label class="d-inline-flex align-items-center">
            Afficher&nbsp;
            <b-form-select
              v-model="perPage"
              size="sm"
              :options="pageOptions"
            ></b-form-select
            >&nbsp;lignes
          </label>
        </div>
      </div>
      <div class="col-sm-12 col-lg-8">
        <div class="dataTables_paginate paging_simple_numbers float-end">
          <ul class="pagination pagination-rounded">
            <!-- pagination -->
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
            ></b-pagination>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Invoice-list component
 */
import axios from "axios";
import { format, parseISO } from "date-fns";
import { getData } from "../../../components/controllers/savingData";
export default {
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  data() {
    return {
      title: "Commandes actives",
      items: [
        {
          text: "Commandes",
        },
        {
          text: "Commandes actives",
          active: true,
        },
      ],

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      myInvoices: [],
      fields: [
        {
          key: "invoiceNumber",
          label: "Numéro de facture",
          sortable: true,
        },
        {
          key: "createdAt",
          label: "Date de création",
          sortable: true,
        },
        {
          key: "DueDate",
          label: "Date d'échéance",
          sortable: true,
        },
        {
          key: "total",
          label: "Total (en dh TTC)",
          sortable: true,
        },
        {
          key: "status",
          label: "statut",
          sortable: true,
        },
        {
          key: "id",
          label: "Action",
        },
      ],
    };
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.myInvoices.length;
    },
  },
  async mounted() {
    // Set the initial number of items
    try {
      let result = await axios.get(
        process.env.baseUrl + "/invoices?client=" + getData("clientinfo").id
      );
      result = result.data;
      this.myInvoices = result;
      // for (let i = 0; i < result.length; i++) {

      //   if (
      //     result[i].status[result[i].status.length - 1].name != "cancelled" &&
      //     result[i].status[result[i].status.length - 1].name != "closed"
      //   ) {

      //     this.myInvoices.push(result[i]);
      //   }
      // }
      this.myInvoices = this.myInvoices.reverse();
    } catch (error) {
      console.log(error);
    }
    this.totalRows = this.myInvoices.length;
  },
  methods: {
    /**
     * Search the table data with search input
     */
    getMyPaimentsPercentage(invoice){
      let totalPaid=0
      for(let i=0; i<invoice.payments.length;i++){
        totalPaid=totalPaid+invoice.payments[i].amount
      }
      return ((totalPaid/invoice.total)*100).toFixed(0)
    },
    formatMyDate(date) {
      // return date
      return format(parseISO(date), "dd/MM/yyyy, HH:MM");
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  middleware: "authentication",
};
</script>


<template>
  <div>
    <PageHeader :title="title" :details="items" />

    <div class="row mt-3">
      <div class="col-sm-12 col-md-2">
        <div>
          <nuxt-link to="/clients/events/planifier-un-evenement"
            ><button type="button" class="btn btn-primary btn-sm mb-3">
              <i class="mdi mdi-plus me-1"></i> Planifier un evenement
            </button></nuxt-link
          >
        </div>
      </div>

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
    <div class="table-responsive mb-0" v-if="myEvents.length > 0">
      <b-table
        table-class="table table-centered datatable table-card-list"
        thead-tr-class="bg-transparent"
        :items="myEvents.reverse()"
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
        <template v-slot:cell(endDate)="data">
          <span class="text-black">{{ formatMyDate(data.item.endDate) }}</span>
        </template>
        <template v-slot:cell(startDate)="data">
          <span class="text-black">{{
            formatMyDate(data.item.startDate)
          }}</span>
        </template>
        <template v-slot:cell(status)="data">
          <div
            class="badge badge-pill font-size-12"
            :class="{
              'bg-info':
                data.item.status[data.item.status.length - 1].name ===
                  'created' ||
                data.item.status[data.item.status.length - 1].name ===
                  'quoteSent',
              'bg-warning':
                data.item.status[data.item.status.length - 1].name ===
                  'pendingQuote' ||
                data.item.status[data.item.status.length - 1].name ===
                  'pendingValidation',
              'bg-success':
                data.item.status[data.item.status.length - 1].name ===
                  'validated' ||
                data.item.status[data.item.status.length - 1].name ===
                  'pending',
              'bg-secondary':
                data.item.status[data.item.status.length - 1].name === 'closed',
              'bg-danger':
                data.item.status[data.item.status.length - 1].name ===
                'cancelled',
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
                'pendingQuote'
              "
            >
              En attente de devis</span
            >
            <span
              v-if="
                data.item.status[data.item.status.length - 1].name ==
                'pendingValidation'
              "
            >
              En cours de validation</span
            >
            <span
              v-if="
                data.item.status[data.item.status.length - 1].name ==
                'quoteSent'
              "
            >
              Devis envoyé</span
            >
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
                data.item.status[data.item.status.length - 1].name == 'pending'
              "
            >
              En cours</span
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

        <template v-slot:cell(name)="data">
          <h6 href="#" class="text-body">{{ data.item.name }}</h6>
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
                <nuxt-link
                  :to="'/clients/events/mes-evenements/' + data.item.id"
                >
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
    <div class="row">
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
export default {
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  data() {
    return {
      title: "Mes événements ",
      items: [
        {
          text: "Mes événements ",
        },
      ],

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      baseUrl: null,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      myEvents: [],
      fields: [
        {
          key: "name",
          label: "Nom de l'événement",
        },
        ,
        {
          key: "startDate",
          label: "Date de début",
        },
        ,
        {
          key: "endDate",
          label: "Date de fin",
        },
        ,
        {
          key: "city",
          label: "Ville",
        },
        {
          key: "numberOfAttendees",
          label: "Nombre de participants",
        },
        {
          key: "status",
          label: "Statut",
        },
        {
          key: "id",
          label: "action",
        },
      ],
    };
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.myEvents.length;
    },
  },

  async mounted() {
    // Set the initial number of items
    this.baseUrl = process.env.baseUrl;

    try {
      let result = await axios.get(this.baseUrl + "/events");
      result = result.data;
      this.myEvents = result;
      //   console.log(result);
      this.totalRows = this.myEvents.length;
    } catch (error) {}
  },
  methods: {
    /**
     * Search the table data with search input
     */
    formatMyDate(date) {
      // return date
      return format(parseISO(date), "dd/MM/yyyy");
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
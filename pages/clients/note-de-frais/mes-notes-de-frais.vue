

<template>
  <div>
    <PageHeader :title="title" :details="items" />

    <div class="row mt-3">
      <div class="col-sm-12 col-md-2">
        <div>
          <nuxt-link to="/clients/note-de-frais/declaration"
            ><button type="button" class="btn btn-primary btn-sm mb-3">
              <i class="mdi mdi-plus me-1"></i> Nouvelle déclaration
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
    <div class="table-responsive mb-0">
      <b-table
        table-class="table table-centered datatable table-card-list"
        thead-tr-class="bg-transparent"
        :items="mesNDFS"
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
        <template v-slot:cell(check)="data">
          <div class="custom-control custom-checkbox text-center">
            <label
              class="custom-control-label"
              :for="`contacusercheck${data.item.id}`"
            ></label>
          </div>
        </template>
        <template v-slot:cell(id)="data">
          <nuxt-link
            class="text-dark fw-bold"
            :to="'/clients/note-de-frais/' + data.item.id"
          >
            {{data.item.id}}
          </nuxt-link>
        </template>

        <template v-slot:cell(status)="data">
          <div
            class="badge badge-pill font-size-12"
            :class="{
              'bg-soft-primary':
                data.item.status[data.item.status.length - 1].name ===
                'created',

              'bg-soft-danger':
                data.item.status[data.item.status.length - 1].name === 'denied',
              'bg-soft-success':
                data.item.status[data.item.status.length - 1].name ===
                'accepted',
              'bg-soft-secondary':
                data.item.status[data.item.status.length - 1].name === 'closed',
            }"
          >
            <span
              v-if="
                data.item.status[data.item.status.length - 1].name === 'created'
              "
              >Créé</span
            >
            <span
              v-if="
                data.item.status[data.item.status.length - 1].name === 'denied'
              "
              >Refusé</span
            >
            <span
              v-if="
                data.item.status[data.item.status.length - 1].name ===
                'accepted'
              "
              >Accepté</span
            >
            <span
              v-if="
                data.item.status[data.item.status.length - 1].name === 'closed'
              "
              >Cloturé</span
            >
          </div>
        </template>

        <template v-slot:cell(name)="data">
          <a href="#" class="text-body"
            >{{ data.item.firstName }} {{ data.item.lastName }}</a
          >
        </template>
        <template v-slot:cell(amount)="data">
          <a href="#" class="text-body">
            {{
              Intl.NumberFormat("ar-MA", {
                style: "currency",
                currency: "MAD",
              }).format(data.item.amount)
            }}
          </a>
        </template>
        <template v-slot:cell(category)="data">
          <div>
            {{
              data.item.category.charAt(0).toUpperCase() +
              data.item.category.slice(1)
            }}
          </div>
        </template>
        <template v-slot:cell(action)="data">
          <ul class="list-inline mb-0">
            <!-- <li class="list-inline-item">
              <a
                href="javascript:void(0);"
                class="px-2 text-primary"
                v-b-tooltip.hover
                title="Edit"
              >
                <i class="uil uil-pen font-size-18"></i>
              </a>
            </li> -->
            <li class="list-inline-item">
              <nuxt-link
                class="px-2 text-primary"
                :to="'/clients/note-de-frais/' + data.item.id"
              >
                <i class="uil uil-eye font-size-18"></i>
              </nuxt-link>
            </li>
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
export default {
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  data() {
    return {
      title: "Mes notes de frais",
      items: [
        {
          text: "Notes de frais",
        },
        {
          text: "Mes notes de frais",
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
      mesNDFS: [],
      fields: [
        {
          key: "id",
          label: "ID",
        },
        {
          key: "date",
          sortable: true,
        },
        {
          key: "name",
          label: "Nom du bénéficiaire ",
        },
        {
          key: "amount",
          label: "Montant",
          sortable: true,
        },
        {
          key: "category",
          label: "Catégorie",
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
        },
        {
          key: "action",
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
      return this.mesNDFS.length;
    },
  },
  async mounted() {
    // Set the initial number of items
    this.totalRows = this.mesNDFS.length;

    try {
      let result = await axios.get(process.env.baseUrl + "/ndfs");
      this.mesNDFS = result.data;
      this.mesNDFS = this.mesNDFS.reverse();
    } catch (error) {}
  },
  methods: {
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  middleware: "authentication",
};
</script>
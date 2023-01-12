

<template>
  <div>
    <PageHeader :title="title" :details="items" />

    <div class="row mt-3 align-items-center" >
      <div class="col-sm-12 col-md-2">
        <nuxt-link :to="'/supplier/myproducts/addProduct'"
          ><button type="button" class="btn btn-primary btn-sm mt-3">
            <i class="mdi mdi-plus me-1"></i>Ajouter un produit
          </button></nuxt-link
        >
      </div>

      <!-- Search -->
      <div class="col-sm-12 col-md-10" v-if="myItems.length > 0">
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
    <center v-if="myItems.length == 0">
      <h5 class="text-muted m-5">
        Vous n'avez pas ajouté de produits ou de services pour le moment.
      </h5>
    </center>
    <div class="table-responsive mb-0" v-if="myItems.length > 0">
      <b-table
        table-class="table table-centered datatable table-card-list"
        thead-tr-class="bg-transparent"
        :items="myItems"
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
            class="badge badge-pill font-size-12 m-1"
            :class="{
              'bg-info': data.item.status === true,
              'bg-danger': data.item.status === false,
            }"
          >
            <span v-if="data.item.status == true"> Active</span>
            <span v-if="data.item.status == false"> Désactivé</span>
          </div>
        </template>

        <template v-slot:cell(price)="data">
          <div class="font-size-16" v-if="!data.item.disocunt">
            <span class="font-size-12 text-secondary"
              >(-{{ percentageTaking }}%)</span
            >
            {{
              Intl.NumberFormat("ar-MA", {
                style: "currency",
                currency: "MAD",
              }).format(data.item.price)
            }}
            <span class="font-size-12 text-secondary">
              / {{ data.item.unit }}</span
            >
          </div>
          <div class="font-size-16" v-if="data.item.disocunt">
            <span class="font-size-12 text-secondary"
              >(-{{ percentageTaking }}%)</span
            >
            {{
              Intl.NumberFormat("ar-MA", {
                style: "currency",
                currency: "MAD",
              }).format(
                data.item.price * (1 - data.item.disocunt.percentage / 100)
              )
            }}
            <span class="font-size-12 text-secondary">
              / {{ data.item.unit }}</span
            >
          </div>
        </template>
        <template v-slot:cell(disocunt)="data">
          <div class="font-size-16" v-if="data.item.disocunt">
            -{{ data.item.disocunt.percentage }}%
          </div>
          <div class="font-size-16" v-if="!data.item.disocunt">--</div>
        </template>
        <template v-slot:cell(categories)="data">
          <span
            class="font-size-16 m-1"
            v-for="(category, index) in data.item.categories"
            :key="index"
          >
            {{ category.name }}
          </span>
        </template>
        <template v-slot:cell(shownIn)="data">
          <div
            v-for="(where, index) in data.item.shownIn"
            :key="index"
            class="badge badge-pill font-size-4 m-1 bg-info"
          >
            <span v-if="where.serviceName == 'livraison-de-repas'">
              Livraison de repas</span
            >
            <span v-if="where.serviceName == 'menu-conventionne'">
              Menu conventionné</span
            >
            <span v-if="where.serviceName == 'repas-emporte'">
              Repas emporté</span
            >
            <span v-if="where.serviceName == 'reservation-de-restaurant'">
              Réservation de restaurant</span
            >
            <span v-if="where.serviceName == 'restauration-collectif'">
              Réservation de restaurant</span
            >
          </div>
        </template>
        <template v-slot:cell(name)="data">
          <div class="row font-size-16 nowrap">
            <!-- <div class="col"> <img
              :src="baseUrl + data.item.firstImage.url"
              alt="product-img"
              title="product-img"
              class="avatar-md"
            /></div> -->
            <div class="col">{{ data.item.name }}</div>
          </div>
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
                <nuxt-link :to="'/supplier/myproducts/' + data.item.id">
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
    <div class="row" v-if="myItems.length > 0">
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
      title: "Mes articles et services",
      items: [
        {
          text: "Mes articles et services",
          active: true,
        },
      ],
      baseUrl: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      percentageTaking: 0,
      sortBy: "age",
      sortDesc: false,
      myItems: [],
      fields: [
        {
          key: "name",
          label: "Label ",
          sortable: true,
        },
        {
          key: "shownIn",
          label: "Catégorie de service",
        },

        {
          key: "categories",
          label: "Catégories",
        },
        {
          key: "price",
          label: "Prix (HT)",
          sortable: true,
        },
        {
          key: "disocunt",
          label: "Réduction",
        },
        {
          key: "status",
          label: "Statut",
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
      return this.myItems.length;
    },
  },
  async mounted() {
    // Set the initial number of items
    this.baseUrl = process.env.baseUrl;
    try {
      let myAccount = getData("accountinfo");
      console.log(myAccount);
      let myItems = await axios.get(
        process.env.baseUrl + "/" + myAccount.type + "/" + myAccount.id
      );
      this.percentageTaking = myItems.data.percentageTaking;
      console.log(myItems.data.items[0]);
      this.myItems = myItems.data.items;
      let result = await axios.get(process.env.baseUrl + "/orders");
      result = result.data;
      //   for (let i = 0; i < result.length; i++) {
      //     if (
      //       result[i].status[result[i].status.length - 1].name != "cancelled" &&
      //       result[i].status[result[i].status.length - 1].name != "closed"
      //     ) {
      //       this.myItems.push(result[i]);
      //     }
      //   }
      //   this.myItems = this.myItems.reverse();
    } catch (error) {
      console.log(error);
    }
    this.totalRows = this.myItems.length;
  },
  methods: {
    /**
     * Search the table data with search input
     */
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
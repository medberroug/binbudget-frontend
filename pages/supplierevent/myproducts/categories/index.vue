

<template>
  <div>
    <PageHeader :title="title" :details="items" />
    <b-modal v-model="addCategoryModal" centered hide-footer v-if="myItems">
      <template #modal-title> Ajouter une nouvelle catégorie </template>

      <label for="input-live">Nom de la catégorie:</label>
      <b-form-input v-model="myNewCategory" type="text"></b-form-input>

      <center>
        <b-button
          class="mt-3"
          block
          variant="primary"
          @click="addCategoryController"
        >
          Ajouter</b-button
        >
      </center></b-modal
    >
    <div class="row mt-3 align-items-center" v-if="myItems.length > 0">
      <div class="col-sm-12 col-md-2">
        <button
          type="button"
          class="btn btn-primary btn-sm mt-3"
          @click="addCategoryModal = !addCategoryModal"
        >
          <i class="mdi mdi-plus me-1"></i>Ajouter une catégorie
        </button>
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
    <center v-if="myItems.length == 0">
      <h5 class="text-muted m-5">
        Vous n'avez pas ajouté de categories pour le moment.
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

        <template v-slot:cell(number)="data">
          <div class="row font-size-16 nowrap">
            <!-- <div class="col"> <img
              :src="baseUrl + data.item.firstImage.url"
              alt="product-img"
              title="product-img"
              class="avatar-md"
            /></div> -->
            <div class="col" v-if="counter[data.item.name]">
              {{ counter[data.item.name] }}
            </div>
            <div class="col" v-else>0</div>
          </div>
        </template>

        <template v-slot:cell(id)="data">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <a
                href="javascript:void(0);"
                class="px-2 text-danger"
                v-b-tooltip.hover
                title="Supprimer"
                @click="deleteCategory(data.item.name)"
              >
                <i class="uil uil-trash font-size-18 text-danger"></i>
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
import { getData } from "../../../../components/controllers/savingData";
export default {
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  data() {
    return {
      title: "Mes catégories",
      items: [
        {
          text: "Mes catégories",
          active: true,
        },
      ],
      baseUrl: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      addCategoryModal: false,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      myNewCategory: null,
      filterOn: [],
      percentageTaking: 0,
      sortBy: "age",
      sortDesc: false,
      myItems: [],
      counter: null,
      mySP: null,
      fields: [
        {
          key: "name",
          label: "Label",
          sortable: true,
        },
        {
          key: "number",
          label: "Nombre de produits",
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
      this.mySP = await axios.get(
        process.env.baseUrl + "/" + "eventserviceproviders" + "/" + myAccount.id
      );
      let myItems = this.mySP;
      this.mySP = this.mySP.data;
      this.percentageTaking = myItems.data.percentageTaking;
      console.log(myItems.data.items[0]);
      this.myItems = myItems.data.category;
      let myCategoryCalculator = [];
      for (let i = 0; i < this.mySP.items.length; i++) {
        myCategoryCalculator.push(this.mySP.items[i].categories[0].name);
      }
      const counts = {};
      const sampleArray = myCategoryCalculator;
      sampleArray.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
      });

      this.counter = counts;
    } catch (error) {
      console.log(error);
    }
    this.totalRows = this.myItems.length;
  },
  methods: {
    /**
     * Search the table data with search input
     */
    async addCategoryController() {
      this.myItems.push({
        name: this.myNewCategory,
      });
      // this.mySP.items.push(this.myProduct);
      let result = await axios.put(
        process.env.baseUrl + "/eventserviceproviders/" + this.mySP.id,
        {
          category: this.myItems,
        }
      );
      this.addCategoryModal = false;
      this.myNewCategory = null;
      // this.$router.push("/supplier/myproducts/" + this.myProduct.id);
    },

    async deleteCategory(category) {
      let myNewCategories = [];
      for (let i = 0; i < this.myItems.length; i++) {
        if (this.myItems[i].name != category) {
          myNewCategories.push(this.myItems[i]);
        }
      }
      this.myItems = myNewCategories;
      // this.mySP.items.push(this.myProduct);
      let result = await axios.put(
        process.env.baseUrl + "/eventserviceproviders/" + this.mySP.id,
        {
          category: myNewCategories,
        }
      );
      // this.$router.push("/supplier/myproducts/" + this.myProduct.id);
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
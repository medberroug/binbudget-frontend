<script>
import Multiselect from "vue-multiselect";

import "vue-multiselect/dist/vue-multiselect.min.css";
import axios from "axios";
import { getData } from "../../../components/controllers/savingData";
/**
 * Add-product component
 */
export default {
  components: {
    Multiselect,
  },
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  methods: {
    async addProduct() {
      //
      let mySpecs = this.myProduct.specification.split(/\r?\n/);
      this.myProduct.specification = [];
      for (let i = 0; i < mySpecs.length; i++) {
        this.myProduct.specification.push({
          specText: mySpecs[i],
        });
      }
      let shownIn=this.myProduct.shownIn
      this.myProduct.shownIn=[]
      for (let i = 0; i < shownIn.length; i++) {
        this.myProduct.shownIn.push({
          serviceName: shownIn[i],
        });
      }
      this.myProduct.status = true;
      this.myProduct.categories=[this.myProduct.categories]
      console.log(this.myProduct);
        console.log(this.myProduct);
      this.mySP.items.push(this.myProduct);
      console.log(this.mySP.items);
      let result = await axios.put(
        process.env.baseUrl + "/restaurations/" + this.mySP.id,
        {
          items: this.mySP.items,
        }
      );
    },
  },
  async mounted() {
    let mySP = getData("accountinfo");
    try {
      let result = await axios.get(
        process.env.baseUrl + "/restaurations/" + mySP.id
      );
      this.mySP = result.data;
      this.categories = result.data.category;

      for (let i = 0; i < result.data.whatServicesHeCanOffer.length; i++) {
        this.myShowIn.push(result.data.whatServicesHeCanOffer[i].serviceName);
      }
      console.log(result);
    } catch (error) {}
  },
  data() {
    return {
      title: "Ajouter un produit",
      items: [
        {
          text: "Mes articles et services",
        },
        {
          text: "Ajouter un produit",
          active: true,
        },
      ],
      categories: null,
      mySP: null,
      myShowIn: [],
      value1: null,
      myProduct: {
        status: null,
        unit: null,
        price: null,
        name: null,
        description: null,
        categories: null,
        specification: null,
        shownIn: null,
      },
      options: [
        "High Quality",
        "Leather",
        "Notifications",
        "Sizes",
        "Different Color",
      ],
    };
  },
  middleware: "authentication",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row mt-3">
      <div class="col-lg-12">
        <div id="addproduct-accordion" class="custom-accordion">
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
                    <h5 class="font-size-16 mb-1">Billing Info</h5>
                    <p class="text-muted text-truncate mb-0">
                      Fill all information below
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
                  <div class="mb-3">
                    <label for="productname">Nom du produit</label>
                    <input
                      id="productname"
                      name="productname"
                      type="text"
                      class="form-control"
                      v-model="myProduct.name"
                    />
                  </div>

                  <div class="row">
                    <div class="col-md-3">
                      <div class="mb-3">
                        <label for="manufacturername">Unité</label>
                        <input
                          id="manufacturername"
                          name="manufacturername"
                          type="text"
                          class="form-control"
                          v-model="myProduct.unit"
                        />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="mb-3">
                        <label for="price">Prix (en dh HT)</label>
                        <input
                          id="price"
                          name="price"
                          type="number"
                          class="form-control"
                          v-model="myProduct.price"
                        />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="mb-3">
                        <label class="control-label">Catégorie</label>
                        <select
                          class="form-control select2"
                          v-model="myProduct.categories"
                        >
                          <option
                            :value="category.name"
                            v-for="(category, index) in categories"
                            :key="index"
                          >
                            {{ category.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="mb-3">
                        <label class="control-label"
                          >Catégorie de service</label
                        >
                        <multiselect
                          v-model="myProduct.shownIn"
                          :options="myShowIn"
                          :multiple="true"
                        ></multiselect>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="productdesc">Description du produit</label>
                      <textarea
                        class="form-control"
                        id="productdesc"
                        rows="4"
                        v-model="myProduct.description"
                      ></textarea>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="productdesc"
                        >Specification (Chacune dans une ligne)</label
                      >
                      <textarea
                        class="form-control"
                        id="productdesc"
                        rows="4"
                        v-model="myProduct.specification"
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </b-collapse>
          </div>

          <div class="card">
            <a
              href="javascript: void(0);"
              class="text-dark collapsed"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls="addproduct-img-collapse"
              v-b-toggle.accordion-2
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
                        02
                      </div>
                    </div>
                  </div>
                  <div class="media-body overflow-hidden">
                    <h5 class="font-size-16 mb-1">Product Image</h5>
                    <p class="text-muted text-truncate mb-0">
                      Fill all information below
                    </p>
                  </div>
                  <i
                    class="mdi mdi-chevron-up accor-down-icon font-size-24"
                  ></i>
                </div>
                <div class="row d-flex justify-content-end p-2 pt-4">
                  <b-button
                    variant="primary"
                    class="btn-lg"
                    @click="addProduct"
                  >
                    Soumettre
                    <i class="uil uil-upload ml-6"></i>
                  </b-button>
                </div>
              </div>
            </a>

            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              data-parent="#addproduct-accordion"
            >
              <div class="p-4 border-top"></div>
            </b-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

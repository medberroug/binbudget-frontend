<script>
import Multiselect from "vue-multiselect";

import "vue-multiselect/dist/vue-multiselect.min.css";

import axios from "axios";
import { getData } from "../../../../components/controllers/savingData";
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
    AddformData() {
      let myNewRef = "ref" + this.fields.length;
      this.fields.push({
        file: null,
        ref: myNewRef,
      });
    },
    async handleFileUpload() {
      this.uploadLoader = true;
      let formData = new FormData();
      formData.append("files", this.$refs.file.files[0]);
      let myImage = await axios
        .post(process.env.baseUrl + "/upload", formData)
        .catch((err) => {
          this.fileMissing = true;
        });
      myImage = myImage.data[0];
      console.log(myImage);
      this.fields.push({
        id: myImage.id,
        name: myImage.name,
        url: process.env.baseUrl + myImage.url,
      });
      this.uploadLoader = false;
    },
    deleteRow(index) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?"))
        this.fields.splice(index, 1);
    },
    async addProduct() {
      this.submitted = true;
      if (
        !this.myProduct.unit ||
        !this.myProduct.price ||
        !this.myProduct.name ||
        !this.myProduct.description ||
        !this.myProduct.categories ||
        !this.myProduct.specification ||
        !this.myProduct.shownIn ||
        this.fields.length == 0
      ) {
        this.somthingIsmissing = true;
      } else {
        let mySpecs = this.myProduct.specification.split(/\r?\n/);
        this.myProduct.specification = [];
        for (let i = 0; i < mySpecs.length; i++) {
          if (mySpecs[i].length > 0) {
            this.myProduct.specification.push({
              specText: mySpecs[i],
            });
          }
        }
        let shownIn = this.myProduct.shownIn;
        this.myProduct.shownIn = [];
        for (let i = 0; i < shownIn.length; i++) {
          this.myProduct.shownIn.push({
            serviceName: shownIn[i],
          });
        }
        this.myProduct.status = true;
        // this.myProduct.categories = [{ name: this.myProduct.categories }];

        let myImages = [];
        for (let i = 0; i < this.fields.length; i++) {
          myImages.push({
            id: this.fields[i].id,
          });
        }
        this.myProduct.images = myImages;
        this.myProduct.firstImage = {
          id: myImages[0].id,
        };
        for (let i = 0; i < this.mySP.items.length; i++) {
          if (this.mySP.items[i].id == this.myProduct.id) {
            console.log(this.mySP.items[i]);
            console.log(this.myProduct);
            this.mySP.items[i] = this.myProduct;
          }
        }

        // this.mySP.items.push(this.myProduct);
        let result = await axios.put(
          process.env.baseUrl + "/eventserviceproviders/" + this.mySP.id,
          {
            items: this.mySP.items,
          }
        );
        this.$router.push("/supplierevent/myproducts/" + this.myProduct.id);
      }
    },
  },
  async mounted() {
    let mySP = getData("accountinfo");
    try {
      let result = await axios.get(
        process.env.baseUrl + "/eventserviceproviders/" + mySP.id
      );
      this.mySP = result.data;
      this.categories = result.data.category;

      for (let i = 0; i < result.data.items.length; i++) {
        if (result.data.items[i].id == this.$route.params.editMyProduct) {
          this.myProduct = result.data.items[i];
        }
      }
      console.log(this.myProduct);
      for (let i = 0; i < result.data.whatServicesHeCanOffer.length; i++) {
        this.myShowIn.push(result.data.whatServicesHeCanOffer[i].serviceName);
      }
      let myNewShownIn = [];
      for (let i = 0; i < this.myProduct.shownIn.length; i++) {
        myNewShownIn.push(this.myProduct.shownIn[i].serviceName);
      }
      let mySpec = "";
      for (let i = 0; i < this.myProduct.specification.length; i++) {
        mySpec = mySpec + this.myProduct.specification[i].specText + "\n";
      }
      for (let i = 0; i < this.myProduct.images.length; i++) {
        this.fields.push({
          id: this.myProduct.images[i].id,
          name: this.myProduct.images[i].name,
          url: process.env.baseUrl + this.myProduct.images[i].url,
        });
      }

      this.myProduct.specification = mySpec;
      this.myProduct.shownIn = myNewShownIn;
      console.log(result);
    } catch (error) {}
  },
  data() {
    return {
      title: "Modifier un produit",
      items: [
        {
          text: "Mes articles et services",
        },
        {
          text: "Modifier un produit",
          active: true,
        },
      ],
      fields: [],
      categories: null,
      mySP: null,
      myShowIn: [],
      uploadLoader: false,
      value1: null,
      somthingIsmissing: false,
      submitted: false,
      file: "",
      fileMissing: false,
      formData: new FormData(),
      myProduct: null,
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
    <div class="row mt-3" v-if="myProduct">
      <nuxt-link :to="'/supplierevent/myproducts'"
        ><button type="button" class="btn btn-primary btn-sm mb-3">
          <i class="mdi mdi-arrow-left me-1"></i>Mes articles
        </button></nuxt-link
      >
      <div class="col-lg-12">
        <b-alert variant="danger" show v-if="somthingIsmissing"
          >Vous avez des champs manquants, veuillez remplir tous les éléments
          obligatoires.
        </b-alert>
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
                    <h5 class="font-size-16 mb-1">
                      Informations sur le produit
                    </h5>
                    <p class="text-muted text-truncate mb-0">
                      Remplissez toutes les informations ci-dessous
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
                      :class="{
                        'is-invalid': submitted && !myProduct.name,
                      }"
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
                          :class="{
                            'is-invalid': submitted && !myProduct.unit,
                          }"
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
                          :class="{
                            'is-invalid': submitted && !myProduct.price,
                          }"
                        />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="mb-3">
                        <label class="control-label">Catégorie</label>
                        <select
                          class="form-control select2"
                          v-model="myProduct.categories[0].name"
                          :class="{
                            'is-invalid': submitted && !myProduct.categories,
                          }"
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
                          :class="{
                            'is-invalid': submitted && !myProduct.shownIn,
                          }"
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
                        :class="{
                          'is-invalid': submitted && !myProduct.description,
                        }"
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
                        :class="{
                          'is-invalid': submitted && !myProduct.specification,
                        }"
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
                    <h5 class="font-size-16 mb-1">Photos du produit</h5>
                    <p class="text-muted text-truncate mb-0">
                      Ajoutez au moins une image
                    </p>
                  </div>
                  <input
                    type="file"
                    id="file"
                    ref="file"
                    v-on:change="handleFileUpload()"
                  />
                  <i
                    class="mdi mdi-chevron-up accor-down-icon font-size-24"
                  ></i>
                </div>
                <div>
                  <div class="m-4 col-lg-10">
                    <center></center>
                  </div>
                </div>
                <div class="row d-flex justify-content-end p-2 pt-4">
                  
                  <form class="repeater my-4">
                    <div>
                      <div class="row">
                        <div
                          v-for="(field, index) in fields"
                          :key="index"
                          class="row"
                        >
                          <div class="mb-3 col-lg-10">
                            <h5>{{ field.name }}</h5>
                          </div>
                          <div class="col-lg-1 align-self-center">
                            <input
                              type="button"
                              class="btn btn-primary btn-block"
                              value="Supprimer"
                              @click="deleteRow(index)"
                            />
                          </div>

                          <div class="col-lg-1 align-self-center"></div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <b-button
                    v-if="!uploadLoader"
                    variant="primary"
                    class="btn-lg mt-4"
                    @click="addProduct"
                  >
                    Modifier
                    <i class="uil uil-upload ml-6"></i>
                  </b-button>

                  <b-button
                    v-if="uploadLoader"
                    variant="warning"
                    class="btn-lg mt-4"
                  >
                    En attente.. (téléchargement d'images)
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

<script>
import vue2Dropzone from "vue2-dropzone";
import Multiselect from "vue-multiselect";
import DatePicker from "vue2-datepicker";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import "vue-multiselect/dist/vue-multiselect.min.css";
import "vue2-datepicker/index.css";
import axios from "axios";
/**
 * Add-product component
 */
export default {
  components: {
    vueDropzone: vue2Dropzone,
    Multiselect,
    DatePicker,
  },

  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  async mounted() {
    let result = await axios.get(process.env.baseUrl + "/ndfserviceproviders");
    result = result.data;
    console.log(result);
    this.categories = result.categories;
    this.ndfProviders = result.ndfProviders;
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    async sendNDF() {
      this.ndfDetails.category;
      this.somethingMissing = false;
      this.amountIsNotGood = false;
      if (!this.ndfDetails.firstName) {
        this.somethingMissing = true;
      }
      if (!this.ndfDetails.lastName) {
        this.somethingMissing = true;
      }
      if (!this.ndfDetails.amount) {
        this.somethingMissing = true;
      }
      if (!this.ndfDetails.date) {
        this.somethingMissing = true;
      }
      if (!this.ndfDetails.category) {
        this.somethingMissing = true;
      }
      if (!this.ndfDetails.serviceProviderNDF) {
        this.somethingMissing = true;
      }

      if (!this.somethingMissing) {
        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i].name == this.ndfDetails.category) {
            console.log(this.categories[i].name == this.ndfDetails.category);
            if (
              parseFloat(this.ndfDetails.amount) >
                this.categories[i].maxAmount ||
              parseFloat(this.ndfDetails.amount) < this.categories[i].minAmount
            ) {
             
              this.maxAmount = this.categories[i].maxAmount;
              this.minAmount = this.categories[i].minAmount;
              this.amountIsNotGood = true;
            }
          }
        }

        if (!this.amountIsNotGood) {
          this.ndfDetails.status.push({
            name: "created",
            comment: "la note de frais a été créée par le client",
            date: new Date(),
          });
          let formData = new FormData();

          // this.fileMissing = true;

          formData.append("files", this.file);
          console.log("I'm here");
          try {
            let myImage = await axios
              .post(process.env.baseUrl + "/upload", formData)
              .catch((err) => {
                this.fileMissing = true;
              });
            console.log(myImage);
            myImage = myImage.data;
            console.log(myImage[0].id);
            console.log(myImage[0].url);
            this.ndfDetails.scan = myImage[0].id;
            let result = await axios.post(
              process.env.baseUrl + "/ndfs",
              this.ndfDetails
            );
            this.$router.push("/clients/note-de-frais/" + result.data.id);
          } catch (error) {}
        }
      }
    },
  },
  data() {
    return {
      defaultdate: "",
      categories: null,
      ndfProviders: null,
      amountIsNotGood: false,
      somethingMissing: false,
      dateIsMoreThan7Days: false,
      maxAmount: null,
      minAmount: null,
      fileMissing: false,
      title: "Déclaration de notes de frais",
      details: [
        {
          text: "Note de frais",
        },
        {
          text: "Déclaration",
          active: true,
        },
      ],
      ndfDetails: {
        firstName: null,
        lastName: null,
        amount: null,
        category: null,
        date: null,
        serviceProviderNDF: null,
        comment: null,
        scan: null,
        status: [],
      },
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 1000000,
        addRemoveLinks: true,
        maxFiles: 1,
        headers: {
          "My-Awesome-Header": "header value",
        },
      },
      value1: null,
      file: "",

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
    <PageHeader :title="title" :details="details" />
    <b-alert
      show
      dismissible
      variant="danger"
      class="mt-2"
      v-if="somethingMissing"
      >Veuillez remplir tous les renseignements figurant en bordure
      rouge</b-alert
    >
    <b-alert
      show
      dismissible
      variant="danger"
      class="mt-2"
      v-if="amountIsNotGood && ndfDetails.amount > maxAmount"
      >le montant que vous déclarez dépasse le montant athaurisé dans cette
      catégorie.</b-alert
    >

    <b-alert
      show
      dismissible
      variant="danger"
      class="mt-2"
      v-if="amountIsNotGood && ndfDetails.amount < minAmount"
      >le montant que vous déclarez est inférieur aux montants athaurisés dans
      cette catégorie.</b-alert
    >

    <b-alert show dismissible variant="danger" class="mt-2" v-if="fileMissing"
      >Le scan de la note de frais n'est pas téléchargé, veuillez en télécharger
      un ci-dessous avant de soumettre.</b-alert
    >
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
                    <h5 class="font-size-16 mb-1">
                      Détails de la note de frais
                    </h5>
                    <p class="text-muted text-truncate mb-0">
                      Remplissez ci-dessous les informations de la note de frais
                      telles qu'elles apparaissent sur le papier.
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
                    <div class="col-lg-4">
                      <div class="mb-3">
                        <label for="manufacturername">Nom de l'employé</label>
                        <input
                          id="manufacturername"
                          name="manufacturername"
                          type="text"
                          class="form-control"
                          :class="{
                            'border-danger':
                              !ndfDetails.lastName && somethingMissing,
                          }"
                          v-model="ndfDetails.lastName"
                        />
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="mb-3">
                        <label for="manufacturerbrand"
                          >Prénom de l'employé</label
                        >
                        <input
                          id="manufacturerbrand"
                          name="manufacturerbrand"
                          type="text"
                          class="form-control"
                          v-model="ndfDetails.firstName"
                          :class="{
                            'border-danger':
                              !ndfDetails.firstName && somethingMissing,
                          }"
                        />
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="mb-3">
                        <label for="price">Montant déclaré (en DH )</label>
                        <input
                          id="price"
                          name="price"
                          type="number"
                          class="form-control"
                          v-model="ndfDetails.amount"
                          :class="{
                            'border-danger':
                              !ndfDetails.amount && somethingMissing,
                          }"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="control-label">Category</label>
                        <select
                          class="form-control select2"
                          v-model="ndfDetails.category"
                          :class="{
                            'border-danger':
                              !ndfDetails.category && somethingMissing,
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
                    <div class="col-md-4">
                      <label>Date de prestation</label>
                      <br />
                      <date-picker
                        :first-day-of-week="1"
                        lang="en"
                        confirm
                        v-model="ndfDetails.date"
                        :class="{
                          'border-danger': !ndfDetails.date && somethingMissing,
                        }"
                      ></date-picker>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="control-label"
                          >Dénomination du prestataire de services</label
                        >

                        <select
                          class="form-control select3"
                          v-model="ndfDetails.serviceProviderNDF"
                          :class="{
                            'border-danger':
                              !ndfDetails.serviceProviderNDF &&
                              somethingMissing,
                          }"
                        >
                          <option
                            :value="ndfProvider.id"
                            v-for="(ndfProvider, index) in ndfProviders"
                            :key="index"
                          >
                            {{ ndfProvider.knownName }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="productdesc">Description ou commentaire</label>
                    <textarea
                      class="form-control"
                      id="productdesc"
                      rows="4"
                      v-model="ndfDetails.comment"
                    ></textarea>
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
                    <h5 class="font-size-16 mb-1">Scan de la note de frais</h5>
                    <p class="text-muted text-truncate mb-0">
                      Télécharger ci-dessous un scan clair et net de la note de
                      frais.
                    </p>
                  </div>
                  <i
                    class="mdi mdi-chevron-up accor-down-icon font-size-24"
                  ></i>
                </div>
              </div>
            </a>

            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              data-parent="#addproduct-accordion"
            >
              <div class="p-4 border-top">
                <div class="row">
                  <center>
                    <input
                      type="file"
                      id="file"
                      ref="file"
                      class="m-5"
                      v-on:change="handleFileUpload()"
                    />
                  </center>
                </div>
                <!-- <vue-dropzone
                  id="file"
                  ref="file"
                  type="file"
                  @vdropzone-complete="handleFileUpload()"
                  :use-custom-slot="true"
                  :options="dropzoneOptions"
                >
                  <div class="dropzone-custom-content">
                    <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                    <h4>
                      Déposez vos fichiers ici ou cliquez pour les télécharger.
                    </h4>
                  </div>
                </vue-dropzone> -->
                <div class="row d-flex justify-content-end p-2 pt-4">
                  <b-button variant="primary" class="btn-lg" @click="sendNDF">
                    Soumettre
                    <i class="uil uil-upload ml-6"></i>
                  </b-button>
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

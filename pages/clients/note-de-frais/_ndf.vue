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
    try {
      let result = await axios.get(
        process.env.baseUrl + "/ndfs/" + this.$route.params.ndf
      );
      this.baseUrl = process.env.baseUrl;
      result = result.data;
      console.log(result);
      this.ndfDetails = result;
      if (!this.ndfDetails.comment) {
        this.ndfDetails.comment = "Aucun commentaire ou description";
      }
      let ndfServiceProvider = await axios.get(
        process.env.baseUrl + "/ndfserviceproviders/"
      );
      ndfServiceProvider = ndfServiceProvider.data.ndfProviders;
      for (let i = 0; i < ndfServiceProvider.length; i++) {
        if (ndfServiceProvider[i].id == this.ndfDetails.serviceProviderNDF) {
          this.ndfDetails.serviceProviderNDF =
            ndfServiceProvider[i].knownName +
            "   -   " +
            ndfServiceProvider[i].address.city;
        }
      }
      this.ndfDetails.status = this.ndfDetails.status.reverse();
    } catch (error) {}
  },
  methods: {},
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
      ndfDetails: null,
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
    <div class="col-sm-12 col-md-2 mt-4">
      <div>
        <nuxt-link to="/clients/note-de-frais/mes-notes-de-frais"
          ><button type="button" class="btn btn-primary btn-sm mb-3">
            <i class="mdi mdi-arrow-left me-1"></i> Mes notes de frais
          </button></nuxt-link
        >
      </div>
    </div>

    <!-- <b-alert show dismissible variant="danger" class="mt-2" v-if="fileMissing"
      >Le scan de la note de frais n'est pas téléchargé, veuillez en télécharger
      un ci-dessous avant de soumettre.</b-alert
    > -->
    <div class="row mt-1" v-if="ndfDetails">
      <div class="col-lg-8">
        <div id="addproduct-accordion" class="custom-accordion">
          <div class="card shadow-none">
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
                      NF
                    </div>
                  </div>
                </div>
                <div class="media-body overflow-hidden">
                  <h5 class="font-size-16 mb-1">Détails de la note de frais</h5>
                  <p class="text-muted text-truncate mb-0">
                    les informations de la note de frais telles qu'elles
                    apparaissent sur le papier.
                  </p>
                </div>
                <!-- <i
                    class="mdi mdi-chevron-up accor-down-icon font-size-24"
                  ></i> -->
              </div>
            </div>

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
                          disabled
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
                          disabled
                          v-model="ndfDetails.firstName"
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
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="control-label">Category</label>
                        <input
                          id="price"
                          type="text"
                          class="form-control"
                          v-model="ndfDetails.category"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label>Date de prestation</label>

                      <input
                        id="price"
                        type="text"
                        class="form-control"
                        v-model="ndfDetails.date"
                        disabled
                      />
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="control-label"
                          >Dénomination du prestataire de services</label
                        >
                        <input
                          id="price"
                          type="text"
                          class="form-control"
                          v-model="ndfDetails.serviceProviderNDF"
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-8">
                      <label for="productdesc"
                        >Description ou commentaire</label
                      >
                      <textarea
                        class="form-control"
                        id="productdesc"
                        rows="4"
                        v-model="ndfDetails.comment"
                        disabled
                      ></textarea>
                    </div>
                    <div class="mb-3 col-md-3">
                      <div>
                        <label class="control-label">Télécharger </label>
                      </div>

                      <a :href="baseUrl + ndfDetails.scan[0].url"
                      target="_blank"
                        ><button
                          type="button"
                          class="btn btn-outline-primary  mb-3"
                        >
                          Note de frais 
                          <i class="mdi mdi-download me-1"></i></button
                      ></a>
                    </div>
                  </div>
                </form>
              </div>
            </b-collapse>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <Activityndf :status="ndfDetails.status" />
      </div>
    </div>
  </div>
</template>

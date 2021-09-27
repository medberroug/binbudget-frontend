<script>
import vue2Dropzone from "vue2-dropzone";
import Multiselect from "vue-multiselect";
import DatePicker from "vue2-datepicker";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import "vue-multiselect/dist/vue-multiselect.min.css";
import "vue2-datepicker/index.css";
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
  data() {
    return {
      defaultdate: "",
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
        maxFilesize: 0.5,
        headers: {
          "My-Awesome-Header": "header value",
        },
      },
      value1: null,
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
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="control-label">Category</label>
                        <select class="form-control select2">
                          <option>Select</option>
                          <option value="EL">Electronic</option>
                          <option value="FA">Fashion</option>
                          <option value="FI">Fitness</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label>Date de prestation</label>
                      <br />
                      <date-picker
                        v-model="defaultdate"
                        :first-day-of-week="1"
                        lang="en"
                        confirm
                      ></date-picker>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="control-label"
                          >Dénomination du prestataire de services</label
                        >
                        <multiselect
                          v-model="value1"
                          :options="options"
                          :multiple="false"
                        ></multiselect>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="productdesc">Description ou commentaire</label>
                    <textarea
                      class="form-control"
                      id="productdesc"
                      rows="4"
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
                <vue-dropzone
                  id="dropzone"
                  ref="myVueDropzone"
                  :use-custom-slot="true"
                  :options="dropzoneOptions"
                >
                  <div class="dropzone-custom-content">
                    <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                    <h4>
                      Déposez vos fichiers ici ou cliquez pour les télécharger.
                    </h4>
                  </div>
                </vue-dropzone>
               <div class="row d-flex justify-content-end p-2 pt-4">
                  <b-button variant="primary"  class="btn-lg">
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

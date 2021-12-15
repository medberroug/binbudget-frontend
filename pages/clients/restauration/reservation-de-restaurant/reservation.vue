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
  methods: {
    book() {
      this.checkValues = true;
      console.log({
        firstName: this.firstName,
        lastName: this.lastName,
        when: this.when,
        comment: this.comment,
      });
      // if(){

      // }
    },
  },
  data() {
    return {
      defaultdate: "",
      title: "Réservation de restaurant",
      details: [
        {
          text: "Réservation de restaurant",
        },
        {
          text: "Réservation",
          active: true,
        },
      ],
      checkValues: false,
      firstName: null,
      lastName: null,
      when: null,
      comment: null,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 5,
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
           <b-alert show dismissible variant="danger" v-if="checkValues"
          >Veuillez remplir tous les renseignements figurant en bordure
          rouge</b-alert
        >
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
                      Renseignements sur votre réservation
                    </h5>
                    <p class="text-muted text-truncate mb-0">
                      Insérez ci-dessous les coordonnées de la personne
                      principale qui sera responsable et présente lors de votre
                      réservation.
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
                        <label for="manufacturername">Nom </label>
                        <input
                          id="manufacturername"
                          name="manufacturername"
                          type="text"
                          class="form-control"
                          :class="{
                            'border-danger': checkValues && !lastName,
                          }"
                          v-model="lastName"
                        />
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="mb-3">
                        <label for="manufacturerbrand">Prénom</label>
                        <input
                          id="manufacturerbrand"
                          name="manufacturerbrand"
                          type="text"
                          class="form-control"
                          :class="{
                            'border-danger': checkValues && !firstName,
                          }"
                          v-model="firstName"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label>Pour le</label>
                      <br />
                      <b-form-input
                        id="date-time"
                        :class="{
                          'border-danger': checkValues && !when,
                        }"
                        value=""
                        v-model="when"
                        type="datetime-local"
                      ></b-form-input>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="productdesc">Commentaire</label>
                    <textarea
                      class="form-control"
                    
                      id="productdesc"
                      v-model="comment"
                      rows="4"
                    ></textarea>
                  </div>
                </form>
                <div class="row d-flex justify-content-end p-2 pt-4">
                  <b-button variant="primary" class="btn-lg" @click="book">
                    Réserver
                    <i class="uil uil-arrow-right ml-6"></i>
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

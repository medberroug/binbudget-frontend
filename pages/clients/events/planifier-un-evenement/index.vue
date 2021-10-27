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
  methods:{
    stepperCalculate(op){
      if(op=="add"){
        this.numberOfSteppers=this.numberOfSteppers+1
      }else {
        this.numberOfSteppers=this.numberOfSteppers-1
      }
    }
  },
  data() {
    return {
      defaultdate: "",
      title: "Planifier un evenement ",
      placeCheck:false,
      placeCheck:false,
      placeCheck:false,
      placeCheck:false,
      numberOfSteppers:2,
      actualStepper:1,
      details: [
        {
          text: "Evenement",
        },
        {
          text: "Planifier un evenement ",
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
    <PageHeader :title="title+this.actualStepper+'/'+this.numberOfSteppers" :details="details" />
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
                    <h5 class="font-size-16 mb-1">Détails de l'événement</h5>
                    <p class="text-muted text-truncate mb-0">
                      Insérez ici les informations sur l'événement ainsi qu'une
                      description, ceci nous aidera, ainsi que nos partenaires,
                      à comprendre vos besoins spécifiques.
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
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="manufacturername"
                          >Ville de l'événement</label
                        >
                        <input
                          id="manufacturername"
                          name="manufacturername"
                          type="text"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="manufacturerbrand">Date de début</label>
                        <b-form-input
                          id="date-time"
                          value="2019-08-19T13:45:00"
                          type="datetime-local"
                        ></b-form-input>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="manufacturerbrand">Jusqu'à</label>
                        <b-form-input
                          id="date-time"
                          value="2019-08-19T13:45:00"
                          type="datetime-local"
                        ></b-form-input>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="price">Nombre de participants</label>
                        <input
                          id="price"
                          name="price"
                          type="number"
                          class="form-control"
                        />
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
                    <h5 class="font-size-16 mb-1">Choisir les prestations</h5>
                    <p class="text-muted text-truncate mb-0">
                      Choisissez les services dont vous avez besoin, il vous
                      suffit de cocher les services souhaités dans ce
                      formulaire. Lorsque vous soumettez, vous aurez la
                      possibilité de choisir et de préciser les caractéristiques
                      de chaque service.
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
                <form>
                  <div class="row">
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="manufacturername"
                          >Salle de conférence (ou lieu)</label
                        >
                        <input
                          type="checkbox"
                          class="form-check-input"
                          checked="true"
                        />
                        <p class="mx-4"> Un lieu pour organiser l'événement, choisissez parmi une variété de types, salles de conférence, salles de réunion, etc.</p>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <div>
                          <label for="manufacturerbrand">Hébergement </label>
                        <input
                          type="checkbox"
                          class="form-check-input"
                          checked="true"
                        />
                        </div>
                        <p class="mx-4">Pour les participants ou le personnel.</p>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="manufacturerbrand">Services de restauration</label>
                        <input
                          type="checkbox"
                          class="form-check-input"
                          checked="true"
                          @click="stepperCalculate()"
                        />
                        <p class="mx-4">  Services de restauration, choisissez entre les fournisseurs de nourriture, des traiteurs aux restaurants spécifiques. </p>
                      </div>
                      
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="price">Système de gestion des tickets</label>
                        <input
                          type="checkbox"
                          class="form-check-input"
                          checked="true"
                        />
                        <p class="mx-4">Si vous avez des invités, vous pouvez utiliser notre système de gestion des tickets où vous pouvez gérer les entrées et sorties des invités avec un code QR ainsi que vérifier le statut de leur présence.</p>
                      </div>
                      
                    </div>
                  </div>

                  
                </form>
                <div class="row d-flex justify-content-end p-2 pt-4">
                  <b-button variant="primary" class="btn-lg">
                    Créez votre événement
                    <i class="uil-arrow-from-right"></i>
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

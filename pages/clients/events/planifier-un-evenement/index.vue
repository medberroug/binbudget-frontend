<script>
import vue2Dropzone from "vue2-dropzone";
import Multiselect from "vue-multiselect";
import DatePicker from "vue2-datepicker";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import "vue-multiselect/dist/vue-multiselect.min.css";
import "vue2-datepicker/index.css";
import Switches from "vue-switches";
import { MoroccoCities } from "../../../../components/widgets/MaCities";
import {
  required,
  email,
  minLength,
  sameAs,
  maxLength,
  minValue,
  maxValue,
  numeric,
  url,
  alphaNum,
} from "vuelidate/lib/validators";
import {
  persistData,
  getData,
} from "../../../../components/controllers/savingData";
/**
 * Add-product component
 */
export default {
  components: {
    vueDropzone: vue2Dropzone,
    Multiselect,
    DatePicker,
    Switches,
  },
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  mounted() {
    // this.tester = getData("event");
    // console.log(getData("event"));
    // persistData("event", this.eventDetails);
    if (getData("event")) {
      if (getData("event").whereIamName == "place") {
        this.$router.push({
          path: "/clients/events/planifier-un-evenement/place",
        });
      } else if (getData("event").whereIamName == "hosting") {
        this.$router.push({
          path: "/clients/events/planifier-un-evenement/hosting",
        });
      } else if (getData("event").whereIamName == "restauration") {
        this.$router.push({
          path: "/clients/events/planifier-un-evenement/restauration",
        });
      } else if (getData("event").whereIamName == "tms") {
        this.$router.push({
          path: "/clients/events/planifier-un-evenement/tms",
        });
      } else if (getData("event").whereIamName == "service") {
        this.$router.push({
          path: "/clients/events/planifier-un-evenement/service",
        });
      } else if (getData("event").whereIamName == "terminer") {
        this.$router.push({
          path: "/clients/events/planifier-un-evenement/terminer",
        });
      }
    }
  },
  methods: {
    createEvent() {
      this.submitted = true;
      if (
        !this.eventDetails.name ||
        !this.eventDetails.description ||
        !this.eventDetails.city ||
        !this.eventDetails.startDate ||
        !this.eventDetails.endDate ||
        !this.eventDetails.numberOfAttendees
      ) {
        this.somthingIsmissing = true;
      } else {
         this.somthingIsmissing = false;
        this.eventDetails.placeCheck = this.placeCheck;
        this.eventDetails.hostingCheck = this.hostingCheck;
        this.eventDetails.restaurationCheck = this.restaurationCheck;
        this.eventDetails.tmsCheck = this.tmsCheck;
        this.eventDetails.whereIam = 2;
        this.eventDetails.whereIamName = "service";

        if (this.placeCheck) {
          this.eventDetails.whereIamName = "place";
        } else if (this.hostingCheck) {
          this.eventDetails.whereIamName = "hosting";
        } else if (this.restaurationCheck) {
          this.eventDetails.whereIamName = "restauration";
        } else if (this.tmsCheck) {
          this.eventDetails.whereIamName = "tms";
        }
        persistData("event", this.eventDetails);
        //       this.$router.push({
        //     path: '/clients/restauration/livraison-de-repas'
        // })

        if (this.placeCheck) {
          this.$router.push({
            path: "/clients/events/planifier-un-evenement/place",
          });
        } else if (this.hostingCheck) {
          this.$router.push({
            path: "/clients/events/planifier-un-evenement/hosting",
          });
        } else if (this.restaurationCheck) {
          this.$router.push({
            path: "/clients/events/planifier-un-evenement/restauration",
          });
        } else if (this.tmsCheck) {
          this.$router.push({
            path: "/clients/events/planifier-un-evenement/tms",
          });
        } else {
          this.$router.push({
            path: "/clients/events/planifier-un-evenement/service",
          });
        }
        this.$router.go();
      }
    },
    stepperCalculate(checker) {
      console.log("Im clicked " + checker);
      if (checker == "placeCheck") {
        if (this.placeCheck) {
          this.placeCheck = false;
          this.numberOfSteppers = this.numberOfSteppers - 1;
        } else {
          this.placeCheck = true;
          this.numberOfSteppers = this.numberOfSteppers + 1;
        }
      }
      if (checker == "hostingCheck") {
        if (this.hostingCheck) {
          this.hostingCheck = false;
          this.numberOfSteppers = this.numberOfSteppers - 1;
        } else {
          this.hostingCheck = true;
          this.numberOfSteppers = this.numberOfSteppers + 1;
        }
      }
      if (checker == "restaurationCheck") {
        if (this.restaurationCheck) {
          this.restaurationCheck = false;
          this.numberOfSteppers = this.numberOfSteppers - 1;
        } else {
          this.restaurationCheck = true;
          this.numberOfSteppers = this.numberOfSteppers + 1;
        }
      }
      if (checker == "tmsCheck") {
        if (this.tmsCheck) {
          this.tmsCheck = false;
          this.numberOfSteppers = this.numberOfSteppers - 1;
        } else {
          this.tmsCheck = true;
          this.numberOfSteppers = this.numberOfSteppers + 1;
        }
      }
    },
  },
  data() {
    return {
      defaultdate: "",
      title: "Planifier un evenement ",
      placeCheck: false,
      hostingCheck: false,
      restaurationCheck: false,
      tmsCheck: false,
      numberOfSteppers: 2,
      actualStepper: 1,
      moroccoCities: MoroccoCities,
      submitted: false,

      eventDetails: {
        name: null,
        description: null,
        city: null,
        startDate: null,
        endDate: null,
        numberOfAttendees: null,
        placeCheck: this.placeCheck,
        hostingCheck: this.hostingCheck,
        restaurationCheck: this.restaurationCheck,
        tmsCheck: this.tmsCheck,
        whereIam: 1,
        whereIamName: null,
      },
      somthingIsmissing: false,
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
    <PageHeader :title="title" :details="details" />
    <div class="row mt-3">
      <div class="col-lg-12">
        <b-alert variant="danger" show v-if="somthingIsmissing"
          >Vous avez des champs manquants, veuillez remplir tous les ??l??ments
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
                    <h5 class="font-size-16 mb-1">D??tails de l'??v??nement</h5>
                    <p class="text-muted text-truncate mb-0">
                      Ins??rez ici les informations sur l'??v??nement ainsi qu'une
                      description, ceci nous aidera, ainsi que nos partenaires,
                      ?? comprendre vos besoins sp??cifiques.
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
                    <div class="col-lg-12">
                      <div class="mb-3">
                        <label for="price">Nom de l'??v??nement</label>
                        <input
                          id="price"
                          name="price"
                          type="text"
                          v-model="eventDetails.name"
                          class="form-control"
                          :class="{
                            'is-invalid': submitted && !eventDetails.name,
                          }"
                          required
                        />
                        <div
                          v-if="submitted && !eventDetails.name"
                          class="invalid-feedback"
                        >
                          <span>Cette valeur est obligatoire.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="manufacturername"
                          >Ville de l'??v??nement</label
                        >
                        
                        <multiselect
                          v-model="eventDetails.city"
                          :options="this.moroccoCities"
                          :multiple="false"
                          :class="{
                            'is-invalid': submitted && !eventDetails.city,
                          }"
                        ></multiselect>
                        <div
                          v-if="submitted && !eventDetails.city"
                          class="invalid-feedback"
                        >
                          <span>Cette valeur est obligatoire.</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="manufacturerbrand">Date de d??but</label>
                        <b-form-input
                          id="date-time"
                          v-model="eventDetails.startDate"
                          value=""
                          type="datetime-local"
                          :class="{
                            'is-invalid': submitted && !eventDetails.startDate,
                          }"
                        ></b-form-input>
                        <div
                          v-if="submitted && !eventDetails.startDate"
                          class="invalid-feedback"
                        >
                          <span>Cette valeur est obligatoire.</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="manufacturerbrand">Jusqu'??</label>
                        <b-form-input
                          id="date-time"
                          v-model="eventDetails.endDate"
                          type="datetime-local"
                          :class="{
                            'is-invalid': submitted && !eventDetails.endDate,
                          }"
                        ></b-form-input>
                        <div
                          v-if="submitted && !eventDetails.endDate"
                          class="invalid-feedback"
                        >
                          <span>Cette valeur est obligatoire.</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label for="price">Nombre de participants</label>
                        <input
                          id="price"
                          name="price"
                          type="number"
                          v-model="eventDetails.numberOfAttendees"
                          class="form-control"
                          :class="{
                            'is-invalid':
                              submitted && !eventDetails.numberOfAttendees,
                          }"
                        />
                        <div
                          v-if="submitted && !eventDetails.numberOfAttendees"
                          class="invalid-feedback"
                        >
                          <span>Cette valeur est obligatoire.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="productdesc">Description ou commentaire</label>
                    <textarea
                      class="form-control"
                      v-model="eventDetails.description"
                      id="productdesc"
                      rows="4"
                      :class="{
                        'is-invalid': submitted && !eventDetails.description,
                      }"
                    ></textarea>
                    <div
                      v-if="submitted && !eventDetails.description"
                      class="invalid-feedback"
                    >
                      <span>Cette valeur est obligatoire.</span>
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
              aria-expanded="true"
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
                      suffit de cocher les services souhait??s dans ce
                      formulaire. Lorsque vous soumettez, vous aurez la
                      possibilit?? de choisir et de pr??ciser les caract??ristiques
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
                        <center>
                          <label for="manufacturername"
                            >Salle de conf??rence (ou lieu)</label
                          >
                          <div class="mt-3">
                            <switches
                              v-model="placeCheck"
                              type-bold="false"
                              color="info"
                              class="ml-1 mb-0"
                              @click="stepperCalculate('placeCheck')"
                            ></switches>
                          </div>
                          <p class="mx-4">
                            Un lieu pour organiser l'??v??nement, choisissez parmi
                            une vari??t?? de types, salles de conf??rence, salles
                            de r??union, etc.
                          </p>
                        </center>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <center>
                          <div>
                            <label for="manufacturerbrand"
                              >Hotel (ou h??bergement)
                            </label>
                          </div>
                          <div class="mt-3">
                            <switches
                              v-model="hostingCheck"
                              type-bold="false"
                              color="info"
                              class="ml-1 mb-0"
                              @click="stepperCalculate('hostingCheck')"
                            ></switches>
                          </div>
                          <p class="mx-4">
                            Pour les participants ou le personnel.
                          </p>
                        </center>
                      </div>
                    </div>

                    <div class="col-lg-3">
                      <div class="mb-3">
                        <center>
                          <label for="manufacturerbrand"
                            >Services de restauration</label
                          >
                          <div class="mt-3">
                            <switches
                              v-model="restaurationCheck"
                              type-bold="false"
                              color="info"
                              class="ml-1 mb-0"
                              @click="stepperCalculate('restaurationCheck')"
                            ></switches>
                          </div>
                          <p class="mx-4">
                            Services de restauration, choisissez entre les
                            fournisseurs de nourriture, des traiteurs aux
                            restaurants sp??cifiques.
                          </p>
                        </center>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <center>
                          <label for="price"
                            >Syst??me de gestion des tickets</label
                          >
                          <div class="mt-3">
                            <switches
                              v-model="tmsCheck"
                              type-bold="false"
                              color="info"
                              class="ml-1 mb-0"
                              @change="stepperCalculate('tmsCheck')"
                            ></switches>
                          </div>
                          <p class="mx-4">
                            Si vous avez des invit??s, vous pouvez utiliser notre
                            syst??me de gestion des tickets o?? vous pouvez g??rer
                            les entr??es et sorties des invit??s avec un code QR
                            ainsi que v??rifier le statut de leur pr??sence.
                          </p>
                        </center>
                      </div>
                    </div>
                  </div>
                </form>
                <div class="row d-flex justify-content-end p-2 pt-4">
                  <b-button
                    variant="primary"
                    class="btn-lg"
                    @click="createEvent"
                  >
                    Cr??ez votre ??v??nement
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

<template>
  <div>
    <PageHeader :title="title" :details="details" />
    <div class="row">
      <div class="col-xl-6 col-lg-6"></div>
      <div class="col-xl-6 col-lg-6 flex d-flex justify-content-end">
        <b-button @click="goNextStep()" class="mt-3" variant="primary">
          {{ nextPage }} <i class="uil-arrow-right"> </i
        ></b-button>
      </div>
    </div>
    <div class="row mt-4" v-if="loader">
      <div class="col-xl-12 col-lg-12">
        <div class="row">
          <center v-if="myItems.length == 0">
            <p>Aucun fournisseur de services à montrer</p>
          </center>
          <item-card
            class=""
            v-for="(item, index) in myItems"
            :id="item.id"
            :key="index"
            :name="item.name"
            :img="item.firstImage"
            :img_icon="item.logo"
            :bg-color="colours[0].bg"
            :text-color="colours[0].text"
            :rating="item.rating"
            :city="item.city"
            :speciality="item.spec"
            :parentlink="'service'"
            :spId="item.spId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ItemCard from "../../../../../components/ItemCardPlace.vue";
import PageHeader from "../../../../../components/Page-header.vue";
import {
  getData,
  eventStepperCalculator,
  removeData,
  eventNextStep,
} from "../../../../../components/controllers/savingData";
export default {
  head() {
    return {
      title: `${this.title} |  BinBudget Portail client`,
    };
  },
  components: {
    ItemCard,
    PageHeader,
  },
  /**
   * Sur Carte Details
   */
  async mounted() {
    this.myEvent = getData("event");

    this.nextPage = eventNextStep(false);

    if (this.nextPage == true) {
      this.nextPage = "Terminer";
    }
    this.stepperTotal = eventStepperCalculator();
    this.stepperText =
      ": Autre service | " + this.myEvent.whereIam + "/" + this.stepperTotal;
    this.title = this.title + this.stepperText;

    try {
      let result = await axios.get(
        process.env.baseUrl + "/getListOfService/" + this.myEvent.city
      );
      result = result.data;
      this.myItems = result;

      this.loader = true;
    } catch (error) {}
  },
  methods: {
    goNextStep() {
      eventNextStep(true);

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
    },
    cancelEvent() {
      removeData("event");
      this.$router.push({
        path: "/clients/events/planifier-un-evenement",
      });
    },
  },
  data() {
    return {
      title: "Planifier mon evenement ",
      restaurants: [],
      filtredRestaurants: [],
      shownInIndicator: "event-service",
      cities: [],
      nextPage: null,
      myEvent: null,
      myItems: null,
      stepperTotal: null,
      stepperText: null,
      loader: false,
      details: [
        {
          text: "Planifier mon evenement",
        },
        {
          text: "Autre service",
          active: true,
        },
      ],
      colours: [
        { bg: "red", text: "text-white" },
        { bg: "orange", text: "text-white" },
        { bg: "blue", text: "text-white" },
        { bg: "green", text: "text-white" },
        { bg: "blue", text: "text-white" },
      ],
    };
  },
  computed: {},
};
</script>
<style scoped>
</style>
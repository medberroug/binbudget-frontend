<template>
  <div>
    <PageHeader :title="title" :details="details" />
    <div class="row">
      <div class="col-xl-6 col-lg-6">
        <b-button @click="cancelEvent()" class="mt-3" variant="outline-danger">
          <i class="uil-trash-alt"> </i> Annuler mon evenement</b-button
        >
      </div>
      <div class="col-xl-6 col-lg-6 flex d-flex justify-content-end">
        <b-button @click="goNextStep()" class="mt-3" variant="primary">
          {{nextPage}} <i class="uil-arrow-right"> </i
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
            :bg-color="colours[index].bg"
            :text-color="colours[index].text"
            :rating="item.rating"
            :city="item.city"
            :speciality="item.spec"
            :parentlink="'place'"
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
  eventNextStep
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
    
    this.nextPage=eventNextStep(false)
    this.stepperTotal = eventStepperCalculator();
    this.stepperText =
      ": Salle de conférence (ou lieu) | " +
      this.myEvent.whereIam +
      "/" +
      this.stepperTotal;
    this.title = this.title + this.stepperText;

    try {
      let result = await axios.get(
        process.env.baseUrl + "/getListOfPlaces/" + this.myEvent.city
      );
      result = result.data;
      this.myItems = result;
      console.log("PLACES");
      console.log(result);
      this.loader = true;
    } catch (error) {}
  },
  methods: {
    goNextStep(){},
    cancelEvent() {
      removeData("event");
      this.$router.go(-1);
    },
  },
  data() {
    return {
      title: "Planifier mon evenement ",
      restaurants: [],
      filtredRestaurants: [],
      shownInIndicator: "livraison-de-repas",
      cities: [],
      nextPage:null,
      myEvent: null,
      myItems: null,
      stepperTotal: null,
      stepperText: null,
      loader: false,
      details: [
        {
          text: "Restauration",
        },
        {
          text: "Livraison de repas",
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
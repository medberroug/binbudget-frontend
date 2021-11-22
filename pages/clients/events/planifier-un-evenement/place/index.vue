<template>
  <div>
    <PageHeader :title="title" :details="details" />
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
            :parentlink="'livraison-de-repas'"
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
    this.myEvent.whereIam = this.myEvent.whereIam + 1;
    this.stepperTotal = eventStepperCalculator();
    this.stepperText=": Salle de conférence (ou lieu) | "+this.myEvent.whereIam+"/"+this.stepperTotal
    this.title=this.title+this.stepperText
    console.log(this.myEvent);
    try {
      let result = await axios.get(
        process.env.baseUrl + "/getListOfPlaces/"+this.myEvent.city
      );
      result=result.data
      this.myItems=result
      console.log("PLACES");
      console.log(result);
      this.loader=true
    } catch (error) {
      
    }
    // try {
    //   let result = await axios.get(
    //     process.env.baseUrl + "/restaurations?status=true"
    //   );
    //   result = result.data;
    //   for (let i = 0; i < result.length; i++) {
    //     let exist = false;
    //     for (let j = 0; j < result[i].shownIn.length; j++) {
    //       if (result[i].shownIn[j].serviceName == "livraison-de-repas") {
    //         exist = true;
    //       }
    //     }
    //     if (exist) {
    //       let myspeciality = "";
    //       for (let k = 0; k < result[i].speciality.length; k++) {
    //         if (!this.filterSpeciality.includes(result[i].speciality[k].name)) {
    //           this.filterSpeciality.push(result[i].speciality[k].name);
    //         }
    //         myspeciality = myspeciality + result[i].speciality[k].name + ", ";
    //       }

    //       let newItem = {
    //         _id: result[i]._id,
    //         knownName: result[i].knownName,
    //         city: result[i].address.city,
    //         speciality: myspeciality,
    //         rating: result[i].ratingTotal,
    //         logo: process.env.baseUrl + result[i].logo.url,
    //         topImage: process.env.baseUrl + result[i].topImage.url,
    //       };

    //       this.restaurants.push(newItem);
    //       this.filtredRestaurants.push(newItem);
    //       if (!this.cities.includes(result[i].address.city)) {
    //         this.cities.push(result[i].address.city);
    //       }
    //     }
    //   }
    //   this.loader=true
    // } catch (error) {}
  },
  methods: {
    
  
  },
  data() {
    return {
      title:
        "Planifier mon evenement ",
      restaurants: [],
      filtredRestaurants: [],
      shownInIndicator: "livraison-de-repas",
      cities: [],
      myEvent: null,
      myItems:null,
      stepperTotal: null,
      stepperText:null,
      loader:false,
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
  computed: {
  
  },
};
</script>

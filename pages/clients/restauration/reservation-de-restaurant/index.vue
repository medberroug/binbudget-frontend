<template>
  <div>
    <PageHeader :title="title" :details="details" />
   <center>
      <h3 class="m-5">En cours</h3>
    <p class="m-5">  En cours de test.</p>
    </center>
  </div>
</template>

<script>
import axios from "axios";
import ItemCard from "../../../../components/ItemCardReservation";
import PageHeader from "../../../../components/Page-header";
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
    try {
      let result = await axios.get(
        process.env.baseUrl + "/restaurations?status=true"
      );
      result = result.data;
      for (let i = 0; i < result.length; i++) {
        let exist = false;
        for (let j = 0; j < result[i].shownIn.length; j++) {
          if (result[i].shownIn[j].serviceName == "reservation-de-restaurant") {
            exist = true;
          }
        }
        if (exist) {
          let myspeciality = "";
          for (let k = 0; k < result[i].speciality.length; k++) {
            if (!this.filterSpeciality.includes(result[i].speciality[k].name)) {
              this.filterSpeciality.push(result[i].speciality[k].name);
            }
            myspeciality = myspeciality + result[i].speciality[k].name + ", ";
          }

          let newItem = {
            _id: result[i]._id,
            knownName: result[i].knownName,
            city: result[i].address.city,
            speciality: myspeciality,
            rating: result[i].ratingTotal,
            logo: process.env.baseUrl + result[i].logo.url,
            topImage: process.env.baseUrl + result[i].topImage.url,
            menu:result[i].textMenu 
          };

          this.restaurants.push(newItem);
          this.filtredRestaurants.push(newItem);
          if (!this.cities.includes(result[i].address.city)) {
            this.cities.push(result[i].address.city);
          }
        }
      }
      console.log(  this.restaurants);
    } catch (error) {}
  },
  methods: {
    specialityFilterController(value) {
      this.filterSpecialityControllerValue = value;
      let judger = "";
      if (this.filterCityControllerValue != "All cities") {
        judger = this.filterCityControllerValue;
      }

      if (this.filterSpecialityControllerValue == "All restaurants") {
        this.filtredRestaurants = [];

        for (let i = 0; i < this.restaurants.length; i++) {
          if (
            this.restaurants[i].speciality.includes("") &&
            this.restaurants[i].city.includes(judger)
          ) {
            this.filtredRestaurants.push(this.restaurants[i]);
          }
        }
      } else {
        this.filtredRestaurants = [];
        for (let i = 0; i < this.restaurants.length; i++) {
          if (
            this.restaurants[i].speciality.includes(
              this.filterSpecialityControllerValue
            ) &&
            this.restaurants[i].city.includes(judger)
          ) {
            this.filtredRestaurants.push(this.restaurants[i]);
          }
        }
      }
    },
    cityFilterController(value) {
      this.filterCityControllerValue = value;
      let judger = "";
      if (this.filterSpecialityControllerValue != "All restaurants") {
        judger = this.filterSpecialityControllerValue;
      }

      if (this.filterCityControllerValue == "All cities") {
        this.filtredRestaurants = [];
        for (let i = 0; i < this.restaurants.length; i++) {
          if (
            this.restaurants[i].city.includes("") &&
            this.restaurants[i].speciality.includes(judger)
          ) {
            this.filtredRestaurants.push(this.restaurants[i]);
          }
        }
      } else {
        this.filtredRestaurants = [];
        for (let i = 0; i < this.restaurants.length; i++) {
          if (
            this.restaurants[i].city.includes(this.filterCityControllerValue) &&
            this.restaurants[i].speciality.includes(judger)
          ) {
            this.filtredRestaurants.push(this.restaurants[i]);
          }
        }
      }
    },
  },
  data() {
    return {
      title: "R??servation de restaurant",
      restaurants: [],
      filtredRestaurants: [],
      shownInIndicator: "reservation-de-restaurant",
      cities: [],
      filterSpeciality: [],
      filterCityControllerValue: "All cities",
      filterSpecialityControllerValue: "All restaurants",

      details: [
        {
          text: "Restauration",
        },
        {
          text: "R??servation de restaurant",
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
    shuffleArray(array) {
      if (!array || array.length <= 1) return array;
      array = array.slice();
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
   
  },
};
</script>

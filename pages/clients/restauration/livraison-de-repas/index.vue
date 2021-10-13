<template>
  <div>
    <PageHeader :title="title" :details="details" />
    <div class="row mt-4">
      <div class="col-xl-3 col-lg-4">
        <div class="card">
          <div class="card-header bg-transparent border-bottom">
            <h5 class="mb-0">Filters</h5>
          </div>
          <!-- Page Categories -->
          <div class="p-4">
            <h5 class="font-size-14 mb-3">Categories</h5>
            <div class="custom-accordion">
              <!-- city filter -->
              <a
                class="text-body font-weight-semibold pb-2 d-block"
                data-toggle="collapse"
                href="javascript: void(0);"
                role="button"
                aria-expanded="false"
                v-b-toggle.city-collapse
              >
                <i
                  class="mdi mdi-chevron-up accor-down-icon text-primary mr-1"
                ></i>
                City
              </a>
              <b-collapse visible id="city-collapse">
                <div class="card p-2 border shadow-none">
                  <ul class="list-unstyled categories-list mb-0">
                    <li
                      v-on:click="cityFilterController('All cities')"
                      :class="[
                        {
                          active: filterCityControllerValue == 'All cities',
                        },
                        '',
                      ]"
                    >
                      <a href="#">
                        <i class="mdi mdi-circle-medium mr-1"></i> All cities
                      </a>
                    </li>
                    <li
                      v-for="(city, myCityIndex) in cities"
                      :key="myCityIndex"
                      v-on:click="cityFilterController(city)"
                      :class="[
                        {
                          active: city == filterCityControllerValue,
                        },
                        '',
                      ]"
                    >
                      <a href="#">
                        <i class="mdi mdi-circle-medium mr-1"></i> {{ city }}
                      </a>
                    </li>
                  </ul>
                </div>
              </b-collapse>
              <!-- Speciality filter  -->
              <a
                class="text-body font-weight-semibold pb-2 d-block"
                data-toggle="collapse"
                href="javascript: void(0);"
                role="button"
                aria-expanded="false"
                v-b-toggle.speciality-collapse
              >
                <i
                  class="mdi mdi-chevron-up accor-down-icon text-primary mr-1"
                ></i>
                Speciality
              </a>
              <b-collapse visible id="speciality-collapse">
                <div class="card p-2 border shadow-none">
                  <ul class="list-unstyled categories-list mb-0">
                    <li
                      v-on:click="specialityFilterController('All restaurants')"
                      :class="[
                        {
                          active:
                            filterSpecialityControllerValue ==
                            'All restaurants',
                        },
                        '',
                      ]"
                    >
                      <a href="#">
                        <i class="mdi mdi-circle-medium mr-1"></i> All
                        restaurants
                      </a>
                    </li>
                    <li
                      v-for="(
                        speciality, mySpecialityIndex
                      ) in filterSpeciality"
                      :key="mySpecialityIndex"
                      v-on:click="specialityFilterController(speciality)"
                      :class="[
                        {
                          active: speciality == filterSpecialityControllerValue,
                        },
                        '',
                      ]"
                    >
                      <a href="#">
                        <i class="mdi mdi-circle-medium mr-1"></i>
                        {{ speciality }}
                      </a>
                    </li>
                  </ul>
                </div>
              </b-collapse>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-9 col-lg-8">
        <div class="row">
          <center v-if="filtredRestaurants.length == 0">
            <p>Aucun fournisseur de services à montrer</p>
          </center>
          <item-card
            class=""
            v-for="(item, index) in filtredRestaurants"
            :id="item._id"
            :key="index"
            :name="item.knownName"
            :img="item.topImage"
            :img_icon="item.logo"
            :bg-color="colours[index].bg"
            :text-color="colours[index].text"
            :rating="item.rating"
            :city="item.city"
            :speciality="item.speciality"
            :parentlink="'livraison-de-repas'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ItemCard from "../../../../components/ItemCard";
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
          if (result[i].shownIn[j].serviceName == "livraison-de-repas") {
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
          };

          this.restaurants.push(newItem);
          this.filtredRestaurants.push(newItem);
          if (!this.cities.includes(result[i].address.city)) {
            this.cities.push(result[i].address.city);
          }
        }
      }
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
      title: "Livraison de repas",
      restaurants: [],
      filtredRestaurants: [],
      shownInIndicator: "livraison-de-repas",
      cities: [],
      filterSpeciality: [],
      filterCityControllerValue: "All cities",
      filterSpecialityControllerValue: "All restaurants",

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
    colours() {
      this.shuffleArray(this.colours);
    },
  },
};
</script>

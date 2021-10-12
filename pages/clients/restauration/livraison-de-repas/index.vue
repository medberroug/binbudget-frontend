<template>
  <div>
    <PageHeader :title="title" :details="details" />

    <div class="row">
      <item-card
        class="mt-4"
        v-for="(item, index) in restaurants"
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
            myspeciality = result[i].speciality[k].name + ", ";
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
        }
      }
      console.log(this.restaurants);
    } catch (error) {}
  },

  data() {
    return {
      title: "Livraison de repas",
      restaurants: [],
      shownInIndicator: "livraison-de-repas",
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

      items: [
        {
          name: "Shiro Restaurant and Bar",
          service: "West Coast",
          img_icon:
            "https://s3.amazonaws.com/thumbnails.venngage.com/template/6114cd0a-e706-4e1b-85b5-8aca4c480570.png",
          img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
          rating: `4.5`,
          reviews: "234",
          city: "Casablanca",
          earned: "+10K",
          speciality: "Western Cusine",
        },
        {
          name: "Product 2",
          service: "New Product 2",
          img_icon:
            "https://s3.amazonaws.com/thumbnails.venngage.com/template/6114cd0a-e706-4e1b-85b5-8aca4c480570.png",
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Barbieri_-_ViaSophia25668.jpg/1200px-Barbieri_-_ViaSophia25668.jpg",
          rating: 3.5,
          reviews: "342",
          city: "Casablanca",
          earned: "+40M",
          speciality: "French Cusine",
        },
        {
          name: "Product 3",
          service: "New Product 3",
          img_icon:
            "https://s3.amazonaws.com/thumbnails.venngage.com/template/6114cd0a-e706-4e1b-85b5-8aca4c480570.png",
          img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
          rating: 1.5,
          reviews: "126",
          city: "Casablanca",
          earned: "+30K",
          speciality: "Italian Cusine",
        },
        {
          name: "Product 4",
          service: "New Product 4",
          img_icon:
            "https://s3.amazonaws.com/thumbnails.venngage.com/template/6114cd0a-e706-4e1b-85b5-8aca4c480570.png",
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Barbieri_-_ViaSophia25668.jpg/1200px-Barbieri_-_ViaSophia25668.jpg",

          rating: 4.5,
          reviews: "734",
          city: "Casablanca",
          earned: "+26K",
          speciality: "Cuban Cusine",
        },
        {
          name: "Product 5",
          service: "New Product 5",
          img_icon:
            "https://s3.amazonaws.com/thumbnails.venngage.com/template/6114cd0a-e706-4e1b-85b5-8aca4c480570.png",
          img: "https://images.unsplash.com/photo-1586999768265-24af89630739?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
          rating: 4.5,
          reviews: "768",
          city: "Rabat Sale",
          earned: "+100K",
          speciality: "African Cusine",
        },
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

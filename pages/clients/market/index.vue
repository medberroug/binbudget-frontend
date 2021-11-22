<script>
/**
 * Starter page
 */
import axios from "axios";
export default {
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  async mounted() {
    try {
      this.baseUrl = process.env.baseUrl;
      let result = await axios.get(process.env.baseUrl + "/marketcategories");
      result = result.data;
      this.categories = result;
    } catch (error) {}
  },

  data() {
    return {
      title: "BinBudget Market",
      categories: null,
      baseUrl: null,
      items: [
        {
          text: "Market",
          active: true,
        },
      ],
    };
  },
  middleware: "authentication",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row mt-4">
      <div
        class="col-xl-2 col-lg-3 col-md-4 col-sm-6"
        v-for="(category, index) in categories"
        :key="index"
      >
        <NuxtLink
          :to="'/clients/market/category/' + category.id"
          
          ><b-card
            overlay
            :img-src="baseUrl + category.image.url"
            img-alt="Card Image"
            text-variant="white"
          >
            <b-card-title>
              <h3 class="text-white">{{ category.name }}</h3>
            </b-card-title>
          </b-card></NuxtLink
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>
<template>
  <div class="row">
    <item-card
      v-for="(item, index) in items"
      :key="index"
      :name="item.name"
      :service="item.service"
      :img="item.img"
      :rating="item.rating"
      :city="item.city"
      :earned="item.earned"
    />
  </div>
</template>

<script>
import ItemCard from "../../../components/ItemCard";
export default {
  components: {
    ItemCard
  },
  data: () => ({
    items: [
      {
        name: "Product 1",
        service: "New Product",
        img:
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
        rating: 2.5,
        reviews: 234,
        city: "Casablanca",
        earned: "+10K"
      },
      {
        name: "Product 2",
        service: "New Product 2",
        img:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Barbieri_-_ViaSophia25668.jpg/1200px-Barbieri_-_ViaSophia25668.jpg",
        rating: 3.5,
        reviews: 356,
        city: "Casablanca",
        earned: "+40M"
      },
      {
        name: "Product 3",
        service: "New Product 3",
        img:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
        rating: 1.5,
        reviews: 444,
        city: "Casablanca",
        earned: "+30K"
      },
      {
        name: "Product 4",
        service: "New Product 4",
        img:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Barbieri_-_ViaSophia25668.jpg/1200px-Barbieri_-_ViaSophia25668.jpg",
        rating: 4.5,
        reviews: 678,
        city: "Casablanca",
        earned: "+26K"
      }
    ]
  })
};
</script>

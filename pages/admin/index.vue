<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import axios from 'axios';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  head() {
    return {
      title: `Tableau de bord | BinBudget`,
    };
  },
  data() {
    return {
      title: "Tableau de bord",
      items: [
        {
          text: "Binbudget",
        },
        {
          text: "Clients - Tableau de bord",
          active: true,
        },
      ],
      center: {
        lat: 34.01325,
        lng: -6.83255
      },
      zoom: 12,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      orders: []
    };
  },
  methods: {
    async getOrdersGeoPoints(){
        try {
          const response = await axios.get('https://api.binbudget.com/getOrdersGeoPoints')
          return response.data.data;
        } catch (error) {
          console.log(error);
        }
    },
  },
  mounted(){
  axios.get('https://api.binbudget.com/getOrdersGeoPoints')
    .then(response => {
      const points = response.data;
      this.points = points;
      this.map = new L.Map('map', {
        center: [points[0].lat, points[0].long],
        zoom: 12
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      points.forEach(point => {
        const marker = L.marker([point.lat, point.long]).addTo(this.map);
        marker.bindPopup(`<b>Order ID:</b> ${point.id}`);
      });
    });
},

  
  middleware: "authentication",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <center>
      <h3 class="m-5">En cours</h3>
    </center>
    <div id="map" style="height: 400px"></div>
  </div>
</template>

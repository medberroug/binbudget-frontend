<script>
/**
 * Dashboard component
 */
const fs = require('fs');
export default {
  
  head() {
    return {
      title: `Tableau de bord | BinBudget`,
    };
  },
  methods: {
   
  },
  mounted(){
    fs.readFile('/root/.pm2/logs/strapi-out.log', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  this.logs=data
  console.log(data);
});
  },
  data() {
    return {
      title: "Tableau de bord",
      logs:null,
      items: [
        {
          text: "Binbudget",
        },
        {
          text: "Clients - Tableau de bord",
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
    <center>
      
      <h3 class="m-5">En cours</h3>
      <p class="m-5">En cours de test.</p>
      <p>{{logs}}</p>
    </center>
  </div>
</template>

<style></style>

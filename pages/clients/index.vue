<script>
/**
 * Dashboard component
 */
export default {
  head() {
    return {
      title: `Tableau de bord | BinBudget`,
    };
  },
  methods: {
   
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
    </center>
  </div>
</template>

<style></style>

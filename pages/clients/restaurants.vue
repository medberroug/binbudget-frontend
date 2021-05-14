<script>
/**
 * Restaurants component
 */
export default {
  head() {
    return {
      title: `Client Restaurants | BinBudget`
    };
  },
  data() {
    return {
      title: "Restaurants Page",
      items: [
        {
          text: "Binbudget"
        },
        {
          text: "Clients Dashboard"
        },
        {
          text: "Restaurants Page",
          active: true
        }
      ]
    };
  },
  middleware: "authentication"
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
  </div>
</template>

<style></style>

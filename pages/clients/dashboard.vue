<script>
/**
 * Dashboard component
 */
export default {
  head() {
    return {
      title: `Dashboard | BinBudget`
    };
  },
  data() {
    return {
      title: "Client's Dashboard",
      items: [
        {
          text: "Binbudget"
        },
        {
          text: "Clients Dashboard",
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

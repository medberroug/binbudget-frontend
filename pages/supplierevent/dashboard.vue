<script>
/**
 * Dashboard component
 */
import { getData } from "../../components/controllers/savingData";
export default {
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  data() {
    return {
      title: "Tableau de bord",
      items: [
        {
          text: "Minible",
        },
        {
          text: "Dashboard",
          active: true,
        },
      ],
      mySupplierId: null,
    };
  },
  mounted() {
    this.mySupplierId = getData("accountinfo").id;
  },
  middleware: "authentication",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="mt-4"></div>
    <StatEvents />

    <div class="row">
      <SalesAnalyticsEvents />
      <div class="col-xl-4">
        <div class="card bg-primary">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-sm-8">
                <p class="text-white font-size-18">
                  Améliorez vos ventes grâce à une meilleure sensibilisation,
                  <b>BinBudget Premium</b>
                  <!-- <i class="mdi mdi-arrow-right"></i> -->
                </p>
                <div class="mt-4">
                  <!-- <a
                  disabled
                    href="javascript: void(0);"
                    class="btn btn-success waves-effect waves-light"
                    >Bientôt</a
                  > -->
                </div>
              </div>
              <div class="col-sm-4">
                <div class="mt-4 mt-sm-0">
                  <img
                    src="~/assets/images/setup-analytics-amico.svg"
                    class="img-fluid"
                    alt
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- end card-body-->
        </div>
        <!-- end card-->
        <SellingProductEvents />
        <TopClientsEvents :supplierID="mySupplierId" />
      </div>
      <ActivityDahboardEvent />
    </div>

    <div class="row"></div>
  </div>
</template>

<style></style>

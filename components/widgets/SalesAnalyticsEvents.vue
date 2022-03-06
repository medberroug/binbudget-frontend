<script>
import countTo from "vue-count-to";
import axios from "axios";
import { getData } from "../controllers/savingData";
/**
 * Sales-analytics component
 */
export default {
  components: {
    countTo,
  },
  async mounted() {
    let result = await axios.get(
      process.env.baseUrl + "/getDashboardData/" + getData("accountinfo").id
    );
    this.revenueDetails = result.data;
    let result2 = await axios.get(
      process.env.baseUrl +
        "/statistics?serviceProvider=" +
        getData("accountinfo").id
    );
    result2 = result2.data;
    console.log(result2);
    this.series[0].data;
    this.series[1].data;
    this.chartOptions.labels;
    for (let i = 0; i < result2.length; i++) {
      this.chartOptions.labels.push(result2[i].createdAt);
      this.series[0].data.push(result2[i].totalRevenue.projectedRevenue);
      this.series[1].data.push(result2[i].totalRevenue.tobePaid);
    }
    this.renderNow=true
  },
  data() {
    return {
      revenueDetails: null,
      renderNow:false,
      series: [
        {
          name: "Revenus prévisionnels",
          type: "column",
          data: [],
        },
        {
          name: "À payer",
          type: "area",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: [0, 2, 4],
          curve: "smooth",
        },
        plotOptions: {
          bar: {
            columnWidth: "30%",
          },
        },
        colors: ["#5b73e8", "#06DC92", "#f1b44c"],
        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
          },
        },
        labels: [],
        markers: {
          size: 0,
        },

        xaxis: {
          type: "datetime",
        },
        yaxis: {
          title: {
            text: "Montant",
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " dh";
              }
              return y;
            },
          },
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    };
  },
};
</script>

<template>
  <div class="col-xl-8" v-if="renderNow">
    <div class="card">
      <div class="card-body">
        <div class="float-end">
          <b-dropdown variant="white" toggle-class="text-reset p-0">
            <template v-slot:button-content>
              <span class="font-weight-semibold">Trier par:</span>
              <span class="text-muted">
                Annuel
                <i class="mdi mdi-chevron-down ml-1"></i>
              </span>
            </template>
            <a class="dropdown-item" href="#">Mensuel</a>
            <a class="dropdown-item" href="#">Annuel</a>
            <a class="dropdown-item" href="#">Hebdomadaire</a>
            <a class="dropdown-item" href="#">Journalier</a>
          </b-dropdown>
        </div>
        <h4 class="card-title mb-4">Statistiques des ventes</h4>

        <div class="mt-1">
          <ul class="list-inline main-chart mb-0">
            <li class="list-inline-item chart-border-left mr-0 border-0">
              <h3 class="text-primary">
                <span data-plugin="counterup">
                  <countTo
                    :startVal="1"
                    :endVal="revenueDetails.totalRevenue.projectedRevenue"
                    :duration="2000"
                    separator=" "
                  ></countTo>
                </span>
                dh
                <span class="text-muted d-inline-block font-size-12 ml-3"
                  >Revenus prévisionnels</span
                >
              </h3>
            </li>
            <li class="list-inline-item chart-border-left mr-0">
              <h3>
                <span data-plugin="counterup">
                  <countTo
                    :startVal="1"
                    :endVal="revenueDetails.totalRevenue.tobePaid"
                    :duration="2000"
                    separator=" "
                    class="text-success"
                  >
                  </countTo>
                </span>
                <span class="text-muted d-inline-block font-size-12 ml-3"
                  >À payer</span
                >
              </h3>
            </li>
            <li class="list-inline-item chart-border-left mr-0">
              <h3>
                <span data-plugin="counterup">{{
                  revenueDetails.calculateOrders.allOrders
                }}</span>
                <span class="text-muted d-inline-block font-size-12 ml-3"
                  >Toutes les commandes</span
                >
              </h3>
            </li>
          </ul>
        </div>

        <div class="mt-3">
          <div id="sales-analytics-chart" class="apex-charts" dir="ltr"></div>
          <apexchart
            type="line"
            class="apex-charts"
            dir="ltr"
            height="339"
            :options="chartOptions"
            :series="series"
            defaultLocale="fr"
          ></apexchart>
        </div>
      </div>
      <!-- end card-body-->
    </div>
    <!-- end card-->
  </div>
  <!-- end col-->
</template>

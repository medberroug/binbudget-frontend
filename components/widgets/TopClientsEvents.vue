<script>
/**
 * Top-users component
 */
import axios from "axios"
import { getData } from "../controllers/savingData";
export default {
  props: ["supplierID"],
  async mounted() {
    let result = await axios.get(
      process.env.baseUrl +
        "/getDashboardData/" +
        getData("accountinfo").id
    );
    this.revenueByClient=result.data.clientByRevenue
    for (let i=0;i<this.revenueByClient.length;i++){
        this.totalRevnues=this.totalRevnues+this.revenueByClient[i].revenue
    }
  },
  data() {
    return {
        revenueByClient:null,
        totalRevnues:0,
      users: [
        {
          profile: require("~/assets/images/users/avatar-4.jpg"),
          name: "Glenn Holden",
          location: "Nevada",
          status: "Cancel",
          price: "$250.00",
        },
        {
          profile: require("~/assets/images/users/avatar-5.jpg"),
          name: "Lolita Hamill",
          location: "Texas",
          status: "Success",
          price: "$110.00",
        },
        {
          profile: require("~/assets/images/users/avatar-6.jpg"),
          name: "Robert Mercer",
          location: "California",
          status: "Active",
          price: "$420.00",
        },
        {
          profile: require("~/assets/images/users/avatar-7.jpg"),
          name: "Marie Kim",
          location: "Montana",
          status: "Pending",
          price: "$120.00",
        },
        {
          profile: require("~/assets/images/users/avatar-8.jpg"),
          name: "Sonya Henshaw",
          location: "Colorado",
          status: "Active",
          price: "$112.00",
        },
        {
          profile: require("~/assets/images/users/avatar-2.jpg"),
          name: "Marie Kim",
          location: "Australia",
          status: "Success",
          price: "$120.00",
        },
        {
          profile: require("~/assets/images/users/avatar-1.jpg"),
          name: "Sonya Henshaw",
          location: "India",
          status: "Cancel",
          price: "$112.00",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="col-xl-12">
    <div class="card">
      <div class="card-body">
        <div class="float-end">
          <!-- <b-dropdown variant="white" toggle-class="p-0">
            <template v-slot:button-content>
              <span class="text-muted">
                All Members
                <i class="mdi mdi-chevron-down ml-1"></i>
              </span>
            </template>
            <a class="dropdown-item" href="#">Locations</a>
            <a class="dropdown-item" href="#">Revenue</a>
            <a class="dropdown-item" href="#">Join Date</a>
          </b-dropdown> -->
        </div>
        <h4 class="card-title mb-4">Top clients</h4>

        <div data-simplebar style="max-height: 336px">
          <div class="table-responsive">
            <table class="table table-borderless table-centered table-nowrap">
              <tbody>
                <tr v-for="(item, index) in revenueByClient" :key="index">
                  
                  <td>
                    <h6 class="font-size-15 mb-1 font-weight-normal">
                      {{index+1}}: {{ item.name }}
                    </h6>
                    <p class="text-muted font-size-13 mb-0 mx-3">
                      <!-- <i class="mdi mdi-map-marker"></i> -->
                      {{ (item.revenue/totalRevnues)*100 }}% du CA
                    </p>
                  </td>
                
                  <td class="text-muted font-weight-semibold text-right">
                    <i
                      class="icon-xs icon mr-2 text-success"
                      data-feather="trending-up"
                    ></i>
                    {{
                          Intl.NumberFormat("fr-MA", {
                            style: "currency",
                            currency: "MAD",
                          }).format(item.revenue)
                        }}
           
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- enbd table-responsive-->
        </div>
        <!-- data-sidebar-->
      </div>
      <!-- end card-body-->
    </div>
    <!-- end card-->
  </div>
  <!-- end col -->
</template>

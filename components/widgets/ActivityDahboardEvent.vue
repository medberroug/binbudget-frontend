<script>
/**
 * Activity component
 */
import { format, parseISO } from "date-fns";
import axios from "axios";
import { getData } from "../controllers/savingData";
import {  fr } from "date-fns/locale";
export default {
  data() {
    return {
      annoucements: null,
    };
  },
  methods: {
    formatMyDate(date) {
      // return date
      return format(parseISO(date), "dd/MM/yyyy", { addSuffix: true ,locale: fr},{ locale: fr });
    },
    formatMyHour(date) {
      // return date
      return format(parseISO(date), "HH:MM");
    },
  },
  async mounted() {
    let accountType = getData("account");
    let forSpEvent = "false";
    let forSpResto = "false";
    let forClients = "false";
    switch (accountType) {
      case "supplier":
        forSpResto = "true";
        break;
      case "event":
        forSpEvent = "true";
        break;

      case "client":
        forClients = "true";
        break;
    }
    let result = await axios.get(
      process.env.baseUrl +
        "/activityannoucements?forSpEvent=" +
        forSpEvent +
        "&forSpResto=" +
        forSpResto +
        "&forClients=" +
        forClients
    );
    this.annoucements = result.data;
  },
};
</script>

<template>
  <div class="col-xl-8">
    <div class="card">
      <div class="card-body">
        <div class="float-end">
          <!-- <b-dropdown right toggle-class="p-0" variant="white">
            <template v-slot:button-content>
              <span class="text-muted">
                Recent
                <i class="mdi mdi-chevron-down ml-1"></i>
              </span>
            </template>
            <a class="dropdown-item" href="#">Recent</a>
            <a class="dropdown-item" href="#">By Users</a>
          </b-dropdown> -->
        </div>

        <h4 class="card-title mb-4">Nouvelles de BinBudget</h4>

        <ol
          class="activity-feed mb-0 ps-2"
          data-simplebar
          style="max-height: 336px"
        >
          <li
            class="feed-item"
            v-for="(news, index) in annoucements"
            :key="index"
          >
            <div class="feed-item-list">
              <p class="text-muted mb-1 font-size-13">
                {{ formatMyDate(news.createdAt) }}
                <small class="d-inline-block ml-1">
                  {{ formatMyHour(news.createdAt) }}</small
                >
              </p>
              <p class="mt-0 mb-0">
                {{ news.text }}
                <span class="text-primary" v-if="news.link">
                  <a :href="news.link" target="_blank"> , En savoir plus...</a>
                </span>
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

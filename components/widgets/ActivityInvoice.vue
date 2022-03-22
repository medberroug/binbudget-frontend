<script>
/**
 * Activity component
 */

import { formatDistanceToNow, parseISO } from "date-fns";
import {  fr } from "date-fns/locale";
export default {
  props: ["status"],
  mounted() {
    console.log(this.status);
  },
  methods: {
    readDate(date) {
      return formatDistanceToNow(parseISO(date),  { addSuffix: true ,locale: fr});
    },
  },
};
</script>

<template>
  <div class="col-xl-12">
    <div class="card shadow-none">
      <div class="card-body">
        <h4 class="card-title mb-4">Activité récente</h4>

        <ol
          class="activity-feed mb-0 ps-2"
          data-simplebar
          style="max-height: 336px"
        >
          <li class="feed-item" v-for="(item, index) in status" :key="index">
            <div class="feed-item-list">
              <p class="text-muted mb-1 font-size-13">
                {{ readDate(item.date) }}
              </p>
              <p class="mt-0 mb-0">
                <span
                  class="badge badge-pill font-size-12"
                  :class="{
                    'bg-info':
                      item.name === 'created' || item.name === 'validated',
                    'bg-warning': item.name === 'pseudoPaid',
                    'bg-success': item.name === 'payed',
                    'bg-secondary':
                      item.name === 'cancelled' || item.name === 'closed',
                    'bg-danger': item.name === 'overDueDate',
                  }"
                >
                  <span v-if="item.name == 'created'"> Créé</span>

                  <span v-if="item.name == 'overDueDate'">
                    Expiration du délai</span
                  >
                  <span v-if="item.name == 'pseudoPaid'">
                    Partiellement payé
                  </span>
                  <span v-if="item.name == 'validated'"> Validé</span>
                  <span v-if="item.name == 'paid'"> Payé</span>
                  <span v-if="item.name == 'closed'"> Clôturé</span>
                  <span v-if="item.name == 'cancelled'"> Annulé</span>
                </span>

                :{{ item.comment }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

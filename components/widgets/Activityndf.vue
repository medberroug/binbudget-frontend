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
                    'bg-primary':
                      item.name === 'created' || item.name === 'created',
                    'bg-danger':
                      item.name === 'created' || item.name === 'denied',
                    'bg-success':
                      item.name === 'created' || item.name === 'accepted',
                    'bg-secondary':
                      item.name === 'created' || item.name === 'closed',
                  }"
                >
                  <span v-if="item.name == 'created'"> Créé</span>
                  <span v-if="item.name == 'denied'"> Refusé</span>
                  <span v-if="item.name == 'accepted'"> Accepté</span>
                  <span v-if="item.name == 'closed'"> Cloturé</span>
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

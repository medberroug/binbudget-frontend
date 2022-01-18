<script>
/**
 * Top-users component
 */
import { format, parseISO } from "date-fns";
export default {
  props: ["payments"],
  mounted() {},
  methods: {
    formatMyDate(date) {
      // return date
      return format(parseISO(date), "dd/MM/yyyy, HH:MM");
    },
  },
  data() {
    return {
      users: [
        {
          method: "Sonya Henshaw",
          date: "India",
          status: "Cancel",
          amount: 112.0,
        },
        {
          method: "Sonya Henshaw",
          date: "India",
          status: "Cancel",
          amount: 112.0,
        },
        {
          method: "Sonya Henshaw",
          date: "India",
          status: "Cancel",
          amount: 112.0,
        },
        {
          method: "Sonya Henshaw",
          date: "India",
          status: "Cancel",
          amount: 112.0,
        },
      ],
    };
  },
};
</script>

<template>
  <div class="col-xl-12">
    <div class="card shadow-none">
      <div class="card-body">
        <div class="float-end"></div>
        <h4 class="card-title mb-4">Paiements</h4>

        <div data-simplebar style="max-height: 336px">
          <div class="table-responsive">
            <table class="table table-borderless table-centered table-nowrap">
              <tbody>
                <tr v-for="(item, index) in payments" :key="index">
                  <!-- <td style="width: 20px;">
                                    <img :src="item.profile" class="avatar-xs rounded-circle" alt="..." />
                                </td> -->
                  <td>
                    <h6 class="font-size-15 mb-1 font-weight-normal">
                      <span v-if="item.method == 'bankTransfer'"
                        >Virement bancaire</span
                      >
                      <span v-if="item.method == 'promoCode'">Code promo</span>
                      <span v-if="item.method == 'cheque'"
                        >Chèque bancaire
                      </span>
                      <span v-if="item.method == 'cash'"
                        >Espèces
                      </span>
                    </h6>
                    <p class="text-muted font-size-13 mb-0">
                      <i class="mdi mdi-calendar-month-outline"></i>
                      {{ formatMyDate(item.date) }}
                    </p>
                  </td>
                  <td>
                    <span
                      class="badge font-size-12"
                      :class="{
                        'bg-soft-success': item.status === 'validated',
                        'bg-soft-danger': item.status === 'cancelled',
                        'bg-soft-info': item.status === 'created',
                      }"
                    >
                      <span v-if="item.status == 'created'"
                        >En cours de traitement</span
                      >
                      <span v-if="item.status == 'validated'">Validé</span>
                      <span v-if="item.status == 'cancelled'">Rejeté</span>
                    </span>
                  </td>
                  <td class="text-muted font-weight-semibold text-right">
                    <i
                      class="icon-xs icon mr-2 text-success"
                      data-feather="trending-up"
                    ></i>
                    {{
                      Intl.NumberFormat("ar-MA", {
                        style: "currency",
                        currency: "MAD",
                      }).format(item.amount)
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

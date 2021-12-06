<template>
  <b-dropdown
    variant="white"
    class="dropdown d-inline-block"
    toggle-class="header-item noti-icon"
    right
    menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
  >
    <template v-slot:button-content>
      <i class="uil-calendar-alt"></i>
      <span class="badge bg-danger rounded-pill">?</span>
    </template>

    <div class="p-3">
      <div class="row align-items-center">
        <div class="col">
          <h5 class="m-0 font-size-16">Mon événement</h5>
        </div>
        <div class="col-auto" @click="cancelEvent">
          <a href="#!" class="small text-danger">Annuler l'événement</a>
        </div>
      </div>
    </div>

    <simplebar style="max-height: 230px" data-simplebar>
      <NuxtLink to="/clients/events/planifier-un-evenement">
        <a href class="text-reset notification-item" v-if="isPlaceChecked > 0">
          <div class="media">
            <div class="avatar-xs me-3">
              <span
                class="avatar-title bg-primary rounded-circle font-size-16"
                :class="{ 'bg-success ': isPlaceChecked > 1 }"
              >
                <i class="uil-plus" v-if="isPlaceChecked == 1"></i>
                <i class="uil-check" v-if="isPlaceChecked > 1"></i>
              </span>
            </div>
            <div class="media-body">
              <h6 class="mt-0 mb-1">Salle de conférence (ou lieu)</h6>
              <div class="font-size-12 text-muted">
                <p class="mb-1" v-if="isPlaceChecked == 1">
                  Pas encore terminé ,Cliquez ici pour la compléter.
                </p>
                <p class="mb-1" v-if="isPlaceChecked > 1">
                  Terminé avec succès
                </p>
              </div>
            </div>
          </div>
        </a></NuxtLink
      >

      <NuxtLink to="/clients/events/planifier-un-evenement">
        <a
          href
          class="text-reset notification-item"
          v-if="isHostingChecked > 0"
        >
          <div class="media">
            <div class="avatar-xs me-3">
              <span
                class="avatar-title bg-primary rounded-circle font-size-16"
                :class="{ 'bg-success ': isHostingChecked > 1 }"
              >
                <i class="uil-plus" v-if="isHostingChecked == 1"></i>
                <i class="uil-check" v-if="isHostingChecked > 1"></i>
              </span>
            </div>
            <div class="media-body">
              <h6 class="mt-0 mb-1">Hotel (ou hébergement)</h6>
              <div class="font-size-12 text-muted">
                <p class="mb-1" v-if="isHostingChecked == 1">
                  Pas encore terminé ,Cliquez ici pour la compléter.
                </p>
                <p class="mb-1" v-if="isHostingChecked > 1">
                  Terminé avec succès
                </p>
              </div>
            </div>
          </div>
        </a></NuxtLink
      >

      <NuxtLink to="/clients/events/planifier-un-evenement">
        <a
          href
          class="text-reset notification-item"
          v-if="isRestaurationChecked > 0"
        >
          <div class="media">
            <div class="avatar-xs me-3">
              <span
                class="avatar-title bg-primary rounded-circle font-size-16"
                :class="{ 'bg-success ': isRestaurationChecked > 1 }"
              >
                <i class="uil-plus" v-if="isRestaurationChecked == 1"></i>
                <i class="uil-check" v-if="isRestaurationChecked > 1"></i>
              </span>
            </div>
            <div class="media-body">
              <h6 class="mt-0 mb-1">Services de restauration</h6>
              <div class="font-size-12 text-muted">
                <p class="mb-1" v-if="isRestaurationChecked == 1">
                  Pas encore terminé ,Cliquez ici pour la compléter.
                </p>
                <p class="mb-1" v-if="isRestaurationChecked > 1">
                  Terminé avec succès
                </p>
              </div>
            </div>
          </div>
        </a></NuxtLink
      >

      <NuxtLink to="/clients/events/planifier-un-evenement">
        <a href class="text-reset notification-item" v-if="isTmsChecked > 0">
          <div class="media">
            <div class="avatar-xs me-3">
              <span
                class="avatar-title bg-primary rounded-circle font-size-16"
                :class="{ 'bg-success ': isTmsChecked > 1 }"
              >
                <i class="uil-plus" v-if="isTmsChecked == 1"></i>
                <i class="uil-check" v-if="isTmsChecked > 1"></i>
              </span>
            </div>
            <div class="media-body">
              <h6 class="mt-0 mb-1">Système de gestion des tickets</h6>
              <div class="font-size-12 text-muted">
                <p class="mb-1" v-if="isTmsChecked == 1">
                  Pas encore terminé ,Cliquez ici pour la compléter.
                </p>
                <p class="mb-1" v-if="isTmsChecked > 1">Terminé avec succès</p>
              </div>
            </div>
          </div>
        </a>
      </NuxtLink>

      <NuxtLink to="/clients/events/planifier-un-evenement">
        <a
          href
          class="text-reset notification-item"
          v-if="isserviceChecked > 0"
        >
          <div class="media">
            <div class="avatar-xs me-3">
              <span
                class="avatar-title bg-primary rounded-circle font-size-16"
                :class="{ 'bg-success ': isserviceChecked > 1 }"
              >
                <i class="uil-plus" v-if="isserviceChecked == 1"></i>
                <i class="uil-check" v-if="isserviceChecked > 1"></i>
              </span>
            </div>
            <div class="media-body">
              <h6 class="mt-0 mb-1">Autre services</h6>
              <div class="font-size-12 text-muted">
                <p class="mb-1" v-if="isserviceChecked == 1">
                  Pas encore terminé ,Cliquez ici pour la compléter.
                </p>
                <p class="mb-1" v-if="isserviceChecked > 1">
                  Terminé avec succès
                </p>
              </div>
            </div>
          </div>
        </a>
      </NuxtLink>
    </simplebar>
    <div class="p-2 border-top d-grid">
      <a
        class="btn btn-sm btn-link font-size-14 text-center"
        href="javascript:void(0)"
      >
        <i class="uil-arrow-circle-right me-1"></i>
        {{ $t("navbar.dropdown.notification.button") }}
      </a>
    </div>
  </b-dropdown>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getData, removeData } from "../components/controllers/savingData";
export default {
  data() {
    return {
      name: "ShoppingCart",
      myEvent: null,
      isPlaceChecked: 0,
      isHostingChecked: 0,
      isRestaurationChecked: 0,
      isTmsChecked: 0,
      isserviceChecked: 1,
    };
  },
  mounted() {
    if (getData("event")) {
      this.myEvent = getData("event");
      if (this.myEvent.placeCheck) {
        this.isPlaceChecked = this.isPlaceChecked + 1;
        if (this.myEvent.eventOrderDetails) {
          for (let i = 0; i < this.myEvent.eventOrderDetails.length; i++) {
            if (this.myEvent.eventOrderDetails[i].type == "place") {
              this.isPlaceChecked = this.isPlaceChecked + 1;
            }
          }
        }
      }
      if (this.myEvent.hostingCheck) {
        this.isHostingChecked = this.isHostingChecked + 1;
        if (this.myEvent.eventOrderDetails) {
          for (let i = 0; i < this.myEvent.eventOrderDetails.length; i++) {
            if (this.myEvent.eventOrderDetails[i].type == "hosting") {
              this.isHostingChecked = this.isHostingChecked + 1;
            }
          }
        }
      }
      if (this.myEvent.restaurationCheck) {
        this.isRestaurationChecked = this.isRestaurationChecked + 1;
        if (this.myEvent.eventOrderDetails) {
          for (let i = 0; i < this.myEvent.eventOrderDetails.length; i++) {
            if (this.myEvent.eventOrderDetails[i].type == "restauration") {
              this.isRestaurationChecked = this.isRestaurationChecked + 1;
            }
          }
        }
      }
      if (this.myEvent.tmsCheck) {
        this.isTmsChecked = this.isTmsChecked + 1;
        if (this.myEvent.eventOrderDetails) {
          for (let i = 0; i < this.myEvent.eventOrderDetails.length; i++) {
            if (this.myEvent.eventOrderDetails[i].type == "tms") {
              this.isTmsChecked = this.isTmsChecked + 1;
            }
          }
        }
      }

      if (this.myEvent.eventOrderDetails) {
        for (let i = 0; i < this.myEvent.eventOrderDetails.length; i++) {
          if (this.myEvent.eventOrderDetails[i].type == "service") {
            this.isserviceChecked = this.isserviceChecked + 1;
          }
        }
      }
    }
  },

  computed: {
    ...mapGetters("products", {
      cartCount: "cartCount",
      itemsInCart: "itemsInCart",
    }),
  },
  methods: {
    async cancelEvent() {
      removeData("event");
      // await this.$router.go()
      this.$router.push({
        path: "/clients/events/planifier-un-evenement",
      });
    },
    ...mapActions({
      clear: "products/clearCart",
    }),
  },
};
</script>

<style lang="scss" scoped></style>

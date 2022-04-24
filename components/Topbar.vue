
<script>
/**
 * Topbar component
 */
import { getData, removeData } from "../components/controllers/savingData";
import axios from "axios";
export default {
  data() {
    return {
      eventIsActive: false,
      restaurationIsActive: false,
      marketIsActive: false,
      accountName: null,
      accountLogo: null,
      userName: null,
      accountType: null,
      languages: [
        {
          flag: require("~/assets/images/flags/us.jpg"),
          language: "en",
          title: "English",
        },
        {
          flag: require("~/assets/images/flags/french.jpg"),
          language: "fr",
          title: "French",
        },
        {
          flag: require("~/assets/images/flags/spain.jpg"),
          language: "es",
          title: "spanish",
        },
        {
          flag: require("~/assets/images/flags/china.png"),
          language: "zh",
          title: "Chinese",
        },
        {
          flag: require("~/assets/images/flags/arabic.png"),
          language: "ar",
          title: "Arabic",
        },
      ],
      current_language: this.$i18n.locale,
      text: null,
      flag: null,
      value: null,
      userAccountModal: false,
      userAccount: null,
    };
  },
  async mounted() {
    if (getData("event")) {
      this.eventIsActive = true;
    }
    if (getData("restauration")) {
      this.restaurationIsActive = true;
    }
    if (getData("market")) {
      this.marketIsActive = true;
    }
    if (getData("account") == "event" || getData("account") == "supplier") {
      this.accountName = getData("accountinfo").knowenName;
      this.accountLogo = getData("accountinfo").logo;
      this.userName = getData("accountinfo").userName;
      if (getData("account") == "event") {
        this.accountType = "event";
      } else if (getData("account") == "supplier") {
        this.accountType = "supplier";
      }
    } else if (getData("account") == "client") {
      this.accountName = getData("clientinfo").knowenName;
      this.accountLogo = getData("clientinfo").logo;
      this.userName = getData("clientinfo").userName;
      this.accountType = "client";
    }
    else if (getData("account") == "admin") {
      this.accountName = getData("admininfo").knowenName;
      // this.accountLogo = getData("admintinfo").logo;
      this.userName = getData("admininfo").userName;
      this.accountType = "admin";
    }
    let result = await axios.get(
      process.env.baseUrl + "/users?username=" + this.userName
    );
    result = result.data[0];
    this.userAccount = result;

    this.value = this.languages.find((x) => x.language === this.$i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
    console.log("dddddddddddddddddddddddd");
  },
  methods: {
    /**
     * Toggle menu
     */
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    /**
     * Toggle rightsidebar
     */
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    /**
     * Set languages
     */
    setLanguage(locale, country, flag) {
      this.$i18n.locale = locale;
      this.current_language = locale;
      this.text = country;
      this.flag = flag;
    },
    logoutUser() {
      if (getData("account") == "client") {
        removeData("account");
        removeData("clientinfo");
      } else {
        removeData("account");
        removeData("accountinfo");
      }
      this.$router.push({
        path: "/account/login",
      });
    },
  },
};
</script>

<template>
  <header id="page-topbar">
    <b-modal v-model="userAccountModal" centered hide-footer v-if="userAccount">
      <template #modal-title>Compte utilisateur </template>

      <!-- <b-form-input v-model="userAccount" type="number"></b-form-input> -->

      <label for="input-live" class="mt-1">Nom d'utilisateur </label>
      <b-form-input
        v-model="userAccount.username"
        type="email"
        disabled
      ></b-form-input>
      <label for="input-live" class="mt-4">E-mail utilisateur </label>
      <b-form-input
        v-model="userAccount.email"
        type="email"
        disabled
      ></b-form-input>
      <center>
        <b-button class="mt-3 btn-sm" block variant="outline-secondary">
          Modifier le mot de passe</b-button
        >
        <!-- <b-button
          class="mt-3"
          block
          variant="primary"
      
        >
          Soumettre</b-button
        > -->
      </center></b-modal
    >
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->

        <div class="navbar-brand-box">
          <nuxt-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="~/assets/images/logo-sm.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="~/assets/images/logo.png" alt height="20" />
            </span>
          </nuxt-link>

          <nuxt-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="~/assets/images/logo-sm.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="~/assets/images/logo-light.png" alt height="20" />
            </span>
          </nuxt-link>
        </div>

        <button
          @click="toggleMenu"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
          id="vertical-menu-btn"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>

        <!-- App Search-->
      </div>

      <div class="d-flex">
        <b-dropdown
          variant="white"
          class="d-inline-block d-lg-none ms-2"
          toggle-class="header-item noti-icon"
          right
          menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
        >
          <template v-slot:button-content>
            <i class="uil-search"></i>
          </template>
          <form class="p-3">
            <div class="form-group m-0">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('navbar.search.text')"
                  aria-label="Recipient's username"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="mdi mdi-magnify"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </b-dropdown>
        <!-- cart -->
        <!-- <div class="text-black d-flex flex align-items-center">
          <p>Restauration</p>
        </div> -->
        <EventCart v-if="eventIsActive" />
        <ShoppingCart v-if="restaurationIsActive" />
        <MarketCart v-if="marketIsActive" />
        <!-- notifications -->
        <b-dropdown
          variant="white"
          class="dropdown d-inline-block"
          toggle-class="header-item noti-icon"
          right
          menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
        >
          <template v-slot:button-content>
            <i class="uil-bell"></i>
            <span class="badge bg-danger rounded-pill">3</span>
          </template>

          <div class="p-3">
            <div class="row align-items-center">
              <div class="col">
                <h5 class="m-0 font-size-16">
                  {{ $t("navbar.dropdown.notification.text") }}
                </h5>
              </div>
              <div class="col-auto">
                <a href="#!" class="small">{{
                  $t("navbar.dropdown.notification.subtext")
                }}</a>
              </div>
            </div>
          </div>
          <simplebar style="max-height: 230px" data-simplebar>
            <a href class="text-reset notification-item">
              <div class="media">
                <div class="avatar-xs me-3">
                  <span
                    class="avatar-title bg-primary rounded-circle font-size-16"
                  >
                    <i class="uil-shopping-basket"></i>
                  </span>
                </div>
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.order.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.order.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.order.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href class="text-reset notification-item">
              <div class="media">
                <img
                  src="~/assets/images/users/avatar-3.jpg"
                  class="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.james.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.james.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.james.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href class="text-reset notification-item">
              <div class="media">
                <div class="avatar-xs me-3">
                  <span
                    class="avatar-title bg-success rounded-circle font-size-16"
                  >
                    <i class="uil-truck"></i>
                  </span>
                </div>
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.item.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.item.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.item.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>

            <a href class="text-reset notification-item">
              <div class="media">
                <img
                  src="~/assets/images/users/avatar-4.jpg"
                  class="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.salena.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.salena.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.salena.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
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

        <b-dropdown
          class="d-inline-block"
          toggle-class="header-item"
          right
          variant="white"
          menu-class="dropdown-menu-end"
          v-if="accountType == 'event' || accountType == 'supplier' || accountType == 'client' || accountType == 'admin'"
        >
          <template v-slot:button-content>
            <img
            v-if="accountLogo"
              class="rounded-circle header-profile-user"
              :src="accountLogo"
              alt="Header Avatar"
            />
            <img
            v-else
              class="rounded-circle header-profile-user"
              src="../assets/images/noimageuser.png"
              alt="Header Avatar"
            />
            <!-- ../../assets/images/noimageuser.png -->
            <span class="d-none d-xl-inline-block ms-1 fw-medium font-size-15"
              >{{ accountName }}
              <span class="text-muted">( {{ userName }} )</span>
            </span>
            <i class="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
          </template>

          <!-- item-->
          <nuxt-link
            to="/supplierevent/profile"
            class="dropdown-item"
            v-if="accountType == 'event'"
          >
            <i
              class="
                uil uil-user-circle
                font-size-18
                align-middle
                text-muted
                me-1
              "
            ></i>
            <span class="align-middle">Profile</span>
          </nuxt-link>


 <nuxt-link
            to="/clients/profile"
            class="dropdown-item"
            v-if="accountType == 'client'"
          >
            <i
              class="
                uil uil-user-circle
                font-size-18
                align-middle
                text-muted
                me-1
              "
            ></i>
            <span class="align-middle">Profile</span>
          </nuxt-link>


          <nuxt-link
            to="/supplier/profile"
            class="dropdown-item"
            v-if="accountType == 'supplier'"
          >
            <i
              class="
                uil uil-user-circle
                font-size-18
                align-middle
                text-muted
                me-1
              "
            ></i>
            <span class="align-middle">Profile</span>
          </nuxt-link>
          <a
            class="dropdown-item"
            href="#"
            @click="userAccountModal = !userAccountModal"
          >
            <i
              class="
                uil uil-users-alt
                font-size-18
                align-middle
                me-1
                text-muted
              "
            ></i>
            <span class="align-middle">Compte utilisateur</span>
          </a>
          <!-- <a class="dropdown-item d-block" href="#">
            <i
              class="uil uil-cog font-size-18 align-middle me-1 text-muted"
            ></i>
            <span class="align-middle">{{
              $t("navbar.dropdown.marcus.list.settings")
            }}</span>
            <span class="badge bg-soft-success rounded-pill mt-1 ms-2">03</span>
          </a> -->
          <!-- <a class="dropdown-item" href="#">
            <i
              class="uil uil-lock-alt font-size-18 align-middle me-1 text-muted"
            ></i>
            <span class="align-middle">{{
              $t("navbar.dropdown.marcus.list.lockscreen")
            }}</span>
          </a> -->
          <a
            class="dropdown-item"
            @click="logoutUser"
            href="javascript: void(0);"
          >
            <i
              class="
                uil uil-sign-out-alt
                font-size-18
                align-middle
                me-1
                text-muted
              "
            ></i>
            <span class="align-middle">Se déconnecter</span>
          </a>
        </b-dropdown>
      </div>
    </div>
  </header>
</template>

<style >
</style>
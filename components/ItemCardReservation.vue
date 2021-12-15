
<template>
  <!-- card details -->
  <div class="col-xl-6 col-sm-12">
    <b-modal v-model="menuModalShow" scrollable hide-footer>
      <template #modal-title> {{ "Menu " + name }} </template>
      <div class="my-4" v-for="(title, index) in menu" :key="index">
        <h5>{{ title.title }}</h5>
        <div class="row mx-2 my-4">
          <table>
            <tr v-for="(menuItems, index2) in title.menuItems" :key="index2">
              <td>
                <h6>{{ menuItems.name }}</h6>
                <p>{{ menuItems.description }}</p>
              </td>

              <td>
                {{
                  Intl.NumberFormat("ar-MA", {
                    style: "currency",
                    currency: "MAD",
                  }).format(menuItems.price)
                }}
              </td>
            </tr>
          </table>
        </div>
      </div></b-modal
    >
    <div>
      <div class="card">
        <img
          :src="img"
          class="card-img-top"
          style="object-fit: cover"
          height="250"
          alt="restaurant"
        />

        <div class="card-body">
          <div class="row">
            <div
              class="
                avatar-sm
                me-4
                d-flex
                align-self-top
                justify-content-end
                col-4 col-md-1
              "
            >
              <img
                :src="img_icon"
                class="avatar avatar-32 img-circle img-fluid"
                style="object-fit: cover"
                alt="restaurant"
                height="50"
              />
            </div>
            <div class="pb-1 col-8 col-md-6">
              <div>
                <h5 class="text-truncate font-size-16 mb-1">
                  <nuxt-link
                    to="/clients/restauration/sur-carte/products"
                    class="text-dark"
                  >
                    {{ name }}
                  </nuxt-link>
                </h5>
                <p class="text-muted">
                  <i class="mdi mdi-map-marker me-1"></i> {{ city }}
                </p>
              </div>
            </div>
            <div
              class="
                d-flex
                justify-content-center
                align-self-center
                col-12 col-md-4
              "
            >
              <nuxt-link
                :to="'/clients/restauration/' + parentlink + '/reservation'"
                class="btn btn-primary my-2"
                >Réserver <i class="uil-arrow-right"></i
              ></nuxt-link>
            </div>
          </div>
          <div class="media-body border-top align-self-center">
            <div class="row">
              <div class="col-4 col-md-2">
                <div class="mt-3">
                  <p class="text-muted mb-2">Rating</p>
                  <span class="badge bg-success font-size-14 me-1"
                    ><i class="mdi mdi-star"></i> {{ rating }}</span
                  >
                </div>
              </div>
              <div class="col-8 col-md-6">
                <div class="mt-3">
                  <p class="text-muted mb-2">Speciality</p>
                  <div class="font-size-12 me-1">
                    {{ speciality }}
                  </div>
                </div>
              </div>
              <div class="col-8 col-md-4">
                <div class="mt-3">
                  <button
                    class="btn btn-outline-primary my-2"
                    @click="modalShow"
                  >
                    Menu (PDF) <i class="uil-paperclip"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- card buttons -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "img",
    "name",
    "rating",
    "earned",
    "city",
    "img_icon",
    "reviews",
    "speciality",
    "bg-color",
    "text-color",
    "parentlink",
    "menu",
  ],
  data() {
    return {
      menuModalShow: false,
    };
  },
  // created() {
  //   this.findRandom();
  // },
  methods: {
    modalShow() {
      this.menuModalShow = true;
    },
  },
};
</script>
<style scoped>
.checkMenuButton {
  margin-left: auto;
}
.red {
  background-color: #5b73e8;
}
.blue {
  background-color: blue;
}
.orange {
  background-color: orange;
}
.green {
  background-color: green;
}
</style>

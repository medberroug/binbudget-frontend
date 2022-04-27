
<template>
  <!-- card details -->
  <div class="col-xl-6 col-sm-6">
    <div class="card">
      <img
        :src="img"
        class="card-img-top"
        style="object-fit: cover"
        height="250"
        alt="restaurant"
      />
      <!-- TODO: Remake the shape it should be horizental and cleaner  -->
      <div class="card-body">
        <div class="row">
          <div class="avatar-sm me-4 d-flex align-self-top justify-content-end col-4 col-md-1">
            <img
              :src="img_icon"
              class="avatar avatar-32 img-circle img-fluid"
              style="object-fit: cover"
              alt="restaurant"
              height="50"
            />
          </div>
          <div class="pb-1 col-8 col-md-6">
            <div >
              <h5 class="text-truncate font-size-16 mb-1">
              <nuxt-link to="/clients/restauration/sur-carte/products" class="text-dark">
                {{ name }}
              </nuxt-link>
            </h5>
            <p class="text-muted">
              <i class="mdi mdi-map-marker me-1"></i> {{ city }}
            </p>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-self-center col-12 col-md-4"
          >
            <nuxt-link
              :to="'/clients/restauration/'+parentlink+'/'+id"
              class="btn btn-primary my-2"
              >Consulter le menu <i class="uil-arrow-right"></i
            ></nuxt-link>
          </div>
        </div>
        <div class="media-body border-top align-self-center">
          <div class="row">
            <div class="col-4 col-md-2">
              <div class="mt-3">
                <p class="text-muted mb-2">Évaluation</p>
                <span class="badge bg-success font-size-14 me-1"
                  ><i class="mdi mdi-star"></i> {{ rating }}</span
                >
              </div>
            </div>
            <div class="col-8 col-md-10">
              <div class="mt-3">
                <p class="text-muted mb-2">Spécialité</p>
                <div class="font-size-12 me-1">
                  {{ speciality }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- card buttons -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "img",
    "name",
    "rating",
    "earned",
    "city",
    "img_icon",
    "speciality",
    "bg-color",
    "text-color",
    "parentlink"
  ],
  data() {
    return {};
  },
  // created() {
  //   this.findRandom();
  // },
  // methods: {
  //   findRandom() {
  //     return this.arrayOfColours[
  //       Math.floor(Math.random() * this.numberOfIterations) %
  //         this.arrayOfColours.length
  //     ];
  //   }
  // }
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

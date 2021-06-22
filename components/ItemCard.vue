<template>
  <!-- card details -->
  <div class="col-xl-4 col-sm-6">
    <div class="card h-100">
      <img
        :src="img"
        class="card-img-top"
        style="object-fit:cover"
        height="250"
        alt="restaurant"
      />
      <div class="card-body">
        <div class="media">
          <div class="avatar-sm me-4">
            <img
              :src="img_icon"
              class="avatar avatar-32 img-circle img-fluid"
              style="object-fit:cover"
              alt="restaurant"
              height="50"
            />
          </div>
          <div class=" pb-1">
            <h5 class="text-truncate font-size-16 mb-1">
              <nuxt-link to="/clients/restauration/products" class="text-dark">
                {{ name }}</nuxt-link
              >
            </h5>
            <p class="text-muted">
              <i class="mdi mdi-map-marker me-1"></i> {{ service }}
            </p>
          </div>
        </div>
        <div class="media-body border-top align-self-center">
          <div class="row ">
            <div class="col-6 ">
              <div class="mt-3">
                <p class="text-muted mb-2">Rating</p>
                <span class="badge bg-success font-size-14 me-1"
                  ><i class="mdi mdi-star"></i> {{ rating }}</span
                >{{ reviews }} <span>Reviews</span>
              </div>
            </div>
            <div class="col-6  ml-2">
              <div class="mt-3">
                <p class="text-muted mb-2">Speciality</p>
                <div
                  class="badge  font-size-14 me-1"
                  :class="[bgColor, textColor]"
                >
                  {{ speciality }}
                </div>
              </div>
            </div>
            <!-- <div class="col-4">
              <div class="mt-3">
                <p class="text-muted mb-2">City</p>
                <h5 class="font-size-16 mb-0">{{ city }}</h5>
              </div>
            </div> -->
          </div>
        </div>

        <!-- card buttons -->
        <div class="d-flex justify-content-around mt-3">
          <button class="btn btn-browse">Browse Profile</button>
          <nuxt-link to="/clients/restauration/products" class="btn btn-primary"
            >Check Menu</nuxt-link
          >
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
    "service",
    "rating",
    "earned",
    "city",
    "img_icon",
    "reviews",
    "speciality",
    "bg-color",
    "text-color"
  ],
  data() {
    return {};
  }
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
.btn-browse:hover {
  background: #ccc;
}
.red {
  background-color: red;
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

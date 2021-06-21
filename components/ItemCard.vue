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
          <div class="row">
            <div class="col-4">
              <div class="mt-3">
                <p class="text-muted mb-2">Rating</p>
                <span class="badge bg-success font-size-14 me-1"
                  ><i class="mdi mdi-star"></i> {{ rating }}</span
                >
              </div>
            </div>
            <div class="col-4">
              <div class="mt-3">
                <p class="text-muted mb-2">Earned</p>
                <h5 class="font-size-16 mb-0">{{ earned }}</h5>
              </div>
            </div>
            <div class="col-4">
              <div class="mt-3">
                <p class="text-muted mb-2">City</p>
                <h5 class="font-size-16 mb-0">{{ city }}</h5>
              </div>
            </div>
          </div>
        </div>

        <!-- card buttons -->
        <div class="d-flex justify-content-around mt-3">
          <button class="btn btn-browse">Browse Profile</button>
          <button class="btn btn-primary">Check Menu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["img", "name", "service", "rating", "earned", "city", "img_icon"]
};
</script>
<style scoped>
.btn-browse:hover {
  background: #ccc;
}
</style>

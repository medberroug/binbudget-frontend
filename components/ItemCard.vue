<template>
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
            <span
              :class="
                `avatar-title bg-soft-blue text-blue font-size-16 rounded-circle`
              "
            >
              {{ name.charAt(0).toUpperCase() }}
            </span>
          </div>
          <div class="media-body align-self-center">
            <div class="border-bottom pb-1">
              <h5 class="text-truncate font-size-16 mb-1">
                <nuxt-link
                  to="/clients/restauration/products"
                  class="text-dark"
                >
                  {{ name }}</nuxt-link
                >
              </h5>
              <p class="text-muted">
                <i class="mdi mdi-map-marker me-1"></i> {{ service }}
              </p>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="mt-3">
                  <p class="text-muted mb-2">Rating</p>
                  <h5 class="font-size-16 mb-0">1.5</h5>
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
        </div>
        <!-- card buttons -->
        <div class="d-flex justify-content-between mt-3">
          <button class="btn btn-outline-primary">Browse Profile</button>
          <button class="btn btn-primary">Check Menu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["img", "name", "service", "rating", "earned", "city"]
};
</script>

<template>
  <div class="col-xl-4 col-sm-6">
    <div class="card">
      <div class="card-body">
        <div class="media">
          <div class="avatar-sm me-4">
            <span
              :class="
                `avatar-title bg-soft-blue text-blue font-size-16 rounded-circle`
              "
            >
              M
            </span>
          </div>
          <div class="media-body align-self-center">
            <div class="border-bottom pb-1">
              <h5 class="text-truncate font-size-16 mb-1">
                <nuxt-link
                  to="/clients/restauration/products"
                  class="text-dark"
                >
                  Dummy brand</nuxt-link
                >
              </h5>
              <p class="text-muted">
                <i class="mdi mdi-account me-1"></i> Fast Food Service
              </p>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="mt-3">
                  <p class="text-muted mb-2">Rating</p>
                  <h5 class="font-size-16 mb-0">1.5</h5>
                </div>
              </div>
              <div class="col-6">
                <div class="mt-3">
                  <p class="text-muted mb-2">Earned</p>
                  <h5 class="font-size-16 mb-0">10K+</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

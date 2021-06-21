<script>
/**
 * Page-header component
 */
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    },
    details: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<template>
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div
        class="page-title-box d-flex align-items-center justify-content-between"
      >
        <h4 class="mb-0">{{ title }}</h4>

        <div class="page-title-right">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li
                class="breadcrumb-item"
                v-for="detail in details"
                :key="detail"
                active
              >
                <a href="#">{{ detail.text }}</a>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <!-- end page title -->
</template>

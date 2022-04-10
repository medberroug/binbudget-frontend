<script>
/**
 * Loader component
 */
export default {
    data: () => ({
        loading: false
    }),
    methods: {
        start() {
            this.loading = false;
        },
        finish() {
            this.loading = false;
        }
    }
};
</script>

<template>
<!-- Loader -->
<div id="preloader" v-if="loading">
    <div id="status">
        <h1>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</h1>
        <div class="spinner">
            <i class="uil-shutter-alt spin-icon"></i>
        </div>
    </div>
</div>
</template>

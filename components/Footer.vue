<script>
/**
 * Footer component
 */
export default {};
</script>

<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">{{ new Date().getFullYear() }} © BinBudget v0.0.0 Beta </div>
        <div class="col-sm-6">
          <div class="text-sm-end d-none d-sm-block">
            Développé par <a href="https://www.pixlabe.com"  target="_blank">Pixlabe</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

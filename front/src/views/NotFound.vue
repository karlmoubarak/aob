<template>
  <div class="noItemMessage">
    <p> {{ message }} </p>
  </div>
</template>

<script>

// Main view for non-existent pages.
// These are pages not defined in ../router
// All not found sub-pages are dealt with in their
// respective views.

export default {
  name: 'NotFound',
  computed: {
    message() { return this.$locale.status.pageNotFound[this.$store.state.locale] }
  }
}
</script>

<style scoped>
.noItemMessage {
  padding: 5% 5%;
}
</style>

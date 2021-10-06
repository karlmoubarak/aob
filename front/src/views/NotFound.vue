<template>
  <div class="noItemMessage">
    <p> {{ message }} </p>
  </div>
</template>

<script>
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

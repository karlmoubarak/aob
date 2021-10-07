<template>
  <div class="error">
    <p> {{ message }} </p>
  </div>
</template>

<script>

// Main error view. Errors in API fetching will
// be sent here.

export default {
  name: 'Error',
  computed: {
    message() { return this.$locale.status.error[this.$store.state.locale] }
  }
  
}
</script>

<style scoped>
.error {
  padding: 5% 5%;
}
</style>

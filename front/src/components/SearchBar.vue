<template>
  <input 
    type="search"
    ref="input" 
    placeholder="search"
    @input="search"
  />
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    search() {
      if (this.$refs.input.value != '') {
        this.$router.push({
          path: '/',
          query: { 
            search: this.$refs.input.value.trim()
          }
        })
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
input {
  margin-left: auto;
}
</style>
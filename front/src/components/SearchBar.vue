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
            search: this.$refs.input.value.trim().toLowerCase()
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
  position: absolute;
  width: 12em;
  right: 0;
  top: 0;
  border: unset;
  height: 2em;
  background: var(--lightestorange);
  padding: 0.5em;
  transition: all var(--landing) ease;
}
.landing input {
  top: calc(50% - 1em);
  right: calc(50% - 6em);
}
</style>
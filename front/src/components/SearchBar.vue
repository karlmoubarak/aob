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
        this.$refs.input.focus()
      }
    }
  },
  mounted() {
    this.$refs.input.focus()
  },
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
  border: none;
  outline: none;
  filter: none;
  box-shadow: none;
  transition: all var(--landing) ease;
  /* transition: border 0.2s ease; */
}
.landing input {
  top: calc(50% - 1em);
  right: calc(50% - 6em);
}
input:active,
input:focus {
  border: 2px solid #cbbef0;
  filter: drop-shadow(0 0 1em #cbbef0);
}
</style>
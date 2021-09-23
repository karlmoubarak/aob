<template>
  <input 
    type="search"
    ref="input" 
    :placeholder="$locale.search.placeholder[$store.state.locale]"
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
          path: '/archive',
          query: { 
            search: this.$refs.input.value.trim().toLowerCase()
          }
        })
      } else {
        this.$router.push('/archive')
        this.$refs.input.focus()
      }
    }
  },
  mounted() {
    if (this.$route.path == '/') {   
      this.$refs.input.focus()
    }
  },
}
</script>

<style scoped>
input {
  margin-left: auto;
  position: fixed;
  width: 12em;
  right: 0;
  top: 2em;
  border: unset;
  height: 2em;
  /* background: var(--lightestorange); */
  /* padding: 0.5em; */
  border: none;
  outline: none;
  filter: none;
  box-shadow: none;
  transition: all var(--landing) ease;
  /* transition: border var(--fast) ease; */
  font-family: inherit;
  font-size: inherit;
  border: 2px solid var(--green);
  border-radius: 0;
  min-width: 13.1em;
  max-width: 13.1em;
}
.landing input {
  top: calc(50% - 1em);
  right: calc(50% - 6em);
}
input::placeholder {
  /* text-align: center; */
}
input:active,
input:focus {
  border: 2px solid var(--green);
  filter: drop-shadow(0 0 1em var(--green));
}
.ar input {
  margin-left: unset;
  margin-right: auto;
  right: unset;
  left: 0;
}
.ar.landing input {
  right: unset;
  left: calc(50% - 6em);
}

.mobile input {
  box-sizing: border-box;
  min-width: 100%;
  flex-basis: 100%;
  position: relative;
  text-align: center;
}

.mobile.landing input,
.mobile.landing.ar input {
  top: unset;
  left: unset;
  right: unset;  
}

</style>
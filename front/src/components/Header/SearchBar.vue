<template>
  <input 
    type="search"
    ref="input" 
    :placeholder="$locale.search.placeholder[$store.state.locale]"
    @keyup.enter="search"
    @input="clearIfEmpty"
  />
</template>

<script>

// SearchBar: searches on keyup.enter and routes to archive
// on inout of query is null

export default {
  name: 'SearchBar',
  props: [ 'landing', 'isMobile' ],
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
    },
    clearIfEmpty() {
      if (!this.landing && this.$refs.input.value == '') {
       this.$router.push('/archive')
      }
    }
  },
  watch: {
    landing() {
      if (this.landing && !this.isMobile) {   
        this.$refs.input.focus()
      }
    }
  },
}
</script>

<style scoped>
input {
  position: fixed;
  margin-left: auto;
  right: 0;
  top: 2em;
  min-width: 13em;
  max-width: 13em;
  height: 2em;
  outline: none;
  border: 2px solid var(--green);
  transition: all var(--landing) ease;
  font-family: montserrat;
  z-index: 2;
}
input::placeholder {
  text-align: center;
}
input:active,
input:focus {
  filter: drop-shadow(0 0 1em var(--green));
}
.landing input {
  top: calc(50% - 1em);
  right: calc(50% - 6.5em);
  transform: scale(1.5);
}
.ar input {
  margin-left: unset;
  margin-right: auto;
  right: unset;
  left: 0;
}
.ar.landing input {
  right: unset;
  left: calc(50% - 6.5em);
}
.mobile input {
  position: relative;
  min-width: 100%;
  flex-basis: 100%;
  height: 2.5em;
  display: none;
}

.mobile.landing input,
.mobile.landing.ar input {
  transform: unset;
  top: unset;
  left: unset;
  right: unset;  
  display: block;
  border: unset;
  box-shadow: unset;
  font-size: 12pt;
  padding-right: 2em;
}
.mobile.landing.ar input {
  padding-right: unset;
  padding-left: 1.5em;
}

</style>

<template>
  <CollectionBody
    :collectionItems="filteredArtworks"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import CollectionBody from '../components/CollectionBody.vue'

export default {
  name: 'Artworks',
  components: {
    CollectionBody,
  },
  computed: {
    ...mapGetters([
      'filteredArtworks'
    ]),
  
  }
  
}
</script>

<style scoped>
table {
  margin-top: 1em;
  width: 100%;
  transition: all 0.2s ease;
}




</style>
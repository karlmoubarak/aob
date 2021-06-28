<template>
  <table>
    <transition-group name="list">
      <Artwork
        v-for="artwork in filteredArtworks"
        class="list-item"
        :key="artwork.id"
        :artwork="artwork"
      />
    </transition-group>
  </table>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Artwork from '../components/Artwork'

export default {
  name: 'Artworks',
  components: {
    Artwork,
  },
  computed: {
    ...mapState([      
      'artworks'
    ]),
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
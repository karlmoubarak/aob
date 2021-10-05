<template>
  <div 
    id="artworks"
    @click="$router.go(-1)"
  >
    <Table
      :collectionItems="filteredArtworks"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Table from '../components/Table'

export default {
  name: 'Artworks',
  components: {
    Table,
  },
  computed: {
    ...mapGetters([
      'filteredArtworks'
    ]),
  
  }
  
}
</script>

<style scoped>
#artworks {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0em;
  background: var(--white-glass);
  overflow: scroll;
  z-index: 2;
  padding: 10em;
  padding-top: 10em;
  display: flex;
  justify-content: center;
  transform: translateY(0) !important;
}
.fade-enter-from ,
.fade-leave-to {
  padding-top: 20em !important;
}

table {
  margin-top: 1em;
}
table tr.header {
  display: none;
}




</style>
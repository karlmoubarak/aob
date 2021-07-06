<template>
  <CollectionBody
    :collectionItems="filteredResources"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import CollectionBody from '../components/CollectionBody'

export default {
  name: 'Resources',
  components: {
    CollectionBody
  },
  computed: {
    ...mapGetters([
      'filteredResources'
    ]),
  
  }
  
}
</script>

<style scoped>



</style>
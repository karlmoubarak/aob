<template>
  <CollectionGroup
    :collections="sortedCollections"
  />
</template>

<script>
import { mapGetters }  from 'vuex'
import CollectionGroup from '../components/CollectionGroup'

// Main view for collections
// Sends the full sorted collections array to
// the CollectionGroup component.

export default {
  name: 'Collections',
  components: { CollectionGroup },
  computed: {
    ...mapGetters([ 'sortedCollections' ])
  },
}
</script>

<style scoped>
.collections {  
  padding: 0.5em;
}
</style>
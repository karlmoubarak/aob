<template>
  <CollectionGroup
    :collections="sortedCollections"
  />
</template>

<script>
import { mapGetters }  from 'vuex'
import CollectionGroup from '../components/CollectionGroup'

export default {
  name: 'Collections',
  components: { CollectionGroup },
  computed: {
    ...mapGetters([ 'sortedCollections' ])
  },
}
</script>
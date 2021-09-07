<template>
  <Table
    :collectionItems="filteredResources"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import Table from '../components/Table'

export default {
  name: 'Resources',
  components: {
    Table
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
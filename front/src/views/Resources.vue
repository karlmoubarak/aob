<template>
  <table>
    <TableHeaders />
    <transition-group name="list">
      <tr
        v-for="resource in filteredResources"
        :key="resource.id"
      >        
      <Resource
        :resource="resource"
      />
      </tr>
    </transition-group>
  </table>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Resource from '../components/Resource'
import TableHeaders from '../components/TableHeaders.vue'

export default {
  name: 'Resources',
  components: {
    Resource,
    TableHeaders,
  },
  computed: {
    ...mapState([      
      'resources'
    ]),
    ...mapGetters([
      'filteredResources'
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
table tr.header {
  z-index: 2;
}


</style>
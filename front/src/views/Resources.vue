<template>
  <table>
    <tr>
      <th class="id">id</th>
      <th class="organization">organisation</th>
      <th class="tags">tags</th>
      <th class="description">description</th>
      <th class="source">source</th>
      <th class="contact">contact</th>
      <th class="updated">last updated</th>
    </tr>
    <Resource
      v-for="resource in filteredResources"
      :key="resource.id"
      :resource="resource"
      />
  </table>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Resource from '../components/Resource'

export default {
  name: 'Resources',
  components: {
    Resource,
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
}
tr {
}
th {
  padding: 0;
  text-align: left;
}
th.id {
  min-width: 2em;
}
th.tags {
  min-width: 5em;
}
th.organization,
th.description { 
  min-width: 10em;
}
th.source {
  min-width: 5em;
}
th.contact {
  min-width: 8em;
}
th.updated {
  min-width: 8em;
}
</style>
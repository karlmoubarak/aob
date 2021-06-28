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
    <transition-group name="list">
      <Resource
        v-for="resource in filteredResources"
        class="list-item"
        :key="resource.id"
        :resource="resource"
      />
    </transition-group>
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
  /* border-collapse: collapse; */
  /* height: 100%; */
/* display: flex; */
/* flex-direction: column;   */
transition: all 0.2s ease;
}
table tr:first-of-type {
  z-index: 2;
  
}
th {
  padding: 0;
  text-align: left;
  padding: 0.5em;
  background: lightblue;
}
th.id {
  width: 1.5em;
}
th.tags {
  width: 5em;
}
th.organization {
  width: 12em;
}
th.description { 
  min-width: 25em;
  min-width: 30em;
}
th.source {
  width: 7.5em;
}
th.contact {
  width: 7.5em;
}
th.updated {
  width: 8em;
}


</style>
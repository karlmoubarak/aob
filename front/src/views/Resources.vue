<template>
  <table>
    <tr>
      <th>Organisation</th>
      <th>Tags</th>
      <th>Description</th>
      <th>Source</th>
      <th>Contact</th>
      <th>Last Updated</th>
    </tr>
    <Resource
      v-for="resource in resources"
      :key="resource.id"
      :resource="resource"
      />
  </table>
</template>

<script>
import { mapState } from 'vuex'
import Resource from '../components/Resource'

export default {
  name: 'Resources',
  components: {
    Resource,
  },
  computed: {
    ...mapState([      
      'resources'
    ])
  
  }
  
}
</script>

<style>
th {
  text-align: left;
}
</style>
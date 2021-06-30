<template>
  <tr class="header">
    <th class="id">id</th>
    <th class="organization">organisation</th>
    <th class="tags">tags</th>
    <th class="description">description</th>
    <th class="source">source</th>
    <th class="contact">contact</th>
    <th class="updated">last updated</th>
  </tr>  
</template>

<script>
export default {
  name: "TableHeaders"
}
</script>

<style scoped>

th {
  padding: 0;
  text-align: left;
  padding: 0.5em;
  /* background: lightblue; */
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
  max-width: 20em;
}
th.source {
  width: 7em;
}
th.contact {
  width: 7.5em;
}
th.updated {
  width: 8em;
}


</style>
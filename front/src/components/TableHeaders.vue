<template>
  <tr class="header">
    <th class="id">:)</th>
    <th class="organization">organisation</th>
    <th class="tags">tags</th>
    <th class="descripticon">description</th>
    <th class="locations">locations</th>
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

tr.header {
  position: sticky;
  top: 1.5em;
  z-index: 1;
}

th {
  padding: 0;
  text-align: left;
  padding: 0.5em;
  cursor: default;
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
  min-width: 15em;
  max-width: 20em;
}
th.source {
  /* width: 7em; */
  width: 1em;
}
th.contact {
  width: 7.5em;
}
th.updated {
  width: 8em;
}


</style>
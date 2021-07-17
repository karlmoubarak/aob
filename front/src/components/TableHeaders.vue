<template>
  <!-- <div class="row header">
    <div class="col id"><p>:)</p></div>
    <div class="col organization"><p>organisation</p></div>
    <div class="col tags"><p>tags</p></div>
    <div class="col description"><p>description</p></div>
    <div class="col locations"><p>locations</p></div>
    <div class="col source"><p>source</p></div>
    <div class="col contact"><p>contact</p></div>
  </div>  -->
  <div class="row header">
    <div
      v-for="(th, key) in $locale.tableHeaders"
      :key="key"
      :class="['col', key]"
      >
        <p>{{ th.name[$store.state.locale] }}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: "TableHeaders",
}
</script>

<style scoped>

.header {
  position: sticky;
  padding: 0.5em 0;
  top: 1.5em;
  z-index: 2;
  width: 100%;
  display: flex;
  font-weight: bold;
  /* text-shadow: 0 0 1em var(--lightblue);
  filter: drop-shadow(0 0 1em lime); */
}

.col {
  background: unset;
  display: flex;
  justify-content: flex-start;
  padding: 0;
  /* padding-left: 0.25em; */
}
.col p {
  background: var(--lightblue);
  /* width: auto; */
  padding: 0.5em;
}


</style>
<template>
  <div class="row header">
    <div
      v-for="(th, key) in $locale.tableHeaders"
      :key="key"
      :class="['col', key]"
      @click="$store.commit('setSort', {
        prop: key,
        order: 
          $store.state.sort.prop == key &&
          $store.state.sort.order * -1 || 1 
      })"
    >
        <p>
          <span>{{ th.name[$store.state.locale] }}</span>
          <span class="arrow">
           {{ 
              $store.state.sort.prop == key && 
              $store.state.sort.order > 0 && ' ↑' || ' ↓'
            }} 
          </span>
        </p>
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
  top: .5em;
  z-index: 2;
  width: 100%;
  display: flex;
  font-weight: bold;
  /* text-shadow: 0 0 1em var(--lightblue);
  filter: drop-shadow(0 0 1em lime); */
  background: var(--lightblue)
}
.row.header:hover .col {
  background: var(--lightblue);
  
}
.col {
  background: var(--lightblue);
  display: flex;
  justify-content: flex-start;
  padding: 0;
  cursor: pointer;
  /* padding-left: 0.25em; */
}
.col p {
  background: var(--lightblue);
  /* width: auto; */
  padding: 0.5em;
}

.col p .arrow {
  font-size: 1.2em;
  opacity: 0;
}
.col:hover p .arrow {
  opacity: 1;
}

.col.artist,
.col.medium,
.col.title,
.col.updated {
  display: none;
}

.mobile .header {
  display: none;
}
</style>
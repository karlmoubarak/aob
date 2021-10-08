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
  box-sizing: border-box;
  position: sticky;
  padding: 0.5em 0;
  top: 0;
  z-index: 2;
  width: 100%;
  display: flex;
  font-weight: bold;
  background: inherit;
  margin: 0;
  flex-wrap: wrap;
}
.row.header:hover .col {
  background: white;
  
}
.header .col {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  padding: 0;
  cursor: pointer;
  background: var(--lightblue);
  background: white;
}
.header .col p {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: var(--lightblue);
  background: white;
  padding: 0.5em;

}

.header .col p .arrow {
  display: inline-block;
  width: 0 !important; 
  margin-left: 0.5em;
  overflow: visible;
  font-size: 1.2em;
  opacity: 0;
}
.header .col:hover p .arrow {
  opacity: 1;
}

.header .col.artist,
.header .col.medium,
.header .col.title,
.header .col.artistSite,
.header .col.updated {
  display: none;
}

.mobile .header {
  display: none;
}
.printing .header {
  display: none;
}

@media print {
  .header {
    display: none;
  }
}

</style>
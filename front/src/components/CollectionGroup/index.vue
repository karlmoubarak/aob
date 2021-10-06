<template>
  <div class="collections">
    <h2 v-if="headerText">{{ headerText }}</h2>
    <Collection
      v-for="collection in collections"
      :key="collection.id"
      :collection="collection"
    />
  </div>
</template>
<script>
import Collection from './Collection'

export default {
  name: 'CollectionGroup',
  components: { Collection },
  props: [ 'collections', 'headerText' ]
}
</script>

<style scoped>
.collections {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: scroll;
  padding: 0.5em;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  transition: all var(--slow) ease;
  font-family: Montserrat;
}

.collections h2 {
  width: 100%;
  margin: 0.5em;
  font-weight: normal;
}

.mobile .collections {
  flex-direction: column;
  flex-wrap: nowrap;
}
</style>
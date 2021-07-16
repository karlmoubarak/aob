<template>
  <div class="collections">
    <Collection
      v-for="collection in sortedCollections"
      :key="collection.id"
      :collection="collection"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Collection from '../components/Collection'

export default {
  name: 'Collections',
  components: { Collection },
  computed: {
    ...mapGetters([
      'sortedCollections'
    ])
  },
  created() {
  }
}
</script>

<style scoped>
.collections {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: scroll;
  margin: 0.5em;
  margin-top: 2em;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
}
</style>
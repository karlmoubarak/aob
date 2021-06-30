<template>
  <div class="collections">
    <Collection
      v-for="collection in collections"
      :key="collection.id"
      :collection="collection"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Collection from '../components/Collection'

export default {
  name: 'Collections',
  components: { Collection },
  computed: {
    ...mapState([
      'collections'
    ])
  },
  created() {
  }
}
</script>

<style scoped>
/* .collections {
  margin-top: 1em;
} */
</style>
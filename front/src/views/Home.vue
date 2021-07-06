<template>
  <CollectionBody
    :collectionItems="mainCollection"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import CollectionBody from '../components/CollectionBody.vue'

export default {
  name: 'Home',
  components: {
    CollectionBody
  },
  computed: {
    ...mapGetters([
      'mainCollection'
    ]),
  },
  watch: {
    mainCollection() {
      console.log(this.mainCollection.map(i => i.slug))
    }
  }

}
</script>

<style>

#home {
  box-sizing: border-box;
  position: relative;
  /* height: 100%; */
  width: 100%;
  margin-top: 1em;
}
</style>
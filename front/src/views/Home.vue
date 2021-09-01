<template>
  <div id="home">
    <CollectionBody
      :collectionItems="mainCollection"
      :emptyMessage="emptyMessage"
    />
    <transition name="fade">
      <Upload
        v-if="$route.path == '/upload'"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CollectionBody from '../components/CollectionBody'
import Upload from '../components/Upload'

export default {
  name: 'Home',
  components: {
    CollectionBody,
    Upload
  },
  computed: {
    ...mapGetters([
      'mainCollection'
    ]),
    emptyMessage() {
      return this.$locale.search.empty[this.$store.state.locale]
    }
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
  width: 100%;
  margin-top: 1em;
  /* transform: none !important; */
  /* height: 100%; */
  /* overflow: hidden; */
}
.mobile #home {
  margin-top: 0;
  padding: 0.5em;
}
</style>
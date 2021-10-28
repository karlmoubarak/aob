<template>
  <div>
    <div class="info">
      <vue3-markdown-it
        class="description"
        v-bind="$mdOpts"
        :source="description"
      ></vue3-markdown-it>
    </div>
    <CollectionGroup
      :collections="sortedCollections"
    />
  </div>
</template>

<script>
import { mapGetters, mapState }  from 'vuex'
import CollectionGroup from '../components/CollectionGroup'

// Main view for collections
// Sends the full sorted collections array to
// the CollectionGroup component.

export default {
  name: 'Collections',
  components: { CollectionGroup },
  computed: {
    ...mapState([ 'info', 'locale' ]),
    ...mapGetters([ 'sortedCollections' ]),
    description() {
      return this.info && this.info.aboutCollections && this.info.aboutCollections[this.locale]
    }
  },
}
</script>

<style scoped>
.info {
  box-sizing: border-box;
  position: relative;
  max-width: 31.5%;
  padding: 1em 2em;
  margin: 1em;
  margin-bottom: 0;
  background: var(--green);
  font-family: Montserrat;
  border-radius: 0.5em;
}

.collections {  
  padding: 0.5em;
  padding-top: 0;
}
.mobile .info {
  max-width: 100%;
  margin: 0.5em;
  margin-bottom: 0;
}
</style>

<template>
  <div id="archive">
    <Table
      :collectionItems="mainCollection"
      :emptyMessage="emptyMessage"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Table from '../components/Table'

// this is the view for the full archive.
// the 'mainCollection', sorted and filtered with queries by the store,
// is presented here. The user's locale and loading status decide on
// the message presented if the list is empty.

export default {
  name: 'Archive',
  components: { Table },
  computed: {
    ...mapState([ 'loading', 'locale' ]),
    ...mapGetters([ 'mainCollection' ]),
    emptyMessage() {
      return ( 
        this.loading ?
        this.$locale.status.loading[this.locale] :
        this.$locale.search.empty[this.locale]
      )
    }
  },
  watch: {
    mainCollection() {
      if (process.env.NODE_ENV !== 'production') {
        console.log(this.mainCollection.map(i => i.slug))
      }
    }
  }

}
</script>

<style scoped>

#archive {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  max-height: 100%;
  background: inherit;
}

.mobile #archive {
  padding: 0.5em;
  padding-top: 0;
}

</style>

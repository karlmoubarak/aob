<template>
  <div id="artworks">
    <Table
      :collectionItems="mainCollection.filter(i => !i.organisation)"
      :emptyMessage="emptyMessage"
    />
  </div>
</template>

<script>

// View to display all artworks together.
// Not linked in UI but can be accessed with URL

import { mapGetters, mapState } from 'vuex'
import Table                    from '../components/Table'

export default {
  name: 'Artworks',
  components: { Table },
  computed: {
    ...mapState    ([ 'loading', 'locale' ]),
    ...mapGetters  ([ 'mainCollection' ]),
    emptyMessage() {
      return ( 
        this.loading ?
        this.$locale.status.loading[this.locale] :
        this.$locale.search.empty[this.locale]
      )
    }
  }
}
</script>

<style scoped>
#artworks {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0em;
  background: var(--white-glass);
  overflow: scroll;
  z-index: 2;
  padding: 10em;
}

#artworks .table {
  background: transparent;
}

</style>
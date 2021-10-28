<template>
  <div id="resources">
    <Table
      :collectionItems="mainCollection.filter(i => i.organisation)"
      :emptyMessage="emptyMessage"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Table from '../components/Table'

// View to display all resources together.
// Not linked in UI but can be accessed with URL

export default {
  name: 'Resources',
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
  }
}
</script>

<style scoped>

#resources {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  background: inherit;
}
.mobile #resources {
  padding: 0.5em;
}



</style>

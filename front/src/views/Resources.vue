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

export default {
  name: 'Resources',
  components: {
    Table
  },
  computed: {
    ...mapState([ 'loading' ]),
    ...mapGetters([ 'mainCollection' ]),
    emptyMessage() {
      return ( 
        this.loading ?
        this.$locale.status.loading[this.$store.state.locale] :
        this.$locale.search.empty[this.$store.state.locale]
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
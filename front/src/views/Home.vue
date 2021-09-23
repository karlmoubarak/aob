<template>
  <div id="home">
    <Table
      :collectionItems="mainCollection"
      :emptyMessage="emptyMessage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Table from '../components/Table'

export default {
  name: 'Home',
  components: {
    Table
  },
  computed: {
    ...mapGetters([
      'mainCollection'
    ]),
    emptyMessage() {
      return ( 
        this.$store.state.resources.length == 0 ?
        this.$locale.status.loading[this.$store.state.locale] :
        this.$locale.search.empty[this.$store.state.locale]
      )
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
  background: inherit;
}
.mobile #home {
  padding: 0.5em;
}
</style>
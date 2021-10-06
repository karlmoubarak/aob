<template>
  <div id="home">
    <Table
      :collectionItems="mainCollection"
      :emptyMessage="emptyMessage"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Table from '../components/Table'

export default {
  name: 'Home',
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
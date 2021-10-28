<template>
  <div 
    id="exhibition"
    :class="{ peak: peak }"
  >
    <div 
      class="info"
      v-if="loading"
    >
      <p>{{ emptyMessage }}</p>
    </div>
    <div 
      v-else
      class="info"
    >
      <p class="title">{{ title }}</p>
      <vue3-markdown-it
        class="desc"
        v-bind="$mdOpts"
        :source="processImages(desc)"
      ></vue3-markdown-it>
    </div>
    <Table  
      :collectionItems="items"
    />
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import { processImages }        from '../utils'
import Table                    from '../components/Table'

// View for the current exhbition, which is a Collection
// in Strapi that has key 'isCurrentExhibition'.

export default {
  name: 'Exhibitionn',
  components: { Table },
  methods: { processImages },
  computed: {
    ...mapState    ([ 'loading', 'locale' ]),
    ...mapGetters  ([ 'exhibition' ]),
    title()        { return this.exhibition.Title },
    desc()         { return this.exhibition.Description },
    items()        { return this.exhibition.items },
    emptyMessage() {
      return ( 
        this.loading ?
        this.$locale.status.loading[this.locale] :
        this.$locale.search.empty[this.locale]
      )
    }
  },
  data() {
    return {
      peak: false
    }
  
  },
  mounted() {
    setTimeout(() => {
      this.peak = true
      setTimeout(() => {
        this.peak = false
      }, 1500)
    }, 1500)
  }
}

</script>

<style scoped>

#exhibition {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0em;
  background: var(--white-glass);
  overflow: scroll;
  z-index: 2;
}

#exhibition .info {
  box-sizing: border-box;
  position: sticky;
  float: left;
  top: 0; left: 0;
  padding: 10em 5em;
  max-width: 50em;
  max-height: 100%;
  overflow: scroll;
  font-family: Montserrat;
  filter: drop-shadow( 0 0 2em var(--white-glass));
}

#exhibition .info .title {
  font-size: 20pt;
}

#exhibition .table {
  float: left;
  max-width: 85%;
  margin-top: -10%;
  margin-left: 7.5%;
  background: transparent;
  filter: drop-shadow( 0 0 20em var(--white-glass));
  height: auto;
}
#exhibition.peak .table {
  margin-top: -30%;
}
#exhibition .table:hover {
  margin-top: -50em;
}




.mobile #exhibition {
  padding: 1em;
}
.mobile #exhibition .info {
  position: relative;
  max-width: 100%;
  max-height: unset;
  padding: 1em;
}

.ar #exhibition .info {
  left: unset;
  float: right;
  right:0;  
}

</style>

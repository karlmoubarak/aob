<template>
  <div
    id="exhibition"
    :class="{ peak, collapsed }"
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
      <p class="subtitle">{{ authors }}</p>
      <vue3-markdown-it
        class="description"
        v-bind="$mdOpts"
        :source="processImages(desc)"
      ></vue3-markdown-it>
    </div>
    <div
        v-if="isMobile && !loading"
        class="readmore"
        @click="collapsed = !collapsed"
      >
        <br>
        <p>{{ collapsed ? 'read more...' : 'read less.' }}</p>
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
    ...mapState    ([ 'loading', 'locale', 'isMobile' ]),
    ...mapGetters  ([ 'exhibition' ]),
    title()        { return this.exhibition.Title },
    authors()      { return this.exhibition.Author },
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
      peak: false,
      collapsed: true,
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
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
#exhibition::-webkit-scrollbar {
  display: none;
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
  color: var(--darkpurple);
  /* filter: drop-shadow( 0 0 2em var(--white-glass)); */
  filter: drop-shadow( 0 0 5em var(--lightpurple));
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
#exhibition .info::-webkit-scrollbar {
  display: none;
}

#exhibition .info .title {
  font-size: 20pt;
  margin-bottom: 0;
}
#exhibition .info .subtitle {
  font-style: italic;
}

#exhibition .table {
  float: left;
  max-width: 85%;
  /* margin-top: -10%; */
  margin-left: 7.5%;
  background: transparent;
  filter:
    drop-shadow( 0 0 3em var(--white-glass))
    drop-shadow( 3em 3em 3em var(--lightpurple ))
    drop-shadow( -3em -3em 3em var(--lightorange ))
  ;
  transform: translate(0, -10em);
  height: auto;
}
#exhibition.peak .table {
  /* margin-top: -30%; */
  transform: translate(0, -30em);
  filter:
    drop-shadow( 0 0 5em var(--white-glass))
    drop-shadow( 3em 3em 10em var(--lightpurple ))
    drop-shadow( -3em -3em 10em var(--lighterorange ))
  ;
}
#exhibition .table:hover {
  /* margin-top: -50em; */
  transform: translate(0, -50em);
  filter:
    drop-shadow( 0 0 20em var(--white-glass))
    drop-shadow( 10em 10em 30em var(--lightpurple ))
    drop-shadow( -10em -10em 30em var(--lighterorange ))
  !important;
}




.mobile #exhibition {
  padding: 1em;
}

.mobile #exhibition .readmore {
  text-decoration: underline;
  cursor: pointer;
  color:  var(--darkpurple);
  display: block;
  margin: 1rem;
}
.mobile #exhibition .info {
  position: relative;
  max-width: 100%;
  max-height: unset;
  min-height: 69vh;
  padding: 1em;
}
.mobile #exhibition.collapsed .info {
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  margin-bottom: 1rem;
  -webkit-line-clamp: 12;
  padding-bottom: 0.3em;
  padding-top: 0.5rem;
}

.ar #exhibition .info {
  left: unset;
  float: right;
  right:0;
}

.mobile #exhibition .table  {
  margin-top:5vh;
  filter: drop-shadow( 0 0 5em var(--white-glass)) !important;
  transform: none !important;
}

</style>

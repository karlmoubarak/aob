<template>
  <div 
    id="app" 
    :dir="direction"
    :class="[ locale, { 
      mobile: isMobile,
      landing: landing,
      printing: printing
    }]" 
  >
    
    <Header    :landing="landing" />
    <SearchBar :landing="landing" />
    <Nav       :landing="landing" />
    
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

  </div>
</template>

<script>

import { mapState } from 'vuex'
import api          from './api'
import Header       from './components/Header'
import SearchBar    from './components/Header/SearchBar'
import Nav          from './components/Header/Nav'

export default {

  name: 'App',
  
  components: { 
    Header,
    SearchBar,
    Nav,
  },
  
  computed: {
    ...mapState([
      'isMobile',
      'printing',
      'locale',
    ]),
    landing()   { return this.$route.name == 'Home' },
    direction() { return this.locale == 'ar' ? 'rtl' : 'ltr'}
  },
  
  async created() {
  

    // check if browser's default locale is arabic and default to english.

    this.$store.commit(
      'setLocale', 
      this.getLocale().includes('ar') ? 'ar' : 'en'
    )
    
    
    // check if browser is mobile and add 'resize' listener.

    this.$store.commit(
      'setMobile', 
      this.checkIfMobile()
    )
    window.addEventListener('resize', () => {
      this.$store.commit(
        'setMobile', 
        this.checkIfMobile()
      )
    })
    
    
    // Handle printing

    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print')
        mediaQueryList.addListener(mql => {
            if (mql.matches) {
              this.beforePrint()
            } else {
              this.afterPrint()
            }
        })
    }

    window.onbeforeprint = this.beforePrint
    window.onafterprint = this.afterPrint
    
    
    // after each route, add path to history and commit URL parameters to store.
  
    this.$router.afterEach(to => {
      this.$store.commit('addToHistory',    to.fullPath            )
      this.$store.commit('selectTags',      to.query.tag      || [])
      this.$store.commit('selectLocations', to.query.location || [])
      this.$store.commit('setQuery',        to.query.search   || '')
    })
    
    
    // fetch all contents from api:
    //   infos,
    //   locations,
    //   tags,
    //   resources,
    //   artworks,
    //   collections,
    
    // Connections Errors redirect to Error component
    
    for (let key in api) {
      let response
      try {
        response = await api[key].getAll()
      } catch {
        this.$router.push('/error')
      }
      this.$store.commit(
        'set' + key[0].toUpperCase() + key.slice(1),
        response
      )
    }
    
    
    // get my-collection from LocalStorage if it exists
    
    this.$store.dispatch('getCollectionFromStore')
  
  
    // app is ready:
    
    this.$store.commit('setLoading', false)
    
    
  },
  
  watch: {
    printing() {
      console.log(this.printing)
    }
  },
  methods: {

    getLocale: () => (
      navigator.languages && 
      navigator.languages.length ? 
      navigator.languages[0] : 
      navigator.language
    ),
    
    checkIfMobile: () => window.innerWidth < 700,
    
    beforePrint() {
      this.$store.commit('setPrinting', true)
    },
    afterPrint()  { 
      // setTimeout(() => {
        this.$store.commit('setPrinting', false)   
      // }, 500) 
      // this.$store.commit('setPrinting', false) 
    }
    
  }
}
</script>

<style>

@font-face {
  font-family: Montserrat;
  src: url(./assets/Montserrat.otf);
  font-weight: normal;
  font-style: normal;
}

:root {

  --black: rgb(119, 119, 119);
  --orange: #FF740A;
  --lightorange: #FFF7DE;
  --lighterorange: #f5eed4;
  --lightestorange: #FEFBF1;
  --lightblue: #EDF2F6;
  --lightblue: #f1f6fa;
  --green: #e1ec90;
  --lightgreen: #eaf0be;
  --brightgreen: #00b35f;
  --purple: #CBBEF0;
  --highlight: rgb(255, 255, 102);
  --highlight: #FFF7B1;
  --beige: #f2e4c4;
  --white-glass:#ffffffa4;
   
  --veryfast: 0.1s;
  --fast: 0.2s;
  --slow: 0.5s;
  --veryslow: 0.8s;
  --landing: 1s;
}

html,
body,
#app {
  height: 100%; width: 100%;
  padding: 0; margin: 0;
  background-color: var(--lightblue);
  transition: all var(--landing) ease;
}

#app {
  height: 100%; width: 100%;
  font-size: 10pt;
  font-family: 'Courier New', Courier, monospace;
  color: var(--black);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
}

main {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  max-height: 100vh;
  overflow: scroll;
  /* padding-top: 11em; */
  transition: all var(--landing) ease;
  background: inherit;
}



main * {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
main::-webkit-scrollbar {
  display: none;
}


a {
  color: var(--orange);
  text-decoration: none;
  text-decoration-thickness: 0.001em;
}
a:hover {
  text-decoration: underline;
}
a:active {
  color: var(--orange);
}

.highlight {
  border-radius: 0.2em;
  background:var(--highlight);
  box-shadow: 0 0px 8px 2px var(--highlight);
  text-decoration-color: var(--highlight);
  text-decoration-thickness: 0.08em;
}

.center {
  text-align: center;
}

.v-md-editor {
  box-shadow: none;
  min-height: 40em;
}

.v-md-editor__toolbar-left + .v-md-editor__toolbar-right {
  margin-left: unset;
}

.description img {
  max-width: 100%;
}



.fade-enter-active,
.fade-leave-active,
.fade-leave-to,
.fade-leave-from {
  transition: all var(--fast) ease;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(5em);
  opacity: 0;
}


.landing main {
  flex-shrink: 1;
  max-height: 0;
  overflow: hidden;
}

#app.ar {
  /* font-size: 12pt; */
}

#app.mobile {
  font-size: 12pt;
  display: block;
}

#app.mobile.landing {
  overflow: scroll;
}

.mobile a:hover {
  color: initial;
}

.mobile main {
  position: relative;
  max-height: unset;
  padding-top: unset;
}

.mobile.landing main {
  position: relative;
  max-height: unset;
  height: unset;
}

@page {
  size: A5 landscape;
  margin: 0;
}

.printing *,
.printing * * {
    transition: all 0s ease !important;
}
.printing,
.printing main,
.printing #home,
.printing .table {
  height: auto !important;
  max-height: unset !important;
  overflow: scroll;
}

.printing header,
.printing nav,
.printing input,
.printing textarea {
  display: none !important;
}

@media print {
  html,
  body,
  #app,
  main,
  #home,
  .table {
    height: auto !important;
    max-height: unset !important;
    overflow: scroll;
  }
  html {
    zoom:75%;
  }
  header,
  nav,
  input,
  textarea {
    display: none !important;
  }
}

</style>

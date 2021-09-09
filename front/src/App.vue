<template>
  <div 
    id="app" 
    :dir="direction"
    :class="[ locale, { 
      mobile: isMobile,
      landing: landing,
    }]" 
  >
    
    <Header />
    <Nav />
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
import api from './api'
import Header from './components/Header'
import Nav from './components/Header/Nav'

export default {
  name: 'App',
  components: { 
    Nav,
    Header
  },
  computed: {
    ...mapState([
      'isMobile',
      'locale',
      'tags',
      'locations'
    ]),
    landing()   { return this.$route.fullPath == '/'},
    direction() { return this.locale == 'ar' ? 'rtl' : 'ltr'}
    
  },
  created() {

    this.$store.commit('setMobile', this.checkIfMobile())
    window.addEventListener('resize', () => {
      this.$store.commit('setMobile', this.checkIfMobile())
    })
    
    this.$store.commit('setLocale', 
      this.getLocale().includes('ar') ? 'ar' : 'en'
    )
    
    this.getInfo()
    this.getTags()
    this.getLocations()
    this.getResources()
    this.getArtworks()
    this.getCollections()

    this.$router.beforeEach((to) => {
      let newQuery = {}
      if (to.query.tag && !Array.isArray(to.query.tag)) {
        newQuery.tag = [to.query.tag]
      }
      if (to.query.location && !Array.isArray(to.query.location)) {
        newQuery.location = [to.query.location]
      }
      if (newQuery.tag || newQuery.location) {
        return {
          path: to.path,
          query: newQuery
        }
      } 
    })

    this.$router.afterEach(to => {
      this.$store.commit('addToHistory', to.path)
      if (to.query.tag) {
        this.$store.commit('selectTags', to.query.tag)
      } else {
        this.$store.commit('selectTags', [])
      } 
      if (to.query.location) {
        this.$store.commit('selectLocations', to.query.location)
      } else {
        this.$store.commit('selectLocations', [])
      }
      if (to.query.search) {
        this.$store.commit('setQuery', to.query.search)
      } else {
        this.$store.commit('setQuery', '')
      }
    })
  },


  methods: {

    checkIfMobile: () => window.innerWidth < 700,
    
    getLocale: () => (
      navigator.languages && 
      navigator.languages.length ? 
      navigator.languages[0] : 
      navigator.language
    ),
    
    getInfo() {
      api
      .info
      .get()
      .then(data => this.$store.commit('setInfo', data))
      .catch(error => console.log(error))
    },
    
    getTags() {
      api
      .tags
      .getAll()
      .then(data => this.$store.commit('setTags', data))
      .catch(error => console.log(error))
    },
    
    getLocations() {
      api
      .locations
      .getAll()
      .then(data => this.$store.commit('setLocations', data))
      .catch(error => console.log(error))
    },
    
    getResources() {
      api
      .resources
      .getAll()
      .then(data => this.$store.commit('setResources', data))
      .catch(error => console.log(error))
    },

    getArtworks() {
      api
      .artworks
      .getAll()
      .then(data => this.$store.commit('setArtworks', data))
      .catch(error => console.log(error))
    },
    
    getCollections() {
      api
      .collections
      .getAll()
      .then(data => this.$store.commit('setCollections', data))
      .catch(error => console.log(error))
    },

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
  --lightblue: #F2F5FB;
  --landing: 2s;
  --green: #e1ec90;
  --lightgreen: #eaf0be;
  --brightgreen: #00b35f;
  --purple: #CBBEF0;
}

html,
body,
#app {
  height: 100%; width: 100%;
  padding: 0; margin: 0;
  background-color: var(--lightblue);
}

#app {
  height: 100%; width: 100%;
  font-size: 10pt;
  font-family: 'Courier New', Courier, monospace;
  color: rgb(119, 119, 119);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
}

main {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  max-height: 100vh;
  overflow: scroll;
  padding-top: 11em;
  transition: all var(--landing) ease;
}

.landing main {
  flex-shrink: 1;
  max-height: 0;
  overflow: hidden;
}

.center {
  text-align: center;
}


a {
  color: var(--orange);
  text-decoration: underline;
  text-decoration-thickness: 0.001em;
  /* text-decoration-skip: edges; */
  /* text-decoration-skip:40em; */
}
a:hover {
  color: #737a3b;
  /* text-decoration: line-through;  
  text-decoration-style: wavy;
  text-decoration-thickness: 0.02em; */
  /* box-shadow: 0 0px 8px 2px rgb(255, 255, 102); */
}
a:active {
color: var(--orange);
}

.highlight {
  border-radius: 0.2em;
  background: rgba(247, 255, 102, 0.694);
  box-shadow: 0 0px 8px 2px rgb(255, 255, 102);
  text-decoration-color: rgb(153, 50, 255);
  text-decoration-thickness: 0.08em;
}




.description img {
  max-width: 100%;
}



.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-leave-to,
.fade-leave-from {
  transition: all 0.2s ease;
  
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(5em);
  opacity: 0;
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
  size: A5;
  margin: 0;
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
  header,
  nav {
    display: none !important;
  }
}

</style>
